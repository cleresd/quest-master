class Changeling {
  constructor(thisRoom) {
    this.thisRoom = thisRoom;

    this.role = 'Changeling';
    this.alliance = 'Spy';

    this.description = 'Unknown to Evil, does not know Evil';
    this.orderPriorityInOptions = 90;
  }

  // Changeling only sees him/herself
  see() {
    if (this.thisRoom.gameStarted === true) {
      const obj = {};
      const array = [];

      for (let i = 0; i < this.thisRoom.playersInGame.length; i++) {
        if (this.thisRoom.playersInGame[i].role === 'Changeling') {
          array.push(this.thisRoom.playersInGame[i].username);
          break;
        }
      }

      obj.spies = array;
      return obj;
    }
  }
}

export default Changeling;
