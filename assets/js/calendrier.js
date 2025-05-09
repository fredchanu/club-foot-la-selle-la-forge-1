
document.addEventListener('DOMContentLoaded', () => {
  const matchList = document.getElementById('match-list');
  const teamFilter = document.getElementById('team-filter');
  const equipesSet = new Set();

  fetch('/calendrier.json')
    .then(res => res.json())
    .then(files => {
      const promises = files.map(file => fetch(file.file).then(r => r.json()));
      return Promise.all(promises);
    })
    .then(events => {
      const sorted = events.sort((a, b) => new Date(a.date) - new Date(b.date));

      sorted.forEach(event => {
        const dateObj = new Date(event.date);
        const dateStr = dateObj.toLocaleDateString('fr-FR', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        const teamMatch = event.title.match(/(U\d+|Seniors)/i);
        const team = teamMatch ? teamMatch[1].toLowerCase() : 'autres';
        equipesSet.add(team);

        const li = document.createElement('li');
        li.dataset.team = team;
        li.innerHTML = `<strong>${dateStr}</strong> – ${event.title}`;
        matchList.appendChild(li);
      });

      [...equipesSet].sort().forEach(team => {
        const opt = document.createElement('option');
        opt.value = team;
        opt.textContent = team.charAt(0).toUpperCase() + team.slice(1);
        teamFilter.appendChild(opt);
      });
    });

  teamFilter.addEventListener('change', () => {
    const selected = teamFilter.value;
    document.querySelectorAll('#match-list li').forEach(li => {
      li.style.display = selected === 'all' || li.dataset.team === selected ? 'block' : 'none';
    });
  });
});
