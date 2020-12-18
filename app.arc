@app
realworld-remix-run

@http
/api/*
  method any
  src src/http/api-proxy
/*
  method any
  src src/http/remix

@static

@cdn

@aws
profile realworld-remix
region eu-west-1