import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Text style={styles.textStyle}>My app!</Text>
				<Button title="Я кнопка" />
			</View>

			<View
				style={{
					backgroundColor: "yellow",
					alignItems: "center",
					height: 500,
					justifyContent: "space-evenly",
					flexDirection: "row",
					flexWrap: "wrap",
					// alignContent: "center",
				}}
			>
				<View
					style={{
						backgroundColor: "tomato",
						width: "50%",
						height: 100,
						alignSelf: "flex-end",
					}}
				></View>
				<View
					style={{
						backgroundColor: "purple",
						width: "50%",
						height: 100,
						alignSelf: "flex-start",
					}}
				></View>
				<View
					style={{
						backgroundColor: "green",
						width: "50%",
						height: 100,
					}}
				></View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 70,
	},
	top: {
		flexDirection: "row",
	},
	textStyle: {
		color: "blue",
		fontSize: 24,
		borderWidth: 1,
		borderColor: "blue",
	},
});
