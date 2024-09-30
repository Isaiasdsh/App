let cart = [];

function addToCart(productName, sizeId, breadId, ingredientClass) {
  const size = document.getElementById(sizeId).value;
  const bread = document.getElementById(breadId).value;

  // Capturar ingredientes removidos
  const ingredientCheckboxes = document.getElementsByClassName(ingredientClass);
  const removedIngredients = [];
  for (let checkbox of ingredientCheckboxes) {
    if (checkbox.checked) {
      removedIngredients.push(checkbox.value);
    }
  }

  let price = 0;
  if (size === "single") {
    price = productName === "CHAMA Clássico" ? 25 : 29;
  } else {
    price = productName === "CHAMA Clássico" ? 33 : 37;
  }

  // Adicionar ao carrinho
  cart.push({
    productName: productName,
    size: size === "single" ? "Simples" : "Duplo",
    bread: bread === "brioche" ? "Brioche" : "Parmesão",
    price: price,
    removedIngredients: removedIngredients
  });

  displayCart();
}

function displayCart() {
  const cartElement = document.getElementById("cart");
  cartElement.innerHTML = ""; // Limpa o carrinho antes de atualizar

  let total = 0;
  cart.forEach((item, index) => {
    let removed =
      item.removedIngredients.length > 0
        ? ` (Remover: ${item.removedIngredients.join(", ")})`
        : "";
    cartElement.innerHTML += `<p>${item.productName} (${item.size}) - Pão: ${
      item.bread
    }${removed} - R$${item.price.toFixed(
      2
    )} <button onclick="removeFromCart(${index})">Remover</button></p>`;
    total += item.price;
  });

  // Adiciona taxa de entrega
  total += 5.0;

  cartElement.innerHTML += `<h3>Total com entrega: R$${total.toFixed(2)}</h3>`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}

// Função para finalizar o pedido, gerar a comanda e enviar via WhatsApp
function finalizeOrder() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const customerName = document.getElementById("customer-name").value;
  if (!customerName) {
    alert("Por favor, insira seu nome.");
    return;
  }

  // Gerar a comanda para a cozinha
  const comandaElement = document.getElementById("comanda");
  comandaElement.innerHTML = ""; // Limpa a comanda antes de atualizar

  let orderText = `Pedido de ${customerName}:\n\n`;

  cart.forEach((item) => {
    let removed =
      item.removedIngredients.length > 0
        ? ` (Remover: ${item.removedIngredients.join(", ")})`
        : "";
    orderText += `${item.productName} (${item.size}) - Pão: ${item.bread}${removed}\n`;
  });

  // Exibir a comanda na página
  comandaElement.innerHTML = `<pre>${orderText}</pre>`;

  // Enviar pedido via WhatsApp
  const whatsappNumber = "SEU_NUMERO_DE_WHATSAPP"; // Coloque aqui o número do WhatsApp do restaurante
  const whatsappLink = `https://wa.me/${48991490613}?text=${encodeURIComponent(
    orderText
  )}`;
  window.open(whatsappLink, "_blank");
}