// the main game logic goes here...

import { Board } from './board.js';
import { Player } from './player.js';

class Game {
    
    constructor() {
        this.board = new Board();
        this.currentPlayer = 'white';
        this.players = {
            white: new Player('white'),
            black: new Player('black')
        };
    }

    #validInput(move){

        let temp = move.split(' ');
        if(temp.length != 2) return false;
        
        const fromX = temp[0][0], toX = temp[1][0];
        const fromY = parseInt(temp[0][1]), toY = parseInt(temp[1][1]);

        if(typeof fromY !== 'number' || typeof toY !== 'number') return false;

        if(fromY >= 8 || toY >= 8 || toY < 0 || fromY < 0) return false;
        if(!(/[A-Z]/).test(fromX) || !(/[A-Z]/).test(toX)) return false;

        return true;

    }

    async start() {
        console.log(`Starting to Anti-Chess CLI Mode`);
        this.board.displayBoard();

        let gameOver = false;

        while(!gameOver){
            const currentPlayer = this.players[this.currentPlayer];
            let validMove = false;

            while(!validMove){
                const move = await currentPlayer.getMove(); // waint for the move of the current player.

                if(!this.#validInput(move)){
                    console.log('Invalid move, please enter a valid move.');
                    this.board.displayBoard();
                    continue;
                }

                if(move === 'q'){
                    console.log(`${currentPlayer.name} quits!`);
                    console.log(`Winner: ${(this.currentPlayer === 'white') ? 'Player 2' : 'Player 1'}`);
                    return;
                }

                const [from, to] = move.split(' ');
                if(!this.board.isLegalMove(from, to, this.currentPlayer)){
                    console.log('Invalid move, please enter a valid move.');
                    this.board.displayBoard();
                }
                else{
                    validMove = true;
                    this.board.movePiece(from, to);
                    this.board.displayBoard();

                    const winner = this.board.checkForWinningCondition();
                    if(winner){ // if we have a valid winner
                        console.log(`Winner: ${winner === 'white' ? 'Player 1' : 'Player 2'}`);
                        gameOver = true;
                    }

                    // switch the player
                    this.currentPlayer = (this.currentPlayer === 'white') ? 'black' : 'white';
                }
            }
        }
    }
}

export default Game;