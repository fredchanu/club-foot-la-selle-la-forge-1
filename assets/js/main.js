document.addEventListener("DOMContentLoaded", () => {
    console.log("Site AS La Selle La Forge prêt !");
    
    //Filtre sur la page Convocations
    const equipeSelect = document.getElementById("equipe-select");
    if (equipeSelect) {
      equipeSelect.addEventListener("change", (e) => {
        const selectedEquipe = e.target.value;
        filterConvocations(selectedEquipe);
      });
    }
  });
  
  function filterConvocations(equipe) {
    const container = document.getElementById("convocations-container");
    if (!container) return;
    
    // Logique de filtrage : masquer/afficher en fonction de l'équipe
    const convocations = container.querySelectorAll(".convocation-item");
    convocations.forEach((item) => {
      if (equipe === "all") {
        item.style.display = "block";
      } else {
        // Exemple simplifié : on check si le h2 ou un attribut data-équipe contient l'équipe
        if (item.textContent.includes(equipe)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      }
    });
  }

//--------------------------------------------------------//
//--------------------------------------------------------//

  // Initialise LightGallery sur le conteneur des photos
  document.addEventListener('DOMContentLoaded', function() {
    const albumPhotos = document.querySelectorAll('.album-photos');
    albumPhotos.forEach(container => {
      lightGallery(container, {
        plugins: [lgThumbnail],
        licenseKey: 'your_license_key', // facultatif selon la version
        speed: 500,
        mode: 'lg-fade'
      });
    });
  });

//--------------------------------------------------------//
//--------------------------------------------------------//

document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.burger-menu');
  const menuUl = document.querySelector('.menu ul');

  if (burger && menuUl) {
    // Bascule l'affichage du menu burger
    burger.addEventListener('click', function(e) {
      e.stopPropagation(); // Empêche la propagation pour ne pas déclencher le clic en dehors
      menuUl.classList.toggle('active');
    });

    // Ferme le menu lorsque l'utilisateur clique en dehors du menu et du burger
    document.addEventListener('click', function(e) {
      if (!menuUl.contains(e.target) && !burger.contains(e.target)) {
        menuUl.classList.remove('active');
      }
    });

    // Ferme le menu lorsque l'utilisateur clique sur un lien
    const menuLinks = menuUl.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuUl.classList.remove('active');
      });
    });
  }
});

//--------------------------------------------------------//
//--------------------------------------------------------//
document.addEventListener('DOMContentLoaded', function() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

