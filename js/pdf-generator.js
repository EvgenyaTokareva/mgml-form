// Установка шрифтов для PDFMake
pdfMake.fonts = {
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
    }
};

// Функция генерации PDF в оригинальном формате
function generateOriginalPDF(fullName, position, conditions, attachments) {
    // Форматирование даты
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('ru', { month: 'long' });
    const year = currentDate.getFullYear();
    const formattedDate = `«${day}» ${month} ${year}г.`;
    const shortDate = `«__» _____________ ${year}г.`;
    
    // Члены комиссии
    const commissionMembers = [
        { name: '_____________ /', date: shortDate },
        { name: '_____________ /', date: shortDate },
        { name: '_____________ /', date: shortDate }
    ];
    
    // Расчет суммы выплат
    const totalAmount = conditions.reduce((sum, condition) => {
        const amount = parseFloat(condition.amount.replace(',', '.')) || 0;
        return sum + amount;
    }, 0);
    
    // Создаем тело таблицы
    const tableBody = [
        // Основная информация
        [
            { text: 'Ф.И.О. сотрудника', style: 'tableHeader' },
            { text: fullName, style: 'tableCell', fontSize: 10 }
        ],
        [
            { text: 'Должность работника', style: 'tableHeader' },
            { text: position, style: 'tableCell', fontSize: 10 }
        ]
    ];

    // Добавляем условия с правильным переносом заголовка
    if (conditions.length > 0) {
        conditions.forEach((condition, index) => {
            tableBody.push([
                { 
                    text: index === 0 ? 'Приложение №3' : '', 
                    style: 'tableHeader',
                    rowSpan: index === 0 ? conditions.length : undefined,
                    fontSize: 10
                },
                { 
                    stack: [
                        { 
                            text: `${condition.point}, ${condition.note} - ${condition.amount} рублей`,
                            margin: [0, 0, 0, 2],
                            fontSize: 10
                        },
                    ]
                }
            ]);
        });
    }

    // Добавляем приложения с правильным переносом заголовка
    if (attachments.length > 0) {
        attachments.forEach((attachment, index) => {
            tableBody.push([
                { 
                    text: index === 0 ? 'Перечень приложений к представлению' : '', 
                    style: 'tableHeader',
                    rowSpan: index === 0 ? attachments.length : undefined,
                    fontSize: 10
                },
                { 
                    text: attachment,
                    margin: [0, 2, 0, 5],
                    fontSize: 10
                }
            ]);
        });
    }

    // Добавляем остальные строки
    tableBody.push(
        [
            { text: 'Дата предъявления материалов', style: 'tableHeader', fontSize: 10 },
            { text: formattedDate, style: 'tableCell', fontSize: 10 }
        ],
        [
            { text: 'Рекомендовать к оплате', style: 'tableHeader', fontSize: 10 },
            { text: totalAmount.toFixed(2) + ' рублей', style: 'tableCell', fontSize: 10 }
        ]
    );

    // Добавляем членов комиссии
    commissionMembers.forEach((member, index) => {
        tableBody.push([
            { 
                text: index === 0 ? 'Члены комиссии' : '', 
                style: 'tableHeader',
                rowSpan: index === 0 ? commissionMembers.length : undefined,
                fontSize: 10
            },
            { 
                text: `${member.name}${' '.repeat(25)}${member.date}`,
                style: 'tableCell',
                fontSize: 10
            }
        ]);
    });

    // Создание контента PDF
    const content = [
        { 
            text: 'ИНФОРМАЦИОННЫЙ ЛИСТ', 
            style: 'header',
            alignment: 'center',
            margin: [0, 0, 0, 10]
        },
        { 
            text: 'Для установления выплат стимулирующего характера по показателям и критериям эффективности деятельности',
            style: 'subheader',
            alignment: 'center',
            margin: [0, 0, 0, 20]
        },
        {
            table: {
                widths: ['30%', '70%'],
                body: tableBody,
                headerRows: 1,
                dontBreakRows: false,
                keepWithHeaderRows: 0
            },
            layout: {
                hLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                },
                vLineWidth: function(i, node) {
                    return 1;
                },
                hLineColor: function(i, node) {
                    return 'black';
                },
                vLineColor: function(i, node) {
                    return 'black';
                },
                paddingTop: function(i, node) {
                    return 5;
                },
                paddingBottom: function(i, node) {
                    return 5;
                }
            }
        },
        { 
            text: [
                'Согласен / не согласен с решением комиссии ',
                { text: '____________', decoration: 'underline' },
                ' / ',
                { text: '____________', decoration: 'underline' }
            ],
            margin: [0, 20, 0, 0],
            fontSize: 10
        },
        { 
            text: shortDate,
            alignment: 'right',
            margin: [0, 20, 0, 0],
            fontSize: 10
        }
    ];
    
    // Определение документа PDF
    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 40, 40, 40],
        content: content,
        styles: {
            header: {
                fontSize: 16,
                margin: [0, 0, 0, 5]
            },
            subheader: {
                fontSize: 10,
                margin: [0, 0, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 10,
                margin: [0, 5, 0, 5]
            },
            tableCell: {
                fontSize: 10,
                margin: [0, 5, 0, 5]
            }
        },
        defaultStyle: {
            font: 'Roboto',
            fontSize: 10
        }
    };
    
    try {
        pdfMake.createPdf(docDefinition).open();
    } catch (error) {
        console.error('Ошибка генерации PDF:', error);
        alert('Произошла ошибка при создании PDF. Пожалуйста, попробуйте еще раз.');
    }
}

// Обработчик для генерации PDF
document.getElementById('generate-pdf').addEventListener('click', function() {
    if (!checkPDFMakeLoaded()) return;
    
    // Проверка текстовых полей
    if (!validateAllTextFields()) {
        alert('Пожалуйста, исправьте ошибки в текстовых полях. Они должны содержать только буквы.');
        return;
    }
    
    // Проверка основных полей
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const positionSelect = document.getElementById('position');
    const position = positionSelect.value === 'other' 
        ? document.getElementById('otherPosition').value 
        : positionSelect.value;
    
    if (!lastName || !firstName || !position) {
        alert('Пожалуйста, заполните все обязательные поля (Фамилия, Имя, Должность).');
        if (!lastName) document.getElementById('lastName').classList.add('error');
        if (!firstName) document.getElementById('firstName').classList.add('error');
        if (!position) {
            positionSelect.classList.add('error');
            document.getElementById('position-error').style.display = 'block';
        }
        return;
    } else {
        document.getElementById('lastName').classList.remove('error');
        document.getElementById('firstName').classList.remove('error');
        positionSelect.classList.remove('error');
        document.getElementById('position-error').style.display = 'none';
    }
    
    // Проверка условий
    if (!validateConditions() || !validateAllAmounts()) {
        return;
    }
    
    // Сбор данных
    const middleName = document.getElementById('middleName').value;
    const fullName = `${lastName} ${firstName} ${middleName}`.trim();
    
    // Сбор условий выплат
    const conditions = [];
    const conditionItems = document.querySelectorAll('.condition-item');
    conditionItems.forEach(item => {
        const point = item.querySelector('.condition-point').value;
        const amount = item.querySelector('.condition-amount').value;
        const note = item.querySelector('.condition-note').value;
        
        conditions.push({
            point: point,
            amount: amount,
            note: note
        });
    });
    
    // Сбор приложений
    const attachments = [];
    const attachmentItems = document.querySelectorAll('.attachment-name');
    attachmentItems.forEach(item => {
        if (item.value) attachments.push(item.value);
    });
    
    // Генерация PDF
    generateOriginalPDF(fullName, position, conditions, attachments);
});