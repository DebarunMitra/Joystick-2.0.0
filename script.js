//https://javascript.info/coordinates
//https://developer.mozilla.org/en-US/docs/Web/API/Touch/clientX
var clientX, clientY, deltaX, deltaY;
function getCoordinate(id){
    return document.getElementById(id).getBoundingClientRect();
}

function getOffset(baseleft, baseTop, leftMovement, topMovemtnt) {
   
    return {
      left: (baseleft + leftMovement),
      top: (baseTop + topMovemtnt),
    }
}

function getAngle(startX, startY, targetX, targetY){
    var dx = startX - targetX;
    var dy = startY - targetY;

    // var theta = Math.atan2(dy, dx);  // [0, Ⲡ] then [-Ⲡ, 0]; clockwise; 0° = west
    // theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; clockwise; 0° = west
    // if (theta < 0) theta += 360;     // [0, 360]; clockwise; 0° = west

    // var theta = Math.atan2(-dy, dx); // [0, Ⲡ] then [-Ⲡ, 0]; anticlockwise; 0° = west
    // theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; anticlockwise; 0° = west
    // if (theta < 0) theta += 360;     // [0, 360]; anticlockwise; 0° = west

    var theta = Math.atan2(dy, -dx); // [0, Ⲡ] then [-Ⲡ, 0]; anticlockwise; 0° = east
    theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; anticlockwise; 0° = east
    if (theta < 0) theta += 360;     // [0, 360]; anticlockwise; 0° = east

    // var theta = Math.atan2(-dy, -dx); // [0, Ⲡ] then [-Ⲡ, 0]; clockwise; 0° = east
    // theta *= 180 / Math.PI;           // [0, 180] then [-180, 0]; clockwise; 0° = east
    // if (theta < 0) theta += 360;      // [0, 360]; clockwise; 0° = east

    return theta;
}

function moveLeft(id, distance){
    let element = document.getElementById(id).getBoundingClientRect();
    document.getElementById(id).style.left = getOffset(id, distance, 0).left;
}

function getMovement(event){
    // console.log(event);
    if(event.type === "touchstart"){
        console.log("touchstart");
        console.log("X: "+event.touches[0].clientX);
        console.log("Y: "+event.touches[0].clientY);
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    }else if(event.type === "touchend"){
        console.log("touchend");
        console.log("X: "+event.changedTouches[0].clientX);
        console.log("Y: "+event.changedTouches[0].clientY);
        let smallCirclecoordinates = getCoordinate("js-small-circle"),
            bigCirclecoordinates = getCoordinate("js-big-circle"),
            angle = getAngle(bigCirclecoordinates.left, bigCirclecoordinates.top, event.changedTouches[0].clientX, event.changedTouches[0].clientY),
            smallCircleX = (bigCirclecoordinates.width/2)-(smallCirclecoordinates.width/2),
            smallCircleY = (bigCirclecoordinates.height/2)-(smallCirclecoordinates.height/2);

        
        document.getElementById("js-small-circle").style.left =  smallCircleX+"px"; // 48 = smallcircel radius 
        document.getElementById("js-small-circle").style.top = smallCircleY+"px";
        console.log("end-angle: "+angle);
    }else if(event.type === "touchmove"){
        console.log("touchmove");
        console.log("X: "+event.changedTouches[0].clientX);
        console.log("Y: "+event.changedTouches[0].clientY);
        console.log("clientX: "+clientX);
        console.log("clientY: "+clientY);
        let smallCirclecoordinates = getCoordinate("js-small-circle"),
            bigCirclecoordinates = getCoordinate("js-big-circle"),
            smallCircleX = (bigCirclecoordinates.width/2)-(smallCirclecoordinates.width/2),
            smallCircleY = (bigCirclecoordinates.height/2)-(smallCirclecoordinates.height/2),
            angle = getAngle(smallCirclecoordinates.left, smallCirclecoordinates.top, event.changedTouches[0].clientX, event.changedTouches[0].clientY);
            movement = getOffset(smallCircleX, smallCircleY, (event.changedTouches[0].clientX - smallCirclecoordinates.left), (event.changedTouches[0].clientY - smallCirclecoordinates.top));
        deltaX = event.changedTouches[0].clientX - clientX;
        deltaY = event.changedTouches[0].clientY - clientY;
            console.log("circleX: "+smallCircleX);
            console.log("circleY: "+smallCircleY);
            console.log("diffX: "+ (event.changedTouches[0].clientX - smallCircleX));
            console.log("diffY: "+ (event.changedTouches[0].clientY - smallCircleY));
            console.log("deltaX: "+ deltaX);
            console.log("deltaY: "+ deltaY);
            console.log("left: "+ ((event.changedTouches[0].clientX - smallCircleX)));
            console.log("top: "+((event.changedTouches[0].clientY - smallCircleY)));
        
        
        document.getElementById("js-small-circle").style.left =  ((smallCircleX + deltaX))+"px";
        document.getElementById("js-small-circle").style.top = ((smallCircleY + deltaY))+"px";

        // console.log("angle: "+angle);
        
    }else{
        console.log("X: "+window.scrollX);
        console.log("Y: "+window.scrollY);
    }
}

console.log(getCoordinate("js-big-circle"));
console.log(getCoordinate("js-small-circle"));

