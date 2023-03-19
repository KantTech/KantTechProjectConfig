export interface KantTechConfig {
	port: number;
	neo4j: {
		url: string;
		username: string;
		password: string;
	};
	vpmobil: {
		username: string;
		password: string;
	};
}

let _config: KantTechConfig | undefined;
let _dirUrl: string;
let _projectName: string;

export function setConfig(config: KantTechConfig) {
	_config = config;
}
export function getConfig() {
	return _config;
}
export function setDirUrl(dirUrl: string) {
	_dirUrl = dirUrl;
}
export function getDirUrl() {
	return _dirUrl;
}
export function setProjectName(projectName: string) {
	_projectName = projectName;
	console.log(projectName);
	console.log(_projectName);
}
export function getProjectName(bereinigt: boolean) {
	if (bereinigt) {
		return _projectName.toLowerCase()
			.replaceAll(".", "-")
			.replaceAll("\s", "_");
	}
	return _projectName;
}
