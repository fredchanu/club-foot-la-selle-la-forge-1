const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'content', 'actualites');
const outputFile = path.join(__dirname, 'articles.json');

fs.readdir(articlesDir, (err, files) => {
  if (err) {
    console.error("Erreur lors de la lecture du dossier actualites :", err);
    process.exit(1);
  }

  const articles = [];

  files.forEach(file => {
    if (path.extname(file) === '.json') {
      const filePath = path.join(articlesDir, file);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);

        const title = data.title || 'Sans titre';
        const date = data.date || '1970-01-01'; // fallback si champ absent

        articles.push({
          title,
          date,
          file: `/content/actualites/${file}`
        });
      } catch (e) {
        console.error("Erreur parsing fichier " + file, e);
      }
    }
  });

  // Tri décroissant par date
  articles.sort((a, b) => new Date(b.date) - new Date(a.date));

  fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2), 'utf8');
  console.log(`Manifest généré avec ${articles.length} article(s), triés par date.`);
});
