let touching = 0;
let tempSlide = false;
let windSlide = false;
let sendButtonOn = false;
let offButtonOn = false;
let lastMoveTime=0;
let moveIntervalTime = 15;

const initEventlistener = () => {
    window.addEventListener('resize', resize, false);
    canvas.addEventListener('mousedown', touchIn, false);
    canvas.addEventListener('touchstart', touchIn, false);
    canvas.addEventListener('mousemove', moveIn, false);
    canvas.addEventListener('touchmove', moveIn, false);
    canvas.addEventListener('mouseup', releaseIn, false);
    canvas.addEventListener('touchend', releaseIn, false);
}
const touchIn=(event)=>{
    event.preventDefault();
	const rect = event.target.getBoundingClientRect();
	let x = event.pageX-rect.left-document.scrollingElement.scrollLeft;
	let y = event.pageY-rect.top-document.scrollingElement.scrollTop;
	x *= pixelRatio;
	y *= pixelRatio;
	touchX = x;
	touchY = y;
	touch(x,y,event);
}
const moveIn=(event)=>{
    event.preventDefault();
	//Check time first
	if(Date.now()-lastMoveTime<moveIntervalTime) return;
	lastMoveTime = Date.now();
	//Get coordinate
	const rect = event.target.getBoundingClientRect();
	let x = event.pageX-rect.left-document.scrollingElement.scrollLeft;
	let y = event.pageY-rect.top-document.scrollingElement.scrollTop;
	x *= pixelRatio;
	y *= pixelRatio;
	move(x,y);
}
const releaseIn=(event)=>{
    event.preventDefault();
	const rect = event.target.getBoundingClientRect();
	let x = event.pageX-rect.left-document.scrollingElement.scrollLeft;
	let y = event.pageY-rect.top-document.scrollingElement.scrollTop;
	x *= pixelRatio;
	y *= pixelRatio;
	release(x,y);
}
const touch = (x,y,event) => {
    if(touching) return;
    touching = true;

    let xi = Math.floor(x*division/width);
    let yi = Math.floor(y*division/height);

    if(yi >= 0 && yi <= 1){
        //Top layer
        if(xi >= 0 && xi <= 4 && !cool) cool = true;
        if(xi >= 5 && xi <= 8 &&  cool) cool = false;
    }else if(yi >= 2 && yi <= 3){
        //Second layer
        if(xi >= 0 && xi <= 8) clean = !clean;
    }else if(yi >= 4 && yi <= 5){
        //Third layer
        if(xi >= 0 && xi <= 8) power = !power;
    }else if(yi >= 6 && yi <= 11){
        if(xi >= 0 && xi <= 3){
            tempSlide = true;
            updateTemp(x,y);
        }else if(xi >= 4 && xi <= 8){
            if(yi <= 9){
                clicked('dire');
            }else{
                clicked('velo');
            }
            windSlide = true;
            updateWind(x,y);
        }
    }else if(yi >= 13 && yi <= 14){
        //Bottom layer
        if(xi >= 0 && xi <= 4){
            sendButtonOn = true;
            sendSignal();
        }
        if(xi >= 5 && xi <= 8){
            offButtonOn = true;
            turnOff();
        }
    }
    updateStatus();
    draw();

    //log(x +", "+y + "_touched");
}
const move = (x,y) => {
    if(tempSlide) updateTemp(x,y);
    if(windSlide) updateWind(x,y);
    //log(x +", "+y + "_move");
}
const release = (x,y,event) => {
    if(!touching) return;
    touching = false;
    tempSlide= false;
    windSlide= false;
    sendButtonOn = false;
    offButtonOn  = false;
    //log(x +", "+y + "_realeased");
    draw();
    updateStatus();
}
const updateTemp = (x,y) => {
    let tempT = Math.floor(16*(y-height * 6.5 / 16)/(height * 4.5 / 16));
    tempT = Math.max(0,tempT);
    tempT = Math.min(16,tempT);
    temp = 15 - tempT;
    draw();
    return;
}
const updateWind = (x,y) => {
    return;
}

console.log("Loaded: canvas.js");