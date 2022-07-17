import { CachedMetadata, getAllTags, Plugin } from "obsidian";

export default class tagFolderizer extends Plugin {
	async onload() {
		this.registerEvent(this.app.metadataCache.on('changed', (file, data, cache) => handleChanges(cache)));
	}
}

function handleChanges(fileCache: CachedMetadata) {
	const firstTag = getFirstTag(fileCache);
	const tagParts = splitTag(firstTag);
	console.log(tagParts)
}

function getFirstTag(fileCache: CachedMetadata): string | null {
	console.log('File updated');

	const allTags = getAllTags(fileCache);
	if (allTags == null || allTags.length === 0) {
		console.log('No tags found');
		return null;
	} else {
		return allTags[0]
	}
}

function splitTag(tag: string | null): string[] | null {
	if (tag) {
		return tag.substring(1).split('/');
	} else {
		return null;
	}
}