import Servant from "./servant";

class Archduke extends Servant {
  constructor(thisRoom) {
    super();
    this.thisRoom = thisRoom;

    this.role = 'Archduke';
    this.displayRole = 'Servant';
    this.alliance = 'Resistance';

    this.description = 'May switch a hand of one player during Good\'s Last Chance after Evil is revealed';
    this.orderPriorityInOptions = 60;
  }

  checkSpecialMove() {
    const numOfFails = this.thisRoom.missionHistory.filter(result => result === 'failed').length;
    const numOfSucceeds = this.thisRoom.missionHistory.filter(result => result === 'succeeded').length;

    if (numOfFails >= 3 || numOfSucceeds >= 3) {
      this.thisRoom.playersInGame.filter(player => player.role === this.role)[0].displayRole = undefined;
    }
  }
}

export default Archduke;
