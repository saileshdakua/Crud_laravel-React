import {useState,useEffect}from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';



const Sidebar = () => {

        const userss = localStorage.getItem('auth_name');
        const email = localStorage.getItem('auth_email');
        const regdno = localStorage.getItem('auth_regdno',"");
        console.log(userss);
        console.log(email);
        console.log(regdno);
        
   
    const [userlist, setUserlist] = useState([]);
    console.log(userlist);
    useEffect(() => {
       
        

        let isMounted = true;
    

        axios.get(`/api/logged_user`).then(res=>{

            if(isMounted)
            {
                if(res.status === 200)
                {
                    setUserlist(res.data.user)
                   console.log(res.data.user);
                   
         
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, []);


    


    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    
                    <Link className="nav-link" to="/home">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        <button type="button" className="nav-link btn btn-dark text-white">Dashboard</button>
                    </Link>
                    <ul className="nav-link">
                    
                        <div className="sb-nav-link-icon"><i className="far fa-address-card"></i></div>
                        <button type="button"  className="nav-link btn btn-dark text-white">User Details</button>
                        
                    </ul>
                    <div>Name&nbsp;:&nbsp;{userss}</div>
                    <div>Email&nbsp;:&nbsp;{regdno}</div>
                    <div>Regd No&nbsp;:&nbsp;{email}</div>


                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:&nbsp;&nbsp;{userss}</div>
                <div></div>
            </div>
        </nav>
    );
}

export default Sidebar;
