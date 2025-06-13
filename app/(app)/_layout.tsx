import { Redirect } from 'expo-router';
import { useAtomValue } from 'jotai';
import { authAtom } from '../../entities/auth/model/auth.state';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AppLayout() {
	const { access_token } = useAtomValue(authAtom);

	if (!access_token) {
		return <Redirect href="/login" />;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer>
				<Drawer.Screen name="index" />
			</Drawer>
		</GestureHandlerRootView>
	);
}
