import faker from "faker";
import { fetch } from "@remix-run/node";

const API_URL = "https://realworld-backend.fly.dev";

async function createUser() {
  const user = {
    username: faker.name.findName(),
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

  // ??? doesn't work ???
  // await fetch(API_URL + "/user", {
  //   method: "PUT",
  //   body: JSON.stringify({ user: settings }),
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": "Token " + token,
  //   },
  // });

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
        tagList: ["lorem", "ipsum", "dolor"],
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
