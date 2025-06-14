import { Redirect } from 'expo-router';
import { useAtomValue } from 'jotai';
import { authAtom } from '../../entities/auth/model/auth.state';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors, Fonts } from '../../shared/tokens';
import { StatusBar } from 'expo-status-bar';
import { MenuButton } from '../../features/layout/ui/MenuButton/MenuButton';

export default function AppLayout() {
	const { access_token } = useAtomValue(authAtom);

	if (!access_token) {
		return <Redirect href="/login" />;
	}

	return (
		<GestureHandlerRootView>
			<StatusBar style="light" />
			<Drawer
				screenOptions={({ navigation }) => ({
					headerStyle: {
						backgroundColor: Colors.blackLight,
						// shadowColor: Colors.blackLight,
						// shadowOpacity: 0,
						// height: 30,
					},
					headerLeft: () => {
						return <MenuButton navigation={navigation} />;
					},
					headerStatusBarHeight: 0,
					headerTitleStyle: {
						color: Colors.white,
						fontFamily: Fonts.regular,
						fontSize: Fonts.f20,
					},
					headerTitleAlign: 'center',
					sceneStyle: {
						backgroundColor: Colors.black,
					},
				})}
			>
				<Drawer.Screen
					name="index"
					options={{
						title: 'Мои курсы',
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
}
