import { getAllTags, Plugin} from "obsidian";

export default class tagFolderizer extends Plugin {
  async onload() {
    this.registerEvent(this.app.metadataCache.on('changed', (changedFile, fileText, fileCache) => {
      console.log('File updated')

	  let firstTag
	  const allTags = getAllTags(fileCache)
	  if (allTags) {
		firstTag = allTags[0]
	  }
	  else {
		console.log('No tags found')
		return
	  }
	  const tagParts = firstTag.substring(1).split('/')
    }));
  }
}