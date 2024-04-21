import { EzIO } from "../../../libs/FGE/EzIO.js";
import { Entity } from "../../../libs/FGE/entity.js";
import { Vec2 } from "../../../libs/FGE/geometry.js";
import { KeybordController } from "../../controllers/keyboardController.js";
export class Player extends Entity {
    //engine variables
    pos;
    dim;
    direction = "down";
    sprite;
    status = "idle";
    // control variables
    animationTimer = 0;
    //inventory = new Inventory();
    constructor(pos) {
        super();
        this.pos = pos;
        this.dim = new Vec2(0.5, 0.5);
    }
    async create() {
        this.sprite = await EzIO.loadImageFromUrl("../../../assets/images/Zildo.png");
    }
    update(game) {
        if (this.status == "walking") {
            this.status = "idle";
        }
        var newPos = new Vec2(this.pos.x, this.pos.y);
        //get input
        this.updateKeyboardInput(game, newPos);
        //checks if player is in the screen
        if (this.pos.x + this.dim.x > -game.map.pos.x + 19) {
            this.status = "scrolling_right";
            game.map.scroll("right");
        }
        //apply action based on status
        if (this.status == "scrolling_right") {
        }
        if (this.status == "walking") {
            this.animationTimer++;
            this.updateMovement(game, newPos);
        }
        this.updateMapCollision(game, newPos);
    }
    render(game) {
        const ani_right = [new Vec2(0, 1), new Vec2(1, 1), new Vec2(2, 1)];
        const ani_left = [new Vec2(0, 2), new Vec2(1, 2), new Vec2(2, 2)];
        const ani_up = [new Vec2(0, 3), new Vec2(1, 3), new Vec2(2, 3)];
        const ani_down = [new Vec2(0, 0), new Vec2(1, 0), new Vec2(2, 0)];
        var animacao = ani_down;
        switch (this.direction) {
            case "right":
                animacao = ani_right;
                break;
            case "left":
                animacao = ani_left;
                break;
            case "up":
                animacao = ani_up;
                break;
            case "down":
                animacao = ani_down;
                break;
        }
        var frame = animacao[1];
        if (this.status == "walking") {
            if (this.animationTimer >= 20) {
                this.animationTimer = 0;
            }
            frame = animacao[Math.floor(this.animationTimer / 10)];
        }
        else {
            frame = animacao[2];
        }
        game.draw.drawImage(this.sprite, new Vec2(game.tileSize * (this.pos.x + game.map.pos.x), game.tileSize * (this.pos.y + game.map.pos.y)), new Vec2(game.tileSize, game.tileSize), new Vec2(frame.x * 16 + frame.x, frame.y * 16 + frame.y), new Vec2(game.map.tileSet.tileSize, game.map.tileSet.tileSize));
    }
    updateKeyboardInput(game, newPos) {
        //update position
        if (this.status == 'idle') {
            if (KeybordController.getKeyState('w')) {
                this.status = "walking";
                this.direction = "up";
            }
            else if (KeybordController.getKeyState('a')) {
                this.status = "walking";
                this.direction = "left";
            }
            else if (KeybordController.getKeyState('s')) {
                this.status = "walking";
                this.direction = "down";
            }
            else if (KeybordController.getKeyState('d')) {
                this.status = "walking";
                this.direction = "right";
            }
        }
    }
    updateMovement(game, newPos) {
        if (this.status == "walking") {
            if (this.direction == "up") {
                newPos.y -= 0.075;
            }
            else if (this.direction == "left") {
                newPos.x -= 0.075;
            }
            else if (this.direction == "down") {
                newPos.y += 0.075;
            }
            else {
                newPos.x += 0.075;
            }
        }
    }
    limitPosition(game, newPos) {
        // limita posição
        if (newPos.x + 1 >= game.map.width) {
            newPos.x = game.map.width - 1;
        }
        if (newPos.x <= 0) {
            newPos.x = 0;
        }
        if (newPos.y + 1 >= game.map.height) {
            newPos.y = game.map.height - 1;
        }
        if (newPos.y <= 0) {
            newPos.y = 0;
        }
    }
    checkEnemyCollision(game) {
    }
    checkMapColision(x, y, game) {
        const tile = game.map.getTile(new Vec2(x, y));
        if (tile.data == 1) {
            return true;
        }
        return false;
    }
    updateMapCollision(game, newPos) {
        //colisão
        var finalPos = new Vec2(newPos.x, newPos.y);
        //Para X
        if (this.checkMapColision(newPos.x, this.pos.y, game)) {
            finalPos.x = Math.floor(newPos.x) + 1;
        }
        else if (this.checkMapColision(newPos.x, this.pos.y + this.dim.y - 0.01, game)) {
            finalPos.x = Math.floor(newPos.x) + 1;
        }
        else if (this.checkMapColision(newPos.x + this.dim.x, this.pos.y, game)) {
            finalPos.x = Math.floor(newPos.x) + (1 - this.dim.x);
        }
        else if (this.checkMapColision(newPos.x + this.dim.x, this.pos.y + this.dim.y - 0.01, game)) {
            finalPos.x = Math.floor(newPos.x) + (1 - this.dim.x);
        }
        //Para Y
        if (this.checkMapColision(finalPos.x, newPos.y, game)) {
            finalPos.y = Math.floor(newPos.y) + 1;
        }
        else if (this.checkMapColision(finalPos.x + this.dim.x - 0.01, newPos.y, game)) {
            finalPos.y = Math.floor(newPos.y) + 1;
        }
        else if (this.checkMapColision(finalPos.x, newPos.y + this.dim.y, game)) {
            finalPos.y = Math.floor(newPos.y) + (1 - this.dim.y);
        }
        else if (this.checkMapColision(finalPos.x + this.dim.x - 0.01, newPos.y + this.dim.y, game)) {
            finalPos.y = Math.floor(newPos.y) + (1 - this.dim.y);
        }
        if (this.status != "scrolling") {
            this.pos = finalPos;
        }
    }
}
