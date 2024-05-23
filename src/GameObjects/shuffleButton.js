import { Container, Sprite, Text } from "pixi.js";

import { COLORS, GAME_CELLSIZE, GAME_HEIGHT, GAME_WIDTH, LEVEL_WORDS_MAX_LENGTH, maxLength, minLength } from "..";

export default class Shuffle extends Container {

    constructor() {
        super();
        
        
        this.x = 0;
        this.y = 0;
        this.sprite = Sprite.from("shuffle")

        this.sprite.interactive = true;
        this.sprite.on('pointerdown', this.#pointerDown.bind(this))
        this.shuffle = false;
        this.init();
    }

    init() {
        // this.#initCollider();
        this.#initSprite();

    }



    #initSprite() {
        // this.sprite.tint = COLORS.orange
        this.sprite.alpha = 1;
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(0.5, 0.5);
        this.sprite.width = GAME_CELLSIZE / 3;
        this.sprite.height = GAME_CELLSIZE / 3;

        this.sprite.x = 0;
        this.sprite.y = 0;

        this.addChild(this.sprite);
    }

    #pointerDown(){
        this.shuffle = true;
        
    }



}
