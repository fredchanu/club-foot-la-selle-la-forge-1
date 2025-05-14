const fs = require("fs");
const path = require("path");

const partenairesDir = path.join(__dirname, "content", "partenaires");
const outputFile = path.join(__dirname, "partenaires.json");

fs.readdir(partenairesDir, (err, files) => {
  if (err) {
    console.error("Erreur lecture dossier partenaires :", err);
    process.exit(1);
  }

  const partenaires = [];

  files.forEach(file => {
    if (path.extname(file) === ".json") {
      const filePath = path.join(partenairesDir, file);
      try {
        const content = fs.readFileSync(filePath, "utf8");
        const data = JSON.parse(content);
        partenaires.push({
          nom: data.nom || "Sans nom",
          logo: data.logo || "",
          description: data.description || ""
        });
      } catch (e) {
        console.error("Erreur parsing fichier :", file, e);
      }
    }
  });

  fs.writeFileSync(outputFile, JSON.stringify(partenaires, null, 2), "utf8");
  console.log(`Manifest partenaires généré avec ${partenaires.length} entrée(s).`);
});