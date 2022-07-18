const drop_account = document.getElementById("dropdown-account");
const account_submenu = document.getElementById("account-submenu");
const drop_pref = document.getElementById("dropdown-pref");
const pref_submenu = document.getElementById("pref-submenu");
const drop_ico = document.getElementById("dropdown-ico");
const dropico_pref = document.getElementById("drop-pref");
const search_box = document.getElementById("header-primary__input");
const search_screen = document.getElementById("search-screen");
const btn_close = document.getElementById("close");
const sma_container = document.querySelector(".sma-container__container");

const data = [];

drop_account.addEventListener("click", () => {
  account_submenu.classList.toggle("isDisp");
  drop_ico.style.top = "12px";
});

drop_pref.addEventListener("click", () => {
  pref_submenu.classList.toggle("isDisp");
  dropico_pref.style.top = "12px";
});

search_box.addEventListener("click", () => {
  search_box.value = "k";
  search_box.value = "";
  search_screen.style.display = "block";
  fetchData(" ");
});

btn_close.addEventListener("click", () => {
  search_screen.style.display = "none";
  search_box.value = "";
});

function fetchData(keywords) {
  fetch(
    `https://tva.staging.b2brain.com/search/autocomplete_org_all/?q=${keywords}`
  )
    .then((response) => {
      if (!response.ok) {
        throw Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      sma_container.innerHTML = "";
      data.forEach((data) => {
        const sma_card = document.createElement("div");
        sma_card.classList.add("sma__card");

        if (data.logo) {
          const sma_img = document.createElement("img");
          sma_img.src = data.logo;
          sma_card.appendChild(sma_img);
        } else {
          const sma_img = document.createElement("div");
          sma_img.classList.add(".sma_card__img_box");
          sma_img.style.width = "80px";
          sma_img.style.height = "50px";
          sma_img.style.display = "flex";
          sma_img.style.alignItems = "center";
          sma_img.style.justifyContent = "center";
          sma_img.style.backgroundColor = data.color;
          const sma_img_text = document.createElement("h1");
          sma_img_text.textContent = data.company.charAt(0);
          sma_img_text.style.color = "black";
          sma_img.appendChild(sma_img_text);
          sma_card.appendChild(sma_img);
        }
        const sma__card_container = document.createElement("div");
        sma__card_container.classList.add("sma__card__container");
        sma_card.appendChild(sma__card_container);

        const card__primary_heading = document.createElement("h1");
        card__primary_heading.classList.add("card__primary_heading");
        card__primary_heading.textContent = data.company;
        sma__card_container.appendChild(card__primary_heading);

        const card__sub_heading = document.createElement("p");
        card__sub_heading.classList.add("card__sub_heading");
        card__sub_heading.textContent = data.website;
        sma__card_container.appendChild(card__sub_heading);

        const btn_orange = document.createElement("button");
        btn_orange.classList.add("btn");
        btn_orange.classList.add("btn--orange");
        btn_orange.textContent = "Track";
        sma_card.appendChild(btn_orange);
        btn_orange.addEventListener("click", (e) => {
          console.log(`${data.company}, ${data.slug} tracked at ${new Date()}`);
          btn_orange.classList.remove("btn--orange");
          btn_orange.textContent = "Tracking";
          btn_orange.classList.add("btn--green");
        });

        sma_container.appendChild(sma_card);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

search_box.addEventListener("keyup", (e) => {
  fetchData(e.target.value);
});
