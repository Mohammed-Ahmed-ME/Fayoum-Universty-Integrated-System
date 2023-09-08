import axios from 'axios';

export const PORT = "http://localhost:3001" //"http://192.168.1.9:3001" //"

///////////////////////////////////////////   USER API Mail ////////////////////////////////////////////////////
const GetToken = () => {
    return localStorage.getItem('token');
};

const GetAxiosConfig = (url) => {
    const token = GetToken();
    return {
        method: 'GET',
        url,
        headers: {
            Authorization: token,
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
    };
};

export const GetUsersData = async () => {
    const token = GetToken();
    if (token) {
        try {
            const config = GetAxiosConfig(`${PORT}/Get/All/Users/Info`);
            return await axios(config);
        } catch (error) {
            console.error('Error:', error);
            throw error; // or return Promise.reject(error);
        }
    }
};

export const GetUsersByRole = async (role) => {
    const token = GetToken();
    if (token) {
        try {
            const config = GetAxiosConfig(`${PORT}/Get/${role}`);
            return await axios(config);
        } catch (error) {
            console.error('Error:', error);
            throw error; // or return Promise.reject(error);
        }
    }
};

export const GetFullAdministrators = async () => {
    return await GetUsersByRole('Full/Administrators');
};

export const GetAdministrators = async () => {
    return await GetUsersByRole('Administrators');
};

export const GetAssistantProfessors = async () => {
    return await GetUsersByRole('Assistant/Professors');
};

export const GetProfessors = async () => {
    return await GetUsersByRole('Professors');
};

export const GetResearchAssistants = async () => {
    return await GetUsersByRole('Research/Assistants');
};

export const GetTeachingAssistants = async () => {
    return await GetUsersByRole('Teaching/Assistants');
};

export const GetStudents = async () => {
    return await GetUsersByRole('Students');
};




export const NewUser = async (User) => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            return await axios({
                "method": "POST",
                "url": PORT + "/Post/New/User",
                "headers": {
                    "Authorization": token,
                    "Content-Type": "application/json; charset=utf-8"
                },
                "data": User

            })
        } catch (error) {
            return error.response;
        }
    }
};



export const GetUser = async (ID) => {
    const token = GetToken();
    if (token) {
        try {
            return  await axios({
                "method": "GET",
                "url": PORT + `/Get/User/${ID}`,
                "headers": {
                    "Authorization": token,
                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
                },
            })
        } catch (error) {
            return error
        }
    }
}

export const UpdateUser = async (Data) => {

    const token = GetToken();
    if (token) {
        try {
            return  await axios({
                "method": "PATCH",
                "url": PORT + '/Update/User',
                "headers": {
                    "Authorization": token,
                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
                },
                "data": Data

            })
        } catch (error) {
            return error
        }
    }
}

export const UpdateUserPassword = async (Old , New)=>{
    const token = localStorage.getItem('token')
    if (token) {
      const res= await axios({
            "method": "PATCH",
            "url": PORT + `/Update/Me/Password`,
            "headers": {
                "Authorization": token,
                "Content-Type": "application/json; charset=utf-8"
            },
            "data": {
                "Old": Old,
                "New": New,
            }
        })
        return res.data
    }
    else
    {
        return "Not Auth"
    }
}
export const DeleteUser = async (ID, Name, Role) => {
    const token = GetToken();
    if (token) {

        const confirmed = window.confirm(
            "Confirm UserProfile deletion? " +
            "\n Name: " + Name +
            "\n National ID: " + ID +
            "\n Role: " + Role
        );
        if (confirmed) {
           return axios({
               'method': 'DELETE',
               'url': PORT + '/Delete/User/' + ID,
               'headers': {
                   "Authorization": token,
                   'Content-Type': 'application/json; charset=utf-8'
               },
           });
        }
    }

}
export const GetMe = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        return await axios({
            'method': 'POST',
            'url': PORT + '/Login/User/Me',
            'headers': {
                'Authorization': token,
                'Content-Type': 'application/json; charset=utf-8'
            },
            'data': {}
        })
    }
}
export const UserLogout = async ()=>{
    const token = localStorage.getItem('token')
    await axios({
        "method": "POST",
        "url": PORT + "/Logout/User",
        "headers": {
            "Authorization": token,
        },
        "data": {}
    })}

///////////////////////////////////////////   Mail API Mail ////////////////////////////////////////////////////

export const PostNewMail = async (Data) => {
    const token = localStorage.getItem("token");
    if (token) {
    try {
        return await axios({
            "method": "POST",
            "url": PORT + "/New/Mail",
            "headers": {
                "Authorization": token,
                "Content-Type": "application/json; charset=utf-8"
            },
            "data": {
                "nationalID": Data.nationalID,
                "userRequest": Data.Request,
                "sendTo":Data.sendTo,
                "category": Data.category
            }
        })
    } catch (error) {
        return error.response;
    }
    }
    else {
        return "Posting Mail Filed"
    }
};

