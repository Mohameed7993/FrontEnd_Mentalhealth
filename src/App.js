//import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
//import Logo from './images/backgroundD.jpg'

import Layouts from './components/layout';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import AboutUs from './components/AboutUs';
import SignUp from './components/SignUp';
import Customer_Dashboard from './components/Customers_Dashboard';
import UserProfile from './components/Profile';
import Master_Dashboard from './components/Master_Dashboard';
import Userlist from './components/Master_UserList';
import Support_Groups from './components/Support_Groups';
import Selfhelp from './components/Self_Help';
import DoctorList from './components/Pro_Help_Contact';
import ComingSoon from './components/Vip_Groups';
import VideosUpload from './components/Mangment_Tools';

function App() {

  return(
    
    <AuthProvider>
    <Router>
      <Layouts/>
       <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/login" element={<Login/>} />
       <Route path="/about" element={<AboutUs/>} />
       <Route path="/signup" element={<SignUp />}/>
       <Route path="/customers" element={<Customer_Dashboard/>}/>
       <Route path="/profile" element={<UserProfile/>}/>
       <Route path="/master" element={<Master_Dashboard/>}/>
       <Route path="/master_User" element={<Userlist/>}/>
       <Route path="/support_groups" element={<Support_Groups/>}/>
       <Route path="/selfhelparticles" element={<Selfhelp/>}/>
       <Route path="/prohelpcontact" element={<DoctorList/>}/>
       <Route path="/vipgroups" element={<ComingSoon/>}/>
       <Route path="/mangmenttols" element={<VideosUpload/>}/>
       

       </Routes>
      
       <Footer/>
      
    </Router>
    </AuthProvider>
  )
}

export default App;
