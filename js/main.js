document.addEventListener('DOMContentLoaded', function() {
    // Обработчик для выбора должности
    document.getElementById('position').addEventListener('change', function() {
        const otherPositionField = document.getElementById('otherPosition');
        if (this.value === 'other') {
            otherPositionField.style.display = 'block';
        } else {
            otherPositionField.style.display = 'none';
            otherPositionField.value = '';
        }
        this.classList.remove('error');
        document.getElementById('position-error').style.display = 'none';
    });

    // Добавление нового условия выплаты
    document.getElementById('add-condition-btn').addEventListener('click', addNewCondition);

    // Добавление нового приложения
    document.getElementById('add-attachment-btn').addEventListener('click', addNewAttachment);

    // Инициализация первого условия
    initializeFirstCondition();
});

function addNewCondition() {
    const container = document.getElementById('conditions-container');
    const newRow = document.createElement('div');
    newRow.className = 'condition-item';
    newRow.innerHTML = `
        <select class="condition-point" required>
            <option value="">-- Выберите пункт условия --</option>
            <option value="1. Организатор (координатор) мероприятий.">1. Организатор (координатор) мероприятий.</option>
            <option value="2. Результативное участие обучающихся в очных конференциях НОУ, интеллектуальных, творческих играх, конкурсов, проектах. Наличие победителя/призера.">2. Результ. участие обучающихся в очных конф. НОУ, интеллект., творч. играх, конкурсах, проектах. Наличие победителя/призера.</option>
            <option value="3. Результативное участие обучающихся в заочных конференциях НОУ, интеллектуальных, творческих играх, конкурсов. Наличие победителя/призера.">3. Результ. участие обучающихся в заочных конф. НОУ, интеллект., творч. играх, конкурсах. Наличие победителя/призера.</option>
            <option value="4. Качественное участие обучающихся в защите индивидуальных проектов на уровне ОО.">4. Качеств. участие обучающихся в защите индивид. проектов на уровне ОО.</option>
            <option value="5. Результативное участие обучающихся в спортивных соревнованиях. Наличие команды победителей/призеров.">5. Результ. участие обучающихся в спорт. соревнованиях. Наличие команды победителей/призеров.</option>
            <option value="6. Результативное участие обучающихся в ВФСК ГТО (5-6 –я ступень на муниципальном уровне).">6. Результ. участие обучающихся в ВФСК ГТО (5-6 –я ступень на муницип. уровне).</option>
            <option value="7. Результативное участие обучающихся в очных предметных олимпиадах. Наличие победителя/призера.">7. Результ. участие обучающихся в очных предм. олимпиадах. Наличие победителя/призера.</option>
            <option value="8. Результативное участие обучающихся в олимпиадах. Наличие победителя/призера.">8. Результ. участие обучающихся в олимпиадах. Наличие победителя/призера.</option>
            <option value="9. Результативное участие обучающихся межвузовских олимпиадах. Наличие победителя/призера.">9. Результ. участие обучающихся межвуз. олимпиадах. Наличие победителя/призера.</option>
            <option value="10. Результативное участие обучающихся в утвержденном в календаре городских образовательных событий, календаре региональных образовательных событий, календаре федеральных образовательных событий для обучающихся на текущий год.">10. Результ. участие обучающихся в календаре город., регион., федер. образоват. событий.</option>
            <option value="11. Качественная успеваемость по итогам четверти при доле отметок «4» и «5».">11. Качеств. успеваемость по итогам четверти при доле отметок «4» и «5».</option>
            <option value="12. Степень подтверждения годовых оценок результатами ГИА.">12. Степень подтверждения годовых оценок рез-тами ГИА.</option>
            <option value="13. Отсутствие неудовлетворительных результатов по итогам ГИА (ОГЭ, ЕГЭ).">13. Отсутствие неудовл. рез-тов по итогам ГИА (ОГЭ, ЕГЭ).</option>
            <option value="14. Результативность общего образования по итогам ЕГЭ (11 класс).">14. Результ. общего образования по итогам ЕГЭ (11 класс).</option>
            <option value="15. Результативность общего образования по итогам ОГЕ (9 класс).">15. Результ. общего образования по итогам ОГЕ (9 класс).</option>
            <option value="16. Качество успеваемости по промежуточной аттестации по предметам (русский язык, математика, химия, физика, информатика) выше 60%.">16. Качество успеваемости по промежут. аттестации по предметам выше 60%.</option>
            <option value="17. Для классных руководителей.">17. Для классных руководителей.</option>
            <option value="18. Организация сетевых форм обучения с учреждениями дополнительного образования.">18. Орг-ция сетевых форм обучения с учр-ями доп. образования.</option>
            <option value="19. Публикация опыта работы учителя-предметника в печатных СМИ педагогической направленности.">19. Публикация опыта работы в печатных СМИ педагог. направленности.</option>
            <option value="20. Публикация опыта работы учителя-предметника в интернет пространстве: профессиональных сетевых сообществах.">20. Публикация опыта работы в интернете: проф. сетевых сообществах.</option>
            <option value="21. Представление опыта работы на различном уровне.">21. Представление опыта работы на разл. уровне.</option>
            <option value="22. Работа в экспертных группах на основании локального акта Учреждения, Управления образования, Министерства образования и науки ЧО.">22. Работа в экспертных группах на основании лок. актов.</option>
            <option value="23. Личное участие в профессиональных конкурсах, научно-практических конференциях.">23. Личное участие в проф. конкурсах, науч.-практ. конф.</option>
            <option value="24. Личная или в составе команды лицея победа в очных профессиональных конкурсах, научно-практических конференциях.">24. Победа в очных проф. конкурсах, науч.-практ. конф.</option>
            <option value="25. Результативное участие учителя в дистанционных конкурсах «Лучший дистанционный урок», «Инфотоп».">25. Результ. участие в дистанц. конкурсах «Лучший дистанц. урок», «Инфотоп».</option>
            <option value="26. Организация (участие) мониторинговых исследований на основании приказов соответствующего уровня.">26. Орг-ция (участие) мониторинговых исслед-й на основании приказов.</option>
            <option value="27. Сопровождение обучающихся на конкурсы, олимпиады, смотры, фестивали, соревнования в другие учреждения на основании локального акта.">27. Сопровождение обучающихся на конкурсы, олимпиады, смотры, фестивали, соревнования.</option>
            <option value="28. Наличие ведомственных наград.">28. Наличие ведомств. наград.</option>
            <option value="29. Наличие ученой степени, почетного звания.">29. Наличие ученой степени, почет. звания.</option>
            <option value="30. Наличие квалификационной категории.">30. Наличие квалиф. категории.</option>
            <option value="31. Выполнение плана работы с малоопытными педагогами.">31. Выполнение плана работы с малоопытными педагогами.</option>
            <option value="32. Заполнение базы данных и обработка документов ГИА.">32. Заполнение БД и обработка документов ГИА.</option>
            <option value="33. Наличие стажа.">33. Наличие стажа.</option>
            <option value="34. По итогам работы к праздничным датам (День Защитника Отечества, Международный женский день, День учителя).">34. По итогам работы к праздничным датам.</option>
            <option value="35. По итогам работы к юбилейным датам (45,50,55,60,65,70- летие со дня рождения).">35. По итогам работы к юбилейным датам.</option>
            <option value="36. Премия за фактически отработанное время.">36. Премия за факт. отработанное время.</option>
            <option value="37. Наличие стажа работы до 3 лет.">37. Наличие стажа работы до 3 лет.</option>
            <option value="38. Руководство творческой группой на различных уровнях (лицейском, городском).">38. Руководство творч. группой на разл. уровнях.</option>
            <option value="39. Публикация опыта работы учителя в журналах(статья).">39. Публикация опыта работы в журналах (статья).</option>
            <option value="40. Результативное участие обучающихся в очных конференциях НОУ, интеллектуальных, творческих играх, конкурсов, проектах (по направлению РИП). Наличие победителя/призера.">40. Результ. участие обучающихся в очных конф. НОУ (по направлению РИП).</option>
            <option value="41. Результативное участие обучающихся в заочных конференциях НОУ, интеллектуальных, творческих играх, конкурсов (по направлению РИП). Наличие победителя/призера.">41. Результ. участие обучающихся в заочных конф. НОУ (по направлению РИП).</option>
            <option value="42. Результативное участие обучающихся в очных предметных олимпиадах (по направлению РИП). Наличие победителя/призера.">42. Результ. участие обучающихся в очных предм. олимпиадах (по направлению РИП).</option>
            <option value="43. Для классных руководителей. Участие класса в акциях экологической направленности (90-100% охвата классного коллектива).">43. Для кл. рук. Участие класса в акциях эколог. направленности (90-100%).</option>
            <option value="44. Руководитель творческой группы – редактор печатного журнала «Юный ученый».">44. Рук. творч. группы – ред. печатного журнала «Юный ученый».</option>
            <option value="45. Руководитель творческой группы – редактор электронного журнала «Жизнь в стиле ЭКО».">45. Рук. творч. группы – ред. электрон. журнала «Жизнь в стиле ЭКО».</option>
            <option value="46. Руководитель проектной группы по реализации мероприятий РИП.">46. Рук. проектной группы по реализации мероприятий РИП.</option>
            <option value="47. Представление опыта работы по реализации мероприятий РИП.">47. Представление опыта работы по реализации мероприятий РИП.</option>
            <option value="48. Личная или в составе команды лицея победа в очных профессиональных конкурсах, научно-практических конференциях.">48. Победа в очных проф. конкурсах, науч.-практ. конф.</option>
            <option value="49. Организация сетевых форм взаимодействия с организациями-партнерами в рамках реализации мероприятий РИП.">49. Орг-ция сетевых форм взаимодействия с орг-ями-партнерами (РИП).</option>
        </select>
        <textarea placeholder="Примечание" class="condition-note" required></textarea>
        <input type="text" placeholder="Размер выплаты" class="condition-amount" required>
        <button type="button" class="btn btn-danger remove-condition">×</button>
    `;
    container.appendChild(newRow);

    // Добавляем обработчики для новых полей
    const pointSelect = newRow.querySelector('.condition-point');
    const noteTextarea = newRow.querySelector('.condition-note');
    const amountInput = newRow.querySelector('.condition-amount');
    
    // Валидация при изменении
    pointSelect.addEventListener('input', function() {
        validateConditions();
    });
    
    noteTextarea.addEventListener('input', function() {
        validateConditions();
    });
    
    amountInput.addEventListener('input', function() {
        formatNumberInput(this);
        validateConditions();
    });
    
    newRow.querySelector('.remove-condition').addEventListener('click', function() {
        if (container.children.length > 1) {
            container.removeChild(newRow);
            validateConditions();
        } else {
            alert('Должно быть хотя бы одно условие');
        }
    });
    
    // Фокусируемся на первом поле нового условия
    setTimeout(() => {
        pointSelect.focus();
    }, 100);
}

function addNewAttachment() {
    const container = document.getElementById('attachments-container');
    const newRow = document.createElement('div');
    newRow.className = 'attachment-item';
    newRow.innerHTML = `
        <textarea placeholder="Название приложения" class="attachment-name"></textarea>
        <button type="button" class="btn btn-danger remove-attachment">×</button>
    `;
    container.appendChild(newRow);
    
    newRow.querySelector('.remove-attachment').addEventListener('click', function() {
        if (container.children.length > 1) {
            container.removeChild(newRow);
        }
    });
}

function initializeFirstCondition() {
    const firstAmountInput = document.querySelector('.condition-amount');
    if (firstAmountInput) {
        firstAmountInput.addEventListener('blur', function() {
            formatNumberInput(this);
            validateNumberInput(this);
        });
    }

    const firstRemoveBtn = document.querySelector('.remove-condition');
    if (firstRemoveBtn) {
        firstRemoveBtn.addEventListener('click', function() {
            const container = document.getElementById('conditions-container');
            if (container.children.length > 1) {
                container.removeChild(this.parentNode);
            } else {
                alert('Должно быть хотя бы одно условие');
            }
        });
    }

    const firstAttachmentRemoveBtn = document.querySelector('.remove-attachment');
    if (firstAttachmentRemoveBtn) {
        firstAttachmentRemoveBtn.addEventListener('click', function() {
            const container = document.getElementById('attachments-container');
            if (container.children.length > 1) {
                container.removeChild(this.parentNode);
            }
        });
    }
}