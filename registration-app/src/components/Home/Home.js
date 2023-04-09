import {useEffect,React} from 'react';
import {useHistory} from 'react-router-dom';
import '../../assets/admin/css/styles.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '../../assets/admin/js/scripts';

import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Footer from '../Footer';


import Addtodo from '../AddTodo';



const Home = () => {

   const history = useHistory()
    
    useEffect(()=>{
        if(!localStorage.getItem('auth_token'))history.push('/login')
    },[])

    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">

                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>

                <div id="layoutSidenav_content">
                    <main>
                              
                     <div className="form-group">
                       <Addtodo/>
                     </div>
                    </main>

                    <Footer />
                </div>

            </div>
        </div>
    );

}

export default Home;
