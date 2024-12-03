// index.js
const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Dados de livros (com 20 livros)
const livros = [
  { titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", ano: 1954, isbn: "0261103571" },
  { titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899, isbn: "8520912109" },
  { titulo: "1984", autor: "George Orwell", ano: 1949, isbn: "0451524934" },
  { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", ano: 1943, isbn: "0850372575" },
  { titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", ano: 1997, isbn: "0747532745" },
  { titulo: "O Hobbit", autor: "J.R.R. Tolkien", ano: 1937, isbn: "0345339681" },
  { titulo: "O Código Da Vinci", autor: "Dan Brown", ano: 2003, isbn: "0307474275" },
  { titulo: "A Guerra dos Tronos", autor: "George R.R. Martin", ano: 1996, isbn: "0553103547" },
  { titulo: "O Alquimista", autor: "Paulo Coelho", ano: 1988, isbn: "0061122416" },
  { titulo: "A Menina que Roubava Livros", autor: "Markus Zusak", ano: 2005, isbn: "0375842209" },
  { titulo: "A Casa dos Espíritos", autor: "Isabel Allende", ano: 1982, isbn: "0452295260" },
  { titulo: "O Caçador de Pipas", autor: "Khaled Hosseini", ano: 2003, isbn: "1594480001" },
  { titulo: "Mataram a Cotovia", autor: "Harper Lee", ano: 1960, isbn: "0061120081" },
  { titulo: "A Divina Comédia", autor: "Dante Alighieri", ano: 1320, isbn: "1593080291" },
  { titulo: "O Primo Basílio", autor: "José de Alencar", ano: 1878, isbn: "8572327556" },
  { titulo: "Cem Anos de Solidão", autor: "Gabriel García Márquez", ano: 1967, isbn: "0060883286" },
  { titulo: "Orgulho e Preconceito", autor: "Jane Austen", ano: 1813, isbn: "0141040343" },
  { titulo: "O Grande Gatsby", autor: "F. Scott Fitzgerald", ano: 1925, isbn: "0743273567" },
  { titulo: "O Diário de Anne Frank", autor: "Anne Frank", ano: 1947, isbn: "0553296981" },
  { titulo: "A Sombra do Vento", autor: "Carlos Ruiz Zafón", ano: 2001, isbn: "0385600413" }
];

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Função para buscar a imagem do livro na Open Library
async function fetchBookCover(isbn) {
  try {
    const response = await axios.get(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`);
    return response.config.url; // Retorna a URL da imagem
  } catch (error) {
    console.log("Erro ao buscar imagem:", error);
    return null; // Retorna null se não encontrar imagem
  }
}

// Rota para retornar os livros
app.get("/api/livros", async (req, res) => {
  const livrosComImagens = [];

  for (const livro of livros) {
    const imagem = await fetchBookCover(livro.isbn);

    livrosComImagens.push({
      ...livro,
      imagem: imagem || 'https://via.placeholder.com/128x198?text=Sem+Imagem' // Fallback se não houver imagem
    });
  }

  res.json(livrosComImagens);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:" + PORT);
});