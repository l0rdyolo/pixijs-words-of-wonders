import gsap, { Power0 } from "gsap";
import { Container, Graphics, Sprite, Spritesheet, Texture } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, maxLength } from "..";
import PlayButton from "../GameObjects/playButton";

export default class LevelCompleteScene extends Container {

    constructor() {
        super();

        this.title = Sprite.from("title")
        this.playButton = new PlayButton("PLAY NOW!");
        this.init();
    }
    init() {
        // this.#initBg()
        this.#initTitle();
        this.initEarthAnimation();
        this.addChild(this.playButton)
        this.playButton.y = maxLength/1.3
    }

    #initBg() {
        let sprite = Sprite.from("bg");
        // sprite.tint = 0x000000;
        sprite.alpha = 0.5
        sprite.anchor.set(0.5);
        sprite.scale.set(0.5);
        this.addChild(sprite);
        sprite.x = GAME_WIDTH * 0.5;
        sprite.y = GAME_HEIGHT * 0.5;

        this.addChild(sprite);
    }

    #initTitle() {
        this.title.alpha = 1
        this.title.anchor.set(0.5);
        this.title.scale.set(0.5);
        this.addChild(this.title);
        this.title.x = GAME_WIDTH * 0.5;
        this.title.y = GAME_HEIGHT * 0.2;



        this.addChild(this.title);
    }

    initEarthAnimation() {
        //todo
    }
    update(delta){

    }
}
