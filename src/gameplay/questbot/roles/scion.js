class Scion {
  constructor(thisRoom) {
    this.thisRoom = thisRoom;

    this.role = 'Scion';
    this.alliance = 'Spy';

    this.description = 'Known to Morgan le Fay, does not know Evil';
    this.orderPriorityInOptions = 90;
  }

  // Scion only sees him/herself
  see() {
    if (this.thisRoom.gameStarted === true) {
      const obj = {};
      const array = [];

      for (let i = 0; i < this.thisRoom.playersInGame.length; i++) {
        if (this.thisRoom.playersInGame[i].role === 'Scion') {
          array.push(this.thisRoom.playersInGame[i].username);
          break;
        }
      }

      obj.spies = array;
      return obj;
    }
  }
}

export default Scion;
