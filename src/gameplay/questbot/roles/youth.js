class Youth {
  constructor(thisRoom) {
    this.thisRoom = thisRoom;

    this.role = 'Youth';
    this.alliance = 'Resistance';

    this.description = 'Must fail when affected by the magic token';
    this.orderPriorityInOptions = 39;
  }

  see() {
    return undefined;
  }

  checkSpecialMove() {}
}

export default Youth;
