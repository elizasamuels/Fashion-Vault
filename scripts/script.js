// Make carousel not move by itself
$('.carousel').carousel({
    interval: false,
  });
// Create objects for the closet (Tops, Bottoms, Shoes_
// Create default top
let defaultHead = {
    image: "images/heads/default-head.png",
    altText: "Selected Head"
}

let defaultTop = {
    category: "Shirts",
    subcategory: "T-shirts",
    color: "White",
    size: "Medium",
    image: "images/shirts/default-shirt.png",
    altText: "First Top in Closet",
    wears: 0
}

// Create default bottoms
let defaultBottoms = {
    category: "Pants",
    subcategory: "Khakis",
    color: "Beige",
    size: "Medium",
    image: "images/pants/default-pants.png",
    altText: "First Pants in Closet",
    wears: 0
}

// Create default shoes
let defaultShoes = {
    category: "Shoes",
    subcategory: "Sneakers",
    color: "Black",
    size: "Medium",
    image: "images/shoes/default-shoes.png",
    altText: "First Shoes in Closet",
    wears: 0
}

let tops = [];
let bottoms = [];
let shoes = [];
let closet = [];

tops.push(defaultTop);
bottoms.push(defaultBottoms);
shoes.push(defaultShoes);

// Add items to carousel
let topsCarousel = document.getElementById("carousel-inner-1");
let bottomsCarousel = document.getElementById("carousel-inner-2");
let shoesCarousel = document.getElementById("carousel-inner-3");

// Make item carousel slides
tops.forEach((item, index) => {
    let itemSlide = document.createElement("div");
    itemSlide.classList.add("carousel-item");
    if (index === 0) itemSlide.classList.add("active");
    let itemImg = document.createElement("img");
    itemImg.classList.add("d-block", "w-100");
    itemImg.height = "100";
    itemImg.width = "100";
    itemImg.src = item.image;
    itemImg.alt = item.altText;
    itemSlide.appendChild(itemImg);
    topsCarousel.appendChild(itemSlide);
});

bottoms.forEach((item, index) => {
    let itemSlide = document.createElement("div");
    itemSlide.classList.add("carousel-item");
    if (index === 0) itemSlide.classList.add("active");
    let itemImg = document.createElement("img");
    itemImg.classList.add("d-block", "w-100");
    itemImg.height = "100";
    itemImg.width = "100";
    itemImg.src = item.image;
    itemImg.alt = item.altText;
    itemSlide.appendChild(itemImg);
    bottomsCarousel.appendChild(itemSlide);
});

shoes.forEach((item, index) => {
    let itemSlide = document.createElement("div");
    itemSlide.classList.add("carousel-item");
    if (index === 0) itemSlide.classList.add("active");
    let itemImg = document.createElement("img");
    itemImg.classList.add("d-block", "w-100");
    itemImg.height = "100";
    itemImg.width = "100";
    itemImg.src = item.image;
    itemImg.alt = item.altText;
    itemSlide.appendChild(itemImg);
    shoesCarousel.appendChild(itemSlide);
});


// Make currently worn object
let currentlyWorn = {
    head: defaultHead,
    top: defaultTop,
    bottoms: defaultBottoms,
    shoes: defaultShoes
}

let div2 = document.getElementById("div2");
// Head
let currHead = document.createElement("img");
currHead.id = "curr-head";
currHead.height = "100";
currHead.width = "100";
currHead.src = currentlyWorn.head.image;
currHead.alt = currentlyWorn.head.altText;
div2.appendChild(currHead);
// Top
let currTop = document.createElement("img");
currTop.id = "curr-shirt";
currTop.height = "100";
currTop.width = "100";
currTop.src = currentlyWorn.top.image;
currTop.alt = currentlyWorn.top.altText;
div2.appendChild(currTop);
// Bottoms
let currBottoms = document.createElement("img");
currBottoms.id = "curr-pants";
currBottoms.height = "100";
currBottoms.width = "100";
currBottoms.src = currentlyWorn.bottoms.image;
currBottoms.alt = currentlyWorn.bottoms.altText;
div2.appendChild(currBottoms);
// Shoes
let currShoes = document.createElement("img");
currShoes.id = "curr-shoes";
currShoes.height = "100";
currShoes.width = "100";
currShoes.src = currentlyWorn.shoes.image;
currShoes.alt = currentlyWorn.shoes.altText;
div2.appendChild(currShoes);


