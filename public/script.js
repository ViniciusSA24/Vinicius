async function fetchLivros() {
  try {
    const response = await fetch("/api/livros"); 
    const livros = await response.json(); 
    const listaLivros = document.getElementById("livros-lista");
    listaLivros.innerHTML = "";
    if (livros.length === 0) {
      listaLivros.innerHTML = "<p>Não há livros disponíveis.</p>";
      return;
    }
    livros.forEach((livro) => {
      const li = document.createElement("li");
      li.innerHTML = `
  <div>
    <h3>${livro.titulo}</h3>
    <p>Autor: ${livro.autor}</p>
    <p>Ano: ${livro.ano}</p>
    <img src="${livro.imagem}" alt="Capa do livro ${livro.titulo}" />
  </div>
`;
      listaLivros.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao carregar livros:", error);
    const listaLivros = document.getElementById("livros-lista");
    listaLivros.innerHTML = "<p>Erro ao carregar os livros. Tente novamente mais tarde.</p>";
  }
}

document.addEventListener("DOMContentLoaded", fetchLivros);
