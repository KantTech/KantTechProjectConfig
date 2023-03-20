import * as Path from "https://deno.land/std@0.180.0/path/mod.ts";

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
interface Global {
	config?: KantTechConfig;
	dirUrl?: string;
	projectName?: string;
}
const global: Global = {};

export function setConfig(config: KantTechConfig) {
	global.config = config;
}
export function getConfig() {
	return global.config;
}
export function setDirUrl(dirUrl: string) {
	const path = Path.parse(dirUrl);
	global.dirUrl = path.dir.replace("file://", "") + "/";
}
export function getDirUrl() {
	return global.dirUrl;
}
export function setProjectName(projectName: string) {
	global.projectName = projectName;
	console.log(projectName);
	console.log(global.projectName);
}
export function getProjectName(bereinigt: boolean) {
	if (bereinigt) {
		return global.projectName?.toLowerCase()
			.replaceAll(".", "-")
			.replaceAll("\s", "_");
	}
	return global.projectName;
}
