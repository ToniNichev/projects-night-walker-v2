function DrawCanvas() {

    function returnContext() {
        const canvas = document.getElementById("drawCanvas");
        const ctx = canvas.getContext("2d");
        return ctx;
    }


    function drawLeg(x, y) {
        var ctx = returnContext();
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(50 + x, 50 + y);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 10;
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