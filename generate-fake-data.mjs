import faker from "faker";
import { fetch } from "@remix-run/node";

const API_URL = "https://stw74y7a42.execute-api.eu-west-1.amazonaws.com/dev/api";
// const API_URL = "http://localhost:3000/api";

const tags = ["javascript", "react", "remix", "java", "spring", "aws", "devfest", "gdg", "zenika"];

async function createUser() {
  const user = {
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: "realworld",
  };

  const settings = {
    bio: faker.lorem.sentence(),
    image: faker.internet.avatar(),
  };

  const responseRegister = await fetch(API_URL + "/users", {
    method: "POST",
    body: JSON.stringify({ user }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const token = (await responseRegister.json()).user.token;

  console.log("Created user " + user.username + ", he has token " + token)

  await fetch(API_URL + "/user", {
    method: "PUT",
    body: JSON.stringify({ user: settings }),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + token,
    },
  });

  return token;
}

function createArticle(token) {
  return fetch(API_URL + "/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + token,
    },
    body: JSON.stringify({
      article: {
        title: faker.lorem.sentence(),
        description: faker.lorem.sentences(2),
        body: faker.lorem.paragraphs(),
        tagList: tags.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random()*tags.length)),
      },
    }),
  });
}

async function createArticlesSet() {
  const token = await createUser();

  const articlesCount = Math.random()*10 + 5;
  for(let i = 0; i < articlesCount ; ++i) {
    await createArticle(token)
  }
}

createArticlesSet().then(() => console.log("OK !"))
