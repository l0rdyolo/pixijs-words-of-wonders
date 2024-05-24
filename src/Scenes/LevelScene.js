import gsap, { Power0 } from "gsap";
import { Container, Sprite } from "pixi.js";
import { GAME_CELLSIZE, GAME_HEIGHT, GAME_WIDTH, LEVEL_LETTERS, LEVEL_WORDS, LEVEL_WORDS_MAX_LENGTH, minLength } from "..";
import GridSection from "../Sections/gridSection";
import PlayButton from "../GameObjects/playButton";

export default class LevelScene extends Container {

  constructor() {
    super();
    this.gridSection = new GridSection(LEVEL_WORDS , LEVEL_LETTERS);
    this.playButton = new PlayButton("PLAY NOW!");

    this.levelEnd = false;
    this.init();
  }
  
  init() {
    // this.#initBg()
    this.addChild(this.gridSection)
    // this.addChild(this.playButton)
    this.gridSection.x = (minLength / GAME_CELLSIZE) * 2.5
    this.gridSection.y = (minLength / GAME_CELLSIZE) * 2.5

  }

  #initBg(){
    let sprite = Sprite.from("bg");
    sprite.anchor.set(0.5);
    sprite.scale.set(0.5);
    this.addChild(sprite);
    sprite.x = GAME_WIDTH * 0.5;
    sprite.y = GAME_HEIGHT * 0.5;
    
    this.addChild(sprite);
  }

  update(delta){
    this.levelEnd = this.gridSection.levelEnd;
    this.gridSection.update();
  }
}
