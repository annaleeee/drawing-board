const CANVAS = document.querySelector("canvas");
const ctx = CANVAS.getContext("2d"); // ctx = context
const color = document.getElementById("color");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));

const lineWidth = document.getElementById("line-width");
const modeBtn = document.getElementById("mode_btn");
const destroyBtn = document.getElementById("destroy_btn");
const eraserBtn = document.getElementById("eraser_btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save_btn");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
CANVAS.width = CANVAS_WIDTH;
CANVAS.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }
    ctx.beginPath()
    ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting(){
    isPainting = true
}
function cancelPainting(){
    isPainting = false
}
function onCanvasClick(){ 
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    } // 색상 채우기
}
function onDoubleClick(event){
    const text = textInput.value;
    if(text !== ""){
        ctx.save(); 
        ctx.lineWidth = 1;
        ctx.font = "45px 고딕";
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore(); // 수정 완료 (이전 저장상태로 돌아감)
    }
}

CANVAS.onmousemove = onMove;
CANVAS.addEventListener('mousemove', onMove);
CANVAS.addEventListener('mousedown', startPainting);
CANVAS.addEventListener('mouseup', cancelPainting);
CANVAS.addEventListener('mouseleave', cancelPainting);
CANVAS.addEventListener('click', onCanvasClick);
CANVAS.addEventListener('dblclick', onDoubleClick);
/*--------마우스 움직임대로 그림 그리기---------*/

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}
function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
function onColorClick(event){
    const colorValue = event.target.dataset.color;
    // event.target의 dataset에 접근해서 color값을 가져옴
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);
colorOptions.forEach(color => color.addEventListener('click', onColorClick));
/*--------선 두께, 선 색상 변경---------*/

function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else{
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}
function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}
function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    }
}
function onSaveClick(){
    const url = CANVAS.toDataURL(); // url 변환
    const a = document.createElement("a"); // a태그를 통해 가짜 링크 생성
    a.href = url;
    a.download = "myDrawing.png";
    a.click(); // 링크 클릭 -> 파일 다운로드
    // <a href="url" download></a>
}

modeBtn.addEventListener('click', onModeClick);
destroyBtn.addEventListener('click', onDestroyClick);
eraserBtn.addEventListener('click', onEraserClick);
fileInput.addEventListener('change', onFileChange);
saveBtn.addEventListener('click', onSaveClick);
/*--------버튼 클릭 이벤트 추가하기---------*/
