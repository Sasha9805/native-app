import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export function Notification() {
	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldPlaySound: true,
			shouldSetBadge: true,
			shouldShowBanner: true,
			shouldShowList: true,
		}),
	});

	useEffect(() => {
		const sub = Notifications.addNotificationReceivedListener((notification) => {
			console.log(notification.request.content.data);
		});

		return () => {
			sub.remove();
		};
	}, []);

	return <></>;
}
