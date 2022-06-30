import usernamesIndexes from '../../../myFunctions/usernamesIndexes';
import Minion from "./minion";

class BlindHunter extends Minion {
  constructor(thisRoom) {
    super();
    this.thisRoom = thisRoom;

    this.specialPhase = 'assassination';

    this.role = 'BlindHunter';
    this.alliance = 'Spy';

    this.description = 'May Hunt instead of GLC';
    this.orderPriorityInOptions = 90;

    this.playerShot = '';
    this.playerShot2 = '';
  }

  // BlindHunter only sees him/herself
  see() {
    if (this.thisRoom.gameStarted === true) {
      const obj = {};
      const array = [];

      for (let i = 0; i < this.thisRoom.playersInGame.length; i++) {
        if (this.thisRoom.playersInGame[i].role === 'BlindHunter') {
          array.push(this.thisRoom.playersInGame[i].username);
          break;
        }
      }

      obj.spies = array;
      return obj;
    }
  }

  // Assassination phase
  checkSpecialMove(socket, buttonPressed, selectedPlayers) {
    // Check for assassination mode and enter it if it is the right time
    if (this.playerShot === '') {
      // If we have the right conditions, we go into assassination phase
      if (this.thisRoom.phase === 'finished') {
        // Get the number of successes:
        let numOfSuccesses = 0;

        for (var i = 0; i < this.thisRoom.missionHistory.length; i++) {
          if (this.thisRoom.missionHistory[i] === 'succeeded') {
            numOfSuccesses++;
          }
        }

        // Check if Merlin exists.
        let merlinExists = false;
        // Check if iso tristan are both in the game.
        let tristExists = false;
        let isoExists = false;

        for (var i = 0; i < this.thisRoom.playersInGame.length; i++) {
          if (this.thisRoom.playersInGame[i].role === 'Merlin') {
            merlinExists = true;
          }
          if (this.thisRoom.playersInGame[i].role === 'Tristan') {
            tristExists = true;
          }

          if (this.thisRoom.playersInGame[i].role === 'Isolde') {
            isoExists = true;
          }
        }

        if (
          numOfSuccesses === 3 &&
          (merlinExists === true ||
            (tristExists === true && isoExists === true))
        ) {
          // Set the assassination phase
          this.thisRoom.startAssassinationTime = new Date();
          this.thisRoom.phase = this.specialPhase;
          return true;
        }
      }
    }

    return false;
  }

  getPublicGameData() {
    if (this.playerShot !== '') {
      return {
        assassinShotUsername: this.playerShot,
        assassinShotUsername2: this.playerShot2,
      };
    }

    return null;
  }
}

export default BlindHunter;
