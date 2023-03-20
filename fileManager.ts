import * as Path from "https://deno.land/std@0.180.0/path/mod.ts";

export default function generateFile(
	relativeUrl: string,
	content: string,
	existsCallback?: (url: string, text: string) => void,
) {
	try {
		const text = Deno.readTextFileSync(relativeUrl);
		if (existsCallback) existsCallback(relativeUrl, text);
	} catch (_) {
		const path = Path.parse(Deno.cwd() + "/" + relativeUrl);
		Deno.mkdirSync(path.dir, { recursive: true });
		Deno.writeTextFileSync(relativeUrl, content);
	}
}
