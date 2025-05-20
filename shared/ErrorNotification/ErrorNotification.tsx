import { useEffect, useState } from "react";
import { ErrorNotificationProps } from "./ErrorNotificationProps";
import { Text, StyleSheet, Dimensions, Animated } from "react-native";
import { Colors, Fonts } from "../tokens";

export function ErrorNotification({ error }: ErrorNotificationProps) {
	const [isShown, setIsShown] = useState<boolean>(false);

	const animatedValue = new Animated.Value(-100);

	const onEnter = () => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 300,
			useNativeDriver: false,
		}).start(() => {
			console.log("aa", animatedValue);
			console.log("Animation finished");
		});
	};

	useEffect(() => {
		if (!error) {
			return;
		}

		setIsShown(true);

		// NO ANIMATION
		// Animated.timing(animatedValue, {
		// 	toValue: 0,
		// 	duration: 1000,
		// 	useNativeDriver: true,
		// }).start(() => {
		// 	console.log("aa", animatedValue);
		// });

		const timerId = setTimeout(() => {
			setIsShown(false);
		}, 3000);

		return () => {
			clearTimeout(timerId);
		};
	}, [error]);

	if (!isShown) {
		return <></>;
	}

	console.log(animatedValue);

	return (
		<Animated.View
			style={[
				styles.error,
				{ transform: [{ translateY: animatedValue }] },
			]}
			onLayout={onEnter}
		>
			<Text style={styles.errorText}>{error}</Text>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	error: {
		position: "absolute",
		width: Dimensions.get("window").width,
		top: 50,
		backgroundColor: Colors.red,
		padding: 15,
	},
	errorText: {
		fontSize: Fonts.f16,
		color: Colors.white,
		textAlign: "center",
	},
});
