import { StyleSheet, View, Image } from 'react-native';
import { Input } from '../shared/Input/Input';
import { Button } from '../shared/Button/Button';
import { Colors, Gaps } from '../shared/tokens';
import { ErrorNotification } from '../shared/ErrorNotification/ErrorNotification';
import { useState } from 'react';
import { CustomLink } from '../shared/CustomLink/CustomLink';

// /

export default function Login() {
	const [error, setError] = useState<string | undefined>();
	const alert = () => {
		setError('Неверный логин или пароль');
		setTimeout(() => setError(undefined), 4000);
	};

	return (
		<View style={styles.container}>
			<ErrorNotification error={error} />
			<View style={styles.content}>
				<Image style={styles.logo} source={require('../assets/logo.png')} resizeMode="contain" />
				<View style={styles.form}>
					<Input placeholder="Email" />
					<Input isPassword placeholder="Password" />
					<Button text="Войти" onPress={alert} />
				</View>
				<CustomLink href="/restore" text="Восстановить пароль" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 55,
		backgroundColor: Colors.black,
	},
	content: {
		alignItems: 'center',
		gap: Gaps.g50,
	},
	form: {
		gap: Gaps.g16,
		alignSelf: 'stretch',
	},
	logo: {
		width: 220,
	},
});
