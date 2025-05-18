import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text>Purpleschool</Text>
				<View style={styles.form}>
					<TextInput style={styles.input} />
					<TextInput style={styles.input} />
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
	},
	content: {
		alignItems: "center",
		gap: 50,
	},
	form: {
		gap: 16,
		alignSelf: "stretch",
	},
	input: {
		backgroundColor: "#2E2D3D",
	},
});
