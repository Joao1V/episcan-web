export function setAttribute(selector: string, attribute: string, value: string): void {
   // Seleciona o elemento baseado no seletor
   const element = document.querySelector(selector);

   // Verifica se o elemento foi encontrado
   if (element) {
      // Define o atributo e o valor
      element.setAttribute(attribute, value);
   } else {
      console.error(`Elemento não encontrado para o seletor: "${selector}"`);
   }
}

export function removeAttribute(selector: string, attributeName: string): void {
   // Seleciona o elemento baseado no seletor
   const element = document.querySelector(selector);

   // Verifica se o elemento foi encontrado
   if (element) {
      // Remove o atributo
      element.removeAttribute(attributeName);
   } else {
      console.error(`Elemento não encontrado para o seletor: "${selector}"`);
   }
}
