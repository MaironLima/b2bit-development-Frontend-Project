import { db } from "./src/db";

console.log("🌱 Populando o banco de dados...");

// Limpar dados existentes
db.run("DELETE FROM likes");
db.run("DELETE FROM posts");
db.run("DELETE FROM users");
db.run("DELETE FROM sqlite_sequence WHERE name IN ('users', 'posts', 'likes')");

// Criar usuários
const users = [
  {
    name: "Mairon Lima",
    email: "maironlmelo@gmail.com",
    password: "password123",
  },
  {
    name: "Maria Eduarda",
    email: "mariaeduarda@example.com",
    password: "password123",
  },
  {
    name: "Rafael Borges",
    email: "rafaelborges@example.com",
    password: "password123",
  },
];

const insertUser = db.prepare(
  "INSERT INTO users (name, email, password) VALUES (?, ?, ?) RETURNING id",
);
const userIds = users.map(
  (u) => (insertUser.get(u.name, u.email, u.password) as any).id,
);

console.log(`✅ ${userIds.length} usuários criados.`);

// Criar posts
const posts = [
  {
    title: "Espero que goste!",
    content:
      "Obrigado pela atenção.",
    image: "Gemini_Generated_Image_4f4fld4f4fld4f4f.png",
    authorId: userIds[0],
  },
  {
    title: "Teste contas já existentes também!",
    content:
      "login: maironlmelo@gmail.com | senha: password123\nlogin: mariaeduarda@example.com | senha: password123\nlogin: rafaelborges@example.com | senha: password123",
    authorId: userIds[0],
  },
  {
    title: "Fim de tarde na praia",
    content:
      "Nada melhor do que assistir o pôr do sol depois de um dia cansativo.",
    authorId: userIds[0],
  },
  {
    title: "Filme do final de semana",
    content:
      "Assisti um filme de suspense ontem e o final me pegou completamente de surpresa.",
    authorId: userIds[1],
  },
  {
    title: "Café da manhã perfeito",
    content:
      "Pão quentinho, café e frutas fazem qualquer manhã começar melhor.",
    authorId: userIds[2],
  },
  {
    title: "Vontade de viajar",
    content: "Tenho muita vontade de conhecer o Japão algum dia.",
    authorId: userIds[0],
  },
  {
    title: "Treino concluído",
    content:
      "Hoje consegui bater meu recorde na academia. Pequenos avanços importam.",
    authorId: userIds[2],
  },
  {
    title: "Música favorita da semana",
    content:
      "Descobri uma banda nova e não consigo parar de ouvir as músicas deles.",
    authorId: userIds[1],
  },
  {
    title: "Chuva boa",
    content: "A melhor sensação é ouvir chuva forte enquanto descanso em casa.",
    authorId: userIds[0],
  },
];

const insertPost = db.prepare(
  "INSERT INTO posts (title, content, image, authorId) VALUES (?, ?, ?, ?)",
);
posts.forEach((p) => insertPost.run(p.title, p.content, p.image ?? null, p.authorId));

console.log(`✅ ${posts.length} posts criados.`);

// Criar alguns likes aleatórios
const insertLike = db.prepare(
  "INSERT INTO likes (postId, userId) VALUES (?, ?)",
);
const allPosts = db.prepare("SELECT id FROM posts").all() as any[];

allPosts.forEach((post, index) => {
  // Alice dá like em quase tudo
  if (index % 2 === 0) insertLike.run(post.id, userIds[0]);
  // Bob dá like nos posts pares
  if (index % 3 === 0) insertLike.run(post.id, userIds[1]);
});

console.log("✅ Likes iniciais adicionados.");
console.log("🚀 Banco de dados populado com sucesso!");
