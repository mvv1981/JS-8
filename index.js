/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {

    var array = [].slice.call(arguments).slice(1);

    array.sort(function(a, b) {
        if (a.order > b.order){
            return 1;
        }
        if (a.order < b.order){
            return -1;
        }
        return 0;
    });

    var result = collection.map(function (elem) {
        return JSON.parse(JSON.stringify(elem));
    });

    for (var i = 0; array.length > i; i++){
        result = array[i].action(result);
    }
    
    return result;
}

/**
 * @params {String[]}
 */
function select() {
    var Sel = {
        order: 2,
        arg: [].slice.call(arguments),
        action: function(collection) {

            for (var i = 0; collection.length > i; i++){
                var element = collection[i];
                var keys = Object.keys(element);
                for (var j = 0; keys.length > j; j++){
                    if (!this.arg.includes(keys[j])) {
                        delete element[keys[j]];
                    }
                }
            }
            return collection;
        }
    };

    return Sel;
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    var Res = {
        order: 1,
        arg: [].slice.call(arguments),
        action: function(collection) {
            var property = this.arg[0];
            var values = this.arg[1];
            var result = collection.filter(function(element) {
                if(element.hasOwnProperty(property)){
                    if (values.includes(element[property])) {
                        return true;                        
                    }
                }
                return false;
            });
            return result;
        }
    }
    return Res;
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
