import { atom } from 'jotai';
import { CourseResponse, StudentCourseDescription } from './course.model';
import { authAtom } from '../../auth/model/auth.state';
import axios, { AxiosError } from 'axios';
import { API } from '../api/api';

export const courseAtom = atom<CourseState>({
	courses: [],
	isLoading: false,
	error: null,
});

export const loadCourseAtom = atom(
	(get) => get(courseAtom),
	async (get, set) => {
		try {
			const { access_token } = await get(authAtom);
			set(courseAtom, {
				courses: [],
				isLoading: true,
				error: null,
			});
			const { data } = await axios.get<CourseResponse>(API.my, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
			set(courseAtom, {
				courses: data.other,
				isLoading: false,
				error: null,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				set(courseAtom, {
					courses: [],
					isLoading: false,
					error: error.response?.data.message,
				});
			}
		}
	},
);

export interface CourseState {
	courses: StudentCourseDescription[];
	isLoading: boolean;
	error: string | null;
}
