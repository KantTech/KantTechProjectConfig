export default function generateFile(
	url: string,
	content: string,
	existsCallback?: (url: string, text: string) => void,
) {
	try {
		const text = Deno.readTextFileSync(url);
		if (existsCallback) existsCallback(url, text);
	} catch (_) {
		Deno.createSync(url);
		Deno.writeTextFileSync(url, content);
	}
}
