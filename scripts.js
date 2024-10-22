import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 初始化 Supabase 客户端
const SUPABASE_URL = 'https://trkbnxkkegwrhnboidwi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRya2JueGtrZWd3cmhuYm9pZHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MDE4MzQsImV4cCI6MjA0NDk3NzgzNH0.wlFGKI03di0llAcuqUtTC5YUDt_pt05o_VySxECj2F0';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

function updateTime() {
    const now = new Date(); // 获取当前时间
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }; // 时间格式选项
    const formattedTime = now.toLocaleString('zh-CN', options); // 格式化时间为中文
    document.getElementById('current-time').textContent = formattedTime; // 更新页面上的时间
    return formattedTime
}

// 每秒更新一次时间
setInterval(updateTime, 1000);
updateTime(); // 初始调用，确保页面加载时立即显示时间

/* 选择导航中的所有列表项 */
let nav = document.querySelectorAll(".nav li");

/* 为点击的列表项添加'active'类，并移除其他项的'active'类 */
function activeLink() {
    nav.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
}

/* 为每个列表项添加点击事件 */
nav.forEach((item) => item.addEventListener("click", activeLink));
//导航图标点击
document.addEventListener('DOMContentLoaded', function () {
    // 获取所有可点击的图片
    var clickableImages = document.querySelectorAll('.icon');

    clickableImages.forEach(function (image) {
        image.addEventListener('click', function () {
            // 获取目标内容的ID
            var targetId = this.getAttribute('data-target');

            // 隐藏所有内容
            var contents = document.querySelectorAll('.content');
            contents.forEach(function (content) {
                content.style.display = 'none';
            });

            // 显示当前点击的内容
            var targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });
});
//导航文本点击
document.addEventListener('DOMContentLoaded', function () {
    // 获取所有可点击的文字
    var clickableTexts = document.querySelectorAll('.navtext');

    clickableTexts.forEach(function (text) {
        text.addEventListener('click', function () {
            // 获取目标内容的ID
            var targetId = this.getAttribute('data-target');

            // 隐藏所有内容
            var contents = document.querySelectorAll('.content');
            contents.forEach(function (content) {
                content.style.display = 'none';
            });

            // 显示当前点击的内容
            var targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });
});
//创建项目
function createItem() {
    const inputField = document.getElementById('input-text');
    const createButton = document.getElementById('create-button');

    // 显示输入框和保存、取消按钮
    inputField.classList.remove('hidden'); // 显示输入框
    inputField.value = ''; // 清空输入框
    createButton.classList.add('hidden'); // 隐藏创建按钮

    // 创建保存和取消按钮
    const saveButton = document.createElement('button');
    saveButton.className = 'crebutton';
    saveButton.innerText = '保存';
    saveButton.onclick = saveItem;

    const cancelButton = document.createElement('button');
    cancelButton.className = 'crebutton';
    cancelButton.innerText = '取消';
    cancelButton.onclick = cancelCreate;

    // 添加按钮到容器
    const container = document.querySelector('#comment');
    container.appendChild(saveButton);
    container.appendChild(cancelButton);
}

//删除项目
async function deleteItem(id) {
    itemDiv.remove(); // 删除对应文本与按钮
    const { error } = await supabase
        .from('items')
        .delete()
        .eq("text", id)
    if (error) {
        console.error('Error', error)
    }
    else {
        console.log('Item deleted:', data);
        loadItems(); // 重新加载数据
    }
};

// 保存项目
async function saveItem() {
    const inputField = document.getElementById('input-text');
    const itemList = document.getElementById('item-list');
    const createButton = document.getElementById('create-button');

    // 获取输入文本并创建新项
    const newItemText = inputField.value.trim();
    if (newItemText) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerText = newItemText;
        const { data, error } = await supabase
            .from('items')
            .insert([{ text: newItemText }]);

        if (error) {
            console.error('Error:', error);
        } else {
            console.log('New item added:', data);
        }
        // 创建删除按钮
        const deleteButton = document.createElement('button');
        deleteButton.className = 'button delete-button';
        deleteButton.innerText = '删除';
        deleteButton.onclick = async function () {
            itemDiv.remove(); // 删除对应文本与按钮
            const { error } = await supabase
                .from('items')
                .delete()
                .eq("text", text)
        };

        //创建编辑按钮
        const editbutton = document.createElement('button');
        editbutton.className = 'button-edit-button';
        editbutton.innerText = '编辑';
        editbutton.onclick = async function (id, newtext) {
            const oldtext = document.getElementById('input-text');
            oldtext.value = newtext;
            oldtext.classList.remove('hidden');

            const updatebutton = document.createElement('button');
            updatebutton.innerText = '保存修改';
            updatebutton.onclick = function () {
                updateItem(id)
            }
            document.body.appendChild(updatebutton);
        }

        itemDiv.appendChild(deleteButton);
        itemDiv.appendChild(editbutton)
        itemList.appendChild(itemDiv);
    }
    //修改
    async function updateItem(id) {
        const inputField = document.getElementById('input-text');
        const updatedText = inputField.value.trim();

        if (updatedText) {
            const { data, error } = await supabase
                .from('items')
                .update({ text: updatedText })
                .eq('id', id);

            if (error) {
                console.error('Error:', error);
            } else {
                console.log('Item updated:', data);
                loadItems(); // 重新加载数据
                inputField.value = ''; // 清空输入框
                inputField.classList.add('hidden'); // 隐藏输入框
            }
        }
    }
    // 隐藏输入框和保存、取消按钮，显示创建按钮
    inputField.classList.add('hidden'); // 隐藏输入框
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.innerText === '保存' || button.innerText === '取消') {
            button.remove(); // 移除保存和取消按钮
        }
    });
    createButton.classList.remove('hidden'); // 显示创建按钮
}

