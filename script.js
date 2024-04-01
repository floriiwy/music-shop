const items = [{
        title: "Электрическая гитара Yamaha",
        description: "Волшебство звука",
        tags: ["струнные"],
        price: 847,
        img: "./img/1.webp",
    },
    {
        title: "Электрическое фортепиано Casio",
        description: "Клавиши ведут нас в мир звука",
        tags: ["струнные", "клавишные"],
        price: 1739,
        img: "./img/2.webp",
    },
    {
        title: "Саксофон Stagg",
        description: "Джазовые вибрации",
        tags: ["духовые"],
        price: 2556,
        img: "./img/3.jpg",
    },
    {
        title: "Барабаны Pearl",
        description: "Ритм сердца",
        tags: ["ударные"],
        price: 3462,
        img: "./img/4.jpg",
    },
    {
        title: "Аккустическая гитара Cort",
        description: "Играем на струнах души",
        tags: ["струнные"],
        price: 2531,
        img: "./img/5.jpg",
    },
    {
        title: "Классическое фортепиано W.Hoffmann",
        description: "Лёгкость звука и вдохновения",
        tags: ["струнные", "клавишные"],
        price: 2893,
        img: "./img/6.jpg",
    },
    {
        title: "Труба Yamaha",
        description: "Великий звук",
        tags: ["духовые"],
        price: 4071,
        img: "./img/7.gif",
    },
    {
        title: "Аккордеон Roland",
        description: "Мелодия в каждом аккорде",
        tags: ["гармоники"],
        price: 5039,
        img: "./img/8.jpg",
    },
    {
        title: "Треугольник",
        description: "Дополнение к волшебному звучанию",
        tags: ["прочее"],
        price: 5055,
        img: "./img/9.jpg",
    },
    {
        title: "Укулеле Flight",
        description: "Экзотический звук Гавайев",
        tags: ["струнные"],
        price: 3156,
        img: "./img/10.jpg",
    },
    {
        title: "Укулеле Cort",
        description: "Играем с ритмом",
        tags: ["струнные"],
        price: 470,
        img: "./img/11.jpg",
    },
    {
        title: "Аккордеон Weltmeister",
        description: "Миниатюрная музыка в вашем кармане",
        tags: ["гармоники"],
        price: 1612,
        img: "./img/12.jpg",
    },
];

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });
    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}


function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

renderItems(currentState);

function prepareShopItem(shopItem) {
    const { title, description, tags, img, price } = shopItem;
    const item = itemTemplate.content.cloneNode(true);
    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price} BYN`;

    const tagsHolder = item.querySelector(".tags");

    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    });

    return item;
}

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();
    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));
    sortControl.selectedIndex = 0;
}


searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {

    const selectedOption = event.target.value;

    switch (selectedOption) {
        case "expensive":
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "alphabet":
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    renderItems(currentState);
});