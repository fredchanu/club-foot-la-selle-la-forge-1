const fs = require('fs');
const path = require('path');

// Chemin du dossier contenant vos articles JSON
const articlesDir = path.join(__dirname, 'content', 'actualites');
// Chemin du fichier manifeste à générer
const outputFile = path.join(__dirname, 'articles.json');

// Lire la liste des fichiers dans le dossier actualites
fs.readdir(articlesDir, (err, files) => {
  if (err) {
    console.error("Erreur lors de la lecture du dossier actualités :", err);
    process.exit(1);
  }

  const articles = [];

  // Pour chaque fichier dans le dossier
  files.forEach(file => {
    // Ne traiter que les fichiers avec l'extension .json
    if (path.extname(file) === '.json') {
      const filePath = path.join(articlesDir, file);
      try {
        // Lire et parser le fichier JSON
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        
        // Utiliser le champ title ou une valeur par défaut
        const title = data.title || 'Sans titre';
        
        // Ajouter l'article au manifeste avec le chemin relatif
        articles.push({
          title: title,
          file: `/content/actualites/${file}`
        });
      } catch (e) {
        console.error("Erreur lors du parsing JSON dans le fichier " + file, e);
      }
    }
  });

  // Écrire le manifeste JSON dans le fichier outputFile
  fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2), 'utf8');
  console.log(`Manifest généré avec ${articles.length} article(s).`);
});
