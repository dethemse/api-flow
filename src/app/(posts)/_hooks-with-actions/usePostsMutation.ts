'use client';

import { usePosts } from '@/providers/PostsProvider';
import * as internalApi from '@/services/api/internal';
import { getErrorMessage } from '@/utils/getErrorMessage';
import * as actions from '../_actions';

export const usePostsMutation = () => {
	const { state, setPosts, setErrors, setIsLoading } = usePosts();
	const { posts = [] } = state;

	const createPost = async (...args: Parameters<typeof internalApi.posts.create>) => {
		const [input] = args;

		setIsLoading(true);

		try {
			// Server API
			const createdPost = await actions.createPost(input);

			// Client State
			setPosts([...posts, createdPost]);
		} catch (error) {
			const errorMessage = getErrorMessage(error);
			setErrors(errorMessage);
		}

		setIsLoading(false);
	};

	const updatePost = async (...args: Parameters<typeof internalApi.posts.update>) => {
		const [postId, input] = args;

		setIsLoading(true);

		try {
			// Server API
			const updatedPost = await actions.updatePost(postId, input);

			// Client State
			const updated = posts.map((post) => (post.id === postId ? updatedPost : post));
			setPosts(updated);
		} catch (error) {
			const errorMessage = getErrorMessage(error);
			setErrors(errorMessage);
		}

		setIsLoading(false);
	};

	const deletePost = async (...args: Parameters<typeof internalApi.posts.deleteItem>) => {
		const [postId] = args;

		setIsLoading(true);

		try {
			// Server API
			await actions.deletePost(postId);

			// Client State
			const updated = posts.filter((post) => post.id !== postId);
			setPosts(updated);
		} catch (error) {
			const errorMessage = getErrorMessage(error);
			setErrors(errorMessage);
		}

		setIsLoading(false);
	};

	return {
		createPost,
		updatePost,
		deletePost,
	};
};
