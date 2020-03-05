import {getDayOfWeek, urlTo64Base, loadScript} from '../../../utils.js';

const bodyStyles = getComputedStyle(document.body);
const primaryColor = bodyStyles.getPropertyValue('--primary-color').trim();
const secondaryColor = bodyStyles.getPropertyValue('--secondary-color').trim();
const accentColor = bodyStyles.getPropertyValue('--accent-color').trim();
const columnGap = 25;

const getHeader = () => ({
  text: [
    'Lunch menu 02.03-06.03\n'.toUpperCase(),
    {
      text: 'od 13:00 do 16:30\n',
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
const getDay = (lunches, day) => [
  getDayHeader(day),
  _.map((course) => [
    `${{1: 'I', 2: 'II'}[course]} danie:`.toUpperCase(),
    {
      columns: [
        [
          _.get(`${day}.${course}.name`, lunches).toUpperCase(),
          {
            text: _.get(`${day}.${course}.description`, lunches),
            style: 'smaller',
          }
        ],
        {text: {1: 6, 2: 14}[course], width: 20, alignment: 'right'}
      ],
    },
    course === 2 ? '' : '\n',
  ], [1, 2]),
  '\n',
];
const getBody = (lunches, img) => [
  {
    columns:
      _.map.convert({cap: false})((column, index) =>
          [
            _.map((day) => getDay(lunches, day), column),
            index === 0 ? ['\n', {image: img, width: 180}] : '',
          ],
        [[1, 2], [3, 4, 5]]),
    columnGap,
  },
];
const getFooter = () => [
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
              'I + II danie'.toUpperCase() + '\n\nKarnety i abonamenty'.toUpperCase(),
              {text: '18,90\n\nod 10', width: 40, alignment: 'right'},
              ['Dostawa'.toUpperCase(), {text: 'na terenie Oleśnicy przy zamówieniach > 25 zł\ninaczej 5 zł', style: 'smaller'}],
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
      'tel. 500 407 722',
      {text: 'FB/restauracjamagnolia', alignment: 'right'},
    ],
  },
];

let pdfmakeLoaded = false;
let resourcesPromise;
export default async (lunches) => {
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
      paddingTop: () => 10,
      paddingBottom: () => 15,
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
            [[getHeader(), '\n', getBody(lunches, restaurantLogo)]],
          ]
        }
      },
      getFooter(),
    ],
    defaultStyle: {
      font: 'Lato',
      fontSize: 13,
      color: secondaryColor,
    },
    styles: {
      header: {
        fontSize: 35,
        color: primaryColor,
        bold: true
      },
      subheader: {
        fontSize: 28,
      },
      dayHeader: {
        fontSize: 20,
        color: accentColor,
        alignment: 'center',
      },
      smaller: {
        fontSize: 10,
      },
    }
  };
  pdfMake.createPdf(docDefinition).download();
};
