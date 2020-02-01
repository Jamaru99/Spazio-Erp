async function getRepos(callback){
    const a = await axios.get("https://spazio.mybluemix.net/appointment/list", {
        headers: {
            access: "aqueleMarioSenpai"
        }
    });
    //document.querySelector("h1").innerHTML = JSON.stringify(a.data);
    repositories = a.data;
    callback();
    
    return a;
}