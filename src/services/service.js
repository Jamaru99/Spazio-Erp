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



// async function createAppointment(data, callback){
//     const res = await axios.post(`${BASE_URL}/create`, data);
//     callback();
//     return res;
// }

// async function updateAppointment(id, status, callback){
//     const res = await axios.put(`${BASE_URL}/update/${id}`, {status});
//     getAppointments(callback);
//     return res
// }