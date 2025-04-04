import {collection, doc, deleteDoc, getDocs, query, where} from 'firebase/firestore';
import {toArray} from 'lodash-es';
import {isElementVisible, isElementInProximity} from 'mk-frontend-web-utils/dom.js';
import diacritics from '../resources/scripts/diacritics.js';
import {HEADER_HEIGHT} from '../utils/config.js';
import {createNewEvent, createNewNews, DynamicPathPageType} from '../utils/events.js';
import {createDbPath, db, updateInDb} from './utils/database.js';

export const isProductionEnvironment = () => {
  return window.environment === 'production';
};

export const isDevelopmentEnvironment = () => {
  return window.environment === 'development';
};

export const hyphenate = _.flow(
  _.replace(/'/g, ''),
  _.toLower,
  diacritics.remove,
  _.words,
  _.join('-'),
);

export const checkElementsVisibility = _.throttle(100, (elements) => {
  elements.map((child) => {
    if (isElementVisible(child)) {
      child.classList.add('seen');
      child.seen = true;
    }
  });
});

export const assignKeys = (field) => _.map.convert({cap: false})((item, key) => ({...item, [field]: key}));

export const generateUid = () => `${Date.now()}${_.padCharsStart('0', 9,  _.random(1, 10**9 - 1))}`;

export const getAllDynamicPathPages = async () => {
  const dynamicPathPagesSnapshot = await getDocs(collection(db, 'dynamicPathPages'));
  return dynamicPathPagesSnapshot.docs.map((dynamicPathPage) => {
    return {
      ...dynamicPathPage.data(),
      uid: dynamicPathPage.id,
    };
  });
}

export const removeDynamicPathPage = async (uid) => {
  const deleteMainPromise = deleteDoc(doc(db, 'dynamicPathPages', uid));
  const deleteContentPromise = deleteDoc(doc(db, `dynamicPathPages/${uid}/data/content`));
  const deleteSeoPromise = deleteDoc(doc(db, `dynamicPathPages/${uid}/data/seo`));
  return Promise.all([deleteMainPromise, deleteContentPromise, deleteSeoPromise]);
}

export const isDynamicPathAvailable = async (permalink) => {
  const dynamicPathPagesQuery = query(collection(db, 'dynamicPathPages'), where('permalink', '==', permalink));
  return (await getDocs(dynamicPathPagesQuery)).empty;
}

export const addDynamicPathPageToDb = async (data) => {
  return updateInDb(createDbPath(`dynamicPathPages/${generateUid()}`), data);
}

export const addDynamicPathPage = async (type, title, date, permalink) => {
  if (type === DynamicPathPageType.EVENT) {
    return addDynamicPathPageToDb(createNewEvent(title, date.startDate, date.endDate, permalink));
  } else {
    return addDynamicPathPageToDb(createNewNews(title, date.publishDate, date.unpublishDate, permalink));
  }
};

export const getAllMenuPages = async () => {
  const menuPagesSnapshot = await getDocs(collection(db, 'menu/pages/pages'));
  return menuPagesSnapshot.docs.map((page) => {
    return {
      categories: toArray(page.data()),
      name: page.id,
    };
  });
};

export const getMenusWithCategory = async (categoryUid) => {
  const menuPages = await getAllMenuPages();
  return menuPages
    .filter((menuPage) => {
      return menuPage.categories.some((menuCategory) => menuCategory.uid === categoryUid);
    }).map((menuPage) => {
      return menuPage.name;
    });
};

export const getAllMenuCategories = async () => {
  const menuCategoriesSnapshot = await getDocs(collection(db, 'menu/categories/categories'));
  return {...menuCategoriesSnapshot.docs.map((category) => {
    return {
      ...category.data(),
      uid: category.id,
    };
  })};
};

export const addAllMenuCategory = async (uid) => {
  await updateInDb(createDbPath(`menu/categories/categories/${uid}`), {});
};

export const deleteAllMenuCategory = async (uid) => {
  await deleteDoc(doc(db, `menu/categories/categories/${uid}`));
};

export const updateData = async (doc, path, data) => {
  return updateInDb(createDbPath(doc, path), data);
};

export const array = {
  swapItems: (index1, index2, arr) => {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    return arr;
  },
  nextIndex: (index, arr) => index === arr.length - 1 ? 0 : index + 1,
  prevIndex: (index, arr) => index === 0 ? arr.length - 1 : index - 1,
  nextItem: (index, arr) => arr[array.nextIndex(index, arr)],
  prevItem: (index, arr) => arr[array.prevIndex(index, arr)],
};

const memoizedParse =_.memoize(JSON.parse);
export const staticProp = (object) => {
  return memoizedParse(JSON.stringify(object));
};

export const sleep = (milliseconds = 0) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export const moveOutFromShadowDom = async (contentsElement) => {
  await sleep();
  const id = _.random(0, 1000000000);

  const getHost = (element) => {
    while (element.parentElement) {
      element = element.parentElement;
    }
    return element.parentNode.host;
  };

  const getHosts = (element) => {
    const hosts = [];
    while (getHost(element)) {
      element = getHost(element);
      hosts.push(element);
    }
    return hosts;
  };

  const hosts = getHosts(contentsElement);

  _.forEach(
    (host) => {
      const slot = document.createElement("slot");
      slot.setAttribute('slot', id);
      slot.setAttribute('name', id);
      host.appendChild(slot)
    }, _.initial(hosts)
  );

  const slot = document.createElement("slot");
  slot.setAttribute('name', id);

  contentsElement.parentNode.replaceChild(slot, contentsElement);

  contentsElement.setAttribute('slot', id);

  _.last(hosts).appendChild(contentsElement);
  await sleep();
};

export const scrollIntoView = (element, scrollable = window) => {
  const elementTopOffset = (scrollable === window ? HEADER_HEIGHT : 0) + 10;
  const elementBottomOffset = elementTopOffset + element.clientHeight;
  if (!isElementInProximity(element, -elementBottomOffset)) {
    element.scrollIntoView();
    scrollable.scrollBy(0, -elementTopOffset);
  }
}

export const detectMobile = () => navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i);

