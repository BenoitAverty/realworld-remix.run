# ![RealWorld Example App](logo.png)

> ### [remix.run](https://remix.run) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://d2mkrvpur134v4.cloudfront.net/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with **[remix.run](https://remix.run)** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the [remix.run](https://remix.run) community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.


# How it works

> Describe the general architecture of your app here

# Local development

1. Install arc (`npm i -g @architect/architect`)
2. Install the dependencies and start the remix app dev server (`(cd src/http/remix; npm install; npm run dev)`
3. Create a file at the project root called preferences.arc with the following content (this is normally done with `arc env` but needs access to the aws project) : 
```
# The @env pragma is synced (and overwritten) by running arc env
@env
testing
  REMIX_ENV development
```
2. Run the architect sandbox (`arc sandbox`). This will install the dependencies in `src/http/api-proxy`, which doesn't need a build step
4. The app is available on [http://localhost:3333](http://localhost:3333).

