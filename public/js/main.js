const listRepoBtn = document.getElementById('list-repo-btn');
const usernameBox = document.getElementById('uname-box');
const repoListInfo = document.getElementById('repo-list-info');
const repoList = document.getElementById('repo-list');
const pageList = document.getElementById('page-list');

let isLoading = false;
let pageOffset = 1;

const getIconClass = (lang) => {
    switch (lang) {
        case "javascript":
            return "fa-brands fa-js fa-lg"
        case "html":
            return "fa-brands fa-html5 fa-lg"
        case "python":
            return "fa-brands fa-python fa-lg"
        default:
            return "fa-solid fa-code fa-lg"
    }
}
const getRepoData = async () => {
    const APIURL = encodeURI(`${location.protocol}//${location.host}/api/repo/${usernameBox.value}/${pageOffset}`);
    const response = await fetch(APIURL);
    if (response.status != 200) return { "error": true, "message": "Unknown Server Error" }
    const data = await response.json();
    isLoading = false;
    return data;
}

const plotData = (data) => {
    if (data.error) {
        repoListInfo.innerHTML = `<h1><i class="fa-solid fa-triangle-exclamation"></i></h1><h3>&emsp; ${data.message}</h3>`;
    }
    else {
        repoListInfo.innerHTML = `<h2>Repositories of ${usernameBox.value}</h2>`;
        let _ = "";
        data.data.forEach(repo => {
            _ += `
            <div class="flex-center repo">
                <h2>${repo.name}</h2>
                <p>${repo.description}</p>
                <div class="flex-center">
                    <div class="language-card">
                        <i class="${getIconClass(repo.language.toLowerCase())}"></i>
                        ${repo.language}
                    </div>
                </div>
            </div>
            `;
        });
        repoList.innerHTML = _;
        _ = "";
        let page = 1;
        for (let i = 1; i <= data.totalRepo; i += 5) {
            if (page == pageOffset) {
                _ += `<button onclick="paginationHandler(event)" class="page-button-active" id="repo-page-${page}">${page}</button>`;
            }
            else {
                _ += `<button onclick="paginationHandler(event)" class="page-button" id="repo-page-${page}">${page}</button>`;
            }
            page += 1;
        }
        pageList.innerHTML = _;
    }
}

const paginationHandler = (e) => {
    pageOffset = e.target.id.split('-')[2];
    getRepoData().then(plotData);
}

const listRepoBtnHandler = () => {
    if (!isLoading) {
        isLoading = true;
        repoListInfo.innerHTML = '<h1><i class="fas fa-sync fa-spin"></i></h1><h3>&emsp; Loading Data</h3>';
        pageOffset = 1;
        getRepoData().then(plotData);
    }
}

// Enable "list-repo-btn" only when input has some text
const updateRepoBtn = (e) => {
    if (e.target.value.length == 0) {
        listRepoBtn.classList.remove("enable");
        listRepoBtn.classList.add("disable");
        listRepoBtn.disabled = true;
    }
    else {
        listRepoBtn.classList.remove("disable");
        listRepoBtn.classList.add("enable");
        listRepoBtn.disabled = false;
    }
}

listRepoBtn.disabled = true;
usernameBox.addEventListener('input', updateRepoBtn);
listRepoBtn.addEventListener("click", listRepoBtnHandler);