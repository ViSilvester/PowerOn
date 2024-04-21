import { EzIO } from "../../../libs/FGE/EzIO.js";
import { Engine } from "../../../libs/FGE/engine.js";
import { Vec2 } from "../../../libs/FGE/geometry.js";
import { TileData } from "../../../libs/FGE/std_entities/tileData.js";
import { TileMap } from "../../../libs/FGE/std_entities/tileMap.js";
import { TileSet } from "../../../libs/FGE/std_entities/tileSet.js";
import { KeybordController } from "../../controllers/keyboardController.js";
import { Player } from "../player/player.js";
export class Game extends Engine {
    //parametros
    mapWidth = 19;
    mapHight = 11;
    tileSize = 50;
    //variaveis
    map;
    player;
    tileset;
    zildo;
    constructor(canvasId) {
        super(canvasId);
        //configura contexto
        const context = this.draw.getContext();
        context.webkitImageSmoothingEnabled = false;
        context.mozImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        KeybordController.startKeybordListner();
        //inicialização
        this.player = new Player(new Vec2(0, 0));
        this.map = new TileMap([], this.mapWidth, this.mapHight, this.tileSize, new Vec2(this.mapWidth, this.mapHight), this.tileset);
    }
    async create() {
        const img = await EzIO.loadImageFromUrl("../../../assets/images/tiles_new.png");
        const data = await EzIO.loadJsonFromUrl("../../../data/teste.json");
        await this.player.create();
        this.tileset = new TileSet(16, img, new Vec2(1, 1));
        this.map.tileSet = this.tileset;
        // for (var i = 0; i < data.layers[0].data.length; i++) {
        //     this.map.map.push(new TileData(data.layers[0].data[i] - 1, i < this.mapWidth * 2 ? 1 : 0));
        // }
        for (var i = 0; i < 19 * 11 * 10; i++) {
            this.map.map.push(new TileData(1, 0));
        }
    }
    update() {
        this.player.update(this);
        this.map.update(this);
    }
    render() {
        this.draw.fillBackgroudColor(255, 255, 255);
        this.map.render(this);
        this.player.render(this);
        this.draw.fillText("FPS:" + this.getFPS.toFixed(2), new Vec2(10, 50), 255, 255, 255);
    }
}
