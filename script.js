let formElement = document.querySelector("form");
let searchField = document.getElementById("search-field");
let mainContainer = document.getElementById("main-container");
let showMore = document.getElementById("show-more");

const accessKey = "qy0QArV5VPT54S8YhtlvyFP0jRizqlSVBEq4S7S2CLE";

let searchQuery = "";
let page = 1;

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchQuery = searchField.value;
    searchImages(searchQuery);
})

showMore.addEventListener("click", () => {
    searchImages(searchQuery);
})

async function searchImages(search) {
    let url = `https://api.unsplash.com/search/photos?page=${page}&per_page=30&query=${searchQuery}&client_id=${accessKey}`;

    let response = await fetch(url);
    let data = await response.json();

    // console.log(data);

    let results = data.results;

    console.log(results);

    if (page === 1) {
        mainContainer.innerHTML = "";
    }

    results.map((result) => {
        let imageContainer = document.createElement("div");
        imageContainer.classList = "image-container";
        imageContainer.innerHTML = `
            <img src="${result.urls.small}" alt="image" class="image">
            <div class="link-container">
            <a href="${result.links.html}" class="link" target="_blank"><i class="fi fi-brands-unsplash"></i></a>
            </div>
            <button onclick="downloadImage('${result.urls.regular}','${result.slug}')"><i class="fi fi-sr-down-to-line"></i></button>
        `
        mainContainer.appendChild(imageContainer);
    });

    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

async function downloadImage(url, name) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();

        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${name}.jpg`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        alert('Error downloading image:', error);
    }
}
