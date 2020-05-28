const CUSTOMER_BASE_URL = "https://spazio.mybluemix.net/customer";

async function getCustomers(callback){
    const res = await axios.get(`${CUSTOMER_BASE_URL}/list`, {
        headers: {
            access: "aqueleMarioSenpai"
        }
    });
    callback(res.data);
    return res;
}