import Servant from "./servant";

class Youth extends Servant {
  constructor(thisRoom) {
    super();
    this.thisRoom = thisRoom;

    this.role = 'Youth';
    this.displayRole = 'Servant';
    this.alliance = 'Resistance';

    this.description = 'Must fail when affected by the magic token';
    this.orderPriorityInOptions = 39;
  }

  checkSpecialMove(socket, data) {
    const numOfFails = this.thisRoom.missionHistory.filter(result => result === 'failed').length;
    const numOfSucceeds = this.thisRoom.missionHistory.filter(result => result === 'succeeded').length;

    if (numOfFails >= 3 || numOfSucceeds >= 3) {
      this.thisRoom.playersInGame.filter(player => player.role === this.role)[0].displayRole = undefined;
    }

    // if (this.thisRoom.phase === 'finalQuest' || this.thisRoom.phase === 'hunt' || this.thisRoom.phase === 'last') {
    //   this.thisRoom.playersInGame.filter(player => player.role === this.role)[0].displayRole = undefined;
    // }

    if (this.thisRoom.playersInGame.findIndex(player => player.role === this.role) === this.thisRoom.playerMagicToken) {
      this.thisRoom.playersInGame.filter(player => player.role === this.role)[0].displayRole = undefined;
    }
  }

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
