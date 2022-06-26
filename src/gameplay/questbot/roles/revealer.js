class Revealer {
  constructor(thisRoom) {
    this.thisRoom = thisRoom;

    this.role = 'Revealer';
    this.alliance = 'Spy';

    this.description = 'Reveals loyalty after third failed quest';
    this.orderPriorityInOptions = 90;
  }

  // Revealer sees all spies except
  see() {
    if (this.thisRoom.gameStarted === true) {
      const obj = {};
      const array = [];
      const playersCount = this.thisRoom.playersInGame.length;

      for (let i = 0; i < playersCount; i++) {
        if (this.thisRoom.playersInGame[i].alliance === 'Spy') {
          if (
            (this.thisRoom.playersInGame[i].role === 'BlindHunter' && playersCount >= 6) ||
            this.thisRoom.playersInGame[i].role === 'Changeling' ||
            this.thisRoom.playersInGame[i].role === 'Scion') {
            // don't add blind hunter (if >= 6 players), changeling and scion
          } else {
            // add the spy
            array.push(this.thisRoom.playersInGame[i].username);
          }
        }
      }

      obj.spies = array;
      return obj;
    }
  }

  checkSpecialMove() {}
}

export default Revealer;
