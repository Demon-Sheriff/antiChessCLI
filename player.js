import readline from 'readline';

class Player {

    constructor(color) {
        this.color = color;
        this.name = (color === 'white') ? 'Player 1' : 'Player 2';
    }

    async getMove() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise(resolve => {
            rl.question(`${this.name}, enter your move (e.g. A2 B4) or 'q' to quit: `, answer => {
                rl.close();
                resolve(answer.trim()); // remove white spaces in the input.
            });
        });
    }
}

export default Player;