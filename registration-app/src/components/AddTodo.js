import React, { useState,useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import View from './View';

const id = localStorage.getItem('auth_id');


function Addtodo() {

    const history = useHistory();
    const initialValues = {name:"",status:"",user_id:id}; 
    const [addInput, setadd] = useState(initialValues);
    const [addErrors, setaddErrors] = useState({});
    //const initialImg = {image:""};
    const [picture, setPicture] = useState();
    
    const [isSubmit,setIsSubmit]=useState(false);
    
    const handleInput = (e) => {
      
        const{name,value} = e.target;
        e.persist();
        setadd({...addInput,[name]:value});
        
      };
      const handleImage = (e) => {
        
        setPicture(e.target.files[0]);
        setIsSubmit(true);
        //console.log(e.target.files[0]);
    }
    
        
    useEffect(()=>{
      
        if(Object.keys(addErrors).length===0 && isSubmit){
        
        }
      },[addInput]);
    
    
      const addSubmit = (e) => {
        e.preventDefault();
        setaddErrors(validate(addInput)) ;
        setIsSubmit(true);
        const formData = new FormData();
        const config={headers:{'content-type':'multipart/form-data'},};
        
        formData.append('image', picture);
        formData.append('name', addInput.name);
        formData.append('status', addInput.status);
        
        formData.append('user_id', addInput.user_id);

    
            axios.post(`api/addTodo`,  formData,config).then(res => { 
                if(res.data.status === 200)
                {
                    e.target.reset();
                    swal("Success",res.data.message,"Add Successfully");
                    
                    
                }else{
                    swal("Failed",res.data.message,"Failed");
                    console.log(res.data);
                }
            });
        
        
       }


    
       const validate = (values)=>{
        const errors={}
        if(!values.name){
          errors.name="Name is required!";
        }
        if(!values.name){
            errors.status="Status is required!";
          }
        return errors;
      };
      

    return (
        <div>
            
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card-">
                            <div className="card-header">
                                <h4>AddTodo</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={addSubmit} encType="multipart/form-data">
                                    <div className="form-group mb-3">
                                        <label>ToDo Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={addInput.name} className="form-control"  />
                                   
                                        <p>{addErrors.name}</p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Status</label>
                                        <input type="text" name="status" onChange={handleInput} value={addInput.status} className="form-control"  />
                                   
                                        <p>{addErrors.status}</p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Image</label>
                                        <input type="file"  onChange={handleImage} name="image" className="form-control" />
                                       
                                    </div>


 
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div>
                            <View/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Addtodo;