export const MailInbox = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const response = await axios({
                "method": "GET",
                "url": PORT + "/Mail/Inbox",
                "headers": {
                    "Authorization": token,
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            return response.data;

        } catch (error) {
            console.error('Login:', error);
            return []
            }
    }
    else {
        return "Not Authorized";
    }
}
export const MailOutBox = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const response = await axios({
                "method": "GET",
                "url": PORT + "/Mail/Outbox",
                "headers": {
                    "Authorization": token,
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            return response.data;

        } catch (error) {
            console.error('Login:', error);
            return []
            }
    }
    else {
        return "Not Authorized";
    }
}
export const DeleteMail = async (ID,Name) => {
    const token = localStorage.getItem('token')
    if (token) {
        const confirmed = window.confirm(`Confirm request deletion?  Name: ${Name} ,Request ID: ${ID} `);
        if (confirmed) {
            axios({
                'method': 'DELETE', 'url': PORT + '/Delete/Mail/' + ID,
                'headers': {
                    "Authorization": token,
                    'Content-Type': 'application/json; charset=utf-8'
                },
            }).then(response => {
                console.log(response.data);
            })
                .catch(error => {
                    console.error(error);
                });
        }
    }
    else {
        return "Not Authorized";
    }

}
export const DeleteNews = async (ID,Name) => {
    const token = localStorage.getItem('token')
    if (token) {
        const confirmed = window.confirm(`Confirm request deletion?  Name: ${Name} ,Request ID: ${ID} `);
        if (confirmed) {
            axios({
                'method': 'DELETE', 'url': PORT + '/Delete/News/' + ID,
                'headers': {
                    "Authorization": token,
                    'Content-Type': 'application/json; charset=utf-8'
                },
            }).then(response => {
                console.log(response.data);
            })
                .catch(error => {
                    console.error(error);
                });
        }
    }
    else {
        return "Not Authorized";
    }

}

export const WeatherData = (latitude, longitude) => {

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            throw new Error(error.message);
        });


};
export const MailStatusUpdate = async (ID , Status) =>{

    const token = localStorage.getItem('token')
    if (token) {
        let newStatus;
        switch (Status) {
        case 'Accepted':
            newStatus = 'Rejected';
            break;
        case 'Rejected':
            newStatus = 'Pending';
            break;
        case 'Pending':
            newStatus = 'Accepted';
            break;
        default:
            newStatus = 'Pending';
    }
        await axios({ "method": "PATCH",  "url": PORT + `/Update/Mail/${ID}`,
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json; charset=utf-8" },
        "data": { "status": newStatus }
    }).then(response => {
        console.log(response.data);
        Status = newStatus;
    })
        .catch(error => {
            console.error(error);
        });
    }};



export const MailResponseUpdate = async (ID , Response) =>{

    const token = localStorage.getItem('token')
    if (token) {
        await axios({ "method": "PATCH",  "url": PORT + `/Update/Mail/${ID}`,
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json; charset=utf-8" },
        "data": { "response": Response }
    }).then(response => {
        console.log(response.data);
    })
        .catch(error => {
            console.error(error);
        });
    }};



const API_KEY = '18c1f7e7b81d63749b8902b2c19d78bc';






export const PostNewNews = async (Data) => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            return await axios({
                "method": "POST",
                "url": PORT + "/New/News",
                "headers": {
                    "Authorization": token,
                    "Content-Type": "application/json; charset=utf-8"
                },
                "data": {
                    "userNews": Data.news,
                    "sendTo":Data.To,
                    "studentGroup":Data.studentGroup
                }
            })
        } catch (error) {
            return error;
        }
    }
};

export const GlobalNews = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const response = await axios({
                "method": "GET",
                "url": PORT + "/News/Global/News",
                "headers": {
                    "Authorization": token,
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            return response.data;

        } catch (error) {
            console.error('Login:', error);
            return []
        }
    }
    else {
        return "Not Authorized";
    }
}


export const OwnNews = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const response = await axios({
                "method": "GET",
                "url": PORT + "/News/Own/News",
                "headers": {
                    "Authorization": token,
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            return response.data;

        } catch (error) {
            console.error('Login:', error);
            return []
        }
    }
    else {
        return "Not Authorized";
    }
}


export const PostedNews = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const response = await axios({
                "method": "GET",
                "url": PORT + "/News/Posted/News",
                "headers": {
                    "Authorization": token,
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            return response.data;

        } catch (error) {
            console.error('Login:', error);
            return []
        }
    }
    else {
        return "Not Authorized";
    }
}




export const PostStudentSubject = async (Data) => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            return await axios({
                "method": "POST",
                "url": PORT + "/Add/Subject",
                "headers": {
                    "Authorization": token,
                    "Content-Type": "application/json; charset=utf-8"
                },
                "data": {
                    "ID": Data.studentID,
                    "subjectCode": Data.code,
                    "subjectName":Data.name,
                }
            })
        } catch (error) {
            return error.response;
        }
    }
    else {
        return "Posting Subject Filed"
    }
};



export const DeleteStudentSubject = async (Data) => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            return await axios({
                "method": "POST",
                "url": PORT + "/Remove/Subject",
                "headers": {
                    "Authorization": token,
                    "Content-Type": "application/json; charset=utf-8"
                },
                "data": {
                    "ID": Data.studentID,
                    "subjectCode": Data.code,
                }
            })
        } catch (error) {
            return error.response;
        }
    }
    else {
        return "Posting Subject Filed"
    }
};


export const EditStudentSubject = async (Data) => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            return await axios({
                "method": "POST",
                "url": PORT + "/Edit/Subject",
                "headers": {
                    "Authorization": token,
                    "Content-Type": "application/json; charset=utf-8"
                },
                "data": {
                    "ID": Data.studentID,
                    "subjectCode": Data.code,
                    "degree": Data.Degree
                }
            })
        } catch (error) {
            return error.response;
        }
    }
    else {
        return "Posting Subject Filed"
    }
};


