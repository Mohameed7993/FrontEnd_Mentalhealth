import React,{useEffect,useState } from 'react';
import { useAuth } from '../context/AuthContext';

// Assuming you pass a user object as a prop to this component
const UserProfile = () => {    
    const [inputs, setInputs] = useState({});
    const {user} =useAuth();
    const UserId=user._id;

 

    const handleChange = (event) => {
       
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value})) //{username:'mohameed',age:'25'}
      }


      const  handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/customer/profile', {
              method: 'PATCH', // Or 'PUT' if your server is set up to use PUT for updates
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ UserId, inputs }),
            });
        
            if (!response.ok) {
              throw new Error('Failed to update user details');
            }

            const result = await response.json();

            if(result.type==='error'){
                alert("Faild Updating details!: "+result.message);
            }
            else{
                alert("Updating details had finished successfully");
                window.location.reload();
            
            }
          } catch (error) {
            console.error('Error updating user details:', error);
          }
      }


useEffect(() => {
    // Directly select the element by ID and modify its class
    const useraction = document.getElementById('userActions');
    const defaultaction = document.getElementById('default');
    const adminaction = document.getElementById('adminActions');

    if(user.role===1){
      if (useraction) {
        useraction.classList.remove('hidden');
    }}
    if(user.role===10){
      if (adminaction) {
        adminaction.classList.remove('hidden');
      }} 

     if(user.role===6) {
      //doctor action 
  }
    

   
 
  if (defaultaction) {
    defaultaction.classList.add('hidden');
  }
}, []);




  return (
    <div className="    dark:bg-gray-900">
      <div className="row">
        {/* User avatar and basic info */}
        <div className="col-md-3 border ">   {/* it for the image at the right side */}
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className=" rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="User avatar" />
            <b className="font-weight-bold dark:text-white">{user.fullname}</b>
            <span className=" dark:text-white">{user.email}</span>
          </div>
        </div>
        {/* Profile settings form */}
        <div className="col-md-9 border-right ">
          <form onSubmit={handleSubmit} className="p-4 py-5 border  dark:text-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right dark:text-white">Profile Settings</h4>
            </div>
            <div className="col mt-2  ">
              <div className="col-md-6 ">
                <label className="labels">Full Name</label>
                <input 
                type="text" 
                name="fullname"
                value={inputs.fullName} 
                onChange={handleChange}
                className="form-control" 
                placeholder={user.fullname}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Email</label>
                <input 
                type="email" 
                name="email"
                value={inputs.email} 
                onChange={handleChange}
                className="form-control" 
                placeholder={user.email}  
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Password</label>
                <input 
                 type="password" 
                 name="password"
                 value={inputs.password} 
                 onChange={handleChange}
                 className="form-control " 
                 placeholder="*******"
                />
              </div>

              <div className="col-md-6">
                <label className="labels">Phone Number</label>
                <input 
                 type="tel" 
                 name="phonenumber"
                 value={inputs.phoneNumber} 
                 onChange={handleChange}
                 className="form-control" 
                 placeholder={user.phonenumber} 
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Location</label>
                <input 
                 type="text" 
                 name="location"
                 value={inputs.location} 
                 onChange={handleChange}
                 className="form-control" 
                 placeholder={user.location} 
                />
              </div>

            
            </div>
            <div className="mt-5 ">
              <button className="btn btn-primary profile-button right-0" type="submit">Save Profile</button>
            </div>
            
          </form>
          
        </div>
        
    
      </div>
      
    </div>
  );
};

export default UserProfile;
