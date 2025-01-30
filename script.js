const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm){
    const url = `http://localhost:3000/artists?name_like=${searchTerm}` // query para buscar só o artista digitado
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            const filteredResults = result.filter(artist =>
                artist.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(
                    searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                )
            );
            displayResults(filteredResults);});
}

function displayResults(result){
    resultPlaylist.classList.add('hidden');
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerHTML = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === ''){
        resultArtist.classList.add('hidden');
        resultPlaylist.classList.remove('hidden');
        return;
    }

    requestApi(searchTerm)

})