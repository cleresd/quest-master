class Duke {
  constructor(thisRoom) {
    this.thisRoom = thisRoom;

    this.role = 'Duke';
    this.alliance = 'Resistance';

    this.description = 'May drop on hand during Good\'s last change after Evil is revealed';
    this.orderPriorityInOptions = 40;
  }

  see() {
    return undefined;
  }

  checkSpecialMove() {}
}

export default Duke;