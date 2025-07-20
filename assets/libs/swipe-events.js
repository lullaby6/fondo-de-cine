let startX = 0;
let startY = 0;

document.addEventListener('touchstart', function (e) {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
}, false);

document.addEventListener('touchend', function (e) {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (Math.max(absX, absY) < 30) return;

    if (absX > absY) {
        if (deltaX > 0) {
            window.dispatchEvent(new CustomEvent('swipe-right', { bubbles: true }));
        } else {
            window.dispatchEvent(new CustomEvent('swipe-left', { bubbles: true }));
        }
    } else {
        if (deltaY > 0) {
            window.dispatchEvent(new CustomEvent('swipe-down', { bubbles: true }));
        } else {
            window.dispatchEvent(new CustomEvent('swipe-up', { bubbles: true }));
        }
    }
}, false);
