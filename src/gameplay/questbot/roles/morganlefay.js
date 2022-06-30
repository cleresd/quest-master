import Minion from "./minion";

class MorganLeFay extends Minion{
  constructor(thisRoom) {
    super();
    this.thisRoom = thisRoom;

    this.role = 'MorganLeFay';
    this.alliance = 'Spy';

    this.description = 'Not affected by the Magic token';
    this.orderPriorityInOptions = 90;
  }

  // Morgana sees all spies except oberon
  see() {
    if (this.thisRoom.gameStarted === true) {
      const obj = {};
      const array = [];
      const playersCount = this.thisRoom.playersInGame.length;

      for (let i = 0; i < playersCount; i++) {
        if (this.thisRoom.playersInGame[i].alliance === 'Spy') {
          if (this.thisRoom.playersInGame[i].role === 'Scion') {
            obj[this.thisRoom.playersInGame[i].username] = {};
            obj[this.thisRoom.playersInGame[i].username].roleTag = 'Scion';
          }

          if (
            (this.thisRoom.playersInGame[i].role === 'BlindHunter' && playersCount >= 6) ||
            this.thisRoom.playersInGame[i].role === 'Changeling') {
            // don't add blind hunter (if >= 6 players), changeling
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

  // Not affected by the Magic token
  canVoteOnMission(isSuccess, role, isEvil, hasMagicToken) {}
}

export default MorganLeFay;
