import {getDayOfWeek, urlTo64Base, loadScript, sleep} from '../../utils.js';
import {PRIMARY_COLOR, SECONDARY_COLOR, ACCENT_COLOR, TEXT_COLOR} from '../../../utils/config.js';

const mainHeaderColor = PRIMARY_COLOR;
const dayHeaderColor = ACCENT_COLOR;
const textColor = TEXT_COLOR;
const linesColor = SECONDARY_COLOR;

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
const getBody = (lunches, weekLength, prices, img, columnGap) => [
  {
    columns:
      _.map.convert({cap: false})((column, index) =>
        [
          _.map((day) => getDay(_.get(day, lunches), prices, day), column),
          (index === 0 && weekLength <= 5) ? ['\n', {image: img, width: 100, alignment: 'center'}] : '',
          (index === 0 && weekLength === 7) ? ['\n', getPriceList(prices, columnGap, true)] : '',
        ],
        [
          _.range(1, Math.floor(weekLength/2) + 1),
          _.range(Math.floor(weekLength/2) + 1, weekLength + 1),
        ]
      ),
    columnGap,
  },
];
const getPriceList = (prices, columnGap, narrow = false) => {
  const leftSide = _.toUpper(`I + II danie\n\n${_.get('subs', prices) ? 'Karnety i abonamenty' : ''}`);
  const rightSide = `${_.get('set', prices)}\n\n${_.get('subs', prices)}`;
  const deliverySection = [
    _.toUpper('Dostawa'),
    {text: `na terenie Oleśnicy przy zamówieniach > ${_.get('freeDeliveryFrom', prices)} zł. Inaczej ${_.get('paidDelivery', prices)} zł`, style: 'smaller'}
  ];
  return {
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
          [
            {
              columns: narrow
                ? [
                  [leftSide + '\n\n', deliverySection],
                  {text: rightSide + '\n\n\n0', width: 40, alignment: 'right'},
                ]
                : [
                  leftSide,
                  {text: rightSide, width: 40, alignment: 'right'},
                  deliverySection,
                  {text: '0', width: 40, alignment: 'right'},
                ],
              columnGap,
            }
          ]
        ]],
      ]
    }
  };
};
const getFooter = (config) => [
  {
    columns: [
      `tel. ${_.get('phone', config)}`,
      {text: _.get('socialMediaLink', config), alignment: 'right'},
    ],
  },
];

const getPageCount = (pdf) => {
  const range = pdf.getStream().bufferedPageRange();
  return range.start + range.count;
};

let pdfmakeLoaded = false;
let resourcesPromise;
const generate = async (lunches, weekLength, config, dateString, decrementFontSize) => {
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
      hLineColor: () => linesColor,
      paddingLeft: () => 0,
      paddingRight: () => 0,
      paddingTop: () => 0,
      paddingBottom: () => 10,
    },
    footer: {
      hLineColor: () => linesColor,
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
              getBody(lunches, weekLength, _.get('prices', config), restaurantLogo, columnGap),
            ]],
          ]
        }
      },
      weekLength < 7 ? ['\n', getPriceList(_.get('prices', config), columnGap)] : '',
      '\n',
      {
        layout: 'addPadding',
        table: {
          widths: ['*'],
          body: [
            [[
              getFooter(config),
            ]],
          ]
        }
      },
    ],
    defaultStyle: {
      font: 'Lato',
      fontSize: 15 * (1 - decrementFontSize),
      color: textColor,
    },
    styles: {
      header: {
        fontSize: 35,
        color: mainHeaderColor,
        bold: true
      },
      subheader: {
        fontSize: 30,
      },
      dayHeader: {
        fontSize: 20,
        color: dayHeaderColor,
        alignment: 'center',
      },
      smaller: {
        fontSize: 14 * (1 - decrementFontSize),
      },
    }
  };
  return pdfMake.createPdf(docDefinition);
};

export default async (lunches, weekLength, config, that, dateString) => {
  const smallestAllowedFont = 8;
  const smallestInitialFont = 14;

  let decrementFontSize = 0;
  const decrementStep = 0.05;
  let pdf;
  let pageCount;
  do {
     pdf = await generate(lunches, weekLength, config, dateString, decrementFontSize);
     await sleep(); // break synchronicity
  } while (
    (pageCount = getPageCount(pdf)) > 1
    && smallestInitialFont * (1 - (decrementFontSize + decrementStep)) >= smallestAllowedFont
    && (decrementFontSize += decrementStep)
    && (that._decreasingFont = decrementFontSize)
    );

  const fileName = `Menu Lunchowe ${dateString.replace(/\./g, '-')}`;
  // cannot download twice from the same generation due to bug: images warping on the second download
  const generateAndDownload = async (cb) => (await generate(lunches, weekLength, config, dateString, decrementFontSize)).download(fileName, cb);
  return new Promise((resolve) => generateAndDownload(() => resolve({
    decrementFontSize,
    pageCount,
    downloadAgain: generateAndDownload,
  })));
};
