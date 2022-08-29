import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
// import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useState ,useMemo , useEffect } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";


export default function Product() {
    const location = useLocation()
     const productId = location.pathname.split("/")[2];
     const [inputs,setInputs] =useState({})
     const [pStats,setPStats] =useState([])
     const [file,setFile] =useState(null)
     const product = useSelector((state)=>
     state.product.products.find((product)=>product._id === productId))
     
     const MONTHS = useMemo(
        ()=>[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
     ],[])
     useEffect(() => {
        const getStats = async () => {
          try {
            const res = await userRequest.get("orders/income?pid=" + productId);
           
            const list = res.data.sort((a,b)=>{
                return a._id - b._id
            })
            list.map((item) =>
              setPStats((prev) => [
                ...prev,
                { name: MONTHS[item._id - 1], Sales: item?.income },
              ])
            );
          } catch (err) {
            console.log(err);
          }
        };
        getStats();
      }, [productId, MONTHS]);

      const updateProduct =async(url)=>{
        try{
          const res = await userRequest.put(`/products/${productId}`,{
            ...inputs,img:url
          })
          console.log(res.data)
        }catch(err){  
          console.log(err)
        }
      }

      
      const handleChange =(e)=>{
        setInputs((prev)=>{
          return{...prev,[e.target.name]:e.target.value}
        })
        console.log(inputs,file)
      }
      const handleFile = (e)=>{
        setFile(e.target.files[0])
      }
      const handleClick=(e)=>{
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
      updateProduct(downloadURL)
      
    });
  }
);
  }

      
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img}
                   alt="" className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
                 
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.inStock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" placeholder={product.title} name="title" onChange={handleChange}/>
                  <label>Product Description</label>
                  <input type="text" placeholder={product.desc} name="desc" onChange={handleChange} />
                  <label>Product Price</label>
                  <input type="text" placeholder={product.price} name="price"  onChange={handleChange}/>
                  <label>In Stock</label>
                  <select name="inStock" id="idStock"  onChange={handleChange}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
                  
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product.img} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file"  style={{display:"none"}} onChange={handleFile} />
                  </div>
                  <button className="productButton" onClick={handleClick}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
