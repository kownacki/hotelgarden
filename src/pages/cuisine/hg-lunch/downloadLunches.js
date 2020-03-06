import {html} from 'lit-element';
import {getDayOfWeek, urlTo64Base, loadScript, sleep} from '../../../utils.js';

const bodyStyles = getComputedStyle(document.body);
const primaryColor = bodyStyles.getPropertyValue('--primary-color').trim();
const secondaryColor = bodyStyles.getPropertyValue('--secondary-color').trim();
const accentColor = bodyStyles.getPropertyValue('--accent-color').trim();

const getHeader = (config, dateString) => ({
  text: [
    _.toUpper(`Lunch menu ${dateString}\n`),
    {
      text: `od ${_.get('beginTime', config)} do ${_.get('endTime', config)}\n`,
      style: 'subheader',
    },
  ],
  style: 'header',
});
const getDayHeader = (day) => ({
  layout: 'horizontalLine',
  table: {
    widths: ['*'],
    body: [
      [{
        text: `-${getDayOfWeek(day)}-`,
        style: 'dayHeader',
      }],
      [''],
    ]
  }
});
const getDay = (lunch, prices, day) => [
  getDayHeader(day),
  _.get('disabled', lunch) ? 'W ten dzień wyjątkowo nie serwujemy lunchu\n' : _.map((course) => [
    _.toUpper(`${{1: 'I', 2: 'II'}[course]} danie:`),
    {
      columns: [
        [
          _.toUpper(_.get(`${course}.name`, lunch)),
          {
            text: _.get(`${course}.description`, lunch),
            style: 'smaller',
          }
        ],
        {text: {1: _.get(1, prices), 2: _.get(2, prices)}[course], width: 40, alignment: 'right'}
      ],
    },
    course === 2 ? '' : '\n',
  ], [1, 2]),
  '\n',
];
const getBody = (lunches, prices, img, columnGap) => [
  {
    columns:
      _.map.convert({cap: false})((column, index) =>
          [
            _.map((day) => getDay(_.get(day, lunches), prices, day), column),
            index === 0 ? [ '\n', {image: img, width: 180}, '\n'] : '',
          ],
        [[1, 2], [3, 4, 5]]),
    columnGap,
  },
];
const getFooter = (config, columnGap) => [
  {
    layout: 'footer',
    table: {
      widths: ['*'],
      body: [
        [[
          {
            text: '-CENNIK-\n',
            style: 'dayHeader',
          },
          '\n',
          {
            columns: [
              _.toUpper('I + II danie\n\nKarnety i abonamenty'),
              {text: `${_.get('prices.set', config)}\n\nod 10`, width: 40, alignment: 'right'},
              [_.toUpper('Dostawa'), {text: 'na terenie Oleśnicy przy zamówieniach > 25 zł\ninaczej 5 zł', style: 'smaller'}],
              {text: '0', width: 40, alignment: 'right'},
            ],
            columnGap,
          }
        ]],
      ]
    }
  },
  '\n',
  {
    columns: [
      `tel. ${_.get('phone', config)}`,
      {text: 'FB/restauracjamagnolia', alignment: 'right'},
    ],
  },
];

const getPageCount = (pdf) => {
  const range = pdf.getStream().bufferedPageRange();
  return range.start + range.count;
};

let pdfmakeLoaded = false;
let resourcesPromise;
const generate = async (lunches, config, dateString, decrementFontSize) => {
  if (!pdfmakeLoaded) {
    pdfmakeLoaded = true;
    resourcesPromise = Promise.all([
      urlTo64Base('/resources/images/lunch-background.jpg'),
      urlTo64Base('/resources/images/logo-restaurant.png'),
    ]);
    // Must be loaded one by one!
    await loadScript('/node_modules/pdfmake/build/pdfmake.min.js');
    await loadScript('/node_modules/pdfmake/build/vfs_fonts.js');
  }
  const [backgroundImage, restaurantLogo] = await resourcesPromise;
  const columnGap = 25;

  pdfMake.fonts = {
    Lato: {
      normal: 'Lato-Regular.ttf',
      // No 'light' option so using bold for light font
      bold: 'Lato-Light.ttf',
    },
  };
  pdfMake.tableLayouts = {
    addPadding: {
      hLineWidth: () => 0,
      vLineWidth: () => 0,
      paddingLeft: () => 15,
      paddingRight: () => 15,
      paddingTop: () => 0,
      paddingBottom: () => 0,
    },
    horizontalLine: {
      hLineWidth: (i) => i === 1 ? 1 : 0,
      vLineWidth: () => 0,
      hLineColor: () => secondaryColor,
      paddingLeft: () => 0,
      paddingRight: () => 0,
      paddingTop: () => 0,
      paddingBottom: () => 10,
    },
    footer: {
      hLineColor: () => secondaryColor,
      paddingLeft: () => 14,
      paddingRight: () => 14,
      paddingTop: () => 10,
      paddingBottom: () => 10,
    },
  };
  const docDefinition = {
    background: (currentPage, pageSize) => ({
      image: backgroundImage,
      width: pageSize.width,
      height: pageSize.height,
    }),
    content: [
      {
        layout: 'addPadding',
        table: {
          widths: ['*'],
          body: [
            [[
              getHeader(config, dateString),
              '\n',
              getBody(lunches, _.get('prices', config), restaurantLogo, columnGap),
            ]],
          ]
        }
      },
      getFooter(config, columnGap),
    ],
    defaultStyle: {
      font: 'Lato',
      fontSize: 15 * (1 - decrementFontSize),
      color: secondaryColor,
    },
    styles: {
      header: {
        fontSize: 35,
        color: primaryColor,
        bold: true
      },
      subheader: {
        fontSize: 30,
      },
      dayHeader: {
        fontSize: 20,
        color: accentColor,
        alignment: 'center',
      },
      smaller: {
        fontSize: 14 * (1 - decrementFontSize),
      },
    }
  };
  return pdfMake.createPdf(docDefinition);
};

export default async (lunches, config, that, dateString) => {
  const smallestAllowedFont = 8;
  const smallestInitialFont = 14;

  let decrementFontSize = 0;
  const decrementStep = 0.05;
  let pdf;
  let pageCount;
  do {
     pdf = await generate(lunches, config, dateString, decrementFontSize);
     await sleep(); // break synchronicity
  } while (
    (pageCount = getPageCount(pdf)) > 1
    && smallestInitialFont * (1 - (decrementFontSize + decrementStep)) >= smallestAllowedFont
    && (decrementFontSize += decrementStep)
    && (that._decreasingFont = decrementFontSize)
    );

  const finalPdf = await generate(lunches, config, dateString, decrementFontSize);
  that._result = [];
  if (decrementFontSize) {
    that._result.push(html`Dostosowano wielkość czcionki. Zmniejszono o ${Math.round(decrementFontSize * 100)}%<br>`);
  }
  if (pageCount > 1) {
    that._result.push(html`Nie udało się zmieścić zawartości na jednej stronie. Wielkość czcionki osiągnęła minimum<br>`);
  }
  return new Promise((resolve) => finalPdf.download(`Menu Lunchowe ${dateString.replace(/\./g, '-')}`, resolve));
};
