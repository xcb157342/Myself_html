
// 引入supabase的连接配置 (确保替换为你的Supabase URL和Key)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://trkbnxkkegwrhnboidwi.supabase.co'; // 替换为你的Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRya2JueGtrZWd3cmhuYm9pZHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MDE4MzQsImV4cCI6MjA0NDk3NzgzNH0.wlFGKI03di0llAcuqUtTC5YUDt_pt05o_VySxECj2F0'; // 替换为你的Supabase 匿名密钥
const supabase = createClient(supabaseUrl, supabaseKey);

// 生成四位随机数的函数
function generateRandomCode() {
    return Math.floor(1000 + Math.random() * 9000); // 生成一个四位随机数
}

const monthYearElement = document.getElementById('month-year');
const daysElement = document.getElementById('days');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');


// 检查当天是否已经打卡
async function hasPunchedIn(date) {
    const { data, error } = await supabase
        .from('items')
        .select('signin')
        .eq('signin', date); // 查找Supabase表中的打卡日期是否为今天

    if (error) {
        console.error('查询打卡状态出错:', error);
        return false;
    }
    return data.length > 0; // 如果今天已经打卡，返回true
}
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

// 处理打卡并保存打卡信息（日期和随机验证码）
async function punchIn(date) {
    const code = generateRandomCode();

    const { data, error } = await supabase
        .from('items')
        .insert([{ signin: date, code: code }]); // 将打卡日期和验证码插入数据库

    if (error) {
        console.error('打卡失败:', error);
        return false;
    }

    return true;
}
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
        const dateString = `${year}-${month + 1}-${day}`; // 日期格式为 "YYYY-MM-DD"
        // 检查这一天是否已经打卡
        hasPunchedIn(dateString).then((punchedIn) => {
            if (punchedIn) {
                dayDiv.classList.add('punch-in'); // 已打卡的日期标记为红色
            }
        });

        // 添加点击打卡事件
        dayDiv.addEventListener('click', async () => {
            if (await hasPunchedIn(dateString)) {
                alert('今天已经打卡');
            } else {
                const success = await punchIn(dateString);
                if (success) {
                    dayDiv.classList.add('punch-in'); // 添加红色圈标记
                    alert(`打卡成功！生成的验证码为: ${generateRandomCode()}`);
                } else {
                    alert('打卡失败，请稍后再试。');
                }
            }
        });
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


// 加载页面时查询已打卡日期并标记
async function loadPunchedInDates() {
    const { data, error } = await supabase.from('items').select('signin');
    if (error) {
        console.error('加载已打卡日期时出错:', error);
    }

    // 标记已打卡的日期
    data.forEach((item) => {
        const punchInDate = new Date(item.signin);
        const dayDivs = Array.from(daysElement.children);
        const targetDayDiv = dayDivs.find(div => parseInt(div.textContent) === punchInDate.getDate());
        if (targetDayDiv) {
            targetDayDiv.classList.add('punch-in'); // 打卡的日期显示红色
        }
    });
}

// 初始化日历
renderCalendar();
