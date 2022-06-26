class Cleric {
  constructor(thisRoom) {
    this.thisRoom = thisRoom;

    this.role = 'Cleric';
    this.alliance = 'Resistance';

    this.description = 'Secretly investigates the first leader';
    this.orderPriorityInOptions = 50;
  }

  see() {
    const obj = {};
    const username = this.thisRoom.playersInGame[this.thisRoom.teamLeader].username;

    obj[username] = {};

    if (this.thisRoom.playersInGame[this.thisRoom.teamLeader].role === 'Troublemaker') {
      obj[username].roleTag = 'Spy';
      obj.spies = [this.thisRoom.playersInGame[this.thisRoom.teamLeader].username];
    } else {
      obj[username].roleTag = this.thisRoom.playersInGame[this.thisRoom.teamLeader].alliance;
      if (this.thisRoom.playersInGame[this.thisRoom.teamLeader].alliance === 'Spy') {
        obj.spies = [this.thisRoom.playersInGame[this.thisRoom.teamLeader].username];
      }
    }

    return obj;
  }

  checkSpecialMove() {}
}

export default Cleric;
