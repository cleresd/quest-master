import constants from '../constants';
import {RewardData} from '../types';

const obj: RewardData = {
    adminReq: false,
    modReq: false,
    TOReq: false,
    devReq: false,
    gamesPlayedReq: 0,
    donationReq: constants.tier1_donation,
};

export default obj;
