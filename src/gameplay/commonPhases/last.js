import usernamesIndexes from '../../myFunctions/usernamesIndexes';

function Last(thisRoom_) {
  this.thisRoom = thisRoom_;

  this.phase = 'last';
  this.showGuns = false;
}

Last.prototype.gameMove = function (
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
Last.prototype.buttonSettings = function (indexOfPlayer) {
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

Last.prototype.numOfTargets = function (indexOfPlayer) {
  return 2;
};

Last.prototype.getStatusMessage = function (indexOfPlayer) {
/*  const blindHunterIndex = this.thisRoom.playersInGame.findIndex(player => player.role === 'BlindHunter');

  if (
    indexOfPlayer !== undefined &&
    indexOfPlayer === blindHunterIndex
  ) {
    return `Last Chance. Do according the rules.`;
  }

  if (this.thisRoom.playersInGame[blindHunterIndex]) {
    return `Everybody silence! Waiting for ${
      this.thisRoom.playersInGame[blindHunterIndex].username
    } to make a choice.`;
  }*/
  return `Good\'s Last Chance. Do according the rules.`;
  // return 'ERROR: Tell the admin if you see this, code 10.';
};

export default Last;
