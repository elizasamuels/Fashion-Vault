const itemsDiv = document.getElementById("items");
const model = document.getElementById("model");

inventory.forEach(item => {
  const img = document.createElement("img");
  img.src = item.image;
  img.width = 70;
  img.onclick = () => placeItem(item.image);
  items.appendChild(img);
});


function placeItem(src) {
  const img = document.createElement("img");
  img.src = src;
  img.style.position = "absolute";
  img.style.top = "150px";
  img.style.left = "100px";
  model.appendChild(img);
}
