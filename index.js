'use strict';

// Код валидации формы
function validateForm(parameter) {
    let form = (document.querySelector('form#' + parameter.formId + '.form'));
    initForm(form, parameter).setFormProperties();
}
function initForm(form, parameter) {
    return {
        elementList: form,
        parameter: parameter,
        setFormProperties: function() {
            let inputList = new Array();
            let parameter = this.parameter;
            for (let i = 0; i < this.elementList.length; i++) {
                if(this.elementList[i].tagName !== 'BUTTON') {
                    inputList.push(this.elementList[i]);
                }
            };
            form.onsubmit = function(event) {
                let validateResult = new Array();
                event.preventDefault();
                if(inputList !== []) {
                    if(validate(form, parameter).validateIsRequired() === false) {
                        reverseValidateClass(this, parameter, false);
                        return
                    }
                    else {
                        for (let i = 0; i <= inputList.length; i++) {
                            if(i === inputList.length) {
                                reverseValidateClass(this, parameter, true);
                                return
                            }
                            else {
                                switch (inputList[i].dataset.validator) {
                                    case ('number'):
                                        if(validate(inputList[i], parameter).validateNumber() === false) {
                                            reverseValidateClass(this, parameter, false);
                                            return
                                        }
                                        else {
                                            break
                                        }
                                    case ('letters'):
                                        if(validate(inputList[i], parameter).validateLetter() === false) {
                                            reverseValidateClass(this, parameter, false);
                                            return
                                        }
                                        else {
                                            break
                                        }
                                    case ('regexp'):
                                        if(validate(inputList[i], parameter).validateRegExp() === false) {
                                            reverseValidateClass(this, parameter, false);
                                            return
                                        }
                                        else {
                                            break
                                        }
                                }
                            }
                        }
                    }
                }
                return
            };
            //Добавляем обработчики событий на инпутах
            for (let i = 0; i < inputList.length; i++) {
                inputList[i].onblur = function () {
                    switch (this.dataset.validator) {
                        case ('number'):
                            validate(inputList[i], parameter).validateNumber();
                            break;
                        case ('letters'):
                            validate(inputList[i], parameter).validateLetter();
                            break;
                        case ('regexp'):
                            validate(inputList[i], parameter).validateRegExp();
                            break;
                    }
                };
                inputList[i].onfocus = function() {
                    if(Array.prototype.indexOf.call(inputList[i].classList, parameter.inputErrorClass) !== -1) {
                        inputList[i].classList.remove(parameter.inputErrorClass);
                    }
                }
            }
            return this
        }
    }
}
function validate(element, parameter) {
    return {
        validateNumber: function() {
            let minValue = element.dataset.validatorMin;
            let maxValue = element.dataset.validatorMax;
            if(element.value === '') {
                return true
            }
            else {
                if(isNaN(element.value)) {
                    element.classList.add(parameter.inputErrorClass);
                    return false
                }
                else {
                    if ((minValue !== undefined)&&(element.value <= Number(minValue))) {
                        element.classList.add(parameter.inputErrorClass);
                        return false
                    }
                    if ((maxValue !== undefined)&&(element.value >= Number(maxValue))) {
                        element.classList.add(parameter.inputErrorClass);
                        return false
                    }
                    else {
                        return true
                    }
                }
            }
            return this
        },
        validateLetter: function() {
            let regexp = /^[А-Яа-яЁёA-Za-z]+$/i;
            if((regexp.test(element.value))||(element.value === '')) {
                return true
            }
            else {
                element.classList.add(parameter.inputErrorClass);
                return false
            }
        },
        validateRegExp: function() {
            let regexp = new RegExp(element.dataset.validatorPattern);
            if((regexp.test(element.value))||(element.value === '')) {
                return true
            }
            else {
                element.classList.add(parameter.inputErrorClass);
                return false
            }
        },
        validateIsRequired: function() {
            for(let i = 0; i < element.length; i++) {
                let isRequired = element[i].dataset.required !== undefined? true : false;
                if((isRequired)&&(element[i].value === '')) {
                    element[i].classList.add(parameter.inputErrorClass);
                    return false
                }
                else return true
            }
        }
    }
}
function reverseValidateClass(element, parameter, isValid) {
    if(isValid) {
        element.classList.remove(parameter.formInvalidClass);
        element.classList.add(parameter.formValidClass);
    }
    else {
        element.classList.remove(parameter.formValidClass);
        element.classList.add(parameter.formInvalidClass);
    }
}
