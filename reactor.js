import firebase from 'firebase/app';
import 'firebase/firestore';

const getStructuredData = (order, querySnapshot) => {
  const structuredData = [];
  order.forEach(itemId => {
    const item = querySnapshot.docs.find(itm => itm.id === itemId).data();
    if (item.published === 'Publish') {
      Object.keys(item).forEach(function (key) {
        if (item[key].seconds) {
          item[key] = item[key].toDate().toString();
        }
      });
      const structuredItem = Object.assign({}, { id: itemId }, item);
      structuredData.push(structuredItem);
    }
  });
  return structuredData;
};

const getCollection = async (collectionId, orderBy, direction, limit) => {
  const _db = firebase.firestore();
  const ref = _db.collection('collections').doc(collectionId);
  const collection = await ref.get();
  let order = collection.data().order;
  if (order === '') {
    return [];
  } else {
    order = order.split(' | ');
  }
  let query = ref.collection('data').where('_show', '==', true);
  if (orderBy) {
    query = query.orderBy(orderBy, direction);
  }
  if (limit) {
    query = query.limit(limit);
  }
  let items = await query.get();
  if (orderBy) {
    items = items.docs.reduce((acc, item) => {
      const data = item.data();
      Object.keys(data).forEach(function (key) {
        if (data[key].seconds) {
          data[key] = data[key].toDate().toString();
        }
      });
      data.id = item.id;
      acc.push(data);
      return acc;
    }, []);
  } else {
    items = order.reduce((acc, itemId) => {
      const item = items.docs.find(itm => itm.id === itemId);
      if (!item) return acc;
      const data = item.data();
      Object.keys(data).forEach(function (key) {
        if (data[key].seconds) {
          data[key] = data[key].toDate().toString();
        }
      });
      data.id = item.id;
      acc.push(data);
      return acc;
    }, []);
  }

  return items;
};

const getDoc = async pageId => {
  const ref = firebase.firestore().collection('pages').doc(pageId);
  const page = await ref.get();
  const data = page.data().data || {};
  return data;
};

const subscribeToCollection = async (
  collectionId,
  cb,
  options = {
    preLoad: []
  }
) => {
  let order = [];
  let querySnapshot = [];
  const ref = firebase.firestore().collection('collections').doc(collectionId);

  ref.onSnapshot(doc => {
    order = doc.data().order.split(' | ');
    if (querySnapshot.length) {
      cb(getStructuredData(order, querySnapshot, options.preLoad));
    }
  });

  ref.collection('data').onSnapshot(_querySnapshot => {
    querySnapshot = _querySnapshot;
    if (order.length) {
      cb(getStructuredData(order, querySnapshot, options.preLoad));
    }
  });
};

const subscribeToPage = async (pageId, cb) => {
  const ref = firebase.firestore().collection('pages').doc(pageId);

  ref.onSnapshot(doc => {
    cb(doc.data().data);
  });
};

const init = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_REACTOR_API_KEY,
      authDomain: 'reactor-dam.firebaseapp.com',
      databaseURL: 'https://reactor-dam.firebaseio.com',
      projectId: 'reactor-dam',
      storageBucket: 'reactor-dam.appspot.com',
      messagingSenderId: '198256799515',
      appId: '1:198256799515:web:3cf8edc02e02434b466dbe'
    });
  }
};

export default {
  init,
  getCollection,
  getDoc,
  subscribeToCollection,
  subscribeToPage
};
