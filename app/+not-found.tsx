import { Text, View, Image, StyleSheet } from 'react-native';
import { Colors, Fonts, Gaps } from '../shared/tokens';
import { CustomLink } from '../shared/CustomLink/CustomLink';

export default function UnmatchedCustom() {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Image
					style={styles.image}
					source={require('../assets/images/unmatched.png')}
					resizeMode="contain"
				/>
				<Text style={styles.text}>
					Ооо... что-то пошло не так. Попробуйте вернуться на главный экран приложения
				</Text>
				<CustomLink href="/" text="На главный экран" replace />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 55,
	},
	content: {
		alignItems: 'center',
		gap: Gaps.g50,
	},
	image: {
		width: 204,
		height: 282,
	},
	text: {
		fontFamily: Fonts.regular,
		fontSize: Fonts.f18,
		color: Colors.white,
		textAlign: 'center',
	},
});
