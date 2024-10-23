// 初始化 Supabase 客户端
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const SUPABASE_URL = 'https://trkbnxkkegwrhnboidwi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRya2JueGtrZWd3cmhuYm9pZHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MDE4MzQsImV4cCI6MjA0NDk3NzgzNH0.wlFGKI03di0llAcuqUtTC5YUDt_pt05o_VySxECj2F0';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const cards = document.querySelectorAll('.lo-card');

cards.forEach(function (card) {
    card.addEventListener('click', async function () {
        // 检查卡片是否已经被点击过
        if (card.classList.contains('disabled')) return;  // 如果卡片被禁用，直接返回

        // 禁用所有卡片点击
        cards.forEach(function (c) {
            c.classList.add('disabled');  // 添加禁用标记
        });
        // 获取点击的卡片索引
        const clickedIndex = Array.from(cards).indexOf(card);

        // 固定其他卡片的位置
        cards.forEach((c, index) => {
            if (index !== clickedIndex) {
                const rect = c.getBoundingClientRect();
                c.classList.add('cardhidden'); // 添加隐藏
            }
        });

        // 将被点击的卡片移动到屏幕中心
        const randomValue = (Math.random() * 2).toFixed(2); // 生成随机数
        card.textContent = randomValue;

        // 上传到 Supabase 的 item 表中的 money 列
        await uploadToSupabase(randomValue);
        card.classList.remove('lo-card')
        card.classList.add('selected-card')
        card.classList.add('cardactive'); // 使其成为活动卡片
    });
});

function resetButton() {
    document.getElementsByClassName('lottery')[0].style.display = 'none';
}

async function uploadToSupabase(value) {
    const { data, error } = await supabase
        .from('items') // 指定 'item' 表
        .insert([
            { money: value } // 插入 'money' 列数据
        ]);

    if (error) {
        console.error('Error uploading to Supabase:', error);
    } else {
        console.log('Data uploaded successfully:', data);
    }
}

async function getLatestValidCode() {
    try {
        const { data, error } = await supabase
            .from('items') // 确保表名正确
            .select('code, id') // 选择 'code' 和 'id'
            .order('created_at', { ascending: true }) // 根据创建时间排序
            .limit(100); // 获取最新的100条记录

        if (error) {
            console.error('Error fetching data from Supabase:', error);
            return null;
        }

        // 过滤掉null值，返回第一个非null的code
        const validCodeEntry = data.find(items => items.code !== null);

        return validCodeEntry; // 返回包含code和id的对象
    } catch (err) {
        console.error('Error:', err);
        return null;
    }
}

// 验证用户输入的验证码
async function verifyCode() {
    const userInput = document.getElementById('codeInput').value; // 用户输入的验证码
    const validCodeEntry = await getLatestValidCode(); // 使用 await 等待获取验证码

    if (validCodeEntry) {
        const code = validCodeEntry.code; // 获取有效的验证码
        const id = validCodeEntry.id; // 获取 ID 以便删除
        console.log(code)
        if (userInput === code) {
            // 删除对应的行
            const { data, error } = await supabase
                .from('items')
                .delete()
                .match({ id: id }); // 根据ID删除该行
            // 验证码匹配，显示弹出界面
            alert('验证成功！');
            document.getElementsByClassName('lottery')[0].style.display = 'flex';
            document.getElementsByClassName('varify-container')[0].style.display = 'none'

        } else {
            document.getElementsByClassName('errortext')[0].textContent = '验证码错误，请重试!'
            console.log(1)
        }
    }
}
window.verifyCode = verifyCode;
window.resetButton = resetButton;


function closevarify() {
    document.getElementsByClassName('varify-container')[0].style.display = 'none';
}
window.closevarify = closevarify;