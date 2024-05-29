'use client';

import { useEffect } from 'react';

import * as internalApi from '@/services/api/internal';
import { usePosts } from '@/providers/PostsProvider';
import { getErrorMessage } from '@/utils/getErrorMessage';

export const usePostsQuery = () => {
	const { state, setPosts, setIsLoading, setErrors } = usePosts();
	const { posts, errors, isLoading } = state;

	useEffect(() => {
		if (posts) return;

		async function fetchPosts() {
			setIsLoading(true);

			try {
				const data = await internalApi.posts.findAll();

				setPosts(data);
			} catch (error) {
				const errorMessage = getErrorMessage(error);
				setErrors(errorMessage);
			}

			setIsLoading(false);
		}

		fetchPosts();
	}, [posts]);

	return { posts, errors, isLoading };
};
