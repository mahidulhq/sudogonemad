const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const matrixChars = '01ABCDEF#$@%&*<>{}[]';
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(8, 12, 20, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`;

    columns = Math.floor(canvas.width / fontSize);
    if (drops.length < columns) {
        drops = [...drops, ...Array(columns - drops.length).fill(1)];
    }

    for (let i = 0; i < columns; i++) {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = (Math.random() > 0.85) ? '#00ff9d' : '#06b6d4';
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 40);
