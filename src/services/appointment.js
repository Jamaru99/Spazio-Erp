const BASE_URL = "https://spazio.mybluemix.net/appointment";

async function getAppointments(callback){
    const a = await axios.get(`${BASE_URL}/list?status=scheduled`, {
        headers: {
            access: "aqueleMarioSenpai"
        }
    });
    appointments = a.data;
    callback();
    
    return a;
}

async function createAppointment(data, callback){
    const res = await axios.post(`${BASE_URL}/create`, data);
    callback();
    return res;
}

async function updateAppointment(id, status, callback){
    const res = await axios.put(`${BASE_URL}/update/${id}`, {status});
    getAppointments(callback);
    return res
}

async function getSchedules(serviceId, employeeId, date, callback){
    const res = await axios.get(`${BASE_URL}/list/${date}?service=${serviceId}&employee=${employeeId}`);
    callback(res.data);
    return res;
}