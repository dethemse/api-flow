import 'server-only';

import { PageProps } from '@/types/app';
import { PostsClient } from './_components/PostsClient';
import { PostsServer } from './_components/PostsServer';
import { PostsClientServer } from './_components/PostsClientServer';

export default function Home({}: PageProps) {
	return (
		<main className="m-6 space-y-4">
			<PostsClientServer />
			<PostsClient />
			<PostsServer />
		</main>
	);
}
