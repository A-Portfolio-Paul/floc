	 import {alerts} from '../stores'
    
    // update alerts
	const updateAlert = (msg, msgType) => {
		alerts.update((val) => {
			val = { msg: msg, msgType: msgType };
			return val;
		});
	};

    export {updateAlert}