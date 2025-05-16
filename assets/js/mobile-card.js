document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver(() => {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
    });
  });

  const container = document.getElementById('partenaires-container');

  if (container) {
    observer.observe(container, { childList: true, subtree: true });
  }
});
