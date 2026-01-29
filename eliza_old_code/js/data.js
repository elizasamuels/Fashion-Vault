const STORAGE_KEY = "closetlab_inventory";

let inventory = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveInventory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
}
