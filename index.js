/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
  function compOps(op1, op2) {
    if (op1.name < op2.name) {
      return -1;
    } else if (op1.name > op2.name) {
      return 1;
    } else {
      return 0;
    }
  }

  let ops = [].slice.call(arguments, 1).sort(compOps);

  let newCollection;

  for (let i = 0; i < ops.length; i++) {
    if (!newCollection) {
      newCollection = ops[i](collection);
    } else {
      newCollection = ops[i](newCollection);
    }
  }

  return newCollection;
}

/**
 * @params {String[]}
 */
function select() {
  var fields = [].slice.call(arguments, 0);

  return function sel(collection) {
    var newCollection = [];

    for (let i = 0; i < collection.length; i++) {
      let keys = Object.keys(collection[i]);

      let newObject = {};

      for (let j = 0; j < keys.length; j++) {
        if (fields.includes(keys[j])) {
          newObject[keys[j]] = collection[i][keys[j]]
        }
      }

      if (Object.keys(newObject).length > 0) {
        newCollection.push(newObject);
      }
    }

    return newCollection;
  }
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
  return function filt(collection) {
    let newCollection = [];

    for (let i = 0; i < collection.length; i++) {
      if (values.includes(collection[i][property])) {
        newCollection.push(collection[i]);
      }
    }

    return newCollection;
  }
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
