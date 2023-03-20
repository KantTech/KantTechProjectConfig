import * as presets from "./presets.ts";
import generateFile from "./fileManager.ts";

export function gitignore() {
	generateFile(".gitignore", presets.gitignore);
}
export function denoJson() {
	generateFile(
		"deno.json",
		JSON.stringify(presets.denoJson),
		(url, content) => {
			const json = JSON.parse(content);
			if (!json.tasks.debug) json.tasks.debug = presets.denoJson.tasks.debug;
			Deno.writeTextFileSync(url, content);
		},
	);
}
export function kantTechConfigJsonc() {
	generateFile(
		"kanttech.config.jsonc",
		JSON.stringify(presets.kanttechConfigJsonc),
	);
}
export function runYml() {
	generateFile(".github/workflows/run.yml", presets.runYml());
}
export function settings() {
	generateFile(
		".vscode/settings.json",
		JSON.stringify(presets.settings),
		(url, text) => {
			// TODO
		},
	);
}
