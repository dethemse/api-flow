import { internalClient } from '@/services/libs/internalClient';
import { Post } from '@/types/models/Post';
import { generateUuid } from '@/utils/generateUuid';

const url = '/posts';

export async function findAll(_criteria?: unknown) {
	const { data } = await internalClient.get<Post[]>(url);

	// rawData -> adapter -> data

	return data;
}

export async function findById(id: string) {
	const { data } = await internalClient.get<Post>(`${url}/${id}`);

	return data;
}

export async function create(input: Omit<Post, 'id'>) {
	const { data } = await internalClient.post<Post>(url, {
		...input,
		id: generateUuid(),
	});

	return data;
}

export async function update(id: string, input: Partial<Omit<Post, 'id'>>) {
	const { id: postId, ...post } = await findById(id);

	if (!post) {
		throw new Error('Post not found');
	}

	const { data } = await internalClient.put<Post>(`${url}/${id}`, {
		...post,
		...input,
	});

	return data;
}

export async function deleteItem(id: string) {
	const { id: postId, ...post } = await findById(id);

	if (!post) {
		throw new Error('Post not found');
	}

	await internalClient.delete(`${url}/${postId}`);
}
