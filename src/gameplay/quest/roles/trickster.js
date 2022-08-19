import Minion from "./minion";

class Trickster extends Minion {
  constructor(thisRoom) {
    super();
    this.thisRoom = thisRoom;

    this.role = 'Trickster';
    this.alliance = 'Spy';

    this.description = 'May lie about loyalty';
    this.orderPriorityInOptions = 90;
  }

  checkSpecialMove() {}
}

export default Trickster;
