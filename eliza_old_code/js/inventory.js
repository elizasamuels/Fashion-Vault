let editId = null;

function addItem() {
  const name = name.value;
  const type = type.value;
  const style = style.value;
  const file = image.files[0];

  if (!file) return alert("Please upload an image.");

  const reader = new FileReader();
  reader.onload = () => {
    if (editId) {
      const item = inventory.find(i => i.id === editId);
      Object.assign(item, { name, type, style, image: reader.result });
      editId = null;
    } else {
      inventory.push({
        id: Date.now(),
        name,
        type,
        style,
        image: reader.result
      });
    }

    saveInventory();
    renderInventory(inventory);
  };

  reader.readAsDataURL(file);
}

function renderInventory(items) {
  const grid = document.getElementById("inventoryGrid");
  grid.innerHTML = "";

  items.forEach(item => {
    grid.innerHTML += `
      <div class="card">
        <img src="${item.image}" width="100">
        <p>${item.name}</p>
        <button onclick="editItem(${item.id})">Edit</button>
        <button onclick="deleteItem(${item.id})">Delete</button>
      </div>
    `;
  });
}

function editItem(id) {
  const item = inventory.find(i => i.id === id);
  name.value = item.name;
  type.value = item.type;
  style.value = item.style;
  editId = id;
}

function deleteItem(id) {
  inventory = inventory.filter(i => i.id !== id);
  saveInventory();
  renderInventory(inventory);
}

function applyFilters() {
  const t = typeFilter.value;
  const s = styleFilter.value;

  renderInventory(
    inventory.filter(i =>
      (!t || i.type === t) &&
      (!s || i.style === s)
    )
  );
}

renderInventory(inventory);
