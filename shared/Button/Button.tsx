import {
	Pressable,
	type PressableProps,
	StyleSheet,
	Text,
	Animated,
} from "react-native";
import { Colors, Fonts, Radius } from "../tokens";

export function Button({ text, ...props }: PressableProps & { text: string }) {
	const animatedValue = new Animated.Value(100);
	const color = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: [Colors.primaryHover, Colors.primary],
	});

	Animated.timing(animatedValue, {
		toValue: 0,
		duration: 2000,
		useNativeDriver: true,
	}).start();

	return (
		<Pressable {...props}>
			<Animated.View style={[styles.button, { backgroundColor: color }]}>
				<Text style={styles.text}>{text}</Text>
			</Animated.View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: Radius.r10,
		height: 58,
	},
	text: {
		color: Colors.white,
		fontSize: Fonts.f18,
	},
});
