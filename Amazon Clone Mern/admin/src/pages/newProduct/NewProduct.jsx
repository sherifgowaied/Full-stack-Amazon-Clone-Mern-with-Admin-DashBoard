import "./newProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import app from "../../firebase";

import { userRequest } from "../../requestMethods";
export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);


  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleSize =(e)=>{
    setSize(e.target.value.split(","))
  }
  const handleColor =(e)=>{
    setColor(e.target.value.split(","))
  }

  const createProduct = async(url)=>{
    try{
      const res = await userRequest.post('/products/',{
        ...inputs,categories:cat,color:color,size:size,img:url
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
      createProduct(downloadURL)
      
    });
  }
);
  }
  return (
    <div className="newProduct">
    <h1 className="addProductTitle">New Product</h1>
    <form className="addProductForm">
      <div className="addProductItem">
        <label>Image</label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <div className="addProductItem">
        <label>Title</label>
        <input
          name="title"
          type="text"
          placeholder="Apple Airpods"
          onChange={handleChange}
        />
      </div>
      <div className="addProductItem">
        <label>Description</label>
        <input
          name="desc"
          type="text"
          placeholder="description..."
          onChange={handleChange}
        />
      </div>
      <div className="addProductItem">
        <label>Price</label>
        <input
          name="price"
          type="number"
          placeholder="100"
          onChange={handleChange}
        />
      </div>
      <div className="addProductItem">
        <label>Color</label>
        <input
          name="color"
          type="text"
          placeholder="blue"
          onChange={handleColor}
        />
      </div>
      <div className="addProductItem">
        <label>Categories</label>
        <input type="text" placeholder="jeans,skirts" onChange={handleCat} />
      </div>
      <div className="addProductItem">
        <label>Size</label>
        <input type="text" placeholder="XL,L" onChange={handleSize} />
      </div>
      <div className="addProductItem">
        <label>Stock</label>
        <select name="inStock" onChange={handleChange}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <button onClick={handleClick} className="addProductButton">
        Create
      </button>
    </form>
  </div>
  );
}
