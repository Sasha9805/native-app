import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ImageUploader } from '../../shared/ImageUploader/ImageUploader';
import { Gaps } from '../../shared/tokens';
import { Avatar } from '../../entities/user/ui/Avatar/Avatar';
import { useAtom } from 'jotai';
import { updateProfileAtom } from '../../entities/user/model/user.state';
import { Button } from '../../shared/Button/Button';
import * as Sharing from 'expo-sharing';

export default function Profile() {
	const [image, setImage] = useState<string | null>(null);
	const [profile, updateProfile] = useAtom(updateProfileAtom);

	const shareProfile = async () => {
		const isSharingAvailable = await Sharing.isAvailableAsync();
		if (!isSharingAvailable) {
			return;
		}

		try {
			await Sharing.shareAsync('https://purpleschool.ru', {
				dialogTitle: 'Поделиться профилем',
			});
		} catch (e) {
			console.error(e);
		}
	};

	const submitProfile = () => {
		if (!image) {
			return;
		}

		updateProfile({ photo: image });
	};

	useEffect(() => {
		if (profile && profile.profile?.photo) {
			setImage(profile.profile?.photo);
		}
	}, [profile]);

	return (
		<View>
			<View style={styles.container}>
				<Avatar image={image} />
				<ImageUploader onUpload={setImage} onError={(e) => console.log(e)} />
			</View>
			<Button text="Сохранить" onPress={submitProfile} />
			<Button text="Поделиться" onPress={shareProfile} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: Gaps.g20,
		paddingHorizontal: 30,
		paddingVertical: 20,
	},
});
