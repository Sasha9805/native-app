import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { Input } from '../shared/Input/Input';
import { Button } from '../shared/Button/Button';
import { Colors, Gaps } from '../shared/tokens';
import { ErrorNotification } from '../shared/ErrorNotification/ErrorNotification';
import { useEffect, useState } from 'react';
import { CustomLink } from '../shared/CustomLink/CustomLink';
import { useAtom } from 'jotai';
import { loginAtom } from '../entities/auth/model/auth.state';
import { router } from 'expo-router';
import { useScreenOrientation } from '../shared/hooks';
import { Orientation } from 'expo-screen-orientation';

export default function Login() {
	const [localError, setLocalError] = useState<string | undefined>();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [{ access_token, isLoading, error }, login] = useAtom(loginAtom);
	const orientation = useScreenOrientation();
	console.log(orientation);

	const submit = () => {
		if (!email) {
			setLocalError('Не введен email');
			return;
		}

		if (!password) {
			setLocalError('Не введен пароль');
			return;
		}

		login({ email, password });
	};

	useEffect(() => {
		if (error) {
			setLocalError(error);
		}
	}, [error]);

	useEffect(() => {
		if (access_token) {
			router.replace('/(app)'); // '/'
		}
	}, [access_token]);

	return (
		<View style={styles.container}>
			<ErrorNotification error={localError} />
			<View style={styles.content}>
				<Image style={styles.logo} source={require('../assets/logo.png')} resizeMode="contain" />
				<View style={styles.form}>
					<View
						style={[
							styles.inputs,
							{ flexDirection: orientation === Orientation.PORTRAIT_UP ? 'column' : 'row' },
						]}
					>
						<Input
							style={{
								width:
									orientation === Orientation.PORTRAIT_UP
										? 'auto'
										: Dimensions.get('window').width / 2 - Gaps.g16 - 48,
							}}
							placeholder="Email"
							value={email}
							onChangeText={setEmail}
						/>
						<Input
							style={{
								width:
									orientation === Orientation.PORTRAIT_UP
										? 'auto'
										: Dimensions.get('window').width / 2 - Gaps.g16 - 48,
							}}
							isPassword
							placeholder="Password"
							value={password}
							onChangeText={setPassword}
						/>
					</View>
					<Button text="Войти" isLoading={isLoading} onPress={submit} />
				</View>
				<CustomLink href={'/restore'} text="Восстановить пароль" push />
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
	inputs: {
		gap: Gaps.g16,
	},
});
