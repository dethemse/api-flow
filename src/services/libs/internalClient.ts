import axios from 'axios';

import { env } from '@/configs/env';

const baseUrl = env.NEXT_PUBLIC_INTERNAL_API;

export const internalClient = axios.create({
	baseURL: baseUrl,
	headers: {
		Accept: 'application/json',
	},
});