// 取消创建
function cancelCreate() {
    const inputField = document.getElementById('input-text');
    const createButton = document.getElementById('create-button');

    // 隐藏输入框和保存、取消按钮，显示创建按钮
    inputField.classList.add('hidden'); // 隐藏输入框
    inputField.value = ''; // 清空输入框
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.innerText === '保存' || button.innerText === '取消') {
            button.remove(); // 移除保存和取消按钮
        }
    });
    createButton.classList.remove('hidden'); // 显示创建按钮
}

// 读取数据并显示
async function loadItems() {
    const { data, error } = await supabase
        .from('items')
        .select('text,created_at');

    if (error) {
        console.error('Error:', error);
    } else {
        const formattedData = data.map(item => {
            return {
                text: item.text,
                created_at: item.created_at.substring(0, item.created_at.length - 3)
                    .replace('T', ' ') // 将 T 替换为空格// 删除最后三个字符
            };
        });
        displayItems(formattedData); // 传递格式化后的数据
    }
}

// 显示项目列表
function displayItems(data) {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = ''; // 清空当前显示
    data.forEach((item) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `<span>${item.text}</span> <span>创建时间：${item.created_at}<\span>`
        itemList.appendChild(itemDiv);
        itemList.appendChild(itemDiv);
    });
}
// 初始化
document.addEventListener('DOMContentLoaded', function () {
    loadItems(); // 页面加载时读取数据
});
// 将 createItem 函数暴露到全局作用域
window.createItem = createItem;
// 为创建按钮绑定点击事件
document.getElementById('create-button').addEventListener('click', createItem);

//note页面横向导航点击事件
function notenavclick() {
    // 获取目标内容的ID
    var targetId = this.getAttribute('data-target');
    // 隐藏所有内容窗口
    var note_windows = document.querySelectorAll('.note_window');
    note_windows.forEach(function (note_window) {
        note_window.style.display = 'none';
    });
    // 显示当前点击的内容
    var window = document.getElementById(targetId);
    if (window) {
        window.style.display = 'block';
    }
    var buttons = document.querySelectorAll('.notenavb');
    buttons.forEach(function (button) {
        button.style.background = 'rgba(0,0,0,0)';
    })
    this.style.background = '#94b5f7';
}

