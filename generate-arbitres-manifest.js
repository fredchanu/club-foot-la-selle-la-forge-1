const fs = require('fs');
const path = require('path');

const arbitresDir = path.join(__dirname, 'content', 'arbitres');
const outputFile = path.join(__dirname, 'arbitres.json');

let arbitres = [];

fs.readdir(arbitresDir, (err, files) => {
  if (err) {
    console.error("Erreur lecture arbitres :", err);
    process.exit(1);
  }

  files.forEach(file => {
    if (path.extname(file) === '.json') {
      const data = JSON.parse(fs.readFileSync(path.join(arbitresDir, file), 'utf8'));
      arbitres.push({
        nom: data.nom,
        match: data.match,
        lieu: data.lieu,
        date: data.date,
        heure: data.heure
      });
    }
  });

  fs.writeFileSync(outputFile, JSON.stringify(arbitres, null, 2), 'utf8');
  console.log(`Manifest arbitres généré avec ${arbitres.length} arbitre(s).`);
});
