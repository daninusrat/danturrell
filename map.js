// paths
const SVG_URL = "assets/svg/danturrell.svg";
const DATA_URL = "data.json";

const mapEl = document.getElementById("map");
const infoWrap = document.getElementById("infoContent");
const titleEl = document.getElementById("placeTitle");
const textEl = document.getElementById("placeText");
const imgEl = document.getElementById("placeImg");

let dataById = {};

// 1) Hent JSON
fetch(DATA_URL)
  .then((r) => r.json())
  .then((list) => {
    dataById = Object.fromEntries(list.map((item) => [item.id, item]));
  })
  .then(loadSVG)
  .catch((err) => console.error("JSON fejl:", err));

// 2) Hent + indsæt SVG inline, så vi kan binde events
function loadSVG() {
  fetch(SVG_URL)
    .then((r) => r.text())
    .then((svgText) => {
      mapEl.innerHTML = svgText;

      // Find POI-elementer: brug dine circle-ID'er fra Illustrator
      // Giv dem gerne class="poi" i Illustrator; ellers tilføjer vi den her.
      const poiIds = ["assistens", "onkel_dannys", "istedgade", "dan_turells_plads", "palae"];
      poiIds.forEach((id) => {
        const el = mapEl.querySelector("#" + CSS.escape(id));
        if (!el) return;

        // Hvis din cirkel ikke har class, så giv den
        el.classList.add("poi");

        el.addEventListener("click", () => showInfo(id));
        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            showInfo(id);
          }
        });

        // a11y
        el.setAttribute("role", "button");
        el.setAttribute("tabindex", "0");
        el.setAttribute("aria-label", id.replaceAll("_", " "));
      });
    })
    .catch((err) => console.error("SVG fejl:", err));
}

// 3) Opdater infoboksen
function showInfo(id) {
  const item = dataById[id];
  if (!item) return;

  titleEl.textContent = item.title;
  textEl.textContent = item.text;
  imgEl.src = item.img;
  imgEl.alt = item.title;

  infoWrap.hidden = false;
}
