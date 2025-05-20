import {
	StyleSheet,
	Text,
	View,
	Image,
	Alert,
	ToastAndroid,
	Platform,
} from "react-native";
import { Input } from "./shared/Input/Input";
import { Button } from "./shared/Button/Button";
import { Colors, Gaps } from "./shared/tokens";

export default function App() {
	const alert = () => {
		// Alert.alert("Ошибка", "Неверный логин или пароль", [
		// 	{ text: "Хорошо", onPress: () => {}, style: "destructive" },
		// ]);

		if (Platform.OS === "android") {
			ToastAndroid.showWithGravity(
				"Неверный логин или пароль",
				ToastAndroid.LONG,
				ToastAndroid.CENTER
			);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Image
					style={styles.logo}
					source={require("./assets/logo.png")}
					resizeMode="contain"
				/>
				<View style={styles.form}>
					<Input placeholder="Email" />
					<Input isPassword placeholder="Password" />
					<Button text="Войти" onPress={alert} />
				</View>
				<Text>Восстановить пароль</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 55,
		backgroundColor: Colors.black,
	},
	content: {
		alignItems: "center",
		gap: Gaps.g50,
	},
	form: {
		gap: Gaps.g16,
		alignSelf: "stretch",
	},
	logo: {
		width: 220,
	},
});
