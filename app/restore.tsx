// /restore

import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Restore() {
	return (
		<View>
			{/* <Stack.Screen
				options={{
					title: 'Восстановить пароль',
					statusBarStyle: 'light',
				}}
			/> */}
			<Link href="/">
				<Text>Restore</Text>
			</Link>
		</View>
	);
}
