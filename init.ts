import { parse } from "https://deno.land/std@0.168.0/encoding/jsonc.ts";
import * as Global from "./globals.ts";
import { KantTechConfig } from "./globals.ts";
import * as Generators from "./generators.ts";

export function init(projectName: string, path: string) {
	Global.setDirUrl(new URL(path).href + "/");
	Global.setProjectName(projectName);
	Generators.gitignore();
	Generators.denoJson();
	Generators.kantTechConfigJsonc();
	Generators.runYml();
	Generators.settings();

	readConfig();
}

function readConfig() {
	const fileName = Deno.env.get("KANT_TECH_CONFIG");
	if (!fileName) {
		throw new Error(`
			Die Konfigurationsdatei konnte nicht gefunden werden.
			Bitte achte darauf, dass Du den Pfad zu der Konfiguration als Umgebungsvariable angibst.
			Zum Beispiel:
				KANT_TECH_CONFIG="/home/christian/KantTech/kanttech.config.jsonc" deno task start
			`);
	}
	const text = Deno.readTextFileSync(fileName);
	const parsed = parse(text, { allowTrailingComma: true });
	// Weil in JSONC auch einfach nur Werte (nicht in einem Objekt) stehen können,
	// muss hier erst einmal zu `unknown` konvertiert werden, und dann zu KantTechConfig.
	Global.setConfig(parsed as unknown as KantTechConfig);
}
