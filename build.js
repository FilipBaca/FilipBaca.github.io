const fs = require('fs');

const files = [
  'style.css',
  'components.js',
  'index.html',
  'o-nas.html',
  'vstupy.html',
  'fitko.html',
  'login.html',
  'registrace.html'
];

let output = `================================================================================
  FITKO NA HEGERCE — KOMPLETNÍ ZDROJOVÝ KÓD
  Vygenerováno: ${new Date().toLocaleDateString('cs-CZ')}
================================================================================

Struktura projektu:
  ├── style.css           (Design systém & globální styly)
  ├── components.js       (Sdílená navigace, patička, JS logika)
  ├── index.html          (Úvodní stránka)
  ├── o-nas.html          (O nás)
  ├── vstupy.html         (Vstupy & Ceník)
  ├── fitko.html          (Fitko — galerie & vybavení)
  ├── login.html          (Přihlášení)
  └── registrace.html     (Registrace)\n\n`;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  output += `\n================================================================================\n`;
  output += `  SOUBOR: ${file}\n`;
  output += `================================================================================\n\n`;
  output += content + '\n\n';
});

fs.writeFileSync('kompletni-kod.txt', output, 'utf8');
console.log('kompletni-kod.txt was successfully updated!');
