import { Container, Sprite } from "pixi.js";
import { COLORS, GAME_CELLSIZE } from "..";
import Letter from "./letter";

export default class GridCell extends Container {
    constructor(xPos, yPos, text , letter) {
        super();
        this.name = text;
        this.sprite = Sprite.from("rect")
        
        this.x = xPos;
        this.y = yPos;


        this.letter = new Letter(letter)

        this.unlocked = false;
        this.init();
      }
    
      init(){
        this.initSprite();
        this.initText();
    }


      initSprite(){
        this.sprite.width = GAME_CELLSIZE / 1.1;
        this.sprite.height = GAME_CELLSIZE / 1.1;
        this.sprite.zIndex = 0;
        this.addChild(this.sprite)
      }

      initText(){

        this.letter.x = this.sprite.x + this.sprite.width/2
        this.letter.y = this.sprite.y + this.sprite.height/2
        this.addChild(this.letter);

      }


      update(delta){
        if(this.unlocked){
            this.sprite.tint = COLORS.orange;
            this.letter.text.style.fill = COLORS.white
            this.letter.visible = true;
            this.sprite.zIndex = 1;

          }
        else{
            this.sprite.tint = COLORS.white;
            this.letter.visible = false;
            this.sprite.zIndex = 0;

        }
      }

}
