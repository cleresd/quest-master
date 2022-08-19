import Servant from "./servant";

class Cleric extends Servant {
  constructor(thisRoom) {
    super();
    this.thisRoom = thisRoom;

    this.role = 'Cleric';
    this.alliance = 'Resistance';

    this.description = 'Secretly investigates the first leader';
    this.orderPriorityInOptions = 50;
  }

  see() {
    const obj = {};
    const username = this.thisRoom.playersInGame[this.thisRoom.teamLeader].username;
    const role = this.thisRoom.playersInGame[this.thisRoom.teamLeader].role;
    const alliance = this.thisRoom.playersInGame[this.thisRoom.teamLeader].alliance;

    obj[username] = {};

    if (role === 'Troublemaker') {
      obj[username].roleTag = 'Красный';
      obj.spies = [username];
      this.thisRoom.playersInGame.filter(player => player.role === 'Troublemaker')[0].displayRole = undefined;
    } else if (role === 'Trickster') {
      obj[username].roleTag = 'Синий';
    } else {
      obj[username].roleTag = alliance === 'Spy'
        ? 'Красный'
        : 'Синий';
      if (alliance === 'Spy') {
        obj.spies = [username];
      }
    }

    return obj;
  }

  checkSpecialMove() {}
}

export default Cleric;
