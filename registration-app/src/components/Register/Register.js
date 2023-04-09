import React, { useState,useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link,useHistory } from 'react-router-dom';
import Navbar from '../Navbarr';

function Register() {

    const history = useHistory();
    const initialValues = {name:"",email:"",phone:"",regdno:"",password:""}; 
    const [registerInput, setRegister] = useState(initialValues);
    const [registerErrors, setRegisterErrors] = useState({});
  
    const [isSubmit,setIsSubmit]=useState(false);
    
    const handleInput = (e) => {
      
      const{name,value} = e.target;
      e.persist();
      setRegister({...registerInput,[name]:value});
      
    };
  
    useEffect(()=>{
      
      if(Object.keys(registerErrors).length===0 && isSubmit){
      
      }
    },[registerInput]);

    const registerSubmit = (e) => {
        e.preventDefault();
        setRegisterErrors(validate(registerInput)) ;
        setIsSubmit(true);
        
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            phone: registerInput.phone,
            regdno: registerInput.regdno,
            password: registerInput.password,
        }
            
            axios.post(`api/register`, data).then(res => { 
                if(res.data.status === 200)
                {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.name);
                    localStorage.setItem('auth_email', res.data.regdno);
                    localStorage.setItem('auth_regdno', res.data.email);
                    localStorage.setItem('auth_id', res.data.id);
                    
                    swal("Success",res.data.message,"Register Successfully");
                    history.push('/home');
                }else{
                  swal("Failed",res.data.message,"Register Failed");
                    console.log("alredy used");
                }
            });
           
    }

    const validate = (values)=>{
        const errors={}
        if(!values.name){
          errors.name="Name is required!";
        }
        if(!values.email){
          errors.email="Email is required!";
        }
        if(!values.phone){
          errors.phone="Phone is required!";
        }
        if(!values.regdno){
          errors.regdno="Regdno is required!";
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
                                <h4>Register</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={registerSubmit}>
                                    <div className="form-group mb-3">
                                        <label>Full Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={registerInput.name} className="form-control"  />
                                        {/* <span>{registerInput.error_list.names}</span> */}
                                        <p>{registerErrors.name}</p>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Email ID</label>
                                        <input type="text" name="email" onChange={handleInput} value={registerInput.email} className="form-control"  />
                                        {/* <span>{registerInput.error_list.email}</span> */}
                                        <p>{registerErrors.email}</p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Phone</label>
                                        <input type="text" name="phone" onChange={handleInput} value={registerInput.phone} className="form-control"  />
                                        {/* <span>{registerInput.error_list.password}</span> */}
                                        <p>{registerErrors.phone}</p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Regdno</label>
                                        <input type="text" name="regdno" onChange={handleInput} value={registerInput.regdno} className="form-control"  />
                                        {/* <span>{registerInput.error_list.password}</span> */}
                                        <p>{registerErrors.regdno}</p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control"  />
                                        {/* <span>{registerInput.error_list.password}</span> */}
                                        <p>{registerErrors.password}</p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Register</button>
                                    </div>
                                    <p className="text-right">
                                      Already have an Account <Link to={"/Login"}>Login Here</Link>
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

export default Register;




