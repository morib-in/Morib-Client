import { Notification, app } from 'electron';
import path from 'path';

const iconPath = path.join(app.getAppPath(), 'dist-electron/morib_logo.png');

export const showNotification = (title: string, body: string) => {
	const notification = new Notification({
		title,
		body,
		icon: iconPath,
		silent: false,
	});

	notification.show();
};
