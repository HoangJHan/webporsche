document.addEventListener("DOMContentLoaded", function () {
  const infoButtons = document.querySelectorAll(
    ".button-container button:last-child"
  );
  const productInfos = document.querySelectorAll(".product-info");

  infoButtons.forEach((button, index) => {
    button.addEventListener("mouseenter", () => {
      productInfos[index].style.display = "block";
    });

    button.addEventListener("mouseleave", () => {
      productInfos[index].style.display = "none";
    });
  });
});
//------------Thêm vào giỏ hàng --------------//
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelectorAll(".add-to-cart");
  // lấy từng phần tử trong một đối tượng
  btn.forEach(function (button) {
    button.addEventListener("click", function (event) {
      var btnItem = event.target;
      var product = btnItem.closest(".product-item");
      var productImg = product.querySelector("img").src;
      var productName = product.querySelector("h1").innerText;
      var productPrice = product.querySelector("span").innerText;
      addCart(productPrice, productImg, productName);
    });
  });

  // lấy các dữ liệu vào cart
  function addCart(productPrice, productImg, productName) {
    var addtr = document.createElement("tr");
    var trcontent =
      '<tr><td style="display: flex; align-items: center"><img style="width: 90px" src="' +
      productImg +
      '" alt="" /><span class="title">' +
      productName +
      '</span> </td> <td><span class="prices">' +
      productPrice +
      '</span><sup>$</sup></td> <td><input style="width: 30px; outline: none" type="number" value="1" min="1" /></td> <td style="cursor: pointer"><span class="cart-delete">Xóa</span></td> </tr>';
    addtr.innerHTML = trcontent;
    var cartTable = document.querySelector("tbody");
    cartTable.append(addtr);
    carttotle();
    deleteCart();
    inputchange();
  }

  // Tính tổng tiền
  function carttotle() {
    var cartItem = document.querySelectorAll("tbody tr");
    var totalC = 0;
    for (var i = 0; i < cartItem.length; i++) {
      var inputValue = cartItem[i].querySelector("input").value;
      var productPrice = cartItem[i].querySelector(".prices").innerHTML;
      totalA = inputValue * productPrice * 1000;
      totalC = totalC + totalA;
    }
    var cartTotalA = document.querySelector(".price-total span");
    var cartPrice = document.querySelector(".cart-icon span");
    cartTotalA.innerHTML = totalC.toLocaleString("de-DE");
    cartPrice.innerHTML = totalC.toLocaleString("de-DE");
  }

  // Xóa sản phẩm khỏi giỏ hàng
  function deleteCart() {
    var cartItem = document.querySelectorAll("tbody tr");
    cartItem.forEach(function (item) {
      var deleteBtn = item.querySelector(".cart-delete");
      deleteBtn.addEventListener("click", function () {
        item.remove();
        carttotle();
      });
    });
  }

  // Cập nhật tổng giá khi thay đổi số lượng
  function inputchange() {
    var cartItem = document.querySelectorAll("tbody tr");
    cartItem.forEach(function (item) {
      var inputValue = item.querySelector("input");
      inputValue.addEventListener("change", function () {
        carttotle();
      });
    });
  }

  // Hiển thị và ẩn giỏ hàng
  const cartbtn = document.querySelector(".fa-times");
  const cartshow = document.querySelector(".fa-cart-shopping");
  cartshow.addEventListener("click", function () {
    document.querySelector(".cart").style.right = "0";
  });

  cartbtn.addEventListener("click", function () {
    document.querySelector(".cart").style.right = "-100%";
  });
});
