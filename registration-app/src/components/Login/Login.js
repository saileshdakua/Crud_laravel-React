import React, {useState,useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory,Link } from 'react-router-dom';
import Navbar from '../Navbarr';
function Login() {

   
    const history = useHistory();
    const initialValues = {email:"",password:""}; 
    const [loginInput, setLogin] = useState(initialValues);
    const [loginErrors, setloginErrors] = useState({});
  
    const [isSubmit,setIsSubmit]=useState(false);

    const handleInput = (e) => {
      
        const{name,value} = e.target;
        e.persist();
        setLogin({...loginInput,[name]:value});
        
      };

    useEffect(()=>{
      
        if(Object.keys(loginErrors).length===0 && isSubmit){
        
        }
      },[loginInput]);

    const loginSubmit = (e) => {
        e.preventDefault();
        setloginErrors(validate(loginInput)) ;
        setIsSubmit(true);
        
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

       // axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
                if(res.data.status === 200)
                {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.name);
                    localStorage.setItem('auth_email', res.data.regdno);
                    localStorage.setItem('auth_regdno', res.data.email);
                    localStorage.setItem('auth_id', res.data.id);
                    
                    swal("Success",res.data.message,"Login Successfully");
                    history.push('/home');
                }else
                    {
                        swal("Failed",res.data.message,"Login Failed");
                        console.log("failed");
                    }
               // });

            });
        

    }

    const validate = (values)=>{
        const errors={}

        if(!values.email){
          errors.email="Email is required!";
        }
        if(!values.password){
          errors.password="Password is required!";
        }
        return errors;
      };

    return (
        <div>
            <Navbar/>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Login</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={loginSubmit}>
                                    <div className="form-group mb-3">
                                        <label>Email ID</label>
                                        <input type="email" name="email" onChange={handleInput} value={loginInput.email} className="form-control" />
                                        {/* <span>{loginInput.error_list.email}</span> */}
                                        <p>{loginErrors.email}</p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" onChange={handleInput} value={loginInput.password} className="form-control" />
                                        {/* <span>{loginInput.error_list.password}</span> */}
                                        <p>{loginErrors.password}</p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </div>
                                    <p className="text-right">
                                      Don't have an Account <Link to={"/Register"}>Register Here</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
