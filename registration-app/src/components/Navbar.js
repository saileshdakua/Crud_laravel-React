import {useState,useEffect} from 'react';
import {Link , useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';




const Navbar = () => {

    const history = useHistory();


    const logoutSubmit = (e) => {
    e.preventDefault();
    
                axios.post(`/api/logout`).then(res => {
                    if(res.data.status === 200)
                    {
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('auth_name');
                        localStorage.removeItem('auth_id');
                        
                    }
                    {
                        localStorage.clear();
                        swal("Success",res.data.message,"Logged Out");
                        history.push('/login');
                    }
                });

            }
            



    return (
        <div>
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <Link className="navbar-brand ps-3" to="/#">Student To_Do List</Link>

               {/* <form method="get" action=""  className="d-none d-md-inline-block form-inline ms-auto ">
                    <div className="input-group">
                        <input className="form-control"  name="name"  type="search" placeholder="Search for..."  />
                        <button className="btn btn-primary"  type="submit"><i className="fas fa-search"></i></button>
                    </div>
                </form> */}
                

           <ul className="d-none d-md-inline-block form-inline ms-auto ">
                <li className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-user fa-fw"></i>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-center" aria-labelledby="navbarDropdown">

                        <li> <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white">Logout</button></li>
                    </ul>
                </li>
            </ul>
        </nav>


 
        </div>
    );

}

export default Navbar;
