export class Board {

    #letterMap = {
        'A': 0, 
        'B': 1,
        'C': 2,
        'D': 3,
        'E': 4, 
        'F': 5,
        'G': 6,
        'H': 7
    };

    constructor() {
        this.board = this.#initialiseBoard();
    }

    #initialiseBoard() {
        return [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ];
    }

    displayBoard() {
        console.log(`x----------------x`);
        console.log("  A B C D E F G H");
        this.board.forEach((row, index) => {
            console.log(8 - index, row.join(' '));
        });
        console.log(`x----------------x`);
    }

    convertToCoordinates(playerInput){
        // A2 -> (6, 0);
        // console.log(playerInput);
        let row = 8 - parseInt(playerInput[1]);
        let col = this.#letterMap[playerInput[0].toUpperCase()];

        return [row, col];
    }

    // check if the move for moving from to 'to' is legal or not.
    isLegalMove(from, to, currentPlayer) {

        const [fromX, fromY] = this.convertToCoordinates(from);
        const [toX, toY] = this.convertToCoordinates(to);
        const currentPosition = this.board[fromX][fromY];
        const targetPosition = this.board[toX][toY];

        if(targetPosition !== '.' || (currentPlayer === 'white' && currentPosition === currentPosition.toLowerCase()) || (currentPlayer === 'black' && currentPosition === currentPosition.toLowerCase()))
            return false;

        return true;
    }

    movePiece(from, to){
        const [fromX, fromY] = this.convertToCoordinates(from);
        const [toX, toY] = this.convertToCoordinates(to);
        const currentPiece = this.board[fromX][fromY];

        this.board[fromX][fromY] = '.';
        this.board[toX][toY] = currentPiece;
    }

    isCaptureAvailable(currentPlayer) {
        return false;
    }

    checkForWinningCondition() {

        // if no pieces are left then the game ends.
        let whitePieces = 0;
        let blackPieces = 0;
        this.board.forEach((row) => {
            row.forEach((piece) => {
                if(piece !== '.') {
                    if(piece === piece.toUpperCase()) whitePieces++;
                    else blackPieces++;
                }
            });
        });

        if(whitePieces === 0) return 'black';
        if(blackPieces === 0) return 'white';
        return null;
    }
}