import { Container, Sprite , Text,  } from "pixi.js";
import { COLORS, GAME_CELLSIZE, GAME_HEIGHT, GAME_WIDTH, maxLength, minLength } from "..";

export default class Letter extends Container {

    constructor(letter ) {
        super();
        this.letter = letter;
        this.text = new Text(
            this.letter,
            {
                fontSize: GAME_CELLSIZE * 0.5,
                fill: COLORS.orange,
                fontWeight :"bolder"
            }
        );

        this.text.anchor.set(0.5);

        this.addChild(this.text);


    }

    init() {
     
    }
}
