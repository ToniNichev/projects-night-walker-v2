function DrawCanvas() {

    function returnContext() {
        const canvas = document.getElementById("drawCanvas");
        const ctx = canvas.getContext("2d");
        return ctx;
    }


    function drawLeg(x, y, angle, eX, eY) {
        var ratio = 3.5;
        var ratioAngle = 3.3;
        var left = 50;
        var top = 50;
        var ctx = returnContext();
        ctx.beginPath();
        ctx.font = "12px Arial";
        ctx.fillStyle = "red";
        x = x / ratio;
        y = y / ratio;
        eX = eX / ratioAngle - 45;
        eY = eY / ratioAngle - 150;
        ctx.fillText(parseFloat(angle).toFixed(2) + '°', left - 10, top - 10);

        ctx.fillText(parseFloat(x).toFixed(2), left + 40, top - 10);

        ctx.fillText(parseFloat(y).toFixed(2), left - 40, top + 30);

        ctx.moveTo(left, top);
        ctx.lineTo(left + x, top + y);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        
        ctx.stroke();
        ctx.closePath();


        ctx.beginPath();
        ctx.fillStyle = "green";    

        ctx.arc(eX, eY, 2, 0, 2 * Math.PI);
        ctx.fillStyle = "green";
        ctx.stroke();
        ctx.closePath();

    }

    function clear() {
        const ctx = returnContext();
        //ctx.fillStyle = '#0000ff';
        ctx.fillStyle = '#0000fA';
        //ctx.fillRect(0, 0, 300, 300);
        ctx.clearRect(0, 0, 250, 250);
    }

    return {
        clear: clear,
        drawLeg: drawLeg,
    }
}