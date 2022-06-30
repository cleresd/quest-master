import Minion from "./minion";

class Mutineer extends Minion {
  constructor(thisRoom) {
    super();
    this.thisRoom = thisRoom;

    this.role = 'Mutineer';
    this.alliance = 'Spy';

    this.description = 'Does not know Evil, might switch teams during Final Quest';
    this.orderPriorityInOptions = 90;
  }

  // Mutineer only sees him/herself
  see() {
    if (this.thisRoom.gameStarted === true) {
      const obj = {};
      const array = [];

      for (let i = 0; i < this.thisRoom.playersInGame.length; i++) {
        if (this.thisRoom.playersInGame[i].role === 'Mutineer') {
          array.push(this.thisRoom.playersInGame[i].username);
          break;
        }
      }

      obj.spies = array;
      return obj;
    }
  }
}

export default Mutineer;
