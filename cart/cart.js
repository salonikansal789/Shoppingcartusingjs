const users = JSON.parse(localStorage.getItem('users'));
const loginUserIndex = users.findIndex(user => user.isLogin === true);
let cartProducts;
if(loginUserIndex!=-1)
{
   cartProducts =   users[loginUserIndex].cartProducts || [];

  console.log(cartProducts);
}

function removeItem(productId) {
  const productIndex = cartProducts.findIndex(product => product.id === productId);

  if (productIndex > -1) {
     cartProducts.splice(productIndex, 1); 
  }

  renderCartItems(); 
}
function renderCartItems() {
  console.log(cartProducts);
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = ``;

  cartProducts.forEach(product => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.id = `cart-item-${product.id}`;

    cartItem.innerHTML = `
      <div class="cart-item-details">
      <img src='${product.image}'></img>
      <div class='product-details'>
        <p>Title : ${product.title}</p>
        <p>Price: $${product.price}</p>
        <p>Quantity: ${product.quantity}</p>
      </div>
      
      </div>
      <button class="remove-btn" onclick="removeItem(${product.id})">Remove From Cart</button>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  updateCheckout();
}

function updateCheckout() {
  const checkoutList = document.getElementById('checkoutList');
  checkoutList.innerHTML = ''; 

  let totalPrice = 0;

  cartProducts.forEach(product => {
    const checkoutItem = document.createElement('div');
    checkoutItem.classList.add('checkout-item');
    checkoutItem.innerHTML=`    <p>${product.quantity} ${product.title}</p>
        <p>$${product.price}</p>`;
    checkoutList.appendChild(checkoutItem);

    totalPrice += product.price;
  });

  const totalPriceElement = document.getElementById('totalPrice');
  totalPriceElement.innerHTML = `
   <p>Total:</p>
        <p>$${totalPrice}</p>
        `;
  
}

  function checkout() {

      var options = {
        "key": "rzp_test_c9jlzD0dQQtYPe	", // Enter the Key ID generated from the Dashboard
        "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Acme Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    
    alert('Proceeding to checkout...');
  }
  renderCartItems();
  