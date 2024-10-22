// the main game logic goes here...

import Board from './board';
import Player from './player';

class Game {
    
    constructor() {
        this.board = new Board();
        this.currentPlayer = 'white';
        this.players = {
            white: new Player('white'),
            black: new Player('black')
        };
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

                if(move === 'q'){
                    console.log(`${currentPlayer.name} quits!`);
                    console.log(`Winner: ${(this.currentPlayer === 'white') ? 'Player 2' : 'Player 1'}`);
                    return;
                }

                const [from, to] = move.split(' ');
                if(!this.board.isLegalMove(from, to, this.currentPlayer)){
                    console.log('Invalid move, please enter a valid move.');
                }
                else{
                    validMove = true;
                    this.board.movePiece(from, to);
                    this.board.displayBoard();

                    const winner = this.board.checkforWinningCondition();
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