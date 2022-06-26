import usernamesIndexes from '../../myFunctions/usernamesIndexes';

function LastChance(thisRoom_) {
  this.thisRoom = thisRoom_;

  this.phase = 'lastChance';
  this.showGuns = false;
}

LastChance.prototype.gameMove = function (
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
LastChance.prototype.buttonSettings = function (indexOfPlayer) {
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

LastChance.prototype.numOfTargets = function (indexOfPlayer) {
  /*if (this.thisRoom.playersInGame[indexOfPlayer].alliance === 'Resistance' ||
    this.thisRoom.playersInGame[indexOfPlayer].role === 'Mutineer') {
  }*/
  return 2;
};

LastChance.prototype.getStatusMessage = function (indexOfPlayer) {
  return `Good\'s Last Chance. Do according to rules.`;

  // return 'ERROR: Tell the admin if you see this, code 10.';
};

export default LastChance;
