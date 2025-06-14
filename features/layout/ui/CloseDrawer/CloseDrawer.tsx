import { Pressable, StyleSheet, View } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import CloseIcon from '../../../../assets/icons/close';

export function CloseDrawer({ navigation }: DrawerContentComponentProps) {
	return (
		<View style={styles.button}>
			<Pressable onPress={() => navigation.closeDrawer()}>
				<CloseIcon />
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		right: 20,
		zIndex: 1,
	},
});
