'use client';

import { PostList } from '@/ui/components/organisms/PostList';
import { usePostsQuery } from '../_hooks/usePostsQuery';
import { usePostsMutation } from '../_hooks/usePostsMutation';

export const PostsClient = () => {
	const { posts, isLoading, errors } = usePostsQuery();
	const { updatePost, deletePost } = usePostsMutation();

	return (
		<div>
			{posts && (
				<PostList
					title="Posts Client"
					posts={posts}
					onLike={(post) => updatePost(post.id, { isLiked: !post.isLiked })}
					onDelete={(postId) => deletePost(postId)}
				/>
			)}
			{isLoading && <p className="text-sm text-gray-500">Loading...</p>}
			{errors && <p className="text-sm text-red-500">{errors}</p>}
		</div>
	);
};
