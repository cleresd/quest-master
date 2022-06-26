class Archduke {
  constructor(thisRoom) {
    this.thisRoom = thisRoom;

    this.role = 'Archduke';
    this.alliance = 'Resistance';

    this.description = 'May switch a hand of one player during Good\'s Last Chance after Evil is revealed';
    this.orderPriorityInOptions = 60;
  }

  see() {
    return undefined;
  }

  checkSpecialMove() {}
}

export default Archduke;
