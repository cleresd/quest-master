import Minion from "./minion";

class Revealer extends Minion {
  constructor(thisRoom) {
    super();
    this.thisRoom = thisRoom;

    this.role = 'Revealer';
    this.alliance = 'Spy';

    this.description = 'Reveals loyalty after third failed quest';
    this.orderPriorityInOptions = 90;
  }

  checkSpecialMove() {}
}

export default Revealer;
