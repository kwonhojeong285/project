const API_KEY = 'a0094590e9fee25cc40c4fd568cfe4b0';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDA5NDU5MGU5ZmVlMjVjYzQwYzRmZDU2OGNmZTRiMCIsInN1YiI6IjY0NzA4YTg0NTQzN2Y1MDE0NzVmMDYwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Oni6C6y9_TO1PU8sQODwzVJx-7zJunZjT2SWLLp01ZM'
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;


// API로부터 영화 데이터 가져오기
async function fetchMovies() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log('Error fetching movies:', error);
  }
}

// 영화 정보 카드
function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
  
    const image = document.createElement('img');
    image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`; // API에서 포스터 이미지 URL
    image.alt = movie.title;
  
    const title = document.createElement('h2');
    title.textContent = movie.title;
    
    const overview = document.createElement('p');
    overview.textContent = movie.overview;
  
    const rating = document.createElement('p');
    rating.innerHTML = `<as>평점:</as> ${movie.vote_average}`;
  
    movieCard.appendChild(image);
    movieCard.appendChild(title);
    movieCard.appendChild(overview);
    movieCard.appendChild(rating);

  // 영화 카드 클릭 시 알림 창으로 영화 ID 표시
  movieCard.addEventListener('click', () => {
    alert(`클릭한 영화 ID: ${movie.id}`);
  });

  return movieCard;
}

// 영화 목록 화면에 표시하기
async function renderMovies() {
  const movieContainer = document.getElementById('movie-container');
  movieContainer.innerHTML = '';

  const movies = await fetchMovies();

  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    movieContainer.appendChild(movieCard);
  });
}

// 검색 버튼 클릭 시 영화 검색 기능
function handleSearch() {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.trim().toLowerCase();

  const movieCards = document.getElementsByClassName('movie-card');

  for (let i = 0; i < movieCards.length; i++) {
    const movieTitle = movieCards[i].getElementsByTagName('h2')[0].textContent.toLowerCase();

    if (movieTitle.includes(searchTerm)) {
      movieCards[i].style.display = 'block';
    } else {
      movieCards[i].style.display = 'none';
    }
  }
}

// 검색 버튼 클릭 시 알림
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handleSearch);

// 초기 영화 목록 표기
renderMovies();