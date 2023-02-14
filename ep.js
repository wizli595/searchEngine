let spn = document.querySelector("span");
let kk = localStorage.getItem("nameAnime").replace(" ", "-");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0cd36d720cmsha08c21833644722p1ed12ejsnadfb5be146d0",
    "X-RapidAPI-Host": "gogoanime2.p.rapidapi.com",
  },
};

let url = `https://gogoanime2.p.rapidapi.com/vidcdn/watch/${kk}-episode-8`;
async function getApi(url) {
  const response = await fetch(url, options);
  var data = await response.json();
  console.log(data);
  watch(data);
}
let list = document.querySelector(".list");
function watch(data) {
  for (i = 0; i < 10; i++) {
    let ep = document.createElement("span");
    let link = document.createElement("a");
    link.innerHTML = "episode";
    link.setAttribute("href", data.Referer);
    ep.append(link);
    list.append(ep);
  }
}
getApi(url);
