import { Pressable, type PressableProps, StyleSheet, View } from 'react-native';
import MenuIcon from '../../../../assets/icons/menu';
import { useState } from 'react';
import { Colors } from '../../../../shared/tokens';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export function MenuButton({
	navigation,
	...props
}: PressableProps & {
	navigation: DrawerNavigationProp<Record<string, object | undefined>, string, undefined>;
}) {
	const [clicked, setClicked] = useState<boolean>(false);
	return (
		<Pressable
			{...props}
			onPressIn={() => setClicked(true)}
			onPressOut={() => setClicked(false)}
			onPress={() => navigation.toggleDrawer()}
		>
			<View
				style={[
					styles.button,
					{ backgroundColor: clicked ? Colors.violetDark : Colors.blackLight },
				]}
			>
				<MenuIcon />
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
		flex: 1,
	},
});
