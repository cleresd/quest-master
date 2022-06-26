import usernamesIndexes from '../../myFunctions/usernamesIndexes';
import PickingLeader from './pickingLeader';

function PickingAmuletTarget(thisRoom_) {
  this.thisRoom = thisRoom_;

  this.phase = 'pickingAmuletTarget';
  this.showGuns = true;
}

PickingAmuletTarget.prototype.gameMove = function (
  socket,
  buttonPressed,
  selectedPlayers
) {
  // If the person requesting is the current amulet target
  if (
    usernamesIndexes.getIndexFromUsername(
      this.thisRoom.playersInGame,
      socket.request.user.username
    ) === this.thisRoom.playerAmulet[this.thisRoom.playerAmulet.length - 1]
  ) {
    if (buttonPressed === 'no') {
      this.thisRoom.sendText(this.thisRoom.allSockets, `${socket.request.user.username} rejected to investigate anyone.`, "gameplay-text");
      return;
    }
    if (buttonPressed !== 'yes') {
      return;
    }

    // catch wrong number of targets
    if (selectedPlayers.length !== 1) {
      return;
    }

    if (!this.thisRoom.playerUsernamesInGame.includes(selectedPlayers[0])) {
      return;
    }
    const amuletTarget = this.thisRoom.playersInGame.findIndex(player => player.username === selectedPlayers[0]);

    if (this.thisRoom.playerAmuletTargets.includes(amuletTarget)) {
      socket.emit(
        'danger-alert',
        'You can\'t select a player that has already been investigated.'
      );

      return;
    }

    if (this.thisRoom.playerAmulet.includes(amuletTarget)) {
      socket.emit(
        'danger-alert',
        'You can\'t pick a player with an amulet!'
      );

      return;
    }

    this.thisRoom.playerAmuletTargets.push(amuletTarget);

    //--------------------------------------
    // Send out the gameplay text
    //--------------------------------------
    let str = `${socket.request.user.username} has investigate: ${selectedPlayers[0]}.`;

    this.thisRoom.sendText(this.thisRoom.allSockets, str, 'gameplay-text');

    if (this.thisRoom.roleKeysInPlay.includes('trickster')) {
      this.thisRoom.sendText(this.thisRoom.allSockets, 'Trickster in the game. Write loyalty manually in discord.', 'gameplay-text');

      this.thisRoom.phase = 'pickingTeam';
    } else {
      let targetAlliance = this.thisRoom.playersInGame[amuletTarget].alliance === 'Spy'
      ? 'красный'
      : 'синий';

      if (this.thisRoom.playersInGame[amuletTarget].role === 'Troublemaker') {
        targetAlliance = 'красный';
      }

      const str = `${this.thisRoom.playersInGame[amuletTarget].username} ${targetAlliance}!`;
      socket.emit(
        'danger-alert',
        str
      );
      // socket.emit('roomChatToClient', str);

      this.thisRoom.phase = 'pickingTeam';
    }

    this.thisRoom.requireSave = true;
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
PickingAmuletTarget.prototype.buttonSettings = function (indexOfPlayer) {
  const obj = {
    green: {},
    red: {},
  };

  // If it is the host
  if (indexOfPlayer === this.thisRoom.playerAmulet[this.thisRoom.playerAmulet.length - 1]) {
    obj.green.hidden = false;
    obj.green.disabled = true;
    obj.green.setText = 'Pick';

    obj.red.hidden = false;
    obj.red.disabled = false;
    obj.red.setText = 'Reject to investigate anyone';
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

PickingAmuletTarget.prototype.numOfTargets = function (indexOfPlayer) {
  // If we are not the team leader
  if (indexOfPlayer !== this.thisRoom.playerAmulet[this.thisRoom.playerAmulet.length - 1]) {
    return null;
  }

  return 1;
};

PickingAmuletTarget.prototype.getStatusMessage = function (indexOfPlayer) {
  if (
    indexOfPlayer !== undefined &&
    indexOfPlayer === this.thisRoom.playerAmulet[this.thisRoom.playerAmulet.length - 1]
  ) {
    return `Pick who to check`;
  }

  // console.log(this.thisRoom.teamLeader);
  if (this.thisRoom.playersInGame[this.thisRoom.playerAmulet[this.thisRoom.playerAmulet.length - 1]]) {
    return `Waiting for ${
      this.thisRoom.playersInGame[this.thisRoom.playerAmulet[this.thisRoom.playerAmulet.length - 1]].username
    } to pick who to check`;
  }

  return 'ERROR: Tell the admin if you see this, code 10.';
};


PickingLeader.prototype.getProhibitedIndexesToPick = function(indexOfPlayer){
  // If we are not the team leader
  if (indexOfPlayer !== this.thisRoom.teamLeader) {
    return null;
  }

  return this.thisRoom.playerAmulet.concat(this.thisRoom.playerAmuletTargets || []);
}

export default PickingAmuletTarget;
