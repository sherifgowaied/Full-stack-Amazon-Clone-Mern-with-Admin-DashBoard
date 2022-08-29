import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function UserList() {
  const [data, setData] = useState(userRows);
  const [users,setUsers]=useState([])

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  useEffect(()=>{
    const getUsers = async()=>{
      try {
        const res = await userRequest.get('/users');
        setUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  },[])
  
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row?.img ? params.row.img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg-Nc5MJcsdYveSsZGrrz0fq-7I_MEYppz1g&usqp=CAU" } alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    
    {
      field: "isAdmin",
      headerName: "is Admin",
      width: 160,
    },
    {
      field: "action",
      headerName: "action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </div>
  );
}
