import { EzIO } from "../libs/FGE/EzIO.js";
import { Engine } from "../libs/FGE/engine.js";
import { KeybordController } from "./controllers/keyboardController.js";
import { GameMap } from "./entities/map.js";
import { Player } from "./entities/player.js";

export class Game extends Engine {

    player!: Player;
    currentMap!: GameMap;

    readonly tilesize = 80;

    constructor() {
        super('canvas');

        this.draw.getContext().webkitImageSmoothingEnabled = false;
        this.draw.getContext().mozImageSmoothingEnabled = false;
        this.draw.getContext().imageSmoothingEnabled = false;

        KeybordController.startKeybordListner();


    }

    async create() {

        const img = await EzIO.loadImageFromUrl("../assets/images/tileset.png");
        const sprite = await EzIO.loadImageFromUrl("../assets/images/PWR 001.png");
        this.currentMap = new GameMap(img);
        this.currentMap.create();
        this.player = new Player(sprite);
    }


    update(): void {
        this.player.update(this);

    }


    render(): void {

        this.draw.fillBackgroudColor(0, 0, 0)
        this.currentMap.render(this);
        this.player.render(this);

    }



}