import { Container, Sprite } from "pixi.js";
import { COLORS, GAME_CELLSIZE } from "..";
import Letter from "./letter";

export default class PalletCell extends Container {

  constructor(letter,onClickCallback , onMoveCallback , onPointerUpCallback) {
    super();
    this.bubbleSprite = Sprite.from("bubble")
    this.letter = new Letter(letter);
    
    this.name = letter;
    console.log(this.name);
    
    this.unlock = false;
    this.clicked = false;
    this.hovered = false;
    this.drawed = false;

    this.onClickCallback = onClickCallback;
    this.onMoveCallback = onMoveCallback;
    this.onPointerUpCallback = onPointerUpCallback;
    this.sortableChildren = true;
    this.zIndex = 1;
    this.init();
  }
  
  init() {
    this.#initBg();
    this.#initLetter();
  }

  #initBg(){
    this.bubbleSprite.width = GAME_CELLSIZE * 0.8 
    this.bubbleSprite.height = GAME_CELLSIZE* 0.8 
    this.bubbleSprite.anchor.set(0.5)
    this.bubbleSprite.alpha = 0
    this.bubbleSprite.tint = COLORS.orange
    this.bubbleSprite.interactive = true;
    this.bubbleSprite.on('pointerdown' , this.#onClick.bind(this))
    this.bubbleSprite.on('pointermove' , this.#onMove.bind(this))
    this.bubbleSprite.on('pointerup' , this.#onPointerUp.bind(this))


    this.addChild(this.bubbleSprite)
  }

  #initLetter(){
    this.addChild(this.letter)
  }

  #onClick(){
    this.clicked = true;

    if (this.onClickCallback) {
        this.onClickCallback(this);
    }
    
  }
  #onPointerUp(){
    if (this.onPointerUpCallback) {
        this.onPointerUpCallback(this);
        
    }
    }


  #onMove(){    
      this.hovered = true;
      if (this.onMoveCallback) {
        this.onMoveCallback(this);
    }
    
      
  }


  reset(){
    this.clicked = false;
    this.unlock = false;
    this.drawed = false;
  }

  update(delta){
    if(this.unlock){
        this.bubbleSprite.alpha = 1;
        this.letter.text.style.fill = COLORS.white;
    }
    else{
        this.bubbleSprite.alpha = 0;
        this.letter.text.style.fill = COLORS.orange;

    }
  }
}
