import usernamesIndexes from '../../myFunctions/usernamesIndexes';
import PickingLeader from './pickingLeader';

function PickingAmuletHolder(thisRoom_) {
  this.thisRoom = thisRoom_;

  this.phase = 'pickingAmuletHolder';
  this.showGuns = true;
}

PickingAmuletHolder.prototype.gameMove = function (
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

  // If the person requesting is the previous team leader
  if (
    usernamesIndexes.getIndexFromUsername(
      this.thisRoom.playersInGame,
      socket.request.user.username
    ) === this.thisRoom.previousTeamLeader
  ) {
    const amuletPlayer = this.thisRoom.playersInGame.findIndex(player => player.username === selectedPlayers[0]);

    if (this.thisRoom.playerVeterans.includes(amuletPlayer)) {
      socket.emit(
        'danger-alert',
        'You can\'t pick a player with a veteran token!'
      );

      return;
    }

    if (amuletPlayer === this.thisRoom.teamLeader) {
      socket.emit(
        'danger-alert',
        'You can\'t pick the current team leader!'
      );

      return;
    }

    if (this.thisRoom.playerAmulet.includes(amuletPlayer)) {
      socket.emit(
        'danger-alert',
        'You can\'t pick a player with an amulet!'
      );

      return;
    }

    this.thisRoom.playerAmulet.push(amuletPlayer);

    //--------------------------------------
    // Send out the gameplay text
    //--------------------------------------
    let str = `${socket.request.user.username} has give an amulet to: ${selectedPlayers[0]}.`;

    this.thisRoom.sendText(this.thisRoom.allSockets, str, 'gameplay-text');

    this.thisRoom.phase = 'pickingAmuletTarget';

    // var str1 = `Mission ${this.thisRoom.missionNum}.${
    //   this.thisRoom.pickNum
    // } was approved.`;
    // this.thisRoom.sendText(this.thisRoom.allSockets, str1, 'gameplay-text');
  } else {
    console.log(
      `User ${socket.request.user.username} is not the previous team leader. Cannot pick.`
    );
  }
};

// Returns a object with green and red keys.
// Green and Red must both have the following properties:
//  hidden          - Is the button hidden?
//  disabled        - Is the button disabled?
//  setText         - What text to display in the button
PickingAmuletHolder.prototype.buttonSettings = function (indexOfPlayer) {
  const obj = {
    green: {},
    red: {},
  };

  // If it is the host
  if (indexOfPlayer === this.thisRoom.previousTeamLeader) {
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

PickingAmuletHolder.prototype.numOfTargets = function (indexOfPlayer) {
  // If we are not the team leader
  if (indexOfPlayer !== this.thisRoom.previousTeamLeader) {
    return null;
  }

  return 1;
};

PickingAmuletHolder.prototype.getStatusMessage = function (indexOfPlayer) {
  if (
    indexOfPlayer !== undefined &&
    indexOfPlayer === this.thisRoom.previousTeamLeader
  ) {
    return `Pick who to give the amulet to.`;
  }

  // console.log(this.thisRoom.teamLeader);
  if (this.thisRoom.playersInGame[this.thisRoom.previousTeamLeader]) {
    return `Waiting for ${
      this.thisRoom.playersInGame[this.thisRoom.previousTeamLeader].username
    } to pick who to give the amulet to.`;
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

export default PickingAmuletHolder;
