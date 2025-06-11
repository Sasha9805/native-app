import { useAtomValue } from 'jotai';
import { Text, View } from 'react-native';
import { authAtom } from '../../entities/auth/model/auth.state';
import { useEffect } from 'react';
import { router, useRootNavigationState, useNavigation } from 'expo-router';

export default function MyCourses() {
	const { access_token } = useAtomValue(authAtom);
	// const state = useRootNavigationState();
	const navigation = useNavigation();
	const navigationState = navigation.getState();

	useEffect(() => {
		if (!navigationState?.key) {
			return;
		}
		if (!access_token) {
			router.replace('/login');
		}
	}, [access_token, navigationState]);

	return (
		<View>
			<Text>Test</Text>
		</View>
	);
}