export const setDocumentTitle = (title) => {
  document.title = title;
}

export const removeHtmlTagsAndGetFirstP = (text) => {
  const el = document.createElement('div');
  el.innerHTML = text.replace(/<br>/g, ' ');
  return el.getElementsByTagName('p')[0].innerText;
}

export const cleanTextForMetaDescription = (text) => {
  return !text ? ''
    : text.search('<p') === -1
    ? text
    : removeHtmlTagsAndGetFirstP(text);
}

export const setMetaDescription = (text) => {
  const cleanedText = cleanTextForMetaDescription(text);
  document.head.querySelector('meta[name="description"]').setAttribute('content', cleanedText);
};

export const setStructuredData = (jsonLd) => {
  document.head.querySelector('script[type="application/ld+json"]').innerHTML = jsonLd;
}

// todo use moment js
export const getDayOfWeek = (index) => ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'][index - 1];

export const urlTo64Base = async (url) => {
  const reader = new FileReader();
  reader.readAsDataURL(await (await fetch(url)).blob());
  return new Promise((resolve) => (reader.onloadend = () => resolve(reader.result)));
};

/**
 * Loads source by appending it to document body.
 * @param {string} tag - Html tag that is going to be created. Usually 'script' for js file or 'link' for css stylesheet.
 * @param {object} attrs - Object with attribute names as keys and attribute values as values.
 * @returns {Promise} When source has loaded.
 */
export const loadSource = (tag, attrs) => new Promise((resolve) => {
  const source = document.createElement(tag);
  source.onload = resolve;
  Object.assign(source, attrs);
  document.body.append(source);
});

/**
 * Loads script by appending it to document body.
 * @param {string} src - Source path of script.
 * @returns {Promise} When script has loaded.
 */
export const loadScript = (src) => loadSource('script', {src});

/**
 * Loads stylesheet by appending it to document body.
 * @param {string} src - Source path of stylesheet.
 * @returns {Promise} When stylesheet has loaded.
 */
export const loadStylesheet = (src) => loadSource('link', {rel: 'stylesheet', href: src});
