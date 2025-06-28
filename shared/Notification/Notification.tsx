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
		const subRecieved = Notifications.addNotificationReceivedListener((notification) => {
			console.log(notification.request.content.data);
		});

		const subResponseReceived = Notifications.addNotificationResponseReceivedListener(
			(response) => {
				console.log('clicked');
				console.log(response);
				console.log(response.notification.request.content.data);
			},
		);

		return () => {
			subRecieved.remove();
			subResponseReceived.remove();
		};
	}, []);

	return <></>;
}
