import { Entity } from "../entity.js";
import { Vec2 } from "../geometry.js";
export class TileMap extends Entity {
    pos;
    width;
    height;
    map;
    tileSize;
    visibleArea;
    tileSet;
    status = "none";
    counter = 0;
    constructor(map, width, height, tileSize, visibleArea, tileSet) {
        super();
        this.map = map;
        this.width = Math.floor(width);
        this.height = Math.floor(height);
        this.pos = new Vec2(0, 0);
        this.tileSize = tileSize;
        this.visibleArea = visibleArea;
        this.tileSet = tileSet;
    }
    create() {
    }
    update(game) {
        if (this.status == "scrolling_right") {
            this.pos.x -= 0.2;
            game.player.pos.x += 0.2 / 19;
            this.counter += 0.2;
            if (this.counter >= 19) {
                this.status = "none";
                game.player.status = "idle";
                this.counter = 0;
                this.pos.x = Math.floor(this.pos.x);
                game.player.pos.x = -this.pos.x;
            }
        }
    }
    render(game) {
        if (this.tileSet) {
            var startx = Math.floor(-this.pos.x);
            var endx = startx + this.visibleArea.x + 1;
            var starty = Math.floor(-this.pos.y);
            var endy = starty + this.visibleArea.y + 1;
            if (startx >= 1) {
                startx -= 1;
            }
            if (starty >= 1) {
                starty -= 1;
            }
            for (var i = startx; i < endx; i++) {
                for (var j = starty; j < endy; j++) {
                    var renderPos = new Vec2(((this.pos.x + i - 0.001) * this.tileSize), ((this.pos.y + j - 0.001) * this.tileSize));
                    this.tileSet.render(this.getTile(new Vec2(i, j)).index, renderPos, this.tileSize, game);
                }
            }
        }
    }
    scroll(dir) {
        if (dir == "right") {
            this.status = "scrolling_right";
        }
    }
    getTile(pos) {
        return this.map[Math.floor(pos.y) * this.width + Math.floor(pos.x)];
    }
}
