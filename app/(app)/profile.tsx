import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { Button } from '../../shared/Button/Button';

export default function Profile() {
	const [image, setImage] = useState(null);
	const [cameraPermissions, requestCameraPermissions] = useCameraPermissions();

	const verifyCameraPermissions = async () => {
		if (!cameraPermissions || cameraPermissions?.status === PermissionStatus.UNDETERMINED) {
			const res = await requestCameraPermissions();
			return res.granted;
		}

		if (cameraPermissions?.status === PermissionStatus.DENIED) {
			Alert.alert('Недостаточно прав для доступа к камере');
			return false;
		}

		return cameraPermissions.granted;
	};

	const pickAvatar = async () => {
		const isPermissionsGranted = await verifyCameraPermissions();
		if (!isPermissionsGranted) {
			return;
		}
		const result = await launchCameraAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});
		console.log(result);
	};

	return (
		<View>
			<Text>Profile</Text>
			<Button text="Выбрать изображение" onPress={pickAvatar} />
		</View>
	);
}
