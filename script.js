let cart = [];

// Função para garantir que apenas um checkbox de tamanho ou pão possa ser selecionado
function toggleCheckbox(checkedId, uncheckedId) {
  const checked = document.getElementById(checkedId);
  const unchecked = document.getElementById(uncheckedId);
  
  if (checked.checked) {
    unchecked.checked = false;
  }
}

function addToCart(productName, sizeClass, breadClass, ingredientClass) {
  // Capturar o tamanho selecionado
  const sizeCheckboxes = document.querySelectorAll(`input[name=${sizeClass}]`);
  let size;
  sizeCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      size = checkbox.value;
    }
  });

  // Capturar o pão
