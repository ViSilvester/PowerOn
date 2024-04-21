import { Entity } from "../../libs/FGE/entity.js";
import { Vec2 } from "../../libs/FGE/geometry.js";
import { KeybordController } from "../controllers/keyboardController.js";
export class Player extends Entity {
    status = "static";
    target = "";
    pos = new Vec2(0, 0);
    dim = new Vec2(1, 1.6);
    sprite;
    lastPosition = this.pos;
    carringBlock;
    isCarringBlock = false;
    constructor(sprite) {
        super();
        this.sprite = sprite;
    }
    create() {
    }
    update(game) {
        if (this.status == "static") {
            this.updateKeypress();
        }
        else if (this.status == "moving") {
            this.updatePosition(game);
        }
    }
    render(game) {
        const npos = new Vec2(this.pos.x * game.tilesize, (this.pos.y + 0.4) * game.tilesize);
        const ndim = new Vec2(this.dim.x * game.tilesize, this.dim.y * game.tilesize);
        game.draw.drawImage(this.sprite, npos, ndim, new Vec2(1, 0), new Vec2(15, 23));
    }
    updateKeypress() {
        this.lastPosition = new Vec2(this.pos.x, this.pos.y);
        if (KeybordController.getKeyState("w")) {
            this.status = "moving";
            this.target = "north";
        }
        else if (KeybordController.getKeyState("s")) {
            this.status = "moving";
            this.target = "south";
        }
        else if (KeybordController.getKeyState("a")) {
            this.status = "moving";
            this.target = "east";
        }
        else if (KeybordController.getKeyState("d")) {
            this.status = "moving";
            this.target = "west";
        }
    }
    updatePosition(game) {
        var dir = new Vec2(0, 0);
        switch (this.target) {
            case "north":
                dir.y = -1;
                break;
            case "south":
                dir.y = 1;
                break;
            case "east":
                dir.x = -1;
                break;
            case "west":
                dir.x = 1;
                break;
        }
        if (this.checkColision(game.currentMap, dir)) {
            this.status = "static";
            this.pos = this.lastPosition;
            return;
        }
        this.pos.x += 0.1 * dir.x;
        this.pos.y += 0.1 * dir.y;
        if (this.isCarringBlock) {
            this.carringBlock.pos.x += 0.1 * dir.x;
            this.carringBlock.pos.y += 0.1 * dir.y;
        }
        const difx = Math.abs(this.pos.x - this.lastPosition.x);
        const dify = Math.abs(this.pos.y - this.lastPosition.y);
        if (difx >= 1 || dify >= 1) {
            this.pos.x = this.lastPosition.x + dir.x;
            this.pos.y = this.lastPosition.y + dir.y;
            if (this.carringBlock) {
                this.carringBlock.pos = this.carringBlock.target;
                this.isCarringBlock = false;
            }
            this.status = "static";
        }
    }
    checkColision(map, dir) {
        const npos = new Vec2(this.lastPosition.x + dir.x, this.lastPosition.y + dir.y);
        const colisionPos = new Vec2(npos.x, npos.y + 1);
        if (npos.x < 0 || npos.x > 9 || npos.y < 0 || npos.y > 8) {
            return true;
        }
        const block = map.checkPositionforBlock(colisionPos);
        if (block) {
            if (!block.movable) {
                return true;
            }
            const blockNPos = new Vec2(block.pos.x + dir.x, block.pos.y + dir.y);
            if (blockNPos.x < 0 || blockNPos.x > 9 || blockNPos.y < 1 || blockNPos.y > 9) {
                return true;
            }
            if (map.checkPositionforBlock(blockNPos)) {
                return true;
            }
            this.carringBlock = block;
            this.carringBlock.target = blockNPos;
            this.isCarringBlock = true;
        }
        return false;
    }
}
