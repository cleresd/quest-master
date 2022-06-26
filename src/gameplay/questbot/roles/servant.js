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
}

export default Servant;
