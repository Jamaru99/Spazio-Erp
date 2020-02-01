async function getAppointments(callback){
    const a = await axios.get("https://spazio.mybluemix.net/appointment/list?status=scheduled", {
        headers: {
            access: "aqueleMarioSenpai"
        }
    });
    appointments = a.data;
    callback();
    
    return a;
}

async function createAppointment(data, callback){
    const res = await axios.post("https://spazio.mybluemix.net/appointment/create", data);
    callback();
    return res;
}