import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useState } from 'react';
import { Pressable, Text, View, type PressableProps } from 'react-native';

interface MenuItemProps {
	navigation: DrawerContentComponentProps['navigation'];
	icon: React.ReactNode;
	text: string;
	path: string;
}

export function MenuItem({
	navigation,
	icon,
	text,
	path,
	...props
}: MenuItemProps & PressableProps) {
	const [clicked, setClicked] = useState<boolean>(false);

	return (
		<Pressable
			{...props}
			onPressIn={() => setClicked(true)}
			onPressOut={() => setClicked(false)}
			onPress={() => navigation.navigate(path)}
		>
			<View>
				{icon}
				<Text>{text}</Text>
			</View>
		</Pressable>
	);
}
