import { Draw } from "./draw.js";
export class Engine {
    //Definições
    draw;
    entities;
    //Variaveis
    last_frame_time;
    deltaTime;
    FPS = 0;
    constructor(canvasId) {
        this.draw = new Draw(canvasId);
        this.entities = [];
    }
    get getFPS() { return this.FPS; }
    get getDeltaTime() { return this.deltaTime; }
    async create() {
    }
    mainLoop() {
        let now = Date.now();
        if (this.last_frame_time) {
            this.deltaTime = (now - this.last_frame_time);
            this.FPS = Math.round(1000 / this.deltaTime);
        }
        requestAnimationFrame(() => {
            this.update();
            this.render();
            this.mainLoop();
        });
        this.last_frame_time = now;
    }
    async run() {
        await this.create();
        this.mainLoop();
    }
}
