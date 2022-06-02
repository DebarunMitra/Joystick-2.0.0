//https://javascript.info/coordinates
function getCoordinate(id){
    var smallElement = document.getElementById(id).getBoundingClientRect(),
        object = {
            Xcenter: (smallElement.right-smallElement.left)/2,
            Ycenter: (smallElement.bottom-smallElement.top)/2
        }

    console.log(smallElement);
    return object;
}

function getOffset(baseleft, baseTop, leftMovement, topMovemtnt) {
    // el = document.getElementById(id).getBoundingClientRect();
    return {
      left: (baseleft + leftMovement) +'px',
      top: (baseTop + topMovemtnt) +'px',
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
        console.log("X: "+event.touches[0].clientX);
        console.log("Y: "+event.touches[0].clientY);
    }else if(event.type === "touchend"){
        console.log("X: "+event.changedTouches[0].clientX);
        console.log("Y: "+event.changedTouches[0].clientY);
        let coordinates = getCoordinate("js-small-circle"),
            angle = getAngle(coordinates.Xcenter, coordinates.Ycenter, event.changedTouches[0].clientX, event.changedTouches[0].clientY),
            movement = getOffset(coordinates.Xcenter, coordinates.Ycenter, 0, 0);

        document.getElementById("js-small-circle").style.left =  '106px';
        document.getElementById("js-small-circle").style.top = '130px';
        console.log("end-angle: "+angle);
    }else if(event.type === "touchmove"){
        console.log("X: "+event.changedTouches[0].clientX);
        console.log("Y: "+event.changedTouches[0].clientY);
        let coordinates = getCoordinate("js-small-circle"),
            angle = getAngle(coordinates.Xcenter, coordinates.Ycenter, event.changedTouches[0].clientX, event.changedTouches[0].clientY),
            movement = getOffset(coordinates.Xcenter, coordinates.Ycenter, (event.changedTouches[0].clientX - coordinates.Xcenter), (event.changedTouches[0].clientY - coordinates.Ycenter))

        document.getElementById("js-small-circle").style.left = movement.left;
        document.getElementById("js-small-circle").style.top = movement.top;

        console.log("angle: "+angle);
        console.log("diffX: "+ (event.changedTouches[0].clientX - coordinates.Xcenter));
        console.log("diffY: "+ (event.changedTouches[0].clientY - coordinates.Ycenter));
    }else{
        console.log("X: "+window.scrollX);
        console.log("Y: "+window.scrollY);
    }
}

console.log(getCoordinate("js-small-circle"));

// setTimeout(()=>{
//     moveLeft("js-small-circle", 1);
// }, 1000)
