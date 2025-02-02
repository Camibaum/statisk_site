// 1️⃣ Hent produkterne fra API'et
fetch("https://kea-alt-del.dk/t7/api/products")
  .then((res) => res.json())
  .then(showProducts)
  .catch((error) => console.error("Fejl ved hentning af data:", error));

function showProducts(products) {
  const container = document.querySelector(".product_list_container");

  // 2️⃣ Vælg kun de 4 produkter, du vil vise (f.eks. med bestemte ID'er)
  const selectedIDs = [1163, 1164, 1165, 1525]; // Dine 4 udvalgte produkter
  const selectedProducts = products.filter((product) => selectedIDs.includes(product.id));

  // 3️⃣ Loop gennem de valgte produkter og opret HTML dynamisk
  selectedProducts.forEach((product) => {
    const productHTML = `
      <div class="product-card ${product.soldout ? "sold-out" : ""}">
        ${product.soldout ? '<span class="sold-out-label">Sold Out</span>' : ""}
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
        <div class="product-info">
          <h3>${product.productdisplayname}</h3>
          <p class="category">${product.category} | ${product.brandname}</p>
          ${
            product.discount
              ? `
            <div class="price-wrapper">
              <span class="prev-price">Prev. DKK ${product.price},-</span>
              <span class="new-price">Now DKK ${Math.round(product.price * (1 - product.discount / 100))},-</span>
              <span class="sale-tag">-${product.discount}%</span>
            </div>`
              : `<p class="price">DKK ${product.price},-</p>`
          }
          <a href="product.html?id=${product.id}">Read More</a>
        </div>
      </div>
    `;

    container.innerHTML += productHTML;
  });
}
