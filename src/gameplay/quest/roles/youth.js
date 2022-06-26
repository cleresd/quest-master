class Youth {
  constructor(thisRoom) {
    this.thisRoom = thisRoom;

    this.role = 'Youth';
    this.alliance = 'Resistance';

    this.description = 'Must fail when affected by the magic token';
    this.orderPriorityInOptions = 39;
  }

  see() {
    return undefined;
  }

  checkSpecialMove() {
  }

  canVoteOnMission(isSuccess, role, isEvil, hasMagicToken) {
    if (role === this.role && isSuccess && hasMagicToken) {
      return 'You are Youth. You have an amulet. You must fail.';
    } else if (role === this.role && !isSuccess && !hasMagicToken) {
      return 'You are resistance! Surely you want to succeed!';
    }
  }
}

export default Youth;
