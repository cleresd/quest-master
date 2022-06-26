class Troublemaker {
  constructor(thisRoom) {
    this.thisRoom = thisRoom;

    this.role = 'Troublemaker';
    this.alliance = 'Resistance';

    this.description = 'Must lie about loyalty';
    this.orderPriorityInOptions = 40;
  }

  see() {
    return undefined;
  }

  checkSpecialMove() {}
}

export default Troublemaker;
