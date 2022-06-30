import Servant from "./servant";

class Duke extends Servant {
  constructor(thisRoom) {
    super();
    this.thisRoom = thisRoom;

    this.role = 'Duke';
    this.alliance = 'Resistance';

    this.description = 'May drop on hand during Good\'s last change after Evil is revealed';
    this.orderPriorityInOptions = 40;
  }

  checkSpecialMove() {}
}

export default Duke;
