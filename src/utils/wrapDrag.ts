export default (el: HTMLElement) => {
  // 初始位置
  var offsetX = 0,
    offsetY = 0,
    mouseX = 0,
    mouseY = 0;
  // 鼠标按下事件
  el.addEventListener("mousedown", function (e) {
    // 获取鼠标位置和元素当前位置的差值
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;

    // 当鼠标按下时监听鼠标移动事件
    document.addEventListener("mousemove", onMouseMove);
    // 当鼠标按下时监听鼠标松开事件
    document.addEventListener("mouseup", onMouseUp);
  });

  function onMouseMove(e: { clientX: number; clientY: number }) {
    // 计算新位置
    mouseX = e.clientX - offsetX;
    mouseY = e.clientY - offsetY;

    // 更新元素的位置
    el.style.left = mouseX + "px";
    el.style.top = mouseY + "px";
  }

  function onMouseUp() {
    // 鼠标松开时停止监听鼠标移动和鼠标松开事件
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
};
