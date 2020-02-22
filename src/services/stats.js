const STATS_BASE_URL = "https://spazio.mybluemix.net/stats";

async function getCurrentRevenue(callback){
    const res = await axios.get(`${STATS_BASE_URL}`, {
        headers: {
            access: "aqueleMarioSenpai"
        }
    });
    callback(res.data);
    return res;
}