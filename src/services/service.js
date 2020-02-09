const SERVICE_BASE_URL = "https://spazio.mybluemix.net/service";

async function getServices(callback){
    const res = await axios.get(`${SERVICE_BASE_URL}/list`, {
        headers: {
            access: "aqueleMarioSenpai"
        }
    });
    callback(res.data);
    return res;
}