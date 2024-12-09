const loginNav = document.getElementById('loginNav');
const signupNav = document.getElementById('signupNav');
const content = document.getElementById('content');
document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header-container");
    headerContainer.innerHTML=`<header>
    <h1>MeShop</h1>
     <div id="js-navigation">
        <p onclick='navigate("../auth/login.html")'>Login</p>
        <p onclick='navigate("../auth/signup.html")'>Signup</p>
     <p onclick='navigate("../shop/shop.html")'>Shop</p>
     <p onclick='navigate("../profile/profile.html")'>Profile</p>
       <p onclick='navigate("/cart/cart.html" )'>Cart</p>
    </div>
  </header>`;
});
function navigate(path)
{
  console.log(path)

  if(isLoggedIn())
  {
    window.location.href = path;
  }
  else if(path =="../auth/login.html")
    {
      window.location.href = path;
    
    }
else if(path =="../auth/signup.html")
{
  window.location.href = path;

}
  else {
    alert('login please')
    console.log("login please")
  }
}
document.addEventListener("DOMContentLoaded", () => {
 
  const loginButton = document.getElementById("loginNav");
  if (loginButton) {
    loginButton.addEventListener("click", () => {
      window.location.href = "../auth/login.html";
    });
  }

  const signupButton = document.getElementById("signupNav");
  if (signupButton) {
    signupButton.addEventListener("click", () => {
      window.location.href = "../auth/signup.html"; 
    });
  }
});
function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}
// function restrictPageAccess() {
//   const restrictedPages = ["/profile/profile.html", "/shop/shop.html", "/cart/cart.html"];
//   const currentPath = window.location.pathname;

//   if (restrictedPages.includes(currentPath) && !isLoggedIn()) {
//     alert("You need to log in to access this page!");
//     window.location.href = "/auth/login.html"; 
//   }
// }
// document.querySelectorAll("#js-navigation a").forEach((link) => {
//   link.addEventListener("click", (event) => {
 
//     const restrictedPages = ["/profile/profile.html", "/shop/shop.html", "/cart/cart.html"];
//     const targetHref = new URL(link.href).pathname;
//     if (restrictedPages.includes(targetHref) && !isLoggedIn()) {
//       event.preventDefault(); 
//       alert("Your are not login. Login Please!");
//     }
  
//   });
// });
// restrictPageAccess();

