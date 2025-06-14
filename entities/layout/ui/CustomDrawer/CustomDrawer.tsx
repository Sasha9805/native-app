import {
	DrawerContentScrollView,
	type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Colors } from '../../../../shared/tokens';
import { CustomLink } from '../../../../shared/CustomLink/CustomLink';

export function CustomDrawer(props: DrawerContentComponentProps) {
	return (
		<DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
			<View>
				<Text>TEEXT</Text>
			</View>
			<View>
				<Image
					style={styles.logo}
					source={require('../../../../assets/logo.png')}
					resizeMode="contain"
				/>
				<CustomLink text="Выход" href={'/login'} />
			</View>
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: Colors.black,
	},
	logo: {
		width: 220,
	},
});
