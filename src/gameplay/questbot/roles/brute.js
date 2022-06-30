import Minion from "./minion";

class Brute extends Minion {
  constructor(thisRoom) {
    super();
    this.thisRoom = thisRoom;

    this.role = 'Brute';
    this.alliance = 'Spy';

    this.description = 'May fail only the first three quests';
    this.orderPriorityInOptions = 90;
  }

  checkSpecialMove() {}

  canVoteOnMission(isSuccess, role, isEvil, hasMagicToken) {
    if (!isSuccess && this.thisRoom.missionNum > 3) {
      return 'You are Brute. You can fail only first three missions.'
    }

    if (!isSuccess && hasMagicToken) {
      return 'You have an amulet. You can\'t fail.';
    }
  }
}

export default Brute;
