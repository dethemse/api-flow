'use server';

import * as internalApi from '@/services/api/internal';
import { cache } from '@/utils/cache';

const QUERY_KEY = 'posts';

export const getPosts = cache(
	async () => {
		return internalApi.posts.findAll();
	},
	[QUERY_KEY],
	{
		revalidate: 60 * 60, // 1 hour
	},
);

export const createPost = async () => {};

export const updatePost = async () => {};

export const deletePost = async () => {};
