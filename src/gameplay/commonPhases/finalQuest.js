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
  const blindHunterIndex = this.thisRoom.playersInGame.findIndex(player => player.role === 'BlindHunter');

  // If the person requesting is the Blind Hunter
  if (
    usernamesIndexes.getIndexFromUsername(
      this.thisRoom.playersInGame,
      socket.request.user.username
    ) === blindHunterIndex
  ) {
    if (buttonPressed === 'yes') {
      this.thisRoom.phase = 'last';
    } else if (buttonPressed === 'no') {
      // this.thisRoom.teamLeader = blindHunterIndex;
      this.thisRoom.phase = 'hunt';
    }
  } else {
    console.log(
      `User ${socket.request.user.username} is not the Blind Hunter. Cannot pick.`
    );
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
  const blindHunterIndex = this.thisRoom.playersInGame.findIndex(player => player.role === 'BlindHunter');

  // If it is the Blind Hunter
  if (indexOfPlayer === blindHunterIndex) {
    obj.green.hidden = false;
    obj.green.disabled = false;
    obj.green.setText = 'Good\'s Last Chance';

    obj.red.hidden = true;
    obj.red.disabled = true;
    obj.red.setText = 'The Hunt';
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
  return 0;
};

Hunt.prototype.getStatusMessage = function (indexOfPlayer) {
  const blindHunterIndex = this.thisRoom.playersInGame.findIndex(player => player.role === 'BlindHunter');

  if (
    indexOfPlayer !== undefined &&
    indexOfPlayer === blindHunterIndex
  ) {
    return `Discussion time! Wait until discussion ends! Then the Blind Hunter will make a choice. (You are a Blind Hunter)`;
  }

  return `Discussion time! Wait until discussion ends! Then the Blind Hunter will make a choice. `;

  // return 'ERROR: Tell the admin if you see this, code 10.';
};

export default Hunt;
