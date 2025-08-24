# transguide.jp

We're building a transgender-friendly resources database for people living in Japan.

## Local Setup
First, make sure you have the following dependencies installed:
  - node
  - npm
  - hugo

Then clone the repo. You will also need to ensure that the articles submodule is pulled and up-to-date.
```
git submodule update --init --recursive
```


Next, run the following commands to install needed packages & build the site.
```
npm install
npm run build
```

If you want to run a preview server, run the following:
```
hugo serve -D
```
