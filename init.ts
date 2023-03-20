import { parse } from "https://deno.land/std@0.168.0/encoding/jsonc.ts";
import * as Global from "./globals.ts";
import { KantTechConfig } from "./globals.ts";
import * as Generators from "./generators.ts";

export function init(projectName: string): KantTechConfig {
	Global.setProjectName(projectName);

	checkFirstInit();

	Generators.gitignore();
	Generators.denoJson();
	Generators.kantTechConfigJsonc();
	Generators.runYml();
	Generators.settings();

	readConfig();

	return Global.getConfig();
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

function checkFirstInit() {
	try {
		Deno.readTextFileSync("deno.json");
	} catch (_) {
		try {
			Deno.readTextFileSync("deno.jsonc");
		} catch (_) {
			let result: string | null = "";
			while (result != "ja" && result != "nein") {
				result = prompt(
					`
Neues Projekt "${Global.getProjectName(false)}" im Ordner folgenden Ordner
	${Deno.cwd()}
erstellen? (ja oder nein)`,
					"nein",
				);
			}

			if (result == "nein") {
				console.log("Projektinitialisierung abgebrochen.");
				Deno.exit(0);
			}
		}
	}
}
