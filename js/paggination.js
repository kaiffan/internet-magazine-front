document.addEventListener("DOMContentLoaded", function () {
  const cardContainer = document.getElementById("card-container");
  const paginationContainer = document.getElementById("pagination-container");
  const itemsPerPage = 9;
  let currentPage = 1;

  function loadCardsFromCatalog(page) {
    cardContainer.innerHTML = "";

    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;

    let itemsToShow = CATALOG.slice(start, end);

    let row = document.createElement("div");
    row.className = "row d-flex justify-content-center";

    itemsToShow.forEach((cardData) => {
      const card = document.createElement("div");
      card.classList.add("mx-auto", "mb-4", "card");
      card.innerHTML = `
                <img src="${cardData.img}" alt="${cardData.name}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${cardData.name}</h5>
                    <p class="card-text">Цена: ${cardData.price} руб.</p>
                    <button class="btn btn-primary btn-dark addToCartBtn">Добавить в корзину</button>
                </div>
            `;
      card
          .querySelector(".addToCartBtn")
          .addEventListener("click", function () {
            addToCart(cardData);
            showAddToCartToast();
          });

      card.querySelector(".card-title").addEventListener("click", function () {
        showProductModal(cardData);
      });
      row.appendChild(card);
    });

    cardContainer.appendChild(row);
    renderPagination(CATALOG.length, itemsPerPage, page);
  }

  function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(`Товар ${item.name} добавлен в корзину`);
  }

  function showAddToCartToast() {
    const toastEl = document.getElementById("addToCartToast");
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }

  function renderPagination(totalItems, itemsPerPage, currentPage) {
    paginationContainer.innerHTML = "";
    let totalPages = Math.ceil(totalItems / itemsPerPage);

    let btnPrev = document.createElement("button");
    btnPrev.innerText = "<";
    btnPrev.className = "btn";
    btnPrev.addEventListener("click", () => {
      if (currentPage > 1) {
        loadCardsFromCatalog(--currentPage);
      }
    });
    paginationContainer.appendChild(btnPrev);

    if (currentPage > 2) {
      let btnFirst = document.createElement("button");
      btnFirst.innerText = "1";
      btnFirst.className = "btn";
      btnFirst.addEventListener("click", () => {
        loadCardsFromCatalog(1);
        currentPage = 1;
      });
      paginationContainer.appendChild(btnFirst);

      let dots = document.createElement("span");
      dots.innerText = "...";
      paginationContainer.appendChild(dots);
    }

    let btn = document.createElement("button");
    btn.innerText = currentPage;
    btn.className = "btn active";
    paginationContainer.appendChild(btn);

    if (currentPage < totalPages - 1) {
      let dots = document.createElement("span");
      dots.innerText = "...";
      paginationContainer.appendChild(dots);
    }

    if (currentPage !== totalPages) {
      let btnLast = document.createElement("button");
      btnLast.innerText = totalPages;
      btnLast.className = "btn";
      btnLast.addEventListener("click", () => {
        loadCardsFromCatalog(totalPages);
        currentPage = totalPages;
      });
      paginationContainer.appendChild(btnLast);
    }

    let btnNext = document.createElement("button");
    btnNext.innerText = ">";
    btnNext.className = "btn";
    btnNext.addEventListener("click", () => {
      if (currentPage < totalPages) {
        loadCardsFromCatalog(++currentPage);
      }
    });
    paginationContainer.appendChild(btnNext);
  }
  function showProductModal(product) {
    // Заголовок
    document.querySelector("#productModalLabel").innerText =
        product.name + " " + product.price + "₽";

    // Изображение
    document.querySelector("#productImage").src = product.img;

    // Содержимое модального окна
    document.querySelector("#productModal .col-md-6:nth-child(2)").innerHTML =
        `
            <h4>${product.name}</h4>
            <p><strong>Модель:</strong> ${product.model.join(", ")}</p>
            <p><strong>Цвет:</strong> ${product.color}</p>
            <p><strong>Экран:</strong> ${product.screen}</p>
            <p><strong>Память:</strong> ${product.memory}</p>
            <p><strong>Фото:</strong> ${product.camera}</p>
            <p><strong>Процессор:</strong> ${product.processor}</p>
            <p><strong>SIM-карты:</strong> ${product.sim}</p>
            <p><strong>Операционная система:</strong> ${product.os}</p>
            <p><strong>Беспр. интерфейсы:</strong> ${product.interfaces}</p>
            <p><strong>Стандарт связи:</strong> ${product.communication}</p>
            <p><strong>Вес:</strong> ${product.weight}</p>
        `;

    // Отображаем модальное окно
    const modal = new bootstrap.Modal(document.getElementById("productModal"));
    modal.show();
  }

  loadCardsFromCatalog(currentPage);
});