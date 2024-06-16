'use client';

import { Post } from '@/types/models/Post';
import { ThumbsUpIcon, XIcon } from '@/ui/icons';
import { cn } from '@/utils/cn';

type Props = {
	title: string;
	posts: Post[];

	onLike: (post: Post) => Promise<void>;
	onDelete: (postId: string) => Promise<void>;
};

export const PostList = ({ title, posts, onLike, onDelete }: Props) => {
	return (
		<div className="rounded-sm border border-gray-500 p-6">
			<h1 className="my-4 text-2xl">{title}</h1>
			<ul className="flex flex-col gap-y-5">
				{posts.map((post) => (
					<li key={post.id} className="flex items-center gap-x-2">
						<p>{post.title}</p>
						<button type="button" onClick={() => onLike(post)}>
							<ThumbsUpIcon
								className={cn('size-6', post.isLiked ? 'text-blue-600' : 'text-gray-400')}
							/>
						</button>
						<button type="button" onClick={() => onDelete(post.id)}>
							<XIcon className="size-6 text-red-600" />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};
