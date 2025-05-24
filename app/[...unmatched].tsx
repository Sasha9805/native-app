import { Text, View } from 'react-native';
import { Colors } from '../shared/tokens';

export default function UnmatchedCustom() {
	return (
		<View>
			<Text style={{ color: Colors.white }}>Не нашли</Text>
		</View>
	);
}
