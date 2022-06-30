import Servant from "./servant";

class Troublemaker extends Servant {
  constructor(thisRoom) {
    super();
    this.thisRoom = thisRoom;

    this.role = 'Troublemaker';
    this.alliance = 'Resistance';

    this.description = 'Must lie about loyalty';
    this.orderPriorityInOptions = 40;
  }

  checkSpecialMove() {}

  checkAlliance() {
    return 'красный';
  }
}

export default Troublemaker;