// when going through the carousel, make the current slide the worn object
function updateCurrentOutfitFromCarousel() {
    // Top
    let activeTop = document.querySelector('#carousel-inner-1 .carousel-item.active img');
    currentlyWorn.top = {
        category: activeTop.category,
        subcategory: activeTop.subcategory,
        color: activeTop.color,
        size: activeTop.size,
        image: activeTop.src,
        altText: activeTop.alt,
        wears: activeTop.wears
    };
    document.getElementById("curr-shirt").src = activeTop.src;
    document.getElementById("curr-shirt").alt = activeTop.alt;

    // Bottoms
    let activeBottom = document.querySelector('#carousel-inner-2 .carousel-item.active img');
    currentlyWorn.bottoms = {
        category: activeBottom.category,
        subcategory: activeBottom.subcategory,
        color: activeBottom.color,
        size: activeBottom.size,
        image: activeBottom.src,
        altText: activeBottom.alt,
        wears: activeBottom.wears
    };
    document.getElementById("curr-pants").src = activeBottom.src;
    document.getElementById("curr-pants").alt = activeBottom.alt;

    // Shoes
    let activeShoes = document.querySelector('#carousel-inner-3 .carousel-item.active img');
    currentlyWorn.shoes = {
        category: activeShoes.category,
        subcategory: activeShoes.subcategory,
        color: activeShoes.color,
        size: activeShoes.size,
        image: activeShoes.src,
        altText: activeShoes.alt,// i actually messed up and need to change a lot of this to defaultshoes also do that to the above but my head hurts lol
        wears: activeShoes.wears
    };
    document.getElementById("curr-shoes").src = activeShoes.src;
    document.getElementById("curr-shoes").alt = activeShoes.alt;
}
$('#carouselDiv4').on('slid.bs.carousel', updateCurrentOutfitFromCarousel);
$('#carouselDiv5').on('slid.bs.carousel', updateCurrentOutfitFromCarousel);
$('#carouselDiv6').on('slid.bs.carousel', updateCurrentOutfitFromCarousel);

// Call to weather API
const weatherButton = document.getElementById("weatherButton");
let weatherP = document.getElementById("weatherP");
weatherButton.addEventListener('click', async function() {
    console.log("click worked");
    let resp = await fetch("https://api.weatherapi.com/v1/forecast.json?key=2f4f1c7a2eec4e77891215249251604&q=22807&days=1");
    let myjson = await resp.json();
    console.log(myjson);
    const forecast = myjson.forecast.forecastday[0];
    const maxTempF = forecast.day.maxtemp_f;
    const minTempF = forecast.day.mintemp_f;
    const chanceOfRain = forecast.day.daily_chance_of_rain;
    const weatherSummary = `Forecast for Today:\nHigh: ${maxTempF}°F\nLow: ${minTempF}°F\nChance of Rain: ${chanceOfRain}%. Click to close.`;
    weatherP.textContent = weatherSummary;
    weatherP.href = "#";
    weatherDiv.style.display = "inherit";
})

const weatherDiv = document.getElementById("weatherDiv");
weatherDiv.addEventListener('click', function() {
    weatherDiv.style.display = "none";
})

// Lower buttons functionality
const laundryButton = document.getElementById('laundry-button');
laundryButton.addEventListener('click', function() {
    window.location.href = 'laundry.html';
});

const favsButton = document.getElementById('favorites-button');
favsButton.addEventListener('click', function() {
    window.location.href = 'favorites.html';
    populateFavoritesHTML();
});

// Save button functionality (TODO MORE, RN JUST ADDS OBJECT TO AN ARRAY. IN FAVORITES.HTML WE SHOULD MAKE IT SO IT LOOPS THRU THE ARRAY
let favOutfits = []

const saveButton = document.getElementById("saveOutfitBtn");
saveButton.addEventListener('click', function() {
    let newFav = JSON.parse(JSON.stringify(currentlyWorn)); //will it not work bc they all have the same variable name? i havent tested this lol
    favOutfits.push(newFav);   // we dont have enough stuff actually logged in the arrays w js to test it rn lol
    localStorage.setItem("favOutfits", JSON.stringify(favOutfits));
    console.log("Saved outfit:", newFav);
})
console.log(favOutfits);

// Put all of the outfits in the favOutfits array onscreen HAVE NOT TESTED YET LOL
function populateFavoritesHTML() {
    const container = document.getElementById("favoritesContainer");
    container.innerHTML = "";
    let storedFavs = localStorage.getItem("favOutfits");
    if (storedFavs) {
        favOutfits = JSON.parse(storedFavs);
    }
    favOutfits.forEach((outfit, index) => {
        let outfitDiv = document.createElement("div");
        outfitDiv.classList.add("card");
        outfitDiv.style.width = "250px";
        let cardBody = `
            <div class="card-body">
                <h5 class="card-title">Outfit ${index + 1}</h5>
                <img src="${outfit.head.image}" alt="${outfit.head.altText}" width="75" height="75">
                <img src="${outfit.top.image}" alt="${outfit.top.altText}" width="75" height="75">
                <img src="${outfit.bottoms.image}" alt="${outfit.bottoms.altText}" width="75" height="75">
                <img src="${outfit.shoes.image}" alt="${outfit.shoes.altText}" width="75" height="75">
            </div>
        `;
        outfitDiv.innerHTML = cardBody;
        container.appendChild(outfitDiv);
    });
}

// Create an object out of add form submission



