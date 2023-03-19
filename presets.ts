import * as Globals from "./globals.ts";

export const gitignore = "*.config.jsonc";

export const denoJson = {
	tasks: {
		debug:
			"KANT_TECH_CONFIG=./kanttech.config.jsonc deno run -A --watch=static/,routes/ dev.ts --inspect-brk=127.0.0.1:9229",
		start: "deno run -A main.ts",
	},
	fmt: { options: { useTabs: true } },
};

export const kanttechConfigJsonc = {
	// auf welchem Port die Seite laufen soll.
	// Bitte beachten, dass das in NGINX auch angepasst werden muss.
	// Die grafischen Einstellungen sind unter "kleetec.de:9001" zu finden.
	port: 8000,
	// die Datenbank
	neo4j: {
		url: "neo4j://kanttech.de:7687",
		username: null,
		password: null,
	},
	vpmobil: {
		username: null,
		password: null,
	},
};

export const runYml = `
name: ${Globals.getProjectName(false)} veröffentlichen

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the "master" branch
  push:
    branches: [ "master" ]
  pull_request:
    branches: [ "master" ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:
  
# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  start:
    # The type of runner that the job will run on
    runs-on: self-hosted
    name: "Starten oder Neustarten von ${Globals.getProjectName(false)}"

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v3

      # Runs a single command using the runners shell
      - name: Alte Instanz löschen
        run: tmux kill-session -t ${Globals.getProjectName(true)}
        continue-on-error: true

      # Runs a set of commands using the runners shell
      - name: Neue Instanz erstellen
        run: RUNNER_TRACKING_ID="" && tmux new -s ${
	Globals.getProjectName(true)
} -d \; send "KANT_TECH_CONFIG=\"/home/christian/KantTech/kanttech.config.jsonc\" deno task start" Enter

`;
export const settings = {
	"deno.enable": true,
	"cSpell.language": "en-gb,de",
	"editor.defaultFormatter": "denoland.vscode-deno",
	"editor.formatOnSave": true,
};
