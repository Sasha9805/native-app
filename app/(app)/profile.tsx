import { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { ImageUploader } from '../../shared/ImageUploader/ImageUploader';
import { Gaps } from '../../shared/tokens';

export default function Profile() {
	const [image, setImage] = useState<string | null>(null);

	return (
		<View style={styles.container}>
			{image ? (
				<Image style={styles.image} source={{ uri: image }} />
			) : (
				<Image source={require('../../assets/images/avatar.png')} />
			)}
			<ImageUploader onUpload={setImage} />
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
	image: {
		width: 70,
		height: 70,
		borderRadius: 35,
	},
});
