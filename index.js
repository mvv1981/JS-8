/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
	var newArr = [].slice.call(arguments, 1);
	newArr.sort(function (a, b) {
		if (a.order > b.order) {
			return 1;
		}
		if (a.order < b.order) {
			return -1;
		} 
			return 0 
	});

	var result = collection;

	for (var i = 0; i < newArr.length; i++) {
		result = newArr[i].procArg(result);
	}
	return result
}

/**
 * @params {String[]}
 */
function select() {
	var arrObj = [].slice.call(arguments);

	var selObj = {
		order: 2,
		procArg: function (collection) {
			for (var i = 0; i < collection.length; i++) {
				var objArg = collection[i];
					for (key in objArg) {
						if (arrObj.indexOf(key) === -1) {
							delete objArg[key]
						}
					}
				}
			return collection
		}
	}
	return selObj
}


/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
	var filterCol = {
		order: 1,
		procArg: function(collection) {
			var result = collection.filter(function(element) {
				if (element.hasOwnProperty(property)) {
					if (values.includes(element[property])) {
						return true
					}
				}
				return false
			})
			return result
		}
	}
	return filterCol;
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
