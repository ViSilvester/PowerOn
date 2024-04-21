import { EzIO } from "../../../../libs/FGE/EzIO.js";
import { Entity } from "../../../../libs/FGE/entity.js";
import { Vec2 } from "../../../../libs/FGE/geometry.js";
export class BattleScene extends Entity {
    background;
    //personagem 1
    imgFrente;
    imgCostas;
    pos = new Vec2(0, 0);
    dim = new Vec2(50 * 3, 80 * 3);
    async create() {
        this.background = await EzIO.loadImageFromUrl("../../../../assets/images/backgrund.png");
        this.imgFrente = await EzIO.loadImageFromUrl("../../../../assets/images/char 2.png");
        this.imgCostas = await EzIO.loadImageFromUrl("../../../../assets/images/char.png");
    }
    update(game) {
    }
    render(game) {
        game.draw.drawImage(this.background, new Vec2(0, 0), new Vec2(game.draw.width, game.draw.height));
        game.draw.drawImage(this.imgCostas, this.pos, this.dim);
    }
}
