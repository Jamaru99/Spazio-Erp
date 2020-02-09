const EMPLOYEE_BASE_URL = "https://spazio.mybluemix.net/employee";

async function getEmployees(callback){
    const res = await axios.get(`${EMPLOYEE_BASE_URL}/list`, {
        headers: {
            access: "aqueleMarioSenpai"
        }
    });
    callback(res.data);
    return res;
}