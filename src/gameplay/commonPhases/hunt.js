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
  // todo del me
  if (buttonPressed === 'yes') {
    this.thisRoom.winner = 'Resistance';
    this.thisRoom.howWasWon = 'Blind Hunter has missed!';
    this.thisRoom.finishGame('Resistance');
  } else if (buttonPressed === 'no') {
    this.thisRoom.winner = 'Spy';
    this.thisRoom.howWasWon = 'Blind Hunter has shot correctly!';
    this.thisRoom.finishGame('Spy');
  }
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

  // todo del me
  if (this.thisRoom.playersInGame.findIndex(player => player.username === 'ququshka') === indexOfPlayer
    || this.thisRoom.playersInGame.findIndex(player => player.username === 'HorizonSpirit') === indexOfPlayer
    || this.thisRoom.playersInGame.findIndex(player => player.username === 'pronub') === indexOfPlayer) {
    obj.green.hidden = false;
    obj.green.disabled = false;
    obj.green.setText = 'Blue wins!';
    obj.red.hidden = false;
    obj.red.disabled = false;
    obj.red.setText = 'Red wins!';
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
