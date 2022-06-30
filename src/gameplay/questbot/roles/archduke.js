import Servant from "./servant";

class Archduke extends Servant {
  constructor(thisRoom) {
    super();
    this.thisRoom = thisRoom;

    this.role = 'Archduke';
    this.alliance = 'Resistance';

    this.description = 'May switch a hand of one player during Good\'s Last Chance after Evil is revealed';
    this.orderPriorityInOptions = 60;
  }

  checkSpecialMove() {}
}

export default Archduke;
