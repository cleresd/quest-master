class Servant {
  constructor(thisRoom) {
    this.thisRoom = thisRoom;

    this.role = 'Servant';
    this.alliance = 'Resistance';

    this.description = 'No special ability';
    this.orderPriorityInOptions = 48;
  }

  see() {
    return undefined;
  }

  checkSpecialMove() {}

  canVoteOnMission(isSuccess, role, isEvil, hasMagicToken) {
    if (!isSuccess) {
      return 'You are resistance! Surely you want to succeed!';
    }
  }

  checkAlliance() {
    return 'синий';
  }
}

export default Servant;
