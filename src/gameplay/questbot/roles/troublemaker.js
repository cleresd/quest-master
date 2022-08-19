import Servant from "./servant";

class Troublemaker extends Servant {
  constructor(thisRoom) {
    super();
    this.thisRoom = thisRoom;

    this.role = 'Troublemaker';
    this.displayRole = 'Servant';
    this.alliance = 'Resistance';

    this.description = 'Must lie about loyalty';
    this.orderPriorityInOptions = 40;
  }

  checkSpecialMove() {
    const numOfFails = this.thisRoom.missionHistory.filter(result => result === 'failed').length;
    const numOfSucceeds = this.thisRoom.missionHistory.filter(result => result === 'succeeded').length;

    if (numOfFails >= 3 || numOfSucceeds >= 3) {
      this.thisRoom.playersInGame.filter(player => player.role === this.role)[0].displayRole = undefined;
    }
  }

  checkAlliance() {
    // TODO: move it in checkSpecialMove
    this.thisRoom.playersInGame.filter(player => player.role === this.role)[0].displayRole = undefined;

    return 'красный';
  }
}

export default Troublemaker;
