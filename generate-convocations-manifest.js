const fs = require('fs');
const path = require('path');

const convocationsDir = path.join(__dirname, 'content', 'convocations');
const outputFile = path.join(__dirname, 'convocations.json');

let convocations = [];

fs.readdir(convocationsDir, (err, files) => {
  if (err) {
    console.error("Erreur lors de la lecture du dossier convocations :", err);
    process.exit(1);
  }

  files.forEach(file => {
    if (path.extname(file) === '.json') {
      const filePath = path.join(convocationsDir, file);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        convocations.push({
          match_title: data.match_title || 'Sans titre',
          match_date: data.match_date,
          match_time: data.match_time,
          equipe: data.equipe,
          joueurs: data.joueurs,
          file: `/content/convocations/${file}`
        });
      } catch (e) {
        console.error("Erreur lors du parsing JSON dans le fichier " + file, e);
      }
    }
  });

  fs.writeFileSync(outputFile, JSON.stringify(convocations, null, 2), 'utf8');
  console.log(`Manifest généré avec ${convocations.length} convocation(s).`);
});
