import { Stack } from 'expo-router';
import { Colors } from '../shared/tokens';

export default function RootLayout() {
	return (
		<Stack
			screenOptions={{
				statusBarStyle: 'light',
				contentStyle: {
					backgroundColor: Colors.black,
				},
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen
				name="restore"
				options={{
					presentation: 'fullScreenModal',
					// headerShown: false,
				}}
			/>
		</Stack>
	);
}
