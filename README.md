# github-repo-listing

a simple app to show repo of a user

Live Demo Here

## Run on local machine

```bash
git clone https://github.com/PushpenderSaini0/github-repo-listing.git

cd github-repo-listing

npm install

npm run build && npm start
```

- For a dev server ( optional ) 
    -   auto build and reload
```bash
npm run dev
```

## Run on local machine (Using Docker)

```bash
git clone https://github.com/PushpenderSaini0/github-repo-listing.git

cd github-repo-listing

sudo docker build -t my-github-repo-listing .

sudo docker run --rm -p 8080:8080 -it my-github-repo-listing
```

