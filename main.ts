import { MetadataCache, parseFrontMatterTags, Plugin } from "obsidian";

export default class tagFolderizer extends Plugin {
  async onload() {
    this.registerEvent(this.app.metadataCache.on('changed', (changedFile, fileText, fileCache) => {
      console.log('File updated')

	  let firstTag
	  const frontmatterTags = parseFrontMatterTags(fileCache.frontmatter)
	  if (frontmatterTags) {
		firstTag = frontmatterTags[0]
	  }
	  else if (fileCache.tags) {
		firstTag = fileCache.tags[0].tag
	  }
	  else {
		console.log('No Tags Found')
		return
	  }

	  console.log(firstTag)
    }));
  }
}