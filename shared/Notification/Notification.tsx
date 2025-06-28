import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
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
				const { alias } = response.notification.request.content.data;
				router.push(`/(app)/course/${alias}`);
			},
		);

		return () => {
			subRecieved.remove();
			subResponseReceived.remove();
		};
	}, []);

	return <></>;
}
