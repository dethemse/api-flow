'use client';

import { useState, useEffect } from 'react';

import { Post } from '@/types/models/Post';
import * as internalApi from '@/services/api/internal';

export const usePostsQuery = () => {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		internalApi.posts.findAll().then((data) => setPosts(data));
	}, []);

	return { posts };
};
