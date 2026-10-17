const movieDurations = [50, 169, 47, 169, 60, 201, 15];

const userName = prompt("Введите ваше имя:", "КТо-ТО?") || "Киноман";

function findMaxDuration(durations) {
  let max = durations[0];
  for (let i = 1; i < durations.length; i++) {
    if (durations[i] > max) {
      max = durations[i];
    }
  }
  return max;
}

function filterLongMovies(durations) {
  return durations.filter(duration => duration > 120);
}

function calculateTotalDuration(durations) {
  let total = 0;
  for (const duration of durations) {
    total += duration;
  }
  return total;
}

const maxDuration = findMaxDuration(movieDurations);

const longMovies = filterLongMovies(movieDurations);
const longMoviesTotalDuration = calculateTotalDuration(longMovies);

const totalDuration = calculateTotalDuration(movieDurations);

let shortMovieCount = 0;
let shortMovieTotalDuration = 0;

for (const duration of movieDurations) {
  if (duration <= 40) {
    shortMovieCount++;
    shortMovieTotalDuration += duration;
  }
}

alert(
  `Здравствуйте, ${userName}!\n` +
  `Общая длительность просмотра – ${totalDuration} минут, из них ${longMoviesTotalDuration} минут – полнометражные фильмы.`
);

console.log(`Количество короткометражек: ${shortMovieCount}`);
console.log(`Суммарная длительность короткометражек: ${shortMovieTotalDuration} минут.`);

if (maxDuration >= 180) {
  console.log("Это почти как полноценный театральный спектакль!");
}




const STORAGE_KEYS = {
  MOVIES: 'lab5_movies_list',
  THEME: 'lab5_theme'
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMovieTable();
  setupEventListeners();
});

function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'theme-dark';
  document.body.className = savedTheme;
}

function toggleTheme() {
  if (!document.body) {
    console.error("Элемент <body> не найден.");
    return;
  }
  const isLight = document.body.classList.contains('theme-light');
  const newTheme = isLight ? 'theme-dark' : 'theme-light';
  document.body.className = newTheme;
  localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
}

function initMovieTable() {
  const tbody = document.getElementById('movies-tbody');
  if (!tbody) {
    console.error('Элемент не найден: #movies-tbody');
    return;
  }

  const savedMovies = JSON.parse(localStorage.getItem(STORAGE_KEYS.MOVIES)) || [
    { title: 'Реквием по мечте', year: 2000, status: 'Просмотрено' },
    { title: 'Хоббит: Нежданное путешествие ', year: 2012, status: 'К просмотру' }
  ];

  renderMovies(savedMovies);
}


function renderMovies(movies) {
  const tbody = document.getElementById('movies-tbody');
  if (!tbody) {
    console.error('Контейнер таблицы #movies-tbody не найден.');
    return;
  }

  tbody.innerHTML = ''; 

  movies.forEach((movie, index) => {
    const tr = document.createElement('tr');

    const tdTitle = document.createElement('td');
    tdTitle.textContent = movie.title;

    
    const tdYear = document.createElement('td');
    tdYear.textContent = movie.year;

    const tdStatus = document.createElement('td');
    const statusBtn = document.createElement('button');
    statusBtn.className = 'status-btn';
    statusBtn.textContent = movie.status;
    statusBtn.addEventListener('click', () => toggleMovieStatus(index));
    tdStatus.appendChild(statusBtn);

    const tdActions = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Удалить';
    deleteBtn.addEventListener('click', () => deleteMovie(index));
    tdActions.appendChild(deleteBtn);

    tr.appendChild(tdTitle);
    tr.appendChild(tdYear);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
  });

  localStorage.setItem(STORAGE_KEYS.MOVIES, JSON.stringify(movies));
}

function addMovie() {
  const title = prompt('Введите название фильма:');
  if (!title || !title.trim()) return;

  const year = prompt('Введите год выпуска:', new Date().getFullYear());
  if (!year || isNaN(year)) {
    alert('Некорректный год!');
    return;
  }

  const movies = getStoredMovies();
  movies.push({
    title: title.trim(),
    year: parseInt(year, 10),
    status: 'К просмотру'
  });

  renderMovies(movies);
}

function deleteMovie(index) {
  const movies = getStoredMovies();
  movies.splice(index, 1);
  renderMovies(movies);
}

function toggleMovieStatus(index) {
  const movies = getStoredMovies();
  if (!movies[index]) return;
  movies[index].status = movies[index].status === 'Просмотрено' ? 'К просмотру' : 'Просмотрено';
  renderMovies(movies);
}

function clearMovies() {
  const movies = getStoredMovies();
  if (movies.length === 0) {
    alert('Список уже пуст!');
    console.log('Нет фильмов для удаления');
    return;
  }

  if (confirm('Вы уверены, что хотите очистить весь список фильмов?')) {
    renderMovies([]);
  }
}

function toggleTableVisibility() {
  const tableContainer = document.getElementById('table-container');
  const toggleBtn = document.getElementById('toggle-table-btn');

  if (!tableContainer || !toggleBtn) {
    console.error('Элементы управления таблицей не найдены.');
    return;
  }

  tableContainer.classList.toggle('hidden');
  toggleBtn.textContent = tableContainer.classList.contains('hidden') ? 'Показать таблицу' : 'Скрыть таблицу';
}

function getStoredMovies() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.MOVIES)) || [];
}

function setupEventListeners() {
  const addBtn = document.getElementById('add-movie-btn');
  const clearBtn = document.getElementById('clear-movies-btn');
  const toggleTableBtn = document.getElementById('toggle-table-btn');
  const themeBtn = document.getElementById('theme-toggle-btn');

  if (addBtn) addBtn.addEventListener('click', addMovie);
  else console.error('Элемент #add-movie-btn не найден');

  if (clearBtn) clearBtn.addEventListener('click', clearMovies);
  else console.error('Элемент #clear-movies-btn не найден');

  if (toggleTableBtn) toggleTableBtn.addEventListener('click', toggleTableVisibility);
  else console.error('Элемент #toggle-table-btn не найден');

  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  else console.error('Элемент #theme-toggle-btn не найден');
}