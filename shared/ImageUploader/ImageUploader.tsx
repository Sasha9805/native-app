import {
	useMediaLibraryPermissions,
	PermissionStatus,
	launchImageLibraryAsync,
} from 'expo-image-picker';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import UploadIcon from '../../assets/icons/upload';
import { Colors, Fonts, Gaps, Radius } from '../tokens';
import FormData from 'form-data';
import axios, { AxiosError } from 'axios';
import { FILE_API } from '../api';
import { UploadResponse } from './ImageUploader.interface';

interface ImageUploaderProps {
	onUpload: (uri: string) => void;
	onError: (error: string) => void;
}

export function ImageUploader({ onUpload, onError }: ImageUploaderProps) {
	const [libraryPermissions, requestLibraryPermissions] = useMediaLibraryPermissions();

	const upload = async () => {
		const isPermissionsGranted = await verifyMediaPermissions();
		if (!isPermissionsGranted) {
			onError('Недостаточно прав');
			return;
		}

		const asset = await pickImage();
		if (!asset) {
			onError('Не выбрано изображение');
			return;
		}

		const uploadedUrl = await uploadToServer(asset.uri, asset.fileName ?? '');
		if (!uploadedUrl) {
			onError('Не удалось загрузить изображение');
			return;
		}
		onUpload(uploadedUrl);
	};

	const verifyMediaPermissions = async () => {
		if (!libraryPermissions || libraryPermissions?.status === PermissionStatus.UNDETERMINED) {
			const res = await requestLibraryPermissions();
			return res.granted;
		}

		if (libraryPermissions?.status === PermissionStatus.DENIED) {
			Alert.alert('Недостаточно прав для доступа к фото');
			return false;
		}

		return libraryPermissions.granted;
	};

	const pickImage = async () => {
		const result = await launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});

		if (!result.assets) {
			return null;
		}

		return result.assets[0];
	};

	const uploadToServer = async (uri: string, name: string) => {
		const formData = new FormData();
		formData.append('files', {
			uri,
			name,
			type: 'image/jpeg',
		});
		try {
			const { data } = await axios.post<UploadResponse>(FILE_API.uploadImage, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log(data);
			return data.urls.original;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error(error);
			}
			return null;
		}
	};

	return (
		<Pressable onPress={upload}>
			<View style={styles.container}>
				<UploadIcon />
				<Text style={styles.text}>Загрузить изображение</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: Gaps.g8,
		backgroundColor: Colors.violetDark,
		borderRadius: Radius.r10,
		paddingHorizontal: 20,
		paddingVertical: 17,
	},
	text: {
		color: Colors.white,
		fontSize: Fonts.f14,
		fontFamily: Fonts.regular,
	},
});
