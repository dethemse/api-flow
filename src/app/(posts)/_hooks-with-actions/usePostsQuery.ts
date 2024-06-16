'use client';

import { usePosts } from '@/providers/PostsProvider';

export const usePostsQuery = () => {
	const { state } = usePosts();
	const { posts, errors, isLoading } = state;

	return { posts, errors, isLoading };
};
