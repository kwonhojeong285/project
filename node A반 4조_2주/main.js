const options = {
    method: 'GET', //restAPI에 따른 메소드이자 리소스를 조회중...!
    headers: {     //여기는 json방식의 호출과 api 키 값을 넣었음...!
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDBkNGZmNDI4Mjg1YjljM2FjNDg2MjlhN2I5MmUyYSIsInN1YiI6IjY0NzVmMWMxMWJmMjY2MDQzZWNkZGVjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.77Z9bbZ2GcnUfrheuoGpUoNsHgqTF7l_7GkEI9gDFQY'

    }
};
//api에 요청 보내는중..!!
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())  //api 응답을 json으로 파싱
    .then(data => {
        let mvrow = data['results'];
        const list = document.getElementById('Mvposter');

        function showList(val = '') {   //val이라는 매개변수에 기본값은 빈 문자열로 하였다
            list.innerHTML = "";        //위 Mvposter에 저장된 내용을 지운다...!!

            mvrow.forEach(movie => {    //데이터를 처리하기 위한 콜백함수
                let id = movie.id;
                let title = movie.title;
                let poster_path = movie.poster_path;
                let overview = movie.overview;
                let vote_average = movie.vote_average;
                if (title.toLowerCase().includes(val.toLowerCase())) {
                    const movieElement = document.createElement("div");
                    movieElement.className = "movieElement";

                    const posterElement = document.createElement("a");
                    posterElement.href = `chat/movie.html?id=${id}`;

                    const imgElement = document.createElement("img");
                    imgElement.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
                    imgElement.alt = title;

                    const detailsElement = document.createElement("div");
                    detailsElement.className = "detailsElement";

                    const titleElement = document.createElement("h2");
                    titleElement.innerText = title;

                    const overviewElement = document.createElement("p");
                    overviewElement.innerText = overview;

                    const ratingElement = document.createElement("p");
                    ratingElement.innerText = `평점: ${vote_average}`;

                    detailsElement.appendChild(titleElement);
                    detailsElement.appendChild(overviewElement);
                    detailsElement.appendChild(ratingElement);

                    posterElement.appendChild(imgElement);

                    movieElement.appendChild(posterElement);
                    movieElement.appendChild(detailsElement);

                    list.appendChild(movieElement);
                }
            });
        }
        showList();
        const searchForm = document.querySelector('.search');
        const searchInput = document.querySelector('#mvInput');

        searchForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const searchValue = searchInput.value;
            showList(searchValue);
        });
    })
    .catch(error => console.log('Error:', error));