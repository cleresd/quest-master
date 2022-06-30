import Servant from "./servant";

class Youth extends Servant {
  constructor(thisRoom) {
    super();
    this.thisRoom = thisRoom;

    this.role = 'Youth';
    this.alliance = 'Resistance';

    this.description = 'Must fail when affected by the magic token';
    this.orderPriorityInOptions = 39;
  }

  checkSpecialMove() {}

  canVoteOnMission(isSuccess, role, isEvil, hasMagicToken) {
    if (isSuccess && hasMagicToken) {
      return 'You are Youth. You have an amulet. You must fail.';
    }

    if (!isSuccess && !hasMagicToken) {
      return 'You are resistance! Surely you want to succeed!';
    }
  }
}

export default Youth;
