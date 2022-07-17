import { Plugin } from "obsidian";

export default class tagFolderizer extends Plugin {
  async onload() {
    this.registerEvent(this.app.metadataCache.on('changed', (changedFile, fileText, fileCache) => {
      console.log('File updated')
	  console.log(fileCache)
    }));
  }
}