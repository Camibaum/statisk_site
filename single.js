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

// ------- Kode til single produkt view (Sahara bruges i stedet for produkt)

// Hent produkt ID fra URL'en
const urlParams = new URLSearchParams(window.location.search);
const saharaId = urlParams.get("id"); // Henter ID fra URL'en, f.eks. ?id=1163

// Tjek om ID'et matcher et af de fire produkter
const validIds = [1163, 1164, 1165, 1525];

if (validIds.includes(Number(saharaId))) {
  fetch(`https://kea-alt-del.dk/t7/api/products/${saharaId}`)
    .then((res) => res.json())
    .then(showSahara)
    .catch((error) => console.error("Fejl ved hentning af produktdata:", error));
} else {
  console.error("Ugyldigt produkt ID");
}

function showSahara(sahara) {
  console.log(sahara);

  // Opdater billede
  document.querySelector(".sahara-image img").src = `https://kea-alt-del.dk/t7/images/webp/1000/${sahara.id}.webp`;
  document.querySelector(".sahara-image img").alt = sahara.productdisplayname;

  // Opdater produktinfo
  document.querySelector(".sahara-info h1").textContent = sahara.productdisplayname;
  document.querySelector(".sahara-info p:nth-of-type(1)").textContent = sahara.productdisplayname;
  document.querySelector(".sahara-info p:nth-of-type(2)").textContent = sahara.color;
  document.querySelector(".sahara-info p:nth-of-type(3)").textContent = sahara.id;

  // Brand information
  document.querySelector(".sahara-info h2").textContent = sahara.brandname;
  document.querySelector(".sahara-info .slogan").textContent = "Nike, creating experiences for today’s athlete"; // Erstat med rigtig data hvis muligt

  // Purchase box
  document.querySelector(".sahara-purchase h3").textContent = sahara.productdisplayname;
  document.querySelector(".sahara-purchase p").textContent = `${sahara.brandname} | ${sahara.articletype}`;
}

// Tilføj produkt til kurven
document.querySelector(".sahara-cart-button").addEventListener("click", function () {
  const size = document.getElementById("sahara-size").value;
  alert("Added " + document.querySelector(".sahara-info h1").textContent + " (Size: " + size + ") to basket");
});

// // ------- Kode til single Sahara produkt view

// const urlParams = new URLSearchParams(window.location.search);
// const saharaId = urlParams.get("id");

// fetch(`https://kea-alt-del.dk/t7/api/products/${saharaId}`)
//   .then((res) => res.json())
//   .then(showSahara)
//   .catch((error) => console.error("Fejl ved hentning af produktdata:", error));

// function showSahara(sahara) {
//   console.log(sahara);

//   // Sæt produktbilledet
//   document.querySelector(".sahara-image img").src = `https://kea-alt-del.dk/t7/images/webp/1000/${sahara.id}.webp`;
//   document.querySelector(".sahara-image img").alt = sahara.productdisplayname;

//   // Sæt produktinformation
//   document.querySelector(".sahara-info h1").textContent = sahara.productdisplayname;
//   document.querySelector(".sahara-info p:nth-of-type(1)").textContent = sahara.productdisplayname;
//   document.querySelector(".sahara-info p:nth-of-type(2)").textContent = sahara.color;
//   document.querySelector(".sahara-info p:nth-of-type(3)").textContent = sahara.id;

//   // Brand information
//   document.querySelector(".sahara-info h2").textContent = sahara.brandname;
//   document.querySelector(".sahara-info .slogan").textContent = "Nike, creating experiences for today’s athlete"; // Erstat med rigtig data hvis muligt

//   // Purchase box
//   document.querySelector(".sahara-purchase h3").textContent = sahara.productdisplayname;
//   document.querySelector(".sahara-purchase p").textContent = `${sahara.brandname} | ${sahara.articletype}`;
// }

// document.querySelector(".sahara-cart-button").addEventListener("click", function () {
//   const size = document.getElementById("sahara-size").value;
//   alert("Added Sahara Jersey (Size: " + size + ") to basket");
// });
