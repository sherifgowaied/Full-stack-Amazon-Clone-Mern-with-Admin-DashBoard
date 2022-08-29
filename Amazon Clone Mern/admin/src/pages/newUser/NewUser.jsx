import { useState } from "react";
import { userRequest } from "../../requestMethods";
import "./newUser.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";

export default function NewUser() {
  const [input,setInput]=useState(null);
  const [file,setFile]=useState(null); 

  const handleInputs = (e)=>{
    setInput((prev)=>{
      return{...prev,[e.target.name]:e.target.value}
    })
  }
  const handleFile = (e)=>{
    setFile(e.target.files[0])
  }
  const CreateUser = async(url)=>{
    try{  
      const res = await userRequest.post('/auth/register',{
        ...input,img:url
      })
      console.log(res.data)
    }catch(err){
      console.log(err)
    }
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
      CreateUser(downloadURL)
      
    });
  }
);
  }
  console.log(input,file)
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john"  name="username" onChange={handleInputs}/>
        </div>
        <div className="newUserItem" style={{border:"none"}}>
          <label>Image</label>
          <input type="file" placeholder="password"  onChange={handleFile} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com"  name="email" onChange={handleInputs}/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" name="password"  placeholder="password" onChange={handleInputs}/>
        </div>
       
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Other</label>
          </div>
        </div>
        
        <button type="submit" className="newUserButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}
