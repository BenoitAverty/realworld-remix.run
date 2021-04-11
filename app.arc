@app
realworld-remix-run

@http
/api/*
  method any
  src lambdas/api-proxy
/*
  method any
  src lambdas/remix

@static

@cdn

@aws
profile realworld-remix
region eu-west-1