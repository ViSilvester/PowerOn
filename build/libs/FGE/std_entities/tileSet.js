import { Vec2 } from "../geometry.js";
export class TileSet {
    textureAtlas;
    tileSize;
    tileOffset;
    constructor(tileSize, textureAtlas, tileOffset) {
        this.textureAtlas = textureAtlas;
        this.tileSize = tileSize;
        if (tileOffset) {
            this.tileOffset = tileOffset;
        }
        else {
            this.tileOffset = new Vec2(0, 0);
        }
    }
    render(tileIndex, renderPos, renderTileSize, game) {
        const w = Math.floor(this.textureAtlas.width / this.tileSize);
        const y = Math.floor(tileIndex / w);
        const x = Math.floor(tileIndex % w);
        game.draw.drawImage(this.textureAtlas, renderPos, new Vec2(renderTileSize, renderTileSize), new Vec2((x * this.tileSize) + (this.tileOffset.x * x), (y * this.tileSize) + (this.tileOffset.y * y)), new Vec2(this.tileSize, this.tileSize));
    }
}
