# github-repo-listing

a simple app to show repo of a user

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

### DEMO
![image](https://user-images.githubusercontent.com/54404738/169037607-38c3348d-cc3a-4bd1-8675-14555f918c27.png)





