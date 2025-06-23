import { ScrollView, View, StyleSheet } from 'react-native';
import { useAtomValue, useSetAtom } from 'jotai';
import { courseAtom, loadCourseAtom } from '../../entities/course/model/course.state';
import { useEffect } from 'react';
import { CourseCard } from '../../entities/course/ui/CourseCard/CourseCard';
import { Gaps } from '../../shared/tokens';

export default function MyCourses() {
	const { courses, isLoading, error } = useAtomValue(courseAtom);
	const loadCourses = useSetAtom(loadCourseAtom);

	useEffect(() => {
		loadCourses();
	}, []);

	return (
		<ScrollView>
			<View style={styles.wrapper}>
				{courses.length > 0 && courses.map((c) => <CourseCard key={c.id} {...c} />)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		gap: Gaps.g20,
		padding: 20,
	},
});
