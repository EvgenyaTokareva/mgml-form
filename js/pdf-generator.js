// Установка шрифтов для PDFMake
pdfMake.fonts = {
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
    }
};

// Проверка мобильного устройства
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Форматирование суммы с пробелами
function formatCurrency(amount) {
    const parts = amount.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.') + ' рублей';
}

// Функция генерации PDF
function generateOriginalPDF(fullName, position, conditions, attachments) {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}.${month}.${year}г.`;
    const shortDate = `«__» _____________ 20__г.`;
    
    const commissionMembers = [
        { name: '_____________ /', date: shortDate },
        { name: '_____________ /', date: shortDate },
        { name: '_____________ /', date: shortDate }
    ];
    
    const totalAmount = conditions.reduce((sum, condition) => {
        let cleanAmount = condition.amount.replace(/\s/g, '').replace(/,/g, '.').replace(/\.(?=.*\.)/g, '');
        if (cleanAmount.includes('.')) {
            const parts = cleanAmount.split('.');
            if (parts[1].length > 2) {
                cleanAmount = parts[0] + '.' + parts[1].substring(0, 2);
            }
        }
        return sum + (parseFloat(cleanAmount) || 0);
    }, 0);
    
const tableBody = [
    [
        { 
            text: 'Ф.И.О. сотрудника', 
            style: 'tableHeader',
            pageBreak: 'avoid' // Добавлено для предотвращения переноса
        },
        { 
            text: fullName, 
            style: 'tableCell', 
            fontSize: 10,
            pageBreak: 'avoid' // Добавлено для предотвращения переноса
        }
    ],
    [
        { 
            text: 'Должность работника', 
            style: 'tableHeader',
            pageBreak: 'avoid' // Добавлено для предотвращения переноса
        },
        { 
            text: position, 
            style: 'tableCell', 
            fontSize: 10,
            pageBreak: 'avoid' // Добавлено для предотвращения переноса
        }
    ]
];

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
                            text: `${condition.point}, \n ${condition.note} — ${condition.amount} рублей`,
                            margin: [0, 0, 0, 2],
                            fontSize: 10
                        },
                    ]
                }
            ]);
        });
    }

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

    tableBody.push(
        [
            { text: 'Дата предъявления информации. Подпись', style: 'tableHeader', fontSize: 10 },
            { text: formattedDate, style: 'tableCell', fontSize: 10 }
        ],
        [
            { text: 'Рекомендовать к оплате:', style: 'tableHeader', fontSize: 10 },
            { text: formatCurrency(totalAmount), style: 'tableCell', fontSize: 10 }
        ]
    );

    commissionMembers.forEach((member, index) => {
        tableBody.push([
            { 
                text: index === 0 ? 'Члены комиссии\n(подпись/расшифровка/дата)' : '', 
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

    const content = [
        { 
            text: 'ИНФОРМАЦИОННЫЙ ЛИСТ', 
            style: 'header',
            alignment: 'center',
            margin: [0, 0, 0, 10]
        },
        { 
            text: 'для установления выплат стимулирующего характера по показателям и критериям эффективности деятельности',
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
                hLineWidth: (i, node) => (i === 0 || i === node.table.body.length) ? 1 : 1,
                vLineWidth: () => 1,
                hLineColor: () => 'black',
                vLineColor: () => 'black',
                paddingTop: () => 5,
                paddingBottom: () => 5
            }
        },
        { 
            text: [
                { text: 'Согласен/ не согласен с решением комиссии ' },
                { text: '_________________/_________________' }
            ],
            margin: [0, 20, 0, 0],
            fontSize: 10
        },
        {
            stack: [
                { text: '(дата, подпись сотрудника)', fontSize: 10, margin: [0, 5, 0, 0] },
                { text: shortDate, fontSize: 10, margin: [215, -7, 0, 0] }
            ],
            margin: [0, 0, 0, 0]
        }
    ];
    
    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 40, 40, 40],
        content: content,
        styles: {
            header: { fontSize: 16, margin: [0, 0, 0, 5] },
            subheader: { fontSize: 10, margin: [0, 0, 0, 15] },
            tableHeader: { bold: true, fontSize: 10, margin: [0, 5, 0, 5] },
            tableCell: { fontSize: 10, margin: [0, 5, 0, 5] }
        },
        defaultStyle: {
            font: 'Roboto',
            fontSize: 10
        }
    };
    
 try {
        const pdfDoc = pdfMake.createPdf(docDefinition);
        if (isMobileDevice()) {
            // Для мобильных - показываем уведомление перед скачиванием
            if (confirm('Подготовка PDF завершена. Нажмите OK для скачивания.')) {
                pdfDoc.download('Информационный_лист.pdf');
            }
        } else {
            pdfDoc.open();
        }
    } catch (error) {
        console.error('Ошибка генерации PDF:', error);
        alert('Произошла ошибка при создании PDF. Пожалуйста, попробуйте еще раз.');
    }
}

// Обработчик для генерации PDF с защитой от двойного нажатия
let isGenerating = false;
document.getElementById('generate-pdf').addEventListener('click', function() {
    if (isGenerating) return;
    isGenerating = true;
    
    if (!checkPDFMakeLoaded()) {
        isGenerating = false;
        return;
    }
    
    // Проверка всех полей
    const textValid = validateAllTextFields();
    const positionValid = !!document.getElementById('position').value;
    const conditionsValid = validateConditions();
    
    if (!textValid || !positionValid || !conditionsValid) {
        if (!positionValid) {
            document.getElementById('position-error').style.display = 'block';
            document.getElementById('position').classList.add('error');
        }
        isGenerating = false;
        return;
    }
    
    // Сбор данных
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const middleName = document.getElementById('middleName').value;
    const position = document.getElementById('position').value === 'other' 
        ? document.getElementById('otherPosition').value 
        : document.getElementById('position').value;
    
    const fullName = `${lastName} ${firstName} ${middleName}`.trim();
    
    const conditions = [];
    document.querySelectorAll('.condition-item').forEach(item => {
        conditions.push({
            point: item.querySelector('.condition-point').value,
            amount: item.querySelector('.condition-amount').value,
            note: item.querySelector('.condition-note').value
        });
    });
    
    const attachments = [];
    document.querySelectorAll('.attachment-name').forEach(item => {
        if (item.value) attachments.push(item.value);
    });
    
    // Добавляем задержку для мобильных устройств
    if (isMobileDevice()) {
        setTimeout(() => {
            generateOriginalPDF(fullName, position, conditions, attachments);
            isGenerating = false;
        }, 300);
    } else {
        generateOriginalPDF(fullName, position, conditions, attachments);
        isGenerating = false;
    }
});
