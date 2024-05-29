'use client';

import { PostList } from '@/ui/components/organisms/PostList';
import { usePostsQuery } from '../_hooks';

export const PostsClient = () => {
	const { posts } = usePostsQuery();

	return (
		<PostList
			title="Posts Client"
			posts={posts}
			onLike={() => console.log('like')}
			onDelete={() => console.log('delete')}
		/>
	);
};
