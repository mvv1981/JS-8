/**
 * Барабаш Максим Сергеевич
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    var handlerCollection = Array.prototype.slice.call(arguments, 1);
    handlerCollection.sort(function sortfunction(a, b) {
        if (a.order < b.order) {
            return -1
        }
        if (a.order > b.order) {
            return 1
        }
        else {
            return 0
        }
    });
    var result = collection;
    for (var i = 0; i < handlerCollection.length; i++) {
        result = handlerCollection[i].processParam(result);
    }
    return result
}

/**
 * @params {String[]}
 */
function select() {
    var selectParam = Array.prototype.slice.call(arguments);
    var selectObj = {
        order: 2,
        processParam: function (collection) {
            for (var i = 0; i < collection.length; i++) {
                var objParam = Object.keys(collection[i]);
                for (var k = 0; k < objParam.length; k++) {
                    if (selectParam.includes(objParam[k])) {
                        continue
                    }
                    else {
                        delete collection[i][objParam[k]]
                    }
                }
            }            
            return collection
        }
    }
    return selectObj
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    var filterObj = {
        order: 1,
        processParam: function (collection) {
            var result = collection.filter(function (personal) {
                if (personal.hasOwnProperty(property)) {
                    if (values.includes(personal[property])) {
                        return true;
                    }
                }
                return false;
            });
            return result
        }
    }
    return filterObj;
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
