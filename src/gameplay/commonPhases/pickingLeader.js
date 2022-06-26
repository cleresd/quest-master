import usernamesIndexes from '../../myFunctions/usernamesIndexes';

function PickingLeader(thisRoom_) {
  this.thisRoom = thisRoom_;

  this.phase = 'pickingLeader';
  this.showGuns = true;
}

PickingLeader.prototype.gameMove = function (
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
    const newTeamLeader = this.thisRoom.playersInGame.findIndex(player => player.username === selectedPlayers[0]);

    if (this.thisRoom.playerVeterans.includes(newTeamLeader)) {
      socket.emit(
        'danger-alert',
        'You cannot select a player who was already a team leader!'
      );

      return;
    }

    if (this.thisRoom.playerAmulet.includes(newTeamLeader)) {
      socket.emit(
        'danger-alert',
        'You can\'t pick a player with an amulet!'
      );

      return;
    }

    this.thisRoom.previousTeamLeader = this.thisRoom.teamLeader;
    this.thisRoom.teamLeader = newTeamLeader;

    //--------------------------------------
    // Send out the gameplay text
    //--------------------------------------
    let str = `${socket.request.user.username} has picked: ${selectedPlayers[0]}.`;

    this.thisRoom.sendText(this.thisRoom.allSockets, str, 'gameplay-text');

    const previousMissionGoal =
      this.thisRoom.numPlayersOnMission[
      this.thisRoom.playersInGame.length - this.thisRoom.minPlayers
        ][this.thisRoom.missionNum - 2];

    if (previousMissionGoal.length !== 1 && previousMissionGoal.includes('A')) {
      this.thisRoom.phase = 'pickingAmuletHolder';
    } else {
      this.thisRoom.phase = 'pickingTeam';
    }

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
PickingLeader.prototype.buttonSettings = function (indexOfPlayer) {
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

PickingLeader.prototype.numOfTargets = function (indexOfPlayer) {
  // If we are not the team leader
  if (indexOfPlayer !== this.thisRoom.teamLeader) {
    return null;
  }

  return 1;
};

PickingLeader.prototype.getStatusMessage = function (indexOfPlayer) {
  if (
    indexOfPlayer !== undefined &&
    indexOfPlayer === this.thisRoom.teamLeader
  ) {
    return `Pick a new team leader. You can't pick a player with a veteran token.`;
  }

  // console.log(this.thisRoom.teamLeader);
  if (this.thisRoom.playersInGame[this.thisRoom.teamLeader]) {
    return `Waiting for ${
      this.thisRoom.playersInGame[this.thisRoom.teamLeader].username
    } to pick a new team leader.`;
  }

  return 'ERROR: Tell the admin if you see this, code 10.';
};

PickingLeader.prototype.getProhibitedIndexesToPick = function(indexOfPlayer){
  // If we are not the team leader
  if (indexOfPlayer !== this.thisRoom.teamLeader) {
    return null;
  }

  return this.thisRoom.playerVeterans.concat(this.thisRoom.playerAmulet || []).concat(this.thisRoom.teamLeader);
}

export default PickingLeader;
