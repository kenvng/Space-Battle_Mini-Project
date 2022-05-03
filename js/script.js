// class Ship
class Ship {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
};

// Game objects and logics
const game = {
    title: "Space Battle",
    playing: true,
    ussSchwarzenegger: new Ship('USS Schwarzenegger', 20, 5, 0.7),
    alienShipNames: ['Gorshkov', 'Lazarev', 'Nakhimov', 'Ushakov', 'Nevsky', 'Askold'],
    alienShips: [],

    //attack method
    attack: function (attacker, attacked) {
        // console.log(`${attacker.name} is attacking ${attacked.name}!`);
        console.log(`%c${attacker.name} is attacking ${attacked.name}!`, `color: green`);
        alert(`${attacker.name} is attacking ${attacked.name}`);
        //check if attack higher than attacked ship's directory
        if (Math.random() < attacked.accuracy) {
            //tell us the attacked ship has been hit
            // console.log(`${attacked.name} has been hit!`);
            console.log(`%c${attacker.name} HITS the ${attacked.name}!!!`, `color: red`);
            //remove hull points of attacked ship 
            attacked.hull = attacked.hull - attacker.firepower;
            // tell us the attack fire power
            console.log(`%cYou have done ${attacker.firepower} damage on the ${attacked.name}`, `border: 1px solid grey`);
            //if hull reaches 0, keep it at 0 (no negative hull points)
            if (attacked.hull < 0) { attacked.hull = 0 };
            //tell us remaining hull score of attacked ship
            console.log(`${attacked.name}'s hull is now ${attacked.hull}.`);
            //if the attacked ships' hull reached 0 and is destroyed
            if (attacked.hull === 0) {
                console.log(`${attacked.name} has been DESTROYED!`);
                // PROMPT 
                if (attacked.name !== 'USS Schwarzenegger') {
                    alert(`Great job, Captain. ${attacked.name} has been DESTROYED!\n\nThe ${attacker.name}'s remaining hull is at ${attacker.hull}.`);
                }
                // alert(`Great job, Captain. ${attacked.name} has been DESTROYED!\n\nThe ${attacker.name}'s remaining hull is at ${attacker.hull}.`);
                //if you are destroyed
                if (attacked.name === 'USS Schwarzenegger') {
                    console.log('You LOSE!');
                    alert(`You has failed HUMANITY, Captain!\n The Alien is going to drain earth of all resources and then turning us all into Alien Hamburgers.\n Good Job, LOSER!`)
                    //exit out of game
                    this.playing = false;
                }
                else {
                    //remove destroyed alien ship out of array
                    this.removeDestroyed(attacked);
                    //check if there are any remaining enemy ships
                    if (this.alienShips.length === 0) {
                        alert('Congratulation, you have saved earth from the alien destruction!')
                    }
                    if (this.alienShips.length > 0) {
                        //prompt user if they want to attack next ship or retreat
                        let answer = prompt('Would you like to attack the next ship or retreat? \nYou can choose the following options: \ntype \'attack\' to continue or type \"retreat\" to quit.\nOR you can also, \nClick [OK] to continue or [Cancel] to exit.\n');
                        //if answer is retreat, game is over
                        if (answer.toLowerCase() === 'retreat') {
                            console.log('Go ahead and run. COWARD!');
                            //exit out of game
                            this.playing = false;
                        }
                        else if (answer.toLowerCase() === 'attack') {
                            //attack next alien ship
                            this.pickShip();
                        }
                    }
                    else {
                        //exit out of game after hard earned victory
                        console.log('You saved Earth!');
                        this.playing = false;
                    }
                }
            }
            //else, attacked becomes the attacker
            else {
                this.attack(attacked, attacker);
            }
        }
        else {
            //tell us the attacking ship missed
            console.log(`${attacker.name} has missed!`);
            this.attack(attacked, attacker);
        }
    },

    //generate enemy ships function
    generateEnemies() {
        //iterate over list of alien ship names
        for (ship of this.alienShipNames) {
            //for each alien ship name:
            //give it its name
            let name = ship;
            //randomize its hull number between 3 and 6
            let hull = (Math.floor(Math.random() * (6 - 3 + 1) + 3));
            //randomize its firepower between 2 and 4
            let firepower = (Math.floor(Math.random() * (4 - 2 + 1) + 2));
            //randomize its accuracy between 0.6 and 0.8
            let accuracy = Math.random() * (0.8 - 0.6) + 0.6;
            //create a new Ship object with those values
            let alienShip = new Ship(ship, hull, firepower, accuracy);
            //add that object to the array of alien ships
            this.alienShips.push(alienShip);
        }
    },

    // reset function
    reset: function () {
        game.playing = true;
        game.ussSchwarzenegger.hull = 20;
        game.alienShips = [];
    },

    // show alien ships function
    displayAliens: function () {
        let description = '';
        for (i = 0; i < this.alienShips.length; i++) {
            let alien = this.alienShips[i];
            description = description + `[${i + 1}] ${alien.name}\nHull: ${alien.hull}, Firepower: ${alien.firepower}, Accuracy: ${alien.accuracy}\n`
        }
        return prompt('Which alien ship would you like to attack? \nPlease enter one of the remaining numbers of the ship from [ ] and hit [enter]\n' + description);
    },

    // pick which ship to attack
    pickShip: function () {
        //ask user which alien ship to attack
        let AlienToAttack = parseInt(this.displayAliens()) - 1; // Creating new Variable for alien to attack
        //attack chosen ship
        this.attack(this.ussSchwarzenegger, this.alienShips[AlienToAttack]);
    },

    // remove destroyed ship from array
    removeDestroyed: function (enemy) {
        for (i = 0; i < this.alienShips.length; i++) {
            if (enemy === this.alienShips[i]) {
                for (ship of this.alienShips) {
                }
                this.alienShips.splice(i, 1);
            };
        };
    },

    //play function
    play: function () {
        // welcome message
        alert('Welcome to SPACE BATTLES');
        // playing decision
        if (confirm("Earth has been attacked by a horde of aliens! \nYou are the captain of the USS Schwarzenegger, \non a mission to destroy every last alien ship to save Earth. \nDo you wish to fight? \nClick [OK] to continue or [Cancel] to exit.")) {
            alert('Man your battle station!');

            //get array of enemies
            this.generateEnemies();
            //check the conditional loop
            while (this.playing === true) {
                //ask user which alien ship to attack
                //let AlienToAttack = parseInt(this.displayAliens())-1;
                //start the game by attacking first alien ship
                //this.attack(this.ussSchwarzenegger, this.alienShips[AlienToAttack]);
                this.pickShip();
            }
            //let player play again if they want to
            if (confirm('Would you like to play again? \nClick [OK] to continue or [Cancel] to exit.')) {
                alert('Here we go again!');
                game.reset();
                game.play();
            }
            else {
                alert('Alright. Just go ahead and leave earth hanging!');
                this.playing = false;
            }
        }
        else {
            alert('You are NOT going to save Earth. \nWhat a COWARD! \nLive Long and Prosper.... NOT!');
            this.playing = false;
        };
    }
}

console.log(game.play());

