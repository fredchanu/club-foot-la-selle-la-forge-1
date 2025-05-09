
const fs = require('fs');
const path = require('path');

const objetsDir = path.join(__dirname, 'content', 'objets-trouves');
const outputFile = path.join(__dirname, 'objets.json');

if (!fs.existsSync(objetsDir)) {
  console.warn("Le dossier 'content/objets-trouves' n'existe pas. Création d'un manifeste vide.");
  fs.writeFileSync(outputFile, JSON.stringify([], null, 2), 'utf8');
  process.exit(0);
}

fs.readdir(objetsDir, (err, files) => {
  if (err) {
    console.error("Erreur lors de la lecture du dossier objets-trouves :", err);
    process.exit(1);
  }

  const events = [];

  files.forEach(file => {
    if (path.extname(file) === '.json') {
      const filePath = path.join(objetsDir, file);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        const title = data.title || 'Sans titre';
        events.push({
          title: title,
          file: `/content/objets-trouves/${file}`
        });
      } catch (e) {
        console.error("Erreur JSON dans le fichier " + file, e);
      }
    }
  });

  fs.writeFileSync(outputFile, JSON.stringify(events, null, 2), 'utf8');
  console.log(`Manifest généré avec ${events.length} objet(s) trouvé(s).`);
});
