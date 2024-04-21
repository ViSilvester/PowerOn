import { Entity } from "../../libs/FGE/entity.js";
import { Vec2 } from "../../libs/FGE/geometry.js";
import { Block } from "./block.js";
export class GameMap extends Entity {
    level;
    blocks;
    tileset;
    constructor(tileset) {
        super();
        this.level = [];
        this.blocks = [];
        this.tileset = tileset;
    }
    create() {
        this.blocks = [
            new Block(new Vec2(2, 5), "static", false, this.tileset),
            new Block(new Vec2(3, 5), "static", false, this.tileset),
            new Block(new Vec2(1, 6), "static", false, this.tileset),
            new Block(new Vec2(1, 6), "static", false, this.tileset),
            new Block(new Vec2(2, 6), "battery", false, this.tileset),
            new Block(new Vec2(2, 7), "static", false, this.tileset),
            new Block(new Vec2(3, 7), "static", false, this.tileset),
            new Block(new Vec2(5, 5), "static", false, this.tileset),
            new Block(new Vec2(6, 5), "static", false, this.tileset),
            new Block(new Vec2(6, 2), "vertical", true, this.tileset),
            new Block(new Vec2(7, 2), "top_left", true, this.tileset),
            new Block(new Vec2(6, 6), "horizontal", true, this.tileset),
            new Block(new Vec2(7, 6), "horizontal", true, this.tileset),
            new Block(new Vec2(8, 8), "light", true, this.tileset),
        ];
    }
    update(game) {
    }
    render(game) {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                var UV = new Vec2(0, 0);
                if (j == 0) {
                    UV = new Vec2(16, 0);
                }
                game.draw.drawImage(this.tileset, new Vec2(i * game.tilesize, j * game.tilesize), new Vec2(game.tilesize, game.tilesize), UV, new Vec2(16, 16));
            }
        }
        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].render(game);
        }
    }
    checkPositionforBlock(pos) {
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].pos.x == pos.x && this.blocks[i].pos.y == pos.y) {
                return this.blocks[i];
            }
        }
    }
}
