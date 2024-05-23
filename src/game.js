import gsap, { Power0 } from "gsap";
import { Container, Sprite } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import LevelScene from "./Scenes/LevelScene";
import LevelCompleteScene from "./Scenes/LevelCompleteScene";

export default class Game extends Container {

  constructor() {
    super();

    this.levelScene = new LevelScene();
    this.levelCompleteScene = new LevelCompleteScene();

    this.isLevelCompleted = false;

    this.init();
  }

  init(){
    this.addChild(this.levelCompleteScene);
    this.addChild(this.levelScene);

  }
  
  update(delta){
    this.isLevelCompleted = this.levelScene.levelEnd
    if(this.isLevelCompleted){
      this.levelScene.visible = false;
      this.levelCompleteScene.visible = true;
      this.levelCompleteScene.update();
      
    }
    else{
      this.levelCompleteScene.visible = false;
      this.levelScene.visible = true;
      this.levelScene.update();


    }
  }
}
