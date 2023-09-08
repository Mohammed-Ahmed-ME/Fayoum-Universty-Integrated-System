import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {useStateContext} from '../../contexts/ContextProvider';
import {Header} from './';
import Box from "@mui/material/Box";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {DeleteUser} from "../API/API";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";


const Users = ({GetData, ShownText}) => {
    const [incomeData, setIncomeData] = useState([]);
    const {currentColor} = useStateContext();
    const [showAlert, setShowAlert] = useState(false);

    const fetchData = async () => {
        try {
            const data = await GetData();
            setIncomeData(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [GetData, ShownText]);
    const handleDelete = async (ID, Name, Role) => {
        await DeleteUser(ID, Name, Role).then(async (data) => {
            if  (data.status !== 200)
            throw new Error("Server Is Not Avail!")
                await fetchData();
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 5000);
        }).catch(err=>{
            console.log("Error Hapend")
        })
    }
    const columns = [
        {
            field: "Delete",
            key: 'delete',
            width: 40,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderHeader: () => (
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            ),
            renderCell: (params) => (
                <IconButton onClick={() => handleDelete(params.row.NationalID, params.row.Name, params.row.Role)}>

                    <DeleteIcon/>
                </IconButton>
            ),
        },
        {
            key: "avatar",
            field: 'Avatar',
            renderCell: (params) => (
                <Avatar alt={params.row.Name} src={"data:image/jpg;base64," + params.row.Avatar}
                        sx={{width: 50, height: 50}}/>
            ),
            width: 80,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            key: "username",
            field: 'Name',
            width: 230,
            renderCell: (params) => (
                <div>
                    <p style={{color: "black", fontSize: "17px"}}>{params.row.Name}</p>
                </div>
            ),
        },
        {
            key: "email",
            field: 'Email',
            width: 120,
        },
        {
            key: "userid",
            field: 'NationalID',
            width: 160,
            minWidth: 160,
        },
        {
            key: "faculty",
            field: "Faculty",
            width: 150,
            minWidth: 160,
        },
        {
            key: "age",
            field: "Age",
            width: 60,
        },
        {
            key: "userAY",
            field: "AcademicYear",
        },
        {
            key: "phone",
            field: "Phone",
            width: 120,
        },
        {
            key: "time",
            field: 'Time,Date',
            width: 100,
            minWidth: 100,
            renderCell: (params) => {
                const dateTime = new Date(params.row.Time_Date);
                const dateOptions = {day: 'numeric', month: 'short', year: '2-digit'};
                const timeOptions = {hour: 'numeric', minute: 'numeric'};
                const date = dateTime.toLocaleDateString(undefined, dateOptions);
                const time = dateTime.toLocaleTimeString(undefined, timeOptions);

                return (
                    <div>
                        <p>{time}</p>
                        <p>{date}</p>
                    </div>
                );
            },
        },
    ];

    const rows = useMemo(() => {
        if (Array.isArray(incomeData)) {
            return incomeData.map((data, index) => ({
                id: data.nationalID + index,
                Avatar: data.img,
                Name: data.name,
                Email: data.email,
                NationalID: data.nationalID,
                Faculty: data.faculty,
                Time_Date: data.createdAt,
                Age: data.age,
                Role: data.role,
                Phone: data.phone,
                Gender: data.gender,
                Address: data.address,
                AcademicYear: data.academicYear,
                Status: data.status,
                MailID: data.requestId,
                Message: data.UserMessage,
                To: data.sendTo,
            }));
        } else {
            return [];
        }
    }, [incomeData]);

    const getRowSpacing = useCallback((params) => {
        return {
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
        };
    }, []);

    return (
        <div className="mt-10 dark:text-sky-950">
            <h1
                className="flex flex-wrap lg:flex-nowrap justify-center text-3xl font-bold pb-4 items-center text-center sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl"
                style={{color: currentColor}}
            >
                {ShownText}
            </h1>
            <div
                className="m-2 md:m-10 mt-24 p-2 md:p-5  rounded-3xl"
                style={{backgroundColor: currentColor}}
            >
                <Header category="Page" title={ShownText}/>
                <div className="bg-white">
                    <Box>
                        <DataGrid
                            getRowHeight={() => 'auto'}
                            getRowSpacing={getRowSpacing}
                            getColumnWidth={() => 'auto'}
                            rows={rows}
                            columns={columns}
                            loading={incomeData.length === 0}
                            pagination
                            pageSize={5}
                            disableSelectionOnClick
                            sorting
                            rowsProp={rows}
                            slots={{toolbar: GridToolbar}}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                    quickFilterProps: {debounceMs: 500},
                                },
                            }}
                        />
                    </Box>
                </div>
            </div>
            {showAlert && (
                <Alert severity="warning" onClose={() => setShowAlert(false)}
                       sx={{position: 'fixed', bottom: 16, right: 16}}>
                    <AlertTitle>Success</AlertTitle>
                    User Deleted successfully!
                </Alert>
            )}
        </div>
    );
};

export default Users;
