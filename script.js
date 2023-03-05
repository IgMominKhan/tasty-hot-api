window.onload = getData();
let productsData, meals;
// load products data
function getData(name = "chicken_breast") {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      productsData = data;
      if (data.meals?.length > 6) {
        meals = data.meals.slice(0, 6);
        showProduct(meals);
      } else {
        document.getElementById("show-all").style.display = "none";
        showProduct(data.meals);
      }
    });
}

document.getElementById("form").addEventListener("submit", getUserInput);

// get user input
function getUserInput(event) {
  event.preventDefault();
  const inputField = document.getElementById("input");
  const input = inputField.value;
  getData(input);
}

const showAllBtn = document.getElementById("show-all");
const showLessBtn = document.getElementById("show-less");
// show all products
function showAll() {
  showProduct(productsData.meals);
  showAllBtn.classList.toggle("d-none");
  showLessBtn.classList.toggle("d-none");
}

// show less

function showLess() {
  showProduct(meals);
  showAllBtn.classList.toggle("d-none");
  showLessBtn.classList.toggle("d-none");
}
// show product on the document
function showProduct(meals) {
  const products = document.getElementById("products");

  meals
    ? (products.innerHTML = "")
    : (products.innerHTML = "<h3 class='text-center mt-5 mx-auto'>No Data Available</h3>");
  meals.forEach((item) => {
    const col = document.createElement("div");
    col.setAttribute("class", "col-12 g-3");

    col.innerHTML = `<div class="card mb-3 mx-auto" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${item.strMealThumb}" class="img-fluid rounded-start h-100 cover" alt="..." />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${item.strMeal}</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <span class="link-danger text-decoration-underline" onclick='getItemDetails(${item.idMeal})' data-bs-toggle='modal' data-bs-target='#product-modal' >View Details</span>
      </div>
    </div>
  </div>
</div>`;

    products.appendChild(col);
  });
}

// show details
function getItemDetails(id) {
  document.getElementById("spinner").classList.remove("d-none");
  document.getElementById("modal__product-detail").innerHTML = "";
  document.getElementById("modal__product-title").innerHTML = "";
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showProductModal(data));
}

// show modal content
function showProductModal(product) {
  console.log(product);
  document.getElementById(
    "modal__product-title"
  ).innerHTML = `${product.meals[0].strMeal}`;

  document.getElementById("modal__product-detail").innerHTML = `
    <img src='${product.meals[0].strMealThumb}' class='img-fluid' />
    <h5 class='mt-4'>Category: <span class='fw-light'>${product.meals[0].strCategory}</span></h5>
    <h5 class='mt-3'>Area : <span class='fw-light'>${product.meals[0].strArea}</span></h5>
    <h5 class='mt-3'>Instructions : <span class='fw-light'>${product.meals[0].strInstructions}</span></h5>
    <h4 class='mt-3'>Youtube : <a href='${product.meals[0].strYoutube}' target='_blank' class='fw-normal text-decoration-none'>${product.meals[0].strYoutube}</a></h4>

    `;

  document.getElementById("spinner").classList.add("d-none");
}
