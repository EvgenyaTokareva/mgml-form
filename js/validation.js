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
    let isValid = true;
    
    if (!validateTextInput(document.getElementById('lastName'), 'lastName-error')) isValid = false;
    if (!validateTextInput(document.getElementById('firstName'), 'firstName-error')) isValid = false;
    if (document.getElementById('middleName').value && 
        !validateTextInput(document.getElementById('middleName'), 'middleName-error')) isValid = false;
    
    return isValid;
}

// Валидация числового ввода
function validateNumberInput(input) {
    const value = input.value;
    const errorElement = document.getElementById('amount-error');
    
    if (!value) {
        input.classList.add('error');
        return false;
    }
    
    const isValid = /^[0-9]{1,3}(\s?[0-9]{3})*([,.]?[0-9]{0,2})?$/.test(value);
    
    if (!isValid) {
        input.classList.add('error');
        errorElement.style.display = 'block';
        errorElement.textContent = 'Введите корректную сумму (например: 1 000 или 1 000.50)';
        return false;
    }
    
    input.classList.remove('error');
    errorElement.style.display = 'none';
    return true;
}

// Проверка всех условий
function validateConditions() {
    const conditionItems = document.querySelectorAll('.condition-item');
    if (conditionItems.length === 0) {
        document.getElementById('condition-error').style.display = 'block';
        document.getElementById('condition-error').textContent = 'Добавьте хотя бы одно условие';
        return false;
    }

    let hasEmptyFields = false;
    let hasInvalidAmounts = false;
    let allValid = true;
    
    // Сначала сбросим все ошибки
    document.getElementById('condition-error').style.display = 'none';
    document.getElementById('amount-error').style.display = 'none';
    
    conditionItems.forEach(item => {
        const point = item.querySelector('.condition-point');
        const note = item.querySelector('.condition-note');
        const amount = item.querySelector('.condition-amount');
        
        // Сбрасываем ошибки
        point.classList.remove('error');
        note.classList.remove('error');
        amount.classList.remove('error');
        
        // Проверяем заполненность
        if (!point.value || !note.value || !amount.value) {
            hasEmptyFields = true;
            allValid = false;
            if (!point.value) point.classList.add('error');
            if (!note.value) note.classList.add('error');
            if (!amount.value) amount.classList.add('error');
        }
        
        // Проверяем корректность суммы
        if (amount.value && !validateNumberInput(amount)) {
            hasInvalidAmounts = true;
            allValid = false;
        }
    });

    const errorElement = document.getElementById('condition-error');
    if (hasEmptyFields) {
        errorElement.style.display = 'block';
        errorElement.textContent = 'Заполните все поля условий';
        return false;
    }
    
    if (hasInvalidAmounts) {
        errorElement.style.display = 'block';
        errorElement.textContent = 'Проверьте корректность сумм выплат';
        return false;
    }
    
    return allValid;
}

// Проверка загрузки библиотек PDF
function checkPDFMakeLoaded() {
    if (typeof pdfMake === 'undefined' || typeof pdfMake.vfs === 'undefined') {
        alert('Библиотеки для генерации PDF не загрузились. Пожалуйста, обновите страницу.');
        return false;
    }
    return true;
}

// Форматирование числового ввода
function formatNumberInput(input) {
    const cursorPosition = input.selectionStart;
    let value = input.value.replace(/[^0-9\s,.]/g, '');
    value = value.replace(/,/g, '.');
    
    if ((value.match(/\./g) || []).length > 1) {
        const lastDotPos = value.lastIndexOf('.');
        value = value.substring(0, lastDotPos).replace(/\./g, '') + value.substring(lastDotPos);
    }
    
    if (!value.includes('.')) {
        value = value.replace(/\s/g, '');
        if (value.length > 3) {
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }
    }
    
    input.value = value;
    
    // Восстанавливаем позицию курсора с учетом добавленных пробелов
    const diff = input.value.length - value.length;
    if (cursorPosition > 0) {
        input.setSelectionRange(cursorPosition + diff, cursorPosition + diff);
    }
}

// Инициализация обработчиков событий с валидацией в реальном времени
document.addEventListener('DOMContentLoaded', function() {
    // Валидация при вводе
    document.getElementById('lastName').addEventListener('input', function() {
        validateTextInput(this, 'lastName-error');
    });
    document.getElementById('firstName').addEventListener('input', function() {
        validateTextInput(this, 'firstName-error');
    });
    document.getElementById('middleName').addEventListener('input', function() {
        validateTextInput(this, 'middleName-error');
    });

    // Валидация полей условий
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('condition-point') || 
            e.target.classList.contains('condition-note') ||
            e.target.classList.contains('condition-amount')) {
            validateConditions();
        }
    });
    
    // Форматирование суммы при вводе
    document.querySelectorAll('.condition-amount').forEach(input => {
        input.addEventListener('input', function() {
            formatNumberInput(this);
            validateNumberInput(this);
        });
    });
});