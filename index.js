/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    
    var collectionResult;
    
    if(arguments.length === 1) {
        collectionResult = collection;
        return collectionResult;
    }
    
    var arrOper = [].slice.call(arguments, 1);
    
    function changeCollection(a) {
        if (!collectionResult) {
      collectionResult = arrOper[a](collection);
        } else {
      collectionResult = arrOper[a](collectionResult);
        }
    }
    
    
      for(var i = 0; i < arrOper.length; i++) {
         if(arrOper[i].name == 'filterIn') {
             changeCollection(i);
         } else continue;
      }
    
      for(var j = 0; j < arrOper.length; j++) {
         if(arrOper[j].name == 'select') {
             changeCollection(j);
         } else continue;
      }
    
    
    return collectionResult;
}

/**
 * @params {String[]}
 */
function select() {
    var arrArg = [].slice.call(arguments);
     
   return function select(collection) {
       for(var i = 0; i < collection.length; i++) {
           var obj = collection[i];
           for(key in obj) {
               if(arrArg.indexOf(key) === -1) {
                  delete obj[key];
               }
           }
       }
       return collection;
   }

}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    
    return function filterIn(collection) {
       for(var i = 0; i < collection.length; i++) {
           var obj = collection[i];
           for(key in obj) {
               if(key === property && values.indexOf(obj[key]) === -1) {
                  collection.splice(i, 1);
               }
           }
       }
       return collection;
   }

}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
