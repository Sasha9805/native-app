import { View, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useAtomValue, useSetAtom } from 'jotai';
import { courseAtom, loadCourseAtom } from '../../entities/course/model/course.state';
import { useEffect } from 'react';
import { CourseCard } from '../../widgets/course/ui/CourseCard/CourseCard';
import { StudentCourseDescription } from '../../entities/course/model/course.model';
import { Colors } from '../../shared/tokens';
import { Button } from '../../shared/Button/Button';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

export default function MyCourses() {
	const { courses, isLoading } = useAtomValue(courseAtom);
	const loadCourses = useSetAtom(loadCourseAtom);

	useEffect(() => {
		loadCourses();
	}, []);

	const renderCourse = ({ item }: { item: StudentCourseDescription }) => {
		return (
			<View style={styles.item}>
				<CourseCard {...item} />
			</View>
		);
	};

	const allowsNotifications = async () => {
		const settings = await Notifications.getPermissionsAsync();
		return (
			settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
		);
	};

	const requestPermissions = async () => {
		return Notifications.requestPermissionsAsync({
			ios: {
				allowAlert: true,
				allowBadge: true,
				allowSound: true,
			},
		});
	};

	const scheduleNotification = async () => {
		const granted = await allowsNotifications();
		if (!granted) {
			await requestPermissions();
		}
		if (Device.isDevice) {
			const projectId =
				Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
			const pushTokenString = (
				await Notifications.getExpoPushTokenAsync({
					projectId,
				})
			).data;
			console.log(pushTokenString);
		}
		// Notifications.scheduleNotificationAsync({
		// 	content: {
		// 		title: 'Новый крус Typescript',
		// 		body: 'Начни учиться уже сейчас',
		// 		data: {
		// 			alias: 'typescript',
		// 		},
		// 	},
		// 	trigger: {
		// 		type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
		// 		seconds: 5,
		// 	},
		// });
	};

	return (
		<>
			{isLoading && (
				<ActivityIndicator style={styles.activity} size="large" color={Colors.primary} />
			)}
			<Button text="Напомнить" onPress={scheduleNotification} />
			{courses.length > 0 && (
				<FlatList
					refreshControl={
						<RefreshControl
							colors={[Colors.primary]}
							progressBackgroundColor={Colors.white}
							tintColor={Colors.primary}
							titleColor={Colors.primary}
							refreshing={isLoading}
							onRefresh={loadCourses}
						/>
					}
					data={courses}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderCourse}
				/>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	item: {
		padding: 20,
	},
	activity: {
		marginTop: 30,
	},
});
