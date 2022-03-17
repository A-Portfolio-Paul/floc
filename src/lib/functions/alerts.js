	 import {alerts} from '../stores'
    
    // update alerts
	const updateAlert = (msg, msgType) => {
		console.log('upDateAlert initiated......')
		alerts.update((val) => {
			val = { msg: msg, msgType: msgType };
			return val;
		});
	};

    export {updateAlert}