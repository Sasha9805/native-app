import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { IAuthResponse, ILoginRequest } from './auth.interfaces';
import axios, { AxiosError } from 'axios';
import { API } from '../api/api';

const storage = createJSONStorage<AuthState>(() => AsyncStorage);

const INITIAL_STATE = {
	access_token: null,
	isLoading: false,
	error: null,
};

export const authAtom = atomWithStorage<AuthState>('auth', INITIAL_STATE, storage);

export const loginAtom = atom(
	(get) => get(authAtom),
	async (get, set, { email, password }: ILoginRequest) => {
		await set(authAtom, {
			isLoading: true,
			access_token: null,
			error: null,
		});
		try {
			await new Promise((res) => setTimeout(res, 2000));
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
				await set(authAtom, {
					isLoading: false,
					access_token: null,
					error: error.response?.data.message,
				});
			}
		}
	},
);

export const logoutAtom = atom(null, async (get, set) => {
	await set(authAtom, INITIAL_STATE);
});

export interface AuthState {
	access_token: string | null;
	isLoading: boolean;
	error: string | null;
}
