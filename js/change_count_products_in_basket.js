const plus_button = document.getElementsByClassName('btn_plus');
const minus_button = document.getElementsByClassName('btn_minus');
const count_product_area = document.getElementsByClassName('count_product');

let count_product = 0;

function update_count_product(value) {
    minus_button.disabled = count_product === 0;
    count_product += value;
    count_product_area.textContent = count_product;
}

plus_button.addEventListener('click', () => {
    update_count_product(1);
});

minus_button.addEventListener('click', () => {
    if (count_product > 0) {
        update_count_product(-1);
    }
})