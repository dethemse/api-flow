import 'server-only';
import { PostList } from '@/ui/components/organisms/PostList';
import { getPosts } from '../_actions';

export const PostsServer = async () => {
	const posts = await getPosts();

	return <PostList title="Posts Server" posts={posts} />;
};
