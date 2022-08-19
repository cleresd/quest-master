import usernamesIndexes from '../../myFunctions/usernamesIndexes';

function PickingMagicToken(thisRoom_) {
  this.thisRoom = thisRoom_;

  this.phase = 'pickingMagicToken';
  this.showGuns = true;
}

PickingMagicToken.prototype.gameMove = function (
  socket,
  buttonPressed,
  selectedPlayers
) {
  if (buttonPressed !== 'yes') {
    // this.thisRoom.sendText(this.thisRoom.allSockets, `Button pressed was ${buttonPressed}. Let admin know if you see this.`, "gameplay-text");
    return;
  }

  // catch wrong number of targets
  if (selectedPlayers.length !== 1) {
    return;
  }

  if (!this.thisRoom.playerUsernamesInGame.includes(selectedPlayers[0])) {
    return;
  }

  // If the person requesting is the host
  if (
    usernamesIndexes.getIndexFromUsername(
      this.thisRoom.playersInGame,
      socket.request.user.username
    ) === this.thisRoom.teamLeader
  ) {
    if (!this.thisRoom.proposedTeam.includes(selectedPlayers[0])) {
      socket.emit(
        'danger-alert',
        'You must pick a player inside the mission!'
      );

      return;
    }

/*    const magicTokenPlayer = this.thisRoom.playersInGame.findIndex(player => player.username === selectedPlayers[0]);

    this.thisRoom.playerMagicToken = this.thisRoom.playersInGame[magicTokenPlayer].role === 'MorganLeFay'
      ? this.thisRoom.playerMagicToken
      : magicTokenPlayer;*/
    this.thisRoom.playerMagicToken = this.thisRoom.playersInGame.findIndex(player => player.username === selectedPlayers[0]);

    //--------------------------------------
    // Send out the gameplay text
    //--------------------------------------
    let str = `${socket.request.user.username} has give a magic token to: ${selectedPlayers[0]}.`;

    this.thisRoom.sendText(this.thisRoom.allSockets, str, 'gameplay-text');

    this.thisRoom.phase = 'votingMission';

    // var str1 = `Mission ${this.thisRoom.missionNum}.${
    //   this.thisRoom.pickNum
    // } was approved.`;
    // this.thisRoom.sendText(this.thisRoom.allSockets, str1, 'gameplay-text');
  } else {
    console.log(
      `User ${socket.request.user.username} is not the team leader. Cannot pick.`
    );
  }
};

// Returns a object with green and red keys.
// Green and Red must both have the following properties:
//  hidden          - Is the button hidden?
//  disabled        - Is the button disabled?
//  setText         - What text to display in the button
PickingMagicToken.prototype.buttonSettings = function (indexOfPlayer) {
  const obj = {
    green: {},
    red: {},
  };

  // If it is the host
  if (indexOfPlayer === this.thisRoom.teamLeader) {
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

PickingMagicToken.prototype.numOfTargets = function (indexOfPlayer) {
  // If we are not the team leader
  if (indexOfPlayer !== this.thisRoom.teamLeader) {
    return null;
  }

  return 1;
};

PickingMagicToken.prototype.getStatusMessage = function (indexOfPlayer) {
  if (
    indexOfPlayer !== undefined &&
    indexOfPlayer === this.thisRoom.teamLeader
  ) {
    return `Pick the player on mission with a magic token.`;
  }

  // console.log(this.thisRoom.teamLeader);
  if (this.thisRoom.playersInGame[this.thisRoom.teamLeader]) {
    return `Waiting for ${
      this.thisRoom.playersInGame[this.thisRoom.teamLeader].username
    } to pick the player with a magic token.`;
  }

  return 'ERROR: Tell the admin if you see this, code 10.';
};

PickingMagicToken.prototype.getProhibitedIndexesToPick = function(indexOfPlayer){
  // If we are not the team leader
  if (indexOfPlayer !== this.thisRoom.teamLeader) {
    return null;
  }

  const prohibitedIndexes = [];

  for (let i = 0; i < this.thisRoom.playersInGame.length; i++) {
    if (!this.thisRoom.proposedTeam.includes(this.thisRoom.playersInGame[i].username)) {
      prohibitedIndexes.push(i);
    }
  }

  return prohibitedIndexes;
}

export default PickingMagicToken;
