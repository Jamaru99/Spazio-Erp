const CUSTOMER_BASE_URL = "https://spazio.mybluemix.net/customer";

async function createCustomer(data, callback){
    const res = await axios.post(`${CUSTOMER_BASE_URL}/create`, data);
    callback(res.data);
    return res;
}