import { Draw } from "../../libs/FGE/draw.js";
import { Engine } from "../../libs/FGE/engine.js";
import { Entity } from "../../libs/FGE/entity.js";
import { Rect, Vec2, Vec3 } from "../../libs/FGE/geometry.js";
import { Game } from "../game.js";

export class Block extends Entity {

    pos: Vec2;
    type = ""
    movable: boolean;
    target: Vec2;
    tileset: ImageBitmap
    powered = false;

    constructor(pos: Vec2, type: string, movable: boolean, tileset: ImageBitmap) {
        super();
        this.pos = pos;
        this.type = type;
        this.movable = movable;
        this.target = new Vec2(0, 0);
        this.tileset = tileset
    }

    create(): void {

    }
    update(game: Game): void {

    }
    render(game: Game): void {

        const rpos = new Vec2(
            this.pos.x * game.tilesize,
            this.pos.y * game.tilesize
        );
        const rdim = new Vec2(
            game.tilesize,
            game.tilesize
        );

        var uvPos = new Vec2(0, 0);

        switch (this.type) {
            case "solid":
                uvPos = new Vec2(3, 0);
                break;
            case "horizontal":
                uvPos = new Vec2(2, 2);
                break;
            case "vertical":
                uvPos = new Vec2(2, 1);
                break;
            case "top_left":
                uvPos = new Vec2(1, 2);
                break;
            case "top_right":
                uvPos = new Vec2(0, 2);
                break;
            case "bottom_left":
                uvPos = new Vec2(1, 1);
                break;
            case "bottom_right":
                uvPos = new Vec2(0, 1);
                break;
            case "light":
                uvPos = new Vec2(3, 1);
                break;
            case "battery":
                uvPos = new Vec2(4, 0);
                break;
            default:
                uvPos = new Vec2(3, 0);

        }

        uvPos.x *= 16;
        uvPos.y *= 16;

        const uvDim = new Vec2(16, 16);

        var color = new Vec3(100, 100, 100);
        if (this.powered) {
            color = new Vec3(255, 200, 0);
        }
        game.draw.fillRect(new Rect(rpos, rdim), color.x, color.y, color.z);
        game.draw.drawImage(this.tileset, rpos, rdim, uvPos, uvDim)



    }

}