let cart = [];

function addToCart(productName, sizeClass, breadClass, ingredientClass) {
  const size = document.querySelector(`input[name=${sizeClass}]:checked`).value;
  const bread = document.querySelector(`input[name=${breadClass}]:checked`).value;

  const ingredientCheckboxes = document.getElementsByClassName(ingredientClass);
  const removedIngredients = [];
  for (let checkbox of ingredientCheckboxes) {
    if (checkbox.checked) {
      removedIngredients.push(checkbox.value);
    }
  }

  let price = size === 'single' ? (productName === 'CHAMA Clássico' ? 25 : 29) : (productName === 'CHAMA Clássico' ? 33 : 37);

  cart.push({
    productName,
    size: size === 'single' ? 'Simples' : 'Duplo',
    bread,
    price,
    removedIngredients
  });

  displayCart();
}

function displayCart() {
  const cartElement = document.getElementById("cart");
  cartElement.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    let removed = item.removedIngredients.length > 0 ? ` (Remover: ${item.removedIngredients.join(', ')})` : '';
    cartElement.innerHTML += `<p>${item.productName} (${item.size}) - Pão: ${item.bread}${removed} - R$${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remover</button></p>`;
    total += item.price;
  });

  total += 5.00;
  cartElement.innerHTML += `<h3>Total com entrega: R$${total.toFixed(2)}</h3>`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}

function finalizeOrder() {
  const customerName = document.getElementById("customer-name").value;
  const address = document.getElementById("address").value;
  const reference = document.getElementById("reference").value;

  if (!customerName || !address || !reference) {
    alert("Preencha todas as informações!");
    return;
  }

  let orderSummary = `🍔 Pedido de ${customerName}\nEndereço: ${address}\nPonto de Referência: ${reference}\n\n`;
  cart.forEach(item => {
    let removed = item.removedIngredients.length > 0 ? ` (Remover: ${item.removedIngredients.join(', ')})` : '';
    orderSummary += `${item.productName} (${item.size}) - Pão: ${item.bread}${removed} - R$${item.price.toFixed(2)}\n`;
  });
  orderSummary += `\nTotal com entrega: R$${(cart.reduce((acc, item) => acc + item.price, 0) + 5).toFixed(2)}`;

  alert(orderSummary);
}


  // Enviar pedido via WhatsApp
  const whatsappNumber = "48991490613"; // Coloque aqui o número do WhatsApp do restaurante
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;
  window.open(whatsappLink, '_blank');
}
