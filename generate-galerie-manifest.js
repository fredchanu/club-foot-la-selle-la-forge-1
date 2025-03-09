const fs = require('fs');
const path = require('path');

// Chemin du dossier contenant vos galeries JSON
const galleriesDir = path.join(__dirname, 'content', 'galerie');
// Chemin du fichier manifeste à générer pour la galerie
const outputFile = path.join(__dirname, 'galerie.json');

// Vérifier si le dossier existe ; sinon, générer un manifeste vide
if (!fs.existsSync(galleriesDir)) {
  console.warn("Le dossier 'content/galerie' n'existe pas. Création d'un manifeste vide.");
  fs.writeFileSync(outputFile, JSON.stringify([], null, 2), 'utf8');
  process.exit(0);
}

// Lire la liste des fichiers dans le dossier galerie
fs.readdir(galleriesDir, (err, files) => {
  if (err) {
    console.error("Erreur lors de la lecture du dossier galerie :", err);
    process.exit(1);
  }

  const galleries = [];

  // Pour chaque fichier du dossier
  files.forEach(file => {
    if (path.extname(file) === '.json') {
      const filePath = path.join(galleriesDir, file);
      try {
        // Lire et parser le fichier JSON
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        // Récupérer le titre ou utiliser "Sans titre" par défaut
        const title = data.title || 'Sans titre';
        // Ajouter l'article au manifeste avec le chemin relatif
        galleries.push({
          title: title,
          file: `/content/galerie/${file}`
        });
      } catch (e) {
        console.error("Erreur lors du parsing JSON dans le fichier " + file, e);
      }
    }
  });

  // Écrire le manifeste JSON dans le fichier outputFile
  fs.writeFileSync(outputFile, JSON.stringify(galleries, null, 2), 'utf8');
  console.log(`Manifest généré avec ${galleries.length} galerie(s).`);
});
