const fs = require('fs');
const path = require('path');

const calendrierDir = path.join(__dirname, 'content', 'calendrier');
const outputFile = path.join(__dirname, 'calendrier.json');

if (!fs.existsSync(calendrierDir)) {
  console.warn("Le dossier 'content/calendrier' n'existe pas. Création d'un manifeste vide.");
  fs.writeFileSync(outputFile, JSON.stringify([], null, 2), 'utf8');
  process.exit(0);
}

fs.readdir(calendrierDir, (err, files) => {
  if (err) {
    console.error("Erreur lors de la lecture du dossier calendrier :", err);
    process.exit(1);
  }

  const events = [];

  files.forEach(file => {
    if (path.extname(file) === '.json') {
      const filePath = path.join(calendrierDir, file);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        const title = data.title || 'Sans titre';
        // On ajoute l'événement au manifeste avec le chemin relatif
        events.push({
          title: title,
          file: `/content/calendrier/${file}`
        });
      } catch (e) {
        console.error("Erreur lors du parsing JSON dans le fichier " + file, e);
      }
    }
  });

  fs.writeFileSync(outputFile, JSON.stringify(events, null, 2), 'utf8');
  console.log(`Manifest généré avec ${events.length} événement(s).`);
});
