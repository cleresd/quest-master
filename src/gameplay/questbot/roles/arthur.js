class Arthur {
  constructor(thisRoom) {
    this.thisRoom = thisRoom;

    this.role = 'Arthur';
    this.alliance = 'Resistance';

    this.description = 'Knows Morgan le Fay, must remain hidden';
    this.orderPriorityInOptions = 49;
  }

  // Arthur sees Morgan le Fay
  see() {
    const roleTag = {};

    for (let i = 0; i < this.thisRoom.playersInGame.length; i++) {
      if (this.thisRoom.playersInGame[i].role === 'MorganLeFay') {
        roleTag[this.thisRoom.playersInGame[i].username] = {};
        roleTag[this.thisRoom.playersInGame[i].username].roleTag = 'Morgan le Fay';
      }
    }

    return roleTag;
  }

  checkSpecialMove() {}
}

export default Arthur;
