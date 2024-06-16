'use server';

import * as internalApi from '@/services/api/internal';
import { cache } from '@/utils/cache';
import { revalidateTag, revalidatePath } from 'next/cache';

const QUERY_KEY = 'posts';
const QUERY_TAG = 'postsTag';

export const getPosts = cache(
	async () => {
		return internalApi.posts.findAll();
	},
	[QUERY_KEY],
	{
		tags: [QUERY_TAG],
		revalidate: 60 * 60, // 1 hour
	},
);

export const createPost = async (...args: Parameters<typeof internalApi.posts.create>) => {
	const [input] = args;

	const createdPost = await internalApi.posts.create(input);

	revalidateTag(QUERY_TAG);

	return createdPost;
};

export const updatePost = async (...args: Parameters<typeof internalApi.posts.update>) => {
	const [postId, input] = args;

	const updatedPost = await internalApi.posts.update(postId, input);

	revalidateTag(QUERY_TAG);

	// revalidatePath('/');

	return updatedPost;
};

export const deletePost = async (...args: Parameters<typeof internalApi.posts.deleteItem>) => {
	const [postId] = args;

	await internalApi.posts.deleteItem(postId);

	revalidateTag(QUERY_TAG);
};

export const refreshPostsCache = async () => {
	revalidateTag(QUERY_TAG);
};
