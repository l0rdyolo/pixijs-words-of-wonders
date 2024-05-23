import * as PIXI from "pixi.js";
import { Application } from "pixi.js";
import { initAssets } from "./assets";
import { gsap } from "gsap";
import { CustomEase, PixiPlugin } from "gsap/all";
import Game from "./game";
import { getMaxLength, parseLevelLetters, parseLevelWords } from "./stringParser";

//LEVEL
const levelLetters = "G,O,D,L"
const levelWords = "0,0,GOLD,H|0,0,GOD,V|2,0,DOG,H|0,2,LOG,V"
export const LEVEL_LETTERS = parseLevelLetters(levelLetters);
export const LEVEL_WORDS = parseLevelWords(levelWords);
export const LEVEL_WORDS_MAX_LENGTH = getMaxLength(LEVEL_WORDS);

//GAME 
export const GAME_WIDTH = 480/1.2;
export const GAME_HEIGHT = 800/1.2;
export let minLength;
export let maxLength;
let canvasRatio;

if(GAME_WIDTH > GAME_HEIGHT){
  canvasRatio = GAME_WIDTH/GAME_HEIGHT
  minLength = GAME_HEIGHT;
  maxLength = GAME_WIDTH;
}
else{
  canvasRatio = GAME_HEIGHT/GAME_WIDTH
  minLength = GAME_WIDTH;
  maxLength = GAME_HEIGHT;

}

export let GAME_MOUSE ={
  x: undefined,
  y:undefined
}

export const GAME_CELLSIZE = (minLength - 20) / LEVEL_WORDS_MAX_LENGTH ;
console.log(GAME_CELLSIZE);

export const COLORS = {
  orange : 0xff9b0a,
  white : 0xffffff,
  hint : 0x33cc33,

}

export const app = new Application({
  backgroundColor: 0x000000,
  antialias: true,
  hello: true,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
});

app.ticker.stop();
gsap.ticker.add(() => {
  app.ticker.update();
});

async function init() {

  document.body.appendChild(app.view);

  let assets = await initAssets();
  console.log("assets", assets);

  gsap.registerPlugin(PixiPlugin, CustomEase);
  PixiPlugin.registerPIXI(PIXI);

  const game = new Game();
  app.stage.addChild(game)
  app.ticker.add((delta) => {
    game.update(delta);
  });
}

init();