window.notenavclick = notenavclick;
//top
window.onscroll = function () {
    toggleScrollToTopButton();
};
function toggleScrollToTopButton() {
    const button = document.getElementById('scrollToTopBtn');
    // 当滚动到一定距离时显示按钮，这里设置为 200 像素
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        button.style.display = "block"; // 显示按钮
    } else {
        button.style.display = "none"; // 隐藏按钮
    }
}

document.getElementById('scrollToTopBtn').onclick = function () {
    scrollToTop();
};
// 使用平滑滚动回到顶部
function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑滚动效果
    });
}

function appsclick() {

}

// OpenWeatherMap API key 
window.onload = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeather(lat, lon);
        }, function () {
            showError("无法获取位置。");
        });
    } else {
        showError("浏览器不支持地理位置服务。");
    }
};

function fetchWeather(lat, lon) {
    const apiKey = '6699cc597cf7da347ed2c28ddfd0c177'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=zh&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("天气信息获取失败。");
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = `
                        <div class = "weatherinfo"><i class="fas fa-location icon"></i>地点:${data.name}- 中国</div>
                        <div class = "weatherinfo"><i class="fas fa-thermometer-half icon"></i> 温度: ${data.main.temp} °C</div>
                        <div class = "weatherinfo"><i class="fas fa-cloud icon"></i> 天气: ${data.weather[0].description}</div>
                        <div class = "weatherinfo"><i class="fas fa-wind icon"></i> 风速: ${data.wind.speed} m/s</div>
                        <div class = "weatherinfo"><i class="fas fa-arrow-alt-circle-up icon"></i> 风向: ${data.wind.deg}°</div>
                        <div class = "weatherinfo"><i class="fas fa-tint icon"></i> 湿度: ${data.main.humidity}%</div>
                        <div class = "weatherinfo"><i class="fas fa-sun icon"></i> 日出: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</div>
                        <div class = "weatherinfo"><i class="fas fa-moon icon"></i> 日落: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</div>
                        <div class = "weatherinfo"><i class="fas fa-tachometer-alt icon"></i> 气压: ${data.main.pressure} hPa</div>
                    `;

            const suggestions = getSuggestions(data.main.temp, data.main.humidity);
            document.getElementById('weather-info').innerHTML = weatherInfo;
            document.getElementById('suggestions').innerHTML = suggestions;
            document.getElementById('error-message').textContent = '';
        })
        .catch(error => {
            showError(error.message);
        });
}

function getSuggestions(temp, humidity) {
    let clothing = "建议穿轻薄的衣物。";
    let sunscreen = "建议使用防晒霜。";
    let travel = "适合出行，享受户外活动。";

    if (temp < 10) {
        clothing = "建议穿保暖衣物。";
    } else if (temp >= 10 && temp < 20) {
        clothing = "建议穿外套。";
    } else if (temp >= 20 && temp < 30) {
        clothing = "建议穿短袖衣物。";
    } else {
        clothing = "建议穿凉快的衣物。";
    }

    if (humidity > 80) {
        travel = "可能会有降雨，请携带雨具。";
    }

    return `
                <h2>建议</h2>
                <p>${clothing}</p>
                <p>${sunscreen}</p>
                <p>${travel}</p>
            `;
}

function showError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('weather-info').innerHTML = '';
    document.getElementById('suggestions').innerHTML = '';
}

const trigger = document.getElementById('app1');
const popup = document.getElementById('weatherpage');
const close = document.getElementById('close');

// 点击触发器放大并显示弹出窗口
trigger.addEventListener('click', () => {
    trigger.classList.add('scale-up'); // 添加放大动画
    setTimeout(() => {
        popup.classList.add('show'); // 延迟显示弹出窗口
    }, 500); // 延迟时间与动画时间一致
});

// 点击关闭按钮隐藏弹出窗口
close.addEventListener('click', () => {
    popup.classList.remove('show');
    trigger.classList.remove('scale-up'); // 移除放大效果
});