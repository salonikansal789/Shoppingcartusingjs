
const apiURL = "https://fakestoreapi.com/products";
let productsApiResponse = [];
const ratingInput = document.getElementById('rating');
const ratingDisplay = document.querySelector('.select-rating');

ratingDisplay.textContent = ratingInput.value;
ratingInput.addEventListener('input', function() {
    ratingDisplay.textContent = ratingInput.value;
});
async function fetchProducts() {
    try {
        const response = await fetch(apiURL);
        const products = await response.json();
       
        productsApiResponse = products.map(product => ({
            ...product,
            sizes: product.sizes || ["S", "M", "L", "XL"],
            colors: product.colors || ["Red", "Blue", "Green", "Black"],
        }));
        const categories = productsApiResponse.reduce((acc, product) => {
            if (!acc[product.category]) acc[product.category] = [];
            acc[product.category].push(product);
            return acc;
        }, {});
        displayProductsByCategory(categories);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}
 function searchProduct(){
    const search = document.getElementById('search-input').value;
    if(search.length==0)
        {
            fetchProducts();
        }
        else{
    const results = productsApiResponse.filter(product =>
        product.title.toLowerCase().includes(search) || product.category.toLowerCase().includes(search)
      );
      if (results.length === 0) {
        const categoriesContainer=document.getElementById('categories-container')
        categoriesContainer.innerHTML = "<p>No products found.</p>";
      }
      console.log(results)
      displaySearchProduct(results);
        }
    }
    function searchProductByButtons(category){
        const results = productsApiResponse.filter(product =>
        product.category.toLowerCase().includes(category)
          );
          if (results.length === 0) {
            const categoriesContainer=document.getElementById('categories-container')
            categoriesContainer.innerHTML = "<p>No products found.</p>";
          }
          console.log(results)
          displaySearchProduct(results);
        
        }
    function applyFilter(){
        const selectedColors = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .filter(el => el.id.includes("color"))
        .map(el => el.value);
        const selectedSizes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .filter(el => el.id.includes("size"))
        .map(el => el.value);
        const selectedRating = document.getElementById('rating').value;
        
        const selectedPriceRange = Array.from(document.querySelectorAll('input[type="radio"]:checked'))
        .map(el => el.value)[0];
        const filteredProducts = productsApiResponse.filter(product => {
            const matchesColors = selectedColors.length === 0 || 
                selectedColors.some(color => product.colors.includes(color));
            
            const matchesSizes = selectedSizes.length === 0 || 
                selectedSizes.some(size => product.sizes.includes(size));
            
            const matchesRating = !selectedRating || product.rating.rate >= selectedRating;
    
             const matchesPrice = !selectedPriceRange || checkPriceRange(product.price, selectedPriceRange);
    
            return matchesColors && matchesSizes && matchesRating && matchesPrice;
        });
    
        displaySearchProduct(filteredProducts);
    }
    function checkPriceRange(price, range) {
        const [min, max] = range.split("-").map(Number);
        if (!max) return price >= min; 
        return price >= min && price <= max;
    }
function displayProductsByCategory(categories) {
    const container = document.getElementById("categories-container");
    container.innerHTML = ""; 

    const orderedCategories = ["men's clothing", ...Object.keys(categories).filter(c => c !== "men's clothing")];

    orderedCategories.forEach(category => {
        const categorySection = document.createElement("div");
        categorySection.className = "category-section";

        const heading = document.createElement("h2");
        heading.textContent = category.charAt(0).toUpperCase() + category.slice(1); 
        categorySection.appendChild(heading);

        const productsContainer = document.createElement("div");
        productsContainer.className = "products-container";

        categories[category].forEach(product => {
            console.log(product)
            const productCard = document.createElement("div");
            productCard.className = "product-card";
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" />
             <div class="product-detail">              
                <div class='product-size'>
                <p>$${product.price.toFixed(2)}</p>
                 <p>${product.sizes.join(", ")}</p>
                </div>
 <div class="product-colors">
  <p>Colors:</p>
 </div>                <div class="rating-product">
                <p>Rating: </p>
                <p class='product-rating'>${product.rating.rate}</p>
                </div>

            </div>
               
                <button class="add-to-cart-btn" onclick='addToCard(${product.id})'>Add to Cart</button>
               
            `;
            const colorContainer = productCard.querySelector(".product-colors");
            product.colors.forEach(color => {
                const colorCircle = document.createElement("span");
                colorCircle.style.backgroundColor = color;
                colorCircle.style.width = "10px";
                colorCircle.style.height = "10px";
                colorCircle.style.borderRadius = "50%";
                colorCircle.style.display = "inline-block";
                colorCircle.style.marginRight = "5px";
                colorCircle.style.marginTop='3px';
                colorCircle.style.marginLeft='7px';
                colorContainer.appendChild(colorCircle);
            });
            productsContainer.appendChild(productCard);
        });

        categorySection.appendChild(productsContainer);
        container.appendChild(categorySection);
    });
}
function displaySearchProduct(products){
    const container = document.getElementById("categories-container");
    container.innerHTML = "";
    const productsContainer = document.createElement("div");
    productsContainer.className = "products-container";
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" />
         <div class="product-detail">              
            <div class='product-size'>
            <p>$${product.price.toFixed(2)}</p>
             <p>${product.sizes.join(", ")}</p>
            </div>
<div class="product-colors">
<p>Colors:</p>
</div>                <div class="rating-product">
            <p>Rating: </p>
            <p class='product-rating'>${product.rating.rate}</p>
            </div>

        </div>
           
            <button class="add-to-cart-btn" onclick='addToCard(${product.id})>Add to Cart</button>  `;
        const colorContainer = productCard.querySelector(".product-colors");
        product.colors.forEach(color => {
            const colorCircle = document.createElement("span");
            colorCircle.style.backgroundColor = color;
            colorCircle.style.width = "10px";
            colorCircle.style.height = "10px";
            colorCircle.style.borderRadius = "50%";
            colorCircle.style.display = "inline-block";
            colorCircle.style.marginRight = "5px";
            colorCircle.style.marginTop='3px';
            colorCircle.style.marginLeft='7px';
            colorContainer.appendChild(colorCircle);
        });
        productsContainer.appendChild(productCard);
    }); 
    container.appendChild(productsContainer);
}
function addToCard(productId) {
    const product = productsApiResponse.find(p => p.id === productId);
    if (!product) {
        console.error("Product not found");
        return;
    }

    let cart = [];
    try {
        const storedCart = localStorage.getItem('cartProducts');
        cart = storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error('Error parsing cart data from localStorage:', error);
        cart = [];
    }

    const existingProduct = cart.find(p => p.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1; 
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cartProducts', JSON.stringify(cart));
    alert(`${product.title} has been added to your cart!`);
}

fetchProducts();

