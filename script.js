const foodItems = document.querySelectorAll("#menu img");
const foodItem = document.querySelector(".item");

foodItems.forEach(item => {
    item.addEventListener("click",() => {
        foodItem.src = item.src;
    })
})