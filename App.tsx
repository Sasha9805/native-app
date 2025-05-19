import { Button, StyleSheet, Text, View, Image } from "react-native";
import { Input } from "./shared/Input/Input";
import { Colors, Gaps } from "./shared/tokens";

export default function App() {
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
					<Button title="Войти" />
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
