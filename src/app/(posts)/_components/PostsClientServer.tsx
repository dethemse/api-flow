'use client';

import { PostList } from '@/ui/components/organisms/PostList';
import { usePostsQuery } from '../_hooks-with-actions/usePostsQuery';
import { usePostsMutation } from '../_hooks-with-actions/usePostsMutation';

export const PostsClientServer = () => {
	const { posts, isLoading, errors } = usePostsQuery();
	const { updatePost, deletePost } = usePostsMutation();

	return (
		<div>
			{posts && (
				<PostList
					title="Posts Client / Server"
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
