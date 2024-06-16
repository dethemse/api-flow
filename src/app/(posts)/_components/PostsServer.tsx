import 'server-only';
import { PostList } from '@/ui/components/organisms/PostList';
import { Post } from '@/types/models/Post';
import { getPosts, updatePost, deletePost } from '../_actions';

export const PostsServer = async () => {
	const posts = await getPosts();

	const handleLike = async (post: Post) => {
		'use server';

		const { id: postId, ...input } = post;

		await updatePost(postId, {
			...input,
			isLiked: !input.isLiked,
		});
	};

	const handleDelete = async (postId: string) => {
		'use server';

		await deletePost(postId);
	};

	return (
		<PostList title="Posts Server" posts={posts} onLike={handleLike} onDelete={handleDelete} />
	);
};
