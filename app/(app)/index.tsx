import { Text, View } from 'react-native';
import { useAtomValue, useSetAtom } from 'jotai';
import { courseAtom, loadCourseAtom } from '../../entities/course/model/course.state';
import { useEffect } from 'react';

export default function MyCourses() {
	const { courses, isLoading, error } = useAtomValue(courseAtom);
	const loadCourses = useSetAtom(loadCourseAtom);

	useEffect(() => {
		loadCourses();
	}, []);

	return <View>{courses.length > 0 && courses.map((c) => <Text key={c.id}>{c.title}</Text>)}</View>;
}
