document.addEventListener("DOMContentLoaded", function () {
  const basketContainer = document.getElementById("basket-container");

  function updateLocalStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function calculateTotalPrice(cart) {
    return cart.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 1;
      return acc + price * quantity;
    }, 0);
  }

  function loadItemsFromCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    basketContainer.innerHTML = "";
    let totalPrice = calculateTotalPrice(cart);

    cart.forEach((item, index) => {
      const productElement = document.createElement("div");
      productElement.classList.add("container", "content_basket", "mt-3");
      productElement.innerHTML = `
      <div class="row align-items-center">
      <div class="col-4">
          <img alt="" style="width: calc(50% + 80px);" src="${
          item.img
      }" class="img-fluid rounded" style="max-width: 100%; height: auto;">
      </div>
      <div class="col-8">
          <div class="row">
              <div class="col-12">
                  <h5 class="mb-3">${item.name}</h5>
              </div>
              <div class="col-3 d-flex align-items-center">
                  <button class="btn btn_minus" type="submit"><img alt="" src="/img/minus.png"></button>
                  <span class="mx-2 count_product">${item.quantity || 1}</span>
                  <button class="btn btn_plus" type="submit"><img alt="" src="/img/plus.png"></button>
              </div>
              <div class="col-2 d-flex align-items-center justify-content-center">
                  <button class="btn" type="submit"><img alt="" src="/img/delete.png"></button>
              </div>
              <div class="col-4">
                  <h5 class="mb-2">Дополнительная гарантия:</h5>
                  <button class="btn btn-secondary btn_model" type="button">Нет 0₽</button>
                  <button class="btn btn-secondary btn_active" type="button">+12 мес. 650₽</button>
                  <button class="btn btn-secondary btn_model" type="button">+24 мес. 1200₽</button>
              </div>
              <div class="col-3 text-end">
                  <h5>${item.price}₽</h5>
              </div>
          </div>
      </div>
  </div>
            <div class="row justify-content-between align-items-end mt-2">
                <div class="col-auto">
                    <h5>В наличии:&nbsp;<u>в 2 магазинах</u></h5>
                </div>
                <div class="col-auto">
                    <button class="btn" type="submit"><img alt="" src="/img/logo_favorite.png"></button>
                </div>
            </div>
            <hr class="p-1 mx-0 my-1">
            <div class="row">
                <div class="col-6 align-items-center">
                    <h4>Дополнительные услуги:</h4>
                    <div class="form-check">
                        <input class="form-check-input" id="flexCheckDefault1" type="checkbox" value="">
                        <label class="form-check-label" for="flexCheckDefault1">Наклейка защитного стекла-350₽</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="flexCheckDefault2" type="checkbox" value="">
                        <label class="form-check-label" for="flexCheckDefault2">ТО смартфона-1050₽</label>
                    </div>
                </div>
                <div class="col-6 d-flex justify-content-between align-items-center">
                    <h3>Цена:&nbsp;${item.totalPrice || item.price}&nbsp;₽</h3>
                    <button class="btn btn-warning button_buy_cart" type="button">Купить</button>
                </div>
            </div>`;

      productElement
        .querySelector(".btn_minus")
        .addEventListener("click", () => {
          if (item.quantity > 1) {
            item.quantity--;
            updateLocalStorage(cart);
            loadItemsFromCart();
          }
        });

      productElement
        .querySelector(".btn_plus")
        .addEventListener("click", () => {
          item.quantity++;
          updateLocalStorage(cart);
          loadItemsFromCart();
        });

      productElement
        .querySelector('.btn img[src="/img/delete.png"]')
        .addEventListener("click", () => {
          cart.splice(index, 1);
          updateLocalStorage(cart);
          loadItemsFromCart();
        });

      basketContainer.appendChild(productElement);
    });

    const totalElement = document.createElement("h3");
    totalElement.textContent = `Общая стоимость: ${totalPrice}₽`;
    basketContainer.appendChild(totalElement);
  }

  loadItemsFromCart();
});
