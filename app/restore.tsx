// /restore

import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { Colors } from '../shared/tokens';

export default function Restore() {
	return (
		<View>
			<Link href="/" push>
				<Text style={{ color: Colors.white }}>Restore</Text>
			</Link>
		</View>
	);
}
