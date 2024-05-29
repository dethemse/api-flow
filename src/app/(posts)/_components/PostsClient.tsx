'use client';

import { PostList } from '@/ui/components/organisms/PostList';
import { usePostsQuery } from '../_hooks/usePostsQuery';

export const PostsClient = () => {
	const { posts, isLoading, errors } = usePostsQuery();

	return (
		<div>
			{posts && (
				<PostList
					title="Posts Client"
					posts={posts}
					onLike={() => console.log('like')}
					onDelete={() => console.log('delete')}
				/>
			)}
			{isLoading && <p className="text-sm text-gray-500">Loading...</p>}
			{errors && <p className="text-sm text-red-500">{errors}</p>}
		</div>
	);
};
