class Apprentice {
  constructor(thisRoom) {
    this.thisRoom = thisRoom;

    this.role = 'Apprentice';
    this.alliance = 'Resistance';

    this.description = 'Raises one hand during Good\'s Last Chance, and may raise a second hand after Evil is revealed';
    this.orderPriorityInOptions = 40;
  }

  see() {
    return undefined;
  }

  checkSpecialMove() {}
}

export default Apprentice;
