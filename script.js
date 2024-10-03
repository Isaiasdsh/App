let cart = [];

// Função para adicionar itens ao carrinho
function addToCart(productName, sizeClass, breadClass, ingredientClass) {
  // Capturar o tamanho selecionado
  const size = document.querySelector(`input[name=${sizeClass}]:checked`).value;

  // Capturar o pão selecionado
  const bread = document.querySelector(`input[name=${breadClass}]:checked`).value;

  // Capturar ingredientes removidos
  const ingredientCheckboxes = document.getElementsByClassName(ingredientClass);
  const removedIngredients = [];
  for (let checkbox of ingredientCheckboxes) {
    if (checkbox.checked) {
      removedIngredients.push(checkbox.value);
    }
  }

  // Definir o preço de acordo com o tamanho
  let price = 0;
  if (size === 'single') {
    price = (productName === 'CHAMA Clássico') ? 25 : 29;
  } else {
    price = (productName === 'CHAMA Clássico') ? 33 : 37;
  }

  // Adicionar o item ao carrinho
  cart.push({
    productName: productName,
    size: size === 'single' ? 'Simples' : 'Duplo',
    bread: bread === 'brioche' ? 'Brioche' : 'Parmesão',
    price: price,
    removedIngredients: removedIngredients
  });
  
  // Atualizar o carrinho
  displayCart();
}

// Função para exibir o carrinho
function displayCart() {
  const cartElement = document.getElementById("cart");
  cartElement.innerHTML = ""; // Limpa o carrinho antes de atualizar

  let total = 0;
  cart.forEach((item, index) => {
    let removed = item.removedIngredients.length > 0 ? ` (Remover: ${item.removedIngredients.join(', ')})` : '';
    cartElement.innerHTML += `<p>${item.productName} (${item.size}) - Pão: ${item.bread}${removed} - R$${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remover</button></p>`;
    total += item.price;
  });
  
  // Adicionar a taxa de entrega
  total += 5.00;
  cartElement.innerHTML += `<h3>Total com entrega: R$${total.toFixed(2)}</h3>`;
}

// Função para remover itens do carrinho
function removeFromCart(index) {
  cart.splice(index, 1); // Remove o item do carrinho
  displayCart(); // Atualiza o carrinho
}

// Função para finalizar o pedido
function finalizeOrder() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const customerName = document.getElementById("customer-name").value;
  const address = document.getElementById("address").value;
  const reference = document.getElementById("reference").value;

  if (!customerName || !address || !reference) {
    alert("Por favor, preencha todos os campos de endereço, ponto de referência e nome.");
    return;
  }

  // Gerar a comanda para exibir
  let orderSummary = `🍔 Pedido de ${customerName}\nEndereço: ${address}\nPonto de Referência: ${reference}\n\n`;
  let total = 0;

  cart.forEach((item) => {
    let removed = item.removedIngredients.length > 0 ? ` (Remover: ${item.removedIngredients.join(', ')})` : '';
    orderSummary += `${item.productName} (${item.size}) - Pão: ${item.bread}${removed} - R$${item.price.toFixed(2)}\n`;
    total += item.price;
  });

  total += 5.00; // Adicionar taxa de entrega
  orderSummary += `\nTotal com entrega: R$${total.toFixed(2)}`;

  // Exibir a comanda
  alert(orderSummary);

  // Limpar o carrinho após a finalização do pedido
  cart = [];
  displayCart();
}

  // Enviar pedido via WhatsApp
  const whatsappNumber = "48991490613"; // Coloque aqui o número do WhatsApp do restaurante
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;
  window.open(whatsappLink, '_blank');
}
