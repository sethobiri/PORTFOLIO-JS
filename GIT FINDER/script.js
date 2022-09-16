(function(){
    const search = document.getElementById("search");
    const profile = document.getElementById("profile");
    const url ="https://api.github.com/users";
    const client_id ="cdc4044bf2de3ff8e612";
    const client_secret="45f5ea9115f1facce466144c1c7f64c7cffcab54";
    const count= 7;
    const sort= "created: asc"

    async function getuser(user) {
        const profileResponse = await fetch(
            `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
        );

        const reposResponse = await fetch(
            `${url}/${user}/repos?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`
        );
        const profile = await profileResponse.json();
        const repos = await reposResponse.json();

        return { profile, repos };

       
    }
    
    function showProfile(user) {

  
        profile.innerHTML = `<div class="row">
            <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="${user.avatar_url}">
                    <ul class="list-group list group flush">
                        <li class="list-group-item"> Repositório: <span class="badge badge-success">${user.public_repos}</span></li>
                        <li class="list-group-item">seguidores: <span class="badge badge-primary">${user.followers}</span></li>
                        <li class="list-group-item">seguindo: <span class="badge badge-info">${user.following}</span></li>
                       
                    </ul>
                    <div class="card-body">
                        <a href="${user.html_url}" target="_blank" class="btn btn-warning btn-block">ver perfil</a>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
            <div id="repos"></div>
            </div>
        </div>`;
    }

    function showRepos(repos) {
        let output = "";

        repos.forEach(repos =>{
            output += `<div class="card card-body mb-2">
            <div class="row">
                <div class="col-md-6"><a href="${repos.html_url}" target="_blank">${repos.name}</a></div>
                <div class="col-md-6">
                    <span class="badge badge-primary">stars: ${repos.stargazers_count}</SPAn>
                    <span class="badge badge-primary">watch: ${repos.watchers_count}</span>
                    <span class="badge badge-primary">forks: ${repos.forks_count}</span>
                </div>
            </div>
        </div>`;
        });

        document.getElementById("repos").innerHTML = output;
    }

    search.addEventListener("keyup", (e) =>{
        const user = e.target.value;

        if(user.length > 0) {
            getuser(user).then(res => {
                showProfile(res.profile);
                showRepos(res.repos);
            });
        }    
    });
})();