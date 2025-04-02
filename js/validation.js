// Проверка на текстовое значение (без цифр)
function validateTextInput(input, errorElementId) {
    const value = input.value;
    const errorElement = document.getElementById(errorElementId);
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;
    
    if (value && !regex.test(value)) {
        input.classList.add('error');
        errorElement.style.display = 'block';
        return false;
    } else {
        input.classList.remove('error');
        errorElement.style.display = 'none';
        return true;
    }
}

// Проверка всех текстовых полей
function validateAllTextFields() {
    const isValidLastName = validateTextInput(document.getElementById('lastName'), 'lastName-error');
    const isValidFirstName = validateTextInput(document.getElementById('firstName'), 'firstName-error');
    const isValidMiddleName = document.getElementById('middleName').value ? 
        validateTextInput(document.getElementById('middleName'), 'middleName-error') : true;
    
    return isValidLastName && isValidFirstName && isValidMiddleName;
}

// Валидация числового ввода
function validateNumberInput(input) {
    const value = input.value;
    const errorElement = document.getElementById('amount-error');
    
    if (value) {
        if (isNaN(value.replace(',', '.'))) {
            input.classList.add('error');
            errorElement.style.display = 'block';
            return false;
        } else {
            input.classList.remove('error');
            errorElement.style.display = 'none';
            return true;
        }
    } else {
        // Если поле пустое, убираем ошибку
        input.classList.remove('error');
        errorElement.style.display = 'none';
        return true;
    }
}

// Проверка всех условий
function validateConditions() {
    const conditionPoints = document.querySelectorAll('.condition-point');
    const conditionNotes = document.querySelectorAll('.condition-note');
    const conditionAmounts = document.querySelectorAll('.condition-amount');
    const errorElement = document.getElementById('condition-error');
    let isValid = true;
    
    // Проверка заполненности обязательных полей
    conditionPoints.forEach((point, index) => {
        if (!point.value || !conditionNotes[index].value || !conditionAmounts[index].value) {
            isValid = false;
            if (!point.value) point.classList.add('error');
            if (!conditionNotes[index].value) conditionNotes[index].classList.add('error');
            if (!conditionAmounts[index].value) conditionAmounts[index].classList.add('error');
        } else {
            point.classList.remove('error');
            conditionNotes[index].classList.remove('error');
            conditionAmounts[index].classList.remove('error');
        }
    });
    
    if (!isValid) {
        errorElement.style.display = 'block';
    } else {
        errorElement.style.display = 'none';
    }
    
    return isValid;
}

// Проверка всех числовых полей
function validateAllAmounts() {
    const amountInputs = document.querySelectorAll('.condition-amount');
    let isValid = true;
    
    amountInputs.forEach(input => {
        if (!validateNumberInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Проверка загрузки библиотек PDF
function checkPDFMakeLoaded() {
    if (typeof pdfMake === 'undefined' || typeof pdfMake.vfs === 'undefined') {
        alert('Библиотеки для генерации PDF не загрузились. Пожалуйста, обновите страницу.');
        return false;
    }
    return true;
}

// Добавляем обработчики для проверки текстовых полей в реальном времени
document.getElementById('lastName').addEventListener('input', function() {
    validateTextInput(this, 'lastName-error');
});
document.getElementById('firstName').addEventListener('input', function() {
    validateTextInput(this, 'firstName-error');
});
document.getElementById('middleName').addEventListener('input', function() {
    validateTextInput(this, 'middleName-error');
});

// Добавляем обработчики для проверки числовых полей в реальном времени
document.addEventListener('DOMContentLoaded', function() {
    const amountInputs = document.querySelectorAll('.condition-amount');
    amountInputs.forEach(input => {
        input.addEventListener('input', function() {
            validateNumberInput(this);
        });
    });
});