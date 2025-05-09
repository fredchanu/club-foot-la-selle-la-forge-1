const container = document.getElementById('objets-container');

fetch('/content/objets-trouves')
  .then(() => fetch('/objets.json')) // ← ton manifeste à générer comme pour les galeries
  .then(res => res.json())
  .then(files => {
    files.sort((a, b) => b.file.localeCompare(a.file)); // tri du plus récent au plus ancien
    const promises = files.map(f => fetch(f.file).then(r => r.json()));

    return Promise.all(promises);
  })
  .then(objets => {
    objets.forEach(obj => {
      const el = document.createElement('div');
      el.className = 'objet';
      el.innerHTML = `
        <h3>${obj.title}</h3>
        <img src="${obj.image}" alt="${obj.title}" />
        <p>${obj.description}</p>
      `;
      container.appendChild(el);
    });
  })
  .catch(err => {
    console.error("Erreur chargement objets :", err);
    container.innerHTML = '<p>Impossible de charger les objets trouvés.</p>';
  });
