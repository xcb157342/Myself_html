const monthYearElement = document.getElementById('month-year');
const daysElement = document.getElementById('days');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

//根据设备宽度设定font-size
function refontsize() {
    let fz = 0;
    if (screen.width > screen.height) {
        fz = screen.width
    }
    else {
        fz = screen.height
    }
    document.documentElement.style.fontSize = fz / 20 + 'px';
}

refontsize();
//改变屏幕尺寸时，触发reset
window.onresize = refontsize()

let currentDate = new Date();

function renderCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const today = new Date(); // 获取当前日期
    const todayDate = today.getDate(); // 今天的日期

    // 更新月份和年份
    monthYearElement.textContent = `${year}年 ${month + 1}月`;

    // 获取当前月份的第一天和最后一天
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 清空之前的日子
    daysElement.innerHTML = '';

    // 填充空白
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDiv = document.createElement('div');
        daysElement.appendChild(emptyDiv);
    }

    // 填充每一天
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        daysElement.appendChild(dayDiv);

        // 检查是否是今天
        if (
            day === todayDate &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            dayDiv.classList.add('today'); // 添加今天的类
        }
    }
}

// 切换到上一个月
prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

// 切换到下一个月
nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

const jumpToTodayButton = document.getElementById('jump-to-today');

jumpToTodayButton.addEventListener('click', () => {
    currentDate = new Date(); // 更新当前日期为今天
    renderCalendar(); // 重新渲染日历
});

// 初始化日历
renderCalendar();
