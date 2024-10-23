function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

const touchArea = document.getElementById('touchArea');

if (isMobileDevice()) {
    // 如果是手机端，添加触摸事件
    touchArea.addEventListener('touchstart', function (event) {
        console.log('Touch Start:', event.touches[0]);
    });

    touchArea.addEventListener('touchmove', function (event) {
        console.log('Touch Move:', event.touches[0]);
        event.preventDefault(); // 防止滚动
    });

    touchArea.addEventListener('touchend', function (event) {
        console.log('Touch End');
    });
} else {
    // 如果是电脑端，添加鼠标事件
    touchArea.addEventListener('mousedown', function (event) {
        console.log('Mouse Down:', event);
        
    });

    touchArea.addEventListener('mousemove', function (event) {
        console.log('Mouse Move:', event);
    });

    touchArea.addEventListener('mouseup', function (event) {
        console.log('Mouse Up');
    });
}