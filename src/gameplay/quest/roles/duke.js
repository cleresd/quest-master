import Servant from "./servant";

class Duke extends Servant {
  constructor(thisRoom) {
    super();
    this.thisRoom = thisRoom;

    this.role = 'Duke';
    this.displayRole = 'Servant';
    this.alliance = 'Resistance';

    this.description = 'May drop on hand during Good\'s last change after Evil is revealed';
    this.orderPriorityInOptions = 40;
  }

  checkSpecialMove() {
    const numOfFails = this.thisRoom.missionHistory.filter(result => result === 'failed').length;
    const numOfSucceeds = this.thisRoom.missionHistory.filter(result => result === 'succeeded').length;

    if (numOfFails >= 3 || numOfSucceeds >= 3) {
      this.thisRoom.playersInGame.filter(player => player.role === this.role)[0].displayRole = undefined;
    }
  }
}

export default Duke;
