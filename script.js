const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];
addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
function addItem(event) {
  event.preventDefault();
  const text = this.querySelector("[name='item']").value;
  const item = {
    text: text,
    done: false,
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}
function toggleDone(event) {
  if (!event.target.matches("input")) {
    return;
  }
  const el = event.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, index) => {
      return `
			<li>
				<input type='checkbox' data-index='${index}' id='item${index}' ${
        plate.done ? "checked" : ""
      } />
				<label for='item${index}'><span>${plate.text}</span></label>
			</li>
		`;
    })
    .join("");
}
populateList(items, itemsList);
