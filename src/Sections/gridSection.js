import { Container, Sprite } from "pixi.js";
import GridCell from "../GameObjects/gridCell";
import { GAME_CELLSIZE, GAME_HEIGHT, GAME_WIDTH, LEVEL_LETTERS, LEVEL_WORDS } from "..";
import LetterPalete from "./letterPalete";

export default class GridSection extends Container {
    constructor() {
        super();
        this.levelWords = LEVEL_WORDS
        this.levelLetters = LEVEL_LETTERS
        
        this.remaningLevelWords = [];
        
        this.grid = [];
        this.levelEnd = false;
        this.remaningWords= this.levelLetters.length
        this.letterPalet = new LetterPalete(
            this.#gridControlCallBack.bind(this)
        );


        
        this.sortableChildren = true;
        this.init();
    }

    init() {
        this.addChild(this.letterPalet)
        this.letterPalet.x = GAME_WIDTH / 2
        this.letterPalet.y = GAME_HEIGHT / 2 + GAME_CELLSIZE + GAME_CELLSIZE / 4

        this.levelWords.forEach(word => {
            const [x, y, text, direction] = word;
            this.remaningLevelWords.push(text);
            for (let i = 0; i < text.length; i++) {
                // calculate gridCell props
                let cellPos = { x: Number(y), y: Number(x) }
                cellPos.x = cellPos.x * GAME_CELLSIZE;
                cellPos.y = cellPos.y * GAME_CELLSIZE
                if (direction === 'H') {
                    cellPos.x = (+ i) * GAME_CELLSIZE;
                }
                else {
                    cellPos.y = (+ i) * GAME_CELLSIZE
                }
                const cellName = text
                const gridCell = new GridCell(
                    cellPos.x,
                    cellPos.y,
                    cellName,
                    text[i],
                )
                this.addChild(gridCell)
                this.grid.push(gridCell);
            }
        });

        
        //utanarak
    }


    #onClick() {
        console.log("selected");

    }
    updateGridCells() {
        this.grid.forEach(cell => {
            cell.update();
        });
    }


    #gridControlCallBack(letterPallet) {
        let flag = false;
        let sendedText = letterPallet.lastSelectionText
        for (let i = 0; i < this.grid.length; i++) {
            if(sendedText === this.grid[i].name)
            {              
                   
                this.grid[i].unlocked=true;
                this.grid[i].zIndex = 1
                flag = true;
            }
        }
        if(flag) {
            if(this.remaningLevelWords.includes(sendedText)){
                this.remaningLevelWords.splice(this.remaningLevelWords.indexOf(sendedText),1);
            } 
        }
        letterPallet.lastSelectionText = "";
    }


    update(delta) {        
        if(this.remaningLevelWords.length<=0){
            this.levelEnd = true;
        }
        
        this.updateGridCells();
        this.letterPalet.update();
    }

}
