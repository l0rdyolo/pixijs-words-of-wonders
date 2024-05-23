import { Container, Sprite , Text} from "pixi.js";
import gsap from "gsap";

import { COLORS, GAME_CELLSIZE, GAME_HEIGHT, GAME_WIDTH, LEVEL_WORDS_MAX_LENGTH, maxLength, minLength  } from "..";

export default class PlayButton extends Container {

  constructor(playButtonText) {
    super();
    this.x = GAME_WIDTH/2;
    this.y = maxLength  - GAME_CELLSIZE / 2.5;
    this.playButtonText = playButtonText;
    this.sprite = Sprite.from("playNow")
    this.text = new Text(
        this.playButtonText,
        {
            fontSize: GAME_CELLSIZE * 0.6,
            fill: COLORS.white,
            fontWeight :"bolder"
        }
    );
    this.sprite.interactive = true;
    this.sprite.on('pointerdown', this.#pointerDown.bind(this))

    this.init();
  }

  init() {
    // this.#initCollider();
    this.#initSprite();
    this.#initText();
    this.#animateSpriteScale();
  }


#pointerDown(){
    window.location.href = "https://playablefactory.com/";
}
#initSprite(){
    // this.sprite.tint = COLORS.orange
    this.sprite.alpha = 1;
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(1.2,1.2);
    this.sprite.width = GAME_WIDTH / 1.5;
    this.sprite.height =  GAME_CELLSIZE / 1.4;

    this.sprite.x = 0;
    this.sprite.y = 0;

    this.addChild(this.sprite);
}

#initText(){
    this.text.anchor.set(0.5);
    this.text.scale.set(0.44,0.44)
    this.text.position.set(
        this.sprite.x,
        this.sprite.y
    );
    this.sprite.addChild(this.text);
}

#animateSpriteScale() {
    gsap.to(this.sprite.scale, {
      duration: 0.6,
      x: 1.2,
      y: 1.2,
      onComplete: () => {
        gsap.to(this.sprite.scale, {
          duration: 0.6,
          x: 1,
          y: 1,
          onComplete: this.#animateSpriteScale.bind(this)
        });
      }
    });
  }

}
