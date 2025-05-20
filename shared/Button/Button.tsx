import {
	Pressable,
	type PressableProps,
	StyleSheet,
	Text,
	View,
	Animated,
} from "react-native";
import { Colors, Fonts, Radius } from "../tokens";

export function Button({ text, ...props }: PressableProps & { text: string }) {
	const animatedValue = new Animated.ValueXY({ x: 0, y: 0 });
	Animated.timing(animatedValue, {
		// spring without duration
		toValue: {
			x: 100,
			y: 100,
		},
		duration: 2000,
		useNativeDriver: true,
	}).start();
	return (
		<Pressable {...props}>
			<Animated.View
				// style={{
				// 	...styles.button,
				// 	transform: [
				// 		{ translateX: animatedValue.x },
				// 		{ translateY: animatedValue.y },
				// 	],
				// }}
				style={[
					styles.button,
					{
						transform: [
							{ translateX: animatedValue.x },
							{ translateY: animatedValue.y },
						],
					},
				]}
			>
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
		backgroundColor: Colors.primary,
		height: 58,
	},
	text: {
		color: Colors.white,
		fontSize: Fonts.f18,
	},
});
