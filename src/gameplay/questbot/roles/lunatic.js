import Minion from "./minion";

class Lunatic extends Minion {
  constructor(thisRoom) {
    super();
    this.thisRoom = thisRoom;

    this.role = 'Lunatic';
    this.alliance = 'Spy';

    this.description = 'Must fail every quest';
    this.orderPriorityInOptions = 90;
  }

  checkSpecialMove() {}

  canVoteOnMission(isSuccess, role, isEvil, hasMagicToken) {
    if (isSuccess && !hasMagicToken) {
      return 'You are Lunatic. You must fail.';
    }
  }
}

export default Lunatic;
