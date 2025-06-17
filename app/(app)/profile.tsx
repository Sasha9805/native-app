import { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import {
	launchCameraAsync,
	launchImageLibraryAsync,
	useMediaLibraryPermissions,
	useCameraPermissions,
	PermissionStatus,
} from 'expo-image-picker';
import { Button } from '../../shared/Button/Button';

export default function Profile() {
	const [image, setImage] = useState<string | null>(null);
	const [cameraPermissions, requestCameraPermissions] = useCameraPermissions();
	const [libraryPermissions, requestLibraryPermissions] = useMediaLibraryPermissions();

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

	const verifyMediaPermissions = async () => {
		if (
			!libraryPermissions?.accessPrivileges ||
			libraryPermissions?.status === PermissionStatus.UNDETERMINED
		) {
			const res = await requestLibraryPermissions();
			return res.granted;
		}

		if (libraryPermissions?.status === PermissionStatus.DENIED) {
			Alert.alert('Недостаточно прав для доступа к фото');
			return false;
		}

		return libraryPermissions.granted;
	};

	const captureAvatar = async () => {
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
		if (!result.assets) {
			return;
		}
		setImage(result.assets[0].uri);
	};

	const pickAvatar = async () => {
		const isPermissionsGranted = await verifyMediaPermissions();
		if (!isPermissionsGranted) {
			return;
		}
		const result = await launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});
		console.log(result);
		if (!result.assets) {
			return;
		}
		setImage(result.assets[0].uri);
	};

	return (
		<View>
			<Text>Profile</Text>
			<Button text="Снять изображение" onPress={captureAvatar} />
			<Button text="Выбрать из галереи" onPress={pickAvatar} />
			{image && <Image source={{ uri: image, width: 100, height: 100 }} />}
		</View>
	);
}
