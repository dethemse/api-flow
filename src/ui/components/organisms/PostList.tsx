import { Post } from '@/types/models/Post';

type Props = {
	title: string;
	posts: Post[];
};

export const PostList = ({ title, posts }: Props) => {
	return (
		<div className="rounded-sm border border-gray-500 p-6">
			<h1 className="my-4 text-2xl">{title}</h1>
			<ul className="flex flex-col gap-y-5">
				{posts.map((post) => (
					<li key={post.id} className="flex items-center gap-x-2">
						<p>{post.title}</p>
						<p className="text-sm text-gray-500">{post.views}</p>
					</li>
				))}
			</ul>
		</div>
	);
};
