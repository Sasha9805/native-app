import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { IAuthResponse, ILoginRequest } from './auth.interfaces';
import axios, { AxiosError } from 'axios';
import { API } from '../api/api';

const storage = createJSONStorage<AuthState>(() => AsyncStorage);

export const authAtom = atomWithStorage<AuthState>(
	'auth',
	{
		access_token: null,
		isLoading: false,
		error: null,
	},
	storage,
);

export const loginAtom = atom(
	(get) => get(authAtom),
	async (get, set, { email, password }: ILoginRequest) => {
		await set(authAtom, {
			isLoading: true,
			access_token: null,
			error: null,
		});
		try {
			const { data } = await axios.post<IAuthResponse>(API.login, {
				email,
				password,
			});
			await set(authAtom, {
				isLoading: false,
				access_token: data.accessToken,
				error: null,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				set(authAtom, {
					isLoading: false,
					access_token: null,
					error: error.response?.data.message,
				});
			}
		}
	},
);

export interface AuthState {
	access_token: string | null;
	isLoading: boolean;
	error: string | null;
}
