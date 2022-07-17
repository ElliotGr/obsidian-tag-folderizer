import { getAllTags, Plugin} from "obsidian";

export default class tagFolderizer extends Plugin {
  async onload() {
    this.registerEvent(this.app.metadataCache.on('changed', (changedFile, fileText, fileCache) => {
      console.log('File updated')

	  const allTags = getAllTags(fileCache)
	  if (allTags == null || allTags.length === 0) {
		console.log('No tags found')
		return;
	  } 

	  const firstTag = allTags[0]
	  const tagParts = firstTag.substring(1).split('/')
    }));
  }
}