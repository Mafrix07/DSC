/**
 * DATASECUR CONSULTING - HTML COMPONENT BUILDER
 * Assembleur de composants statiques zéro dépendance (optimisé GitHub Pages)
 * 
 * Utilisation :
 *   node build.js          -> Compile src/ vers index.html
 *   node build.js --watch  -> Surveille les modifications dans src/ et compile en direct
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const TEMPLATE_FILE = path.join(SRC_DIR, 'index.html');
const OUTPUT_FILE = path.join(__dirname, 'index.html');

function build() {
    try {
        if (!fs.existsSync(TEMPLATE_FILE)) {
            console.error(`[Build Error] Le fichier template ${TEMPLATE_FILE} est introuvable.`);
            return;
        }

        let template = fs.readFileSync(TEMPLATE_FILE, 'utf-8');

        // Regex d'inclusion : <!-- @include "chemin/vers/fichier.html" -->
        const includeRegex = /<!--\s*@include\s+['"]([^'"]+)['"]\s*-->/g;

        template = template.replace(includeRegex, (match, includePath) => {
            const fullPath = path.join(SRC_DIR, includePath);
            if (fs.existsSync(fullPath)) {
                return fs.readFileSync(fullPath, 'utf-8');
            } else {
                console.warn(`[Warning] Composant introuvable : ${includePath} (${fullPath})`);
                return `<!-- Include introuvable : ${includePath} -->`;
            }
        });

        fs.writeFileSync(OUTPUT_FILE, template, 'utf-8');
        const now = new Date().toLocaleTimeString();
        console.log(`[${now}] index.html généré avec succès (${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1)} KB)`);
    } catch (err) {
        console.error('[Build Error]', err);
    }
}

// Mode Watch ou Build Unique
if (process.argv.includes('--watch') || process.argv.includes('-w')) {
    console.log('Mode Watch activé : surveillance du dossier src/...');
    build();
    let timeout = null;
    fs.watch(SRC_DIR, { recursive: true }, (eventType, filename) => {
        if (filename) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                console.log(`Modification détectée (${filename}). Recompilation...`);
                build();
            }, 50);
        }
    });
} else {
    build();
}
