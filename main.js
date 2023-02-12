const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0cd36d720cmsha08c21833644722p1ed12ejsnadfb5be146d0",
    "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
  },
};
let inp = document.querySelector("input");
let btn = document.querySelector("#button-addon2");
btn.addEventListener("click", (e) => {
  let title = inp.value.replace(" ", "");
  if (!title) {
    infoCard.innerHTML = "write a name ";
  } else {
    infoCard.innerHTML = "";
    let url = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${title}&sortBy=ranking&sortOrder=asc`;
    getApi(url);
  }
});

async function getApi(url) {
  const response = await fetch(url, options);
  var data = await response.json();
  if (data.data.length == 0) {
    infoCard.innerHTML =
      "wow that's not good try it again and be more specific";
  }
  readData(data);
}
let infoCard = document.querySelector(".info");
function readData(data) {
  //card
  for (i = 0; i < data.data.length; i++) {
    let card = document.createElement("div");
    card.className = "card";
    card.style.width = "302px";
    // card.style.height = "100%";
    //card image
    let poster = document.createElement("img");
    poster.className = "card-img-top";
    poster.style.width = "300px";
    poster.style.height = "300px";
    poster.setAttribute("src", `${data.data[i].image}`);
    //end img

    // body card && title && summry
    let bCard = document.createElement("div");
    bCard.className = "card-body";
    let animeT = document.createElement("h5");
    animeT.className = "card-title";
    animeT.innerHTML = `${data.data[i].title}::${data.data[i].type} `;
    let animeSummary = document.createElement("p");
    let parag = document.createElement("div");
    parag.style.height = "300px";
    parag.style.overflow = "hidden";
    parag.appendChild(animeSummary);
    animeSummary.className = "card-text";
    animeSummary.innerHTML = data.data[i].synopsis;
    //end body
    //the over flow
    let spn = document.createElement("span");
    spn.innerText = "Readmore ...";
    spn.addEventListener("click", (e) => {
      if (parag.style.overflow == "hidden") {
        parag.style.overflow = "";
        parag.style.height = "";
      } else {
        parag.style.overflow = "hidden";
        parag.style.height = "300px";
      }
    });
    // the end
    //list of items
    let list = document.createElement("ul");
    list.className = "list-group list-group-flush";
    let genre = document.createElement("li");
    genre.className = "list-group-item";
    genre.innerHTML = `the genre : ${data.data[i].genres}.`;
    let animeStatus = document.createElement("li");
    animeStatus.className = "list-group-item";
    animeStatus.innerHTML = `this anime is ${data.data[i].status} with total of ${data.data[i].episodes} `;
    //end list
    // footer card
    let fCard = document.createElement("div");
    fCard.className = "card-footer";
    let btnCard = document.createElement("a");
    btnCard.className = "btn btn-primary";
    btnCard.innerHTML = "watch it";
    //end
    fCard.appendChild(btnCard);
    list.appendChild(genre);
    list.appendChild(animeStatus);
    bCard.appendChild(animeT);
    bCard.appendChild(parag);
    bCard.appendChild(spn);
    card.appendChild(poster);
    card.appendChild(bCard);
    card.appendChild(list);
    card.appendChild(fCard);
    infoCard.appendChild(card);
  }
}
