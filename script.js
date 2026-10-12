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