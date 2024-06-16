'use client';

import { createContext, PropsWithChildren, use, useReducer } from 'react';

import { Post } from '@/types/models/Post';

// Local State

type LocalState = {
	posts?: Post[];
	isLoading: boolean;
	errors: string | null;
};

type ActionType =
	| { type: 'SET_POSTS'; payload: Post[] }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_ERRORS'; payload: string | null };

const initialLocalState: LocalState = {
	isLoading: false,
	errors: null,
};

const postsReducer = (state: LocalState, action: ActionType): LocalState => {
	switch (action.type) {
		case 'SET_POSTS': {
			return {
				...initialLocalState,
				posts: action.payload,
			};
		}
		case 'SET_LOADING': {
			return {
				...state,
				isLoading: action.payload,
			};
		}
		case 'SET_ERRORS': {
			return {
				...state,
				errors: action.payload,
			};
		}

		default: {
			return state;
		}
	}
};

// Global State

type GlobalState = {
	state: LocalState;

	setPosts: (posts: NonNullable<LocalState['posts']>) => void;
	setIsLoading: (isLoading: LocalState['isLoading']) => void;
	setErrors: (errors: LocalState['errors']) => void;
};

const PostsContext = createContext<GlobalState | null>(null);

export const PostsProvider = ({
	children,
	initialPosts,
}: PropsWithChildren<{ initialPosts: Post[] }>) => {
	const [state, dispatch] = useReducer(postsReducer, {
		posts: initialPosts,
		...initialLocalState,
	});

	const setPosts = (posts: NonNullable<LocalState['posts']>) => {
		dispatch({ type: 'SET_POSTS', payload: posts });
	};

	const setIsLoading = (isLoading: LocalState['isLoading']) => {
		dispatch({ type: 'SET_LOADING', payload: isLoading });
	};

	const setErrors = (errors: LocalState['errors']) => {
		dispatch({ type: 'SET_ERRORS', payload: errors });
	};

	return (
		<PostsContext.Provider
			value={{
				state,

				setPosts,
				setIsLoading,
				setErrors,
			}}
		>
			{children}
		</PostsContext.Provider>
	);
};

export const usePosts = (): GlobalState => {
	const globalState = use(PostsContext);

	if (!globalState) {
		throw new Error('Use `usePosts` within <PostsProvider>');
	}

	return globalState;
};
