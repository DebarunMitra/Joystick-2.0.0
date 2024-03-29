//https://javascript.info/coordinates
//https://developer.mozilla.org/en-US/docs/Web/API/Touch/clientX
var clientX, clientY, deltaX, deltaY;
function getCoordinate(id){
    return document.getElementById(id).getBoundingClientRect();
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

function getSpeed(distanceX, distanceY, radius, smallRadius){
    return Math.round(100 * Math.round(Math.sqrt(Math.pow(Math.abs(distanceX), 2) + Math.pow(Math.abs(distanceY), 2))+smallRadius) / radius);
}

function isItInTheCircle(bigRadius, smallRadius, distanceX, distanceY) {
   
   //(smallRadius+Math.abs(distanceX)) && bigRadius>= (smallRadius+Math.abs(distanceY))
    if(bigRadius>= Math.round(Math.sqrt(Math.pow(Math.abs(distanceX), 2) + Math.pow(Math.abs(distanceY), 2))+smallRadius)){
        return true;
    }else{
        return false;
    }
}

function getMovement(event){
    event.preventDefault();
    
    if(event.type === "touchstart"){
        // console.log("touchstart");
        // console.log("X: "+event.touches[0].clientX);
        // console.log("Y: "+event.touches[0].clientY);
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    }else if(event.type === "touchend"){
        // console.log("touchend");
        // console.log("X: "+event.changedTouches[0].clientX);
        // console.log("Y: "+event.changedTouches[0].clientY);
        let smallCirclecoordinates = getCoordinate("js-small-circle"),
            bigCirclecoordinates = getCoordinate("js-big-circle"),
            smallCircleX = (bigCirclecoordinates.width/2)-(smallCirclecoordinates.width/2),
            smallCircleY = (bigCirclecoordinates.height/2)-(smallCirclecoordinates.height/2);

            document.getElementById("coordinateMetrics").innerText = `X: 0 || Y: 0 || Angle: 0° || Speed: 0%`;
        // document.getElementById("coordinateMetrics").innerText = `X: ${(smallCircleX + deltaX)} || Y: ${(smallCircleY + deltaY)} || Angle: ${angle}`;
        document.getElementById("js-small-circle").style.left =  smallCircleX+"px"; 
        document.getElementById("js-small-circle").style.top = smallCircleY+"px";
        // console.log("end-angle: "+angle);
    }else if(event.type === "touchmove"){
        // console.log("touchmove");
       
        deltaX = event.changedTouches[0].clientX - clientX;
        deltaY = event.changedTouches[0].clientY - clientY;
        let smallCirclecoordinates = getCoordinate("js-small-circle"),
            bigCirclecoordinates = getCoordinate("js-big-circle"),
            smallCircleX = (bigCirclecoordinates.width/2)-(smallCirclecoordinates.width/2),
            smallCircleY = (bigCirclecoordinates.height/2)-(smallCirclecoordinates.height/2),
            angle = getAngle(smallCircleX, smallCircleY, (smallCircleX + deltaX), (smallCircleY + deltaY)),
            speed =  getSpeed(deltaX, deltaY, (bigCirclecoordinates.width/2), (smallCirclecoordinates.width/2));
            // console.log("Speed: "+speed);
         
        if(isItInTheCircle((bigCirclecoordinates.width/2), (smallCirclecoordinates.width/2), (deltaX), (deltaY))){
            // console.log("Inside");
            document.getElementById("js-small-circle").style.left =  ((smallCircleX + deltaX))+"px";
            document.getElementById("js-small-circle").style.top = ((smallCircleY + deltaY))+"px";
            document.getElementById("coordinateMetrics").innerText = `X: ${Math.round(deltaX)} || Y: ${Math.round(deltaY)} || Angle: ${Math.round(angle)}° || || Speed: ${speed}%`;
        }
    }
}