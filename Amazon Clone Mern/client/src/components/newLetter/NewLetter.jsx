import "./newLetter.css"
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

export const NewLetter = ({home}) => {
  return (
    <div className={ home ?  "newLetterContainer" : "newLetterContainer inhertNewLetterContainer"}>
        <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" className="amzLogo"  />
        <h1 className="nlTitle">Newsletter</h1>
        <div className="desc">Get timely updates from your favorite products.</div>
        <div className="iputContainer">
            <input className="nlInput"  placeholder="Your email" type="text"  />
            <button className="nlBtn"><SendOutlinedIcon  /></button>
        </div>

    </div>
  )
}
