//根据设备宽度设定font-size
function refontsize() {
    document.documentElement.style.fontSize = screen.width / 20 + 'px';
}

refontsize();
//改变屏幕尺寸时，触发reset
window.onresize = refontsize()

/* 选择导航中的所有列表项 */
let nav = document.querySelectorAll(".nav li");

/* 为点击的列表项添加'active'类，并移除其他项的'active'类 */
function activeLink() {
    nav.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
}

/* 为每个列表项添加点击事件 */
nav.forEach((item) => item.addEventListener("click", activeLink));

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
    const container = document.querySelector('.notecontent');
    container.appendChild(saveButton);
    container.appendChild(cancelButton);
}

// 保存项目
function saveItem() {
    const inputField = document.getElementById('input-text');
    const itemList = document.getElementById('item-list');
    const createButton = document.getElementById('create-button');

    // 获取输入文本并创建新项
    const newItemText = inputField.value.trim();
    if (newItemText) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerText = newItemText;

        // 创建删除按钮
        const deleteButton = document.createElement('button');
        deleteButton.className = 'button delete-button';
        deleteButton.innerText = '删除';
        deleteButton.onclick = function () {
            itemDiv.remove(); // 删除对应文本与按钮
        };

        itemDiv.appendChild(deleteButton);
        itemList.appendChild(itemDiv);
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



