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

async function createService(data, callback){
    const res = await axios.post(`${SERVICE_BASE_URL}/create`, data);
    callback();
    return res;
}

async function deleteService(id, callback){
    const res = await axios.delete(`${SERVICE_BASE_URL}/delete/${id}`);
    callback();
    return res;
}

async function updateService(id, data, callback){
    const res = await axios.put(`${SERVICE_BASE_URL}/update/${id}`, data);
    callback();
    return res;
}