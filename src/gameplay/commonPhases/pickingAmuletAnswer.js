import usernamesIndexes from '../../myFunctions/usernamesIndexes';

function PickingAmuletAnswer(thisRoom_) {
  this.thisRoom = thisRoom_;

  this.phase = 'pickingAmuletAnswer';
  this.showGuns = true;
}

PickingAmuletAnswer.prototype.gameMove = function (
  socket,
  buttonPressed,
  selectedPlayers
) {
  if (buttonPressed !== 'yes') {
    // this.thisRoom.sendText(this.thisRoom.allSockets, `Button pressed was ${buttonPressed}. Let admin know if you see this.`, "gameplay-text");
    return;
  }

  // If the person requesting is the current amulet target
  if (
    usernamesIndexes.getIndexFromUsername(
      this.thisRoom.playersInGame,
      socket.request.user.username
    ) === this.thisRoom.playerAmulet[this.thisRoom.playerAmulet.length - 1]
  ) {
    if (this.thisRoom.playerAmuletTargets.includes(selectedPlayers[0])) {
      socket.emit(
        'danger-alert',
        'You can\'t select a player that has already been investigated.'
      );

      return;
    }

    if (this.thisRoom.playerAmulet.includes(selectedPlayers[0])) {
      socket.emit(
        'danger-alert',
        'You can\'t pick a player with an amulet!'
      );

      return;
    }

    const amuletTarget = this.thisRoom.playersInGame.findIndex(player => player.username === selectedPlayers[0]);

    this.thisRoom.playerAmuletTargets.push(amuletTarget);

    const targetAlliance = this.thisRoom.playersInGame[amuletTarget].alliance;

    //--------------------------------------
    // Send out the gameplay text
    //--------------------------------------
    let str = `${socket.request.user.username} has investigate: ${selectedPlayers[0]}.`;

    this.thisRoom.sendText(this.thisRoom.allSockets, str, 'gameplay-text');

    socket.emit(
      'danger-alert',
      'You can\'t select a player that has already been investigated.'
    );

    this.thisRoom.phase = 'pickingTeam';

    // var str1 = `Mission ${this.thisRoom.missionNum}.${
    //   this.thisRoom.pickNum
    // } was approved.`;
    // this.thisRoom.sendText(this.thisRoom.allSockets, str1, 'gameplay-text');
  } else {
    console.log(
      `User ${socket.request.user.username} is not the amulet target. Cannot pick.`
    );
  }
};

// Returns a object with green and red keys.
// Green and Red must both have the following properties:
//  hidden          - Is the button hidden?
//  disabled        - Is the button disabled?
//  setText         - What text to display in the button
PickingAmuletAnswer.prototype.buttonSettings = function (indexOfPlayer) {
  const obj = {
    green: {},
    red: {},
  };

  // If it is the host
  if (indexOfPlayer === this.thisRoom.playerAmuletTargets[this.thisRoom.playerAmuletTargets.length - 1]) {
    obj.green.hidden = false;
    obj.green.disabled = true;
    obj.green.setText = 'Pick';

    obj.red.hidden = true;
    obj.red.disabled = true;
    obj.red.setText = '';
  }
  // If it is any other player who isn't host
  else {
    obj.green.hidden = true;
    obj.green.disabled = true;
    obj.green.setText = '';

    obj.red.hidden = true;
    obj.red.disabled = true;
    obj.red.setText = '';
  }

  return obj;
};

PickingAmuletAnswer.prototype.numOfTargets = function (indexOfPlayer) {
  // If we are not the team leader
  if (indexOfPlayer !== this.thisRoom.playerAmuletTargets[this.thisRoom.playerAmuletTargets.length - 1]) {
    return null;
  }

  return 1;
};

PickingAmuletAnswer.prototype.getStatusMessage = function (indexOfPlayer) {
  if (
    indexOfPlayer !== undefined &&
    indexOfPlayer === this.thisRoom.playerAmuletTargets[this.thisRoom.playerAmuletTargets.length - 1]
  ) {
    return `Pick who to check`;
  }

  // console.log(this.thisRoom.teamLeader);
  if (this.thisRoom.playersInGame[this.thisRoom.playerAmuletTargets[this.thisRoom.playerAmuletTargets.length - 1]]) {
    return `Waiting for ${
      this.thisRoom.playersInGame[this.thisRoom.playerAmuletTargets[this.thisRoom.playerAmuletTargets.length - 1]].username
    } to pick who to check`;
  }

  return 'ERROR: Tell the admin if you see this, code 10.';
};

export default PickingAmuletAnswer;
