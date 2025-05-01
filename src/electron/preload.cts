const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
	subscribeStatus: (callback: (statistic: any) => void) => callback({}),
	getStatisticData: () => {
		console.log('static');
	},
});
