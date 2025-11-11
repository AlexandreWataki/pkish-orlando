const jwt = require("jsonwebtoken");

// sua chave secreta
const JWT_SECRET =
  "29750249ff7236e7b63457f2f486d06d352c96abb43055c7548dc0eadd0d47011f3b5c202e2dd40315a73e3c87a2263454a6be5d17930ed0b44728b51be2362a";

// dados que vão dentro do token
const payload = {
  id: 1,
  email: "teste@pkish.com",
  name: "Matheus Wataki",
};

// gera o token com validade de 7 dias
const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

console.log("✅ Seu JWT gerado:\n");
console.log(token);
