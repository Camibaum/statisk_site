const productData = {
  id: 1163,
  gender: "Men",
  category: "Apparel",
  subcategory: "Topwear",
  articletype: "Tshirts",
  basecolour: "Blue",
  season: "Summer",
  productionyear: 2011,
  usagetype: "Sports",
  productdisplayname: "Sahara Team India Fanwear Round Neck Jersey",
  parsed: 1,
  soldout: 0,
  relid: 1163,
  price: 895,
  discount: null,
  variantname: "Roundneck Jersey",
  brandname: "Nike",
  brandbio: "Nike, the leading global sports brand, creates products that combine performance and style.",
};

// console.log("JavaScript script er indlæst korrekt");
// document.getElementById("product-name").textContent = "Test produktnavn";

document.getElementById("product-name").textContent = productData.name;
document.getElementById("product-model").textContent = "Model: " + productData.model;
document.getElementById("product-color").textContent = "Color: " + productData.color;
document.getElementById("product-description").textContent = productData.description;
document.getElementById("product-price").textContent = "Price: " + productData.price;

// Tilføj billeder dynamisk
// const productImages = document.getElementById("product-images");
// productData.images.forEach((image) => {
//   const img = document.createElement("img");
//   img.src = image;
//   img.alt = productData.name;
//   productImages.appendChild(img);
// });
