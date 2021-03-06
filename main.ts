import { CachedMetadata, getAllTags, normalizePath, Plugin, TFile, TFolder, Vault } from "obsidian";

export default class tagFolderizer extends Plugin {
	async onload() {
		this.registerEvent(this.app.metadataCache.on('changed', (file, data, cache) => handleChanges(file, cache)));
	}
}

async function handleChanges(file: TFile, fileCache: CachedMetadata) {
	const firstTag = getFirstTag(fileCache);
	const tagParts = splitTag(firstTag);
	if (tagParts == null) {
		console.log('No tags found');
		return
	}

	const baseTag = tagParts[0];
	const baseFolder = getFolderIfExists(baseTag)
	const baseFile = app.metadataCache.getFirstLinkpathDest(baseTag, '')
	if (baseFolder) {
		moveFile(file, baseFolder);
	} else if (!baseFile) {
		await app.vault.createFolder(baseTag)
		moveFile(file, app.vault.getAbstractFileByPath(baseTag))
	} else {
		await fileToFolder(baseFile)
		moveFile(file, baseFile.parent)
	}
}

async function moveFile(file: TFile, destFolder: TFolder): Promise<void> {
	await app.fileManager.renameFile(file, normalizePath(`${destFolder.path}/${file.name}`));
}

async function fileToFolder(file: TFile): Promise<void> {
	const folderPath = normalizePath(`${file.parent.path}/${file.basename}`)
	const newFilePath = normalizePath(`${folderPath}/${file.name}`)
	await app.vault.createFolder(folderPath)
	await app.fileManager.renameFile(file, newFilePath)
}

function getFolderIfExists(folderName: string): TFolder | null {
	let folderExists = false
	let baseFolder = null
	Vault.recurseChildren(app.vault.getRoot(), (abstractFile) => {
		if (abstractFile instanceof TFolder && abstractFile.name === folderName) {
			if (folderExists) {
				baseFolder = null
				console.log('Duplicate folder')
				return null
			} else {
				baseFolder = abstractFile
				folderExists = true
			}
		}
	})
	return baseFolder
}

function getFirstTag(fileCache: CachedMetadata): string | null {
	const allTags = getAllTags(fileCache);
	if (allTags == null || allTags.length === 0) {
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