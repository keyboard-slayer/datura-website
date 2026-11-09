let fish;
let tex;
let rx = 0;
let ry = 0;

const MAX_YAW = 0.35;
const MAX_PITCH = 0.2;

async function setup() {
    fish = await loadModel('../assets/fish/sacabambaspis_fish_meme_fish.obj', true);
    tex = await loadImage("../assets/fish/texture_0.png");

    const container = document.getElementById("window-canvas");
    createCanvas(
        Math.max(1, container.clientWidth),
        Math.max(1, container.clientHeight),
        WEBGL
    ).parent(container);

    const observer = new ResizeObserver(([entry]) => {
        const canvasWidth = Math.max(1, Math.floor(entry.contentRect.width));
        const canvasHeight = Math.max(1, Math.floor(entry.contentRect.height));
        if (width !== canvasWidth || height !== canvasHeight) {
            resizeCanvas(canvasWidth, canvasHeight);
        }
    });
    observer.observe(container);
}

function draw() {
    background(0xf0);
    rotateZ(3.1);
    rotateY(-1.5);
    if (!fish || !tex) return;
    ambientLight(150);
    directionalLight(255, 255, 255, -1, 1, -1);
    noStroke();
    texture(tex);
    model(fish);
}

function draw() {
    background(0xf0);
    if (!fish || !tex) return;

    const nx = constrain((mouseX - width / 2) / (width / 2), -1, 1);
    const ny = constrain((mouseY - height / 2) / (height / 2), -1, 1);

    ry = lerp(ry, nx * MAX_YAW, 0.08);
    rx = lerp(rx, -ny * MAX_PITCH, 0.08);

    rotateX(rx);
    rotateY(ry);

    rotateZ(3.1);
    rotateY(-1.5);
    scale(Math.min(width / 180, height / 160));

    ambientLight(150);
    directionalLight(255, 255, 255, -1, 1, -1);
    noStroke();
    texture(tex);
    model(fish);
}
