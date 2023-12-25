import { dialog } from "electron";

export const selectFoldersSourcesLibrary = async () => {
	const data = await dialog.showOpenDialog({ 
		properties : [
			"openDirectory", "multiSelections"
		]
	})
	
	return data
}