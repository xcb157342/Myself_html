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



