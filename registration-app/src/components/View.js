import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


const user_id = localStorage.getItem('auth_id');


function View() {
    
    const [loading, setLoading] = useState(true);
    const [todolist, setTodolist] = useState([]);

    useEffect(() => {
        const user_id = localStorage.getItem('auth_id');
        

        let isMounted = true;
    

        axios.get(`/api/find/${user_id}`).then(res=>{

            if(isMounted)
            {
                if(res.status === 200)
                {
                    setTodolist(res.data.Todo)
                    //console.log(res.data.Todo);
                    setLoading(false);
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, []);

    
    const deleteTodo = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Success",res.data.message,"success");
                thisClicked.innerText = "Delete";
            }
        });

    }


    const [searchInput, setSearch] = useState(''); 

    const handleSearch = (e) => {

        const{name,value} = e.target;
        e.persist();
        setSearch({...searchInput,[name]:value});
     // console.log(e.target.value);

    }
        const searchSubmit = (e) => {
            e.preventDefault();
            const data = {
                name: searchInput.name,
                
            }
    
         let isMounted = true;
         axios.get(`api/find/${user_id}`,  {params: {name: data.name }}).then(res => {
            

            if(isMounted)
             {
            if(res.data.status === 200)
            {
                setTodolist(res.data.Todo);
                setSearch(res.data.Todo);
                setLoading(false);
                //console.log(res.data.Todo);
                

            }
        }
        });
        return () => {
            isMounted = false
         };
    }



    var viewtodo_HTMLTABLE = "";
    if(loading)
    {
        return <h4>Loading...</h4>
    }
    else
    {
        var i=1;
        viewtodo_HTMLTABLE = 
        todolist.map( (Todo) => {
            //console.log(Todo.id);

            return (
                <tr key={Todo.id}>
                    <td>{i++}</td>
                    <td>{Todo.name}</td>
                    <td>{Todo.status}</td>
                    <td> <img src={`http://localhost:8000/${Todo.image}`} width="50px" alt={Todo.image} /></td>
                    <td>
                        <Link to={`edittodo/${Todo.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={ (e) => deleteTodo(e, Todo.id) } className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            )
        });
    }


    

    return  (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                <h3>TODO_LIST</h3>


                </div>
                <form method="get" action=""  className="d-none d-md-inline-block form-inline ms-auto ">
                    <div className="input-group">
                        <input className="form-control" onChange={handleSearch}  name="name"  type="search" placeholder="Search for..."  />
                        <button className="btn btn-primary" onClick={searchSubmit} type="submit"><i className="fas fa-search"></i></button>
                    </div>
                </form>
                <div className="card-body">
               
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Sl no</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Image</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewtodo_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default View;


