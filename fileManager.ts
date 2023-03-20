import * as Path from "https://deno.land/std@0.180.0/path/mod.ts";
import * as Global from "./globals.ts";

export default function generateFile(
	relativeUrl: string,
	content: string,
	existsCallback?: (url: string, text: string) => void,
) {
	try {
		const text = Deno.readTextFileSync(relativeUrl);
		if (existsCallback) existsCallback(relativeUrl, text);
	} catch (_) {
		const path = Path.parse(Global.getDirUrl() + relativeUrl);
		console.log(path.dir);
		Deno.mkdirSync(path.dir, { recursive: true });
		Deno.writeTextFileSync(relativeUrl, content);
	}
}
