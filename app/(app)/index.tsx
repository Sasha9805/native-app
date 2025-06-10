import { useAtom } from 'jotai';
import { Text, View } from 'react-native';
import { profileAtom } from '../../entities/user/model/user.state';
import { loginAtom } from '../../entities/auth/model/auth.state';
import { useEffect } from 'react';

export default function MyCourses() {
	const [profile] = useAtom(profileAtom);
	const [auth, login] = useAtom(loginAtom);

	useEffect(() => {
		login({ email: 'vasia@pupkin.ru', password: '12345678' });
	}, []);

	return (
		<View>
			<Text>
				{profile.profile?.name}
				{auth.access_token}
			</Text>
		</View>
	);
}
