import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditTodo(props) 
{
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [addInput, settodo] = useState([]);
    const [addErrors, setError] = useState([]);
    const [picture, setPicture] = useState();

    const handleImage = (e) => {
        
        setPicture(e.target.files[0]);
        //setIsSubmit(true);
        //console.log(e.target.files[0]);
    }

    useEffect(() => {
        
        const todo_id = props.match.params.id;
        //console.log(todo_id);
        axios.get(`/api/edit/${todo_id}`).then(res=>{
            if(res.data.status === 200)
            {
                settodo(res.data.Todo);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/home');
            }
            setLoading(false);
        });

    }, [props.match.params.id, history]);

    const handleInput = (e) => {
        e.persist();
        settodo({...addInput, [e.target.name]: e.target.value });
    }

    const updatetodo = (e) => {
        e.preventDefault();
        
        const todo_id = props.match.params.id;
       
        // const data = addInput;
        const formData = new FormData();
        const config={headers:{'content-type':'multipart/form-data'},};
        
        formData.append('image', picture);
        formData.append('name', addInput.name);
        formData.append('status', addInput.status);
        
        formData.append('user_id', addInput.user_id);

        axios.post(`/api/update/${todo_id}`, formData,config).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
            }
            {
                
                history.push('/home');
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Edit Todo...</h4>
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
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Todo 
                        <Link to="/home" className="btn btn-primary btn-sm float-end">BACK</Link>
                    </h4>
                </div>
                <div className="card-body">

                                <form onSubmit={updatetodo} encType="multipart/form-data">
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
                                        <img src={`http://localhost:8000/${addInput.image}`} width="50px" />
                                    </div>


 
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>

                </div>
            </div>
        </div>
    )
}

export default EditTodo;