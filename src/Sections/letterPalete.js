import { Container, Graphics, Sprite ,Text} from "pixi.js";
import { COLORS, GAME_CELLSIZE, GAME_HEIGHT, GAME_MOUSE, GAME_WIDTH, LEVEL_LETTERS, maxLength, minLength } from "..";
import PalletCell from "../GameObjects/palletCell";
import Shuffle from "../GameObjects/shuffleButton";
import gsap from "gsap";


export default class LetterPalete extends Container {

    constructor(gridControlCallBack) {
        super();

        this.bubbleSprite = Sprite.from("bubble")
        this.paleteCells = [];
        this.selectionList = [];
        this.lines = [];
        this.palletLettersPositions = [];
        this.selectionStart = false;
        this.lastSelectionText = "";
        this.gridControlCallBack = gridControlCallBack

        this.shuffleButton = new Shuffle();
        
        this.selectedLetterDisplayContainer = new Container();

        this.shuffleButton.zIndex = 1
        this.shuffleButton.interactive=true;
        this.shuffleButton.on('pointerdown' ,()=>{
            this.shuffleLetters()
        })
        this.addChild(this.shuffleButton)
        this.init();

    }

    init() {
        this.sortableChildren = true;
        this.#initBg();
        this.#initLetters()
        this.addChild(this.selectedLetterDisplayContainer)
    }

    #initBg() {
        this.bubbleSprite.width = GAME_CELLSIZE * 2.5
        this.bubbleSprite.height = GAME_CELLSIZE * 2.5
        this.bubbleSprite.anchor.set(0.5)
        this.bubbleSprite.alpha = 0.8
        this.bubbleSprite.zIndex = 0;
        // this.bubbleSprite.interactive = true;
        // this.bubbleSprite.on('pointerdown', this.#onClick.bind(this))
        // this.bubbleSprite.on('pointermove', this.#onMove.bind(this))
        // this.bubbleSprite.on('pointerup', this.#onPointerUp.bind(this))

        this.addChild(this.bubbleSprite)
    }

    #initLetters() {
        const numLetters = LEVEL_LETTERS.length;
        const radius = this.bubbleSprite.width / 3;
        const angleIncrement = (Math.PI * 2) / numLetters;

        for (let i = 0; i < numLetters; i++) {
            const angle = angleIncrement * i;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            this.palletLettersPositions.push({ x: x, y: y })

            const palletCell = new PalletCell(
                LEVEL_LETTERS[i],
                this.#onClickPalletCell.bind(this),
                this.#onMovePalletCell.bind(this),
                this.#onPointerUp.bind(this)
            );
            palletCell.zIndex = 3;
            this.paleteCells.push(palletCell);
            palletCell.position.set(x, y);
            this.addChild(palletCell);
        }
    }

    #resetLetterPallete() {
        this.removeLines();
        this.selectionList = [];
        this.selectionStart = false;
        this.#resetPalletCells();
        this.draw = false;
    }

    #updatePalletCells() {
        this.paleteCells.forEach(cell => {
            cell.update();
        })
    }

    #resetPalletCells() {
        this.paleteCells.forEach(cell => {
            cell.reset();
        })
    }

    #onPointerUp() {
        this.selectionList.forEach(sel => this.lastSelectionText += sel.letter.letter);
        if (this.gridControlCallBack) {
            this.gridControlCallBack(this);
        }
        this.#resetLetterPallete();
    }

    #onMovePalletCell(hoverCell) {
        if (this.selectionStart && !hoverCell.unlock) {
            this.selectionList.push(hoverCell)
            hoverCell.unlock = true;
        }
    }

    #onClickPalletCell(clickedCell) {
        if (!clickedCell.unlock) {
            this.selectionList.push(clickedCell);
            clickedCell.unlock = true
            this.selectionStart = true;
        }
    }



    shuffleLetters() {
        if (this.shuffleButton.shuffle) {
            let tempPos = this.#shuffleArray(this.palletLettersPositions);

            for (let i = 0; i < tempPos.length; i++) {
                this.#animateLetterMovement(this.paleteCells[i], tempPos[i])

            }
            this.shuffleButton.shuffle = false;
        }
    }
    #animateLetterMovement(letter, newPosition) {
        gsap.to(letter, { duration: 0.6, x: newPosition.x, y: newPosition.y });
    }

    #shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    removeLines() {
        if(!this.draw && this.lines.length>0){
            this.lines.forEach(line =>{
                line.visible = false;
            })
        }
    }

    drawLine() {
        if (this.selectionList.length > 0) {
            this.draw = true;
            for (let i = this.selectionList.length - 1; i > 0; i--) {
                const last = this.selectionList[i]
                const lastPrev = this.selectionList[i - 1]
                if (lastPrev) {
                    if (!last.drawed || !lastPrev.drawed) {
                        let line = new Graphics();
                        line.lineStyle(15, COLORS.orange);
                        line.moveTo(
                            last.x,
                            last.y
                        );
                        line.lineTo(
                            lastPrev.x,
                            lastPrev.y
                        );
                        line.zIndex = 2
                        this.addChild(line)
                        this.lines.push(line)
                        last.drawed = true;
                        lastPrev.drawed = true;
                    }
                }
            }
        }
    }

    update(delta) {
        this.removeLines();
        this.drawLine();
        this.#updatePalletCells();
        if(this.selectionStart){
            this.shuffleButton.visible = false;
        }
        else{
            this.shuffleButton.visible = true;
        }
    }
}
