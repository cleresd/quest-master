import usernamesIndexes from '../../myFunctions/usernamesIndexes';

function Hunt(thisRoom_) {
  this.thisRoom = thisRoom_;

  this.phase = 'hunt';
  this.showGuns = false;
}

Hunt.prototype.gameMove = function (
  socket,
  buttonPressed,
  selectedPlayers
) {
};

// Returns a object with green and red keys.
// Green and Red must both have the following properties:
//  hidden          - Is the button hidden?
//  disabled        - Is the button disabled?
//  setText         - What text to display in the button
Hunt.prototype.buttonSettings = function (indexOfPlayer) {
  const obj = {
    green: {},
    red: {},
  };

  // If it is the host
  if (indexOfPlayer === this.thisRoom.teamLeader) {
    obj.green.hidden = true;
    obj.green.disabled = true;
    obj.green.setText = '';

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

Hunt.prototype.numOfTargets = function (indexOfPlayer) {
  const blindHunterIndex = this.thisRoom.playersInGame.findIndex(player => player.role === 'BlindHunter');

  if (indexOfPlayer !== blindHunterIndex) {
    return null;
  }

  return 2;
};

Hunt.prototype.getStatusMessage = function (indexOfPlayer) {
  const blindHunterIndex = this.thisRoom.playersInGame.findIndex(player => player.role === 'BlindHunter');

  if (
    indexOfPlayer !== undefined &&
    indexOfPlayer === blindHunterIndex
  ) {
    return `The Hunt! Choose players according to the rules. Then say their roles in discord.`;
  }

  if (this.thisRoom.playersInGame[blindHunterIndex]) {
    return `Everybody silence! Waiting for ${
      this.thisRoom.playersInGame[blindHunterIndex].username
    } to make a choice.`;
  }

  return 'ERROR: Tell the admin if you see this, code 10.';
};

export default Hunt;
