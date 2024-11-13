function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function loadData() {
    try {
        const response = await fetch("data.json");
        const data = await response.json();

        const figureId = getQueryParam("id") || "abdul_razak"; // Default id if not provided

        const figure = data.figures.find(item => item.id === figureId);

        if (!figure) {
            console.error("Figure not found");
            window.location.href = "error.html";
            return;

        }

        document.getElementById("title").innerText = figure.biography.name;
        document.getElementById("figure-name").innerText = figure.biography.name;
        document.getElementById("fname").innerText = figure.biography.name;
        document.getElementById("title-tagline").innerText = figure.biography.title;
        

        const image = document.getElementById("image");
        image.src = figure.biography.image.src;
        image.alt = figure.biography.image.alt;
        document.getElementById("img-caption").innerText = figure.biography.image.caption;

        const timelineList = document.getElementById("timeline-list");
        timelineList.innerHTML = "";
        figure.biography.timeline.forEach(item => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${item.year}</strong> - ${item.event}`;
            timelineList.appendChild(listItem);
        });

        document.getElementById("quote-text").innerText = figure.biography.quote;
        document.getElementById("quote-author").innerText = figure.biography.name;
        document.getElementById("tribute-link").href = figure.wiki_link;


    } catch (error) {
        console.error("Error loading data:", error);
    }
}

window.onload = loadData;
