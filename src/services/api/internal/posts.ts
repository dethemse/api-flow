import { internalClient } from '@/services/libs/internalClient';
import { Post } from '@/types/models/Post';

const url = '/posts';

export async function findAll(_criteria?: unknown) {
	const { data } = await internalClient.get<Post[]>(url);

	// rawData -> adapter -> data

	return data;
}

export async function findById() {}

export async function create() {}

export async function update() {}

export async function deleteItem() {}
