import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';
import { Colors, Fonts, Gaps } from '../../../../shared/tokens';

interface MenuItemProps {
	drawer: DrawerContentComponentProps;
	icon: React.ReactNode;
	text: string;
	path: string;
}

export function MenuItem({ drawer, icon, text, path, ...props }: MenuItemProps & PressableProps) {
	const [clicked, setClicked] = useState<boolean>(false);
	const isActive = drawer.state.routes[drawer.state.index].name === path;

	return (
		<Pressable
			{...props}
			onPressIn={() => setClicked(true)}
			onPressOut={() => setClicked(false)}
			onPress={() => drawer.navigation.navigate(path)}
		>
			<View
				style={[
					styles.menu,
					{
						borderColor: isActive ? Colors.primary : Colors.black,
						backgroundColor: clicked || isActive ? Colors.violetDark : Colors.black,
					},
				]}
			>
				{icon}
				<Text style={styles.text}>{text}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	menu: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: Gaps.g20,
		paddingHorizontal: 24,
		paddingVertical: 16,
		borderRightWidth: 5,
	},
	text: {
		color: Colors.white,
		fontSize: Fonts.f16,
		fontFamily: Fonts.regular,
	},
});
