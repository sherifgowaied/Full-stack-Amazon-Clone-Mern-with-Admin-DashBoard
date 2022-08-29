import "./footer.css"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const Footer = ({home}) => {
  return (
    <div className={home ? "footer " :"footer inhertFooter"}>
        <div className="footerLeft">
            <h1 className="fLTitle">Amazon</h1>
            <div className="fdesc">
                There are many variations of passages of Lorem Ipsum available, but
                the majority have suffered alteration in some form, by injected
                humour, or randomised words which don’t look even slightly believable.
            </div>
            <div className="socialContainer">
                    <div className="socialIcon"><FacebookIcon /></div>
                    <div className="socialIcon"><InstagramIcon/></div>
                    <div className="socialIcon"><GitHubIcon/></div>
                    <div className="socialIcon"><LinkedInIcon/></div>
            </div>
        </div>
        <div className="footerCenter">
            <h1 className="fCTitle">Useful Links</h1>
            <div className="fList">
                <div className="fListItem">Home</div>
                <div className="fListItem">Cart</div>
                <div className="fListItem">Man Fashion</div>
                <div className="fListItem">Woman Fashion</div>
                <div className="fListItem">Your Orders</div>
                <div className="fListItem">Your Addresses</div>
                <div className="fListItem">Your Lists</div>
                <div className="fListItem">Sell on Amazon</div>
                <div className="fListItem">Fulfillment by Amazon</div>
                <div className="fListItem">Amazon App Download</div>
                <div className="fListItem">Shipping & Delivery</div>
                <div className="fListItem">Returns & Replacements</div>
                <div className="fListItem">About Amazon</div>
                <div className="fListItem">Help</div>
            </div>
        </div>
        <div className="footerRight">
            <h1 className="fRTitle">Contact</h1>
            <div className="contactItem"><LocalPhoneIcon  /> 622 Dixie Path , South Tobinchester 98336</div>
            <div className="contactItem fmiddle"><MailOutlineIcon /> sherif.gowaied11@yaho.com</div>
            <div className="contactItem fsmiddle"><LocationOnIcon />   Alexandria sidi bishir ,Egypt</div>
            <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="" className="fImg"  />
        </div>

    </div>
  )
}
