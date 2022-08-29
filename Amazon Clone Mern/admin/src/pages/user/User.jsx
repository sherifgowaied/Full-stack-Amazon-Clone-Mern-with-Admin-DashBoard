import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import "./user.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";

export default function User() {
  const location = useLocation()
  const [inputs,setInputs]=useState(null)
  const[file,setFile]=useState(null)
  const userId = location.pathname.split("/")[2];
  console.log(userId)
  const [user,setUser]=useState(null)

  useEffect(()=>{
    const getUser = async()=>{ 
        try{  
        const res = await userRequest.get(`/users/find/${userId}`)
        console.log(res.data)
        setUser(res.data)

      }catch(err){
        console.log(err)
      }
    }
    getUser()
  },[userId])
  // console.log(user)

  const updateUser=async(url)=>{
    try{
      const res = await userRequest.put(`/users/${userId}`,{
        ...inputs,img:url
      })
      console.log(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const handleChange=(e)=>{
    setInputs((prev)=>{
    return {...prev,[e.target.name]:e.target.value}
    })
  }

  const handleFile = (e)=>{
    setFile(e.target.files[0])
  }

  const handleClick = (e)=>{
    e.preventDefault()
    const storage = getStorage(app);

// // Create the file metadata
// /** @type {any} */
// const metadata = {
//   contentType: 'image/jpeg'
// };
const fileName = new Date().getTime() + file.name;

// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, 'images/' + fileName);
const uploadTask = uploadBytesResumable(storageRef, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default:
        console.log("sheko")
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;

      default:
        console.log("sheko")
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      updateUser(downloadURL)
      
    });
  }
);
  }
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user?.username}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.username}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">is Admin :{user?.isAdmin} </span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user?.username}
                  name="username"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>password</label>
                <input
                  type="password"
                  name="password"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder={user?.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              
             
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" onChange={handleFile} style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" type="submit"  onClick={handleClick}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
