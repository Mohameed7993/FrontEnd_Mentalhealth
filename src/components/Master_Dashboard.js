import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../context/AuthContext';

const BACKEND_URLCON= 'https://backend-mentalhealth-api.onrender.com';

const Master_Dashboard = () => {
const {user}=useAuth();
  

  useEffect(() => {
    // Directly select the element by ID and modify its class
    const adminaction = document.getElementById('adminActions');
    const defaultaction = document.getElementById('default');

    if (adminaction) {
      adminaction.classList.remove('md:hidden');
      adminaction.classList.remove('hidden');
    }
 
  if (defaultaction) {
    defaultaction.classList.add('md:hidden');
    defaultaction.classList.add('hidden');
  }
}, []);

  // States to store users for each group
  const [UserInactive, setUserInactive] = useState([]);
  const [DoctorPanddig, setDoctorPanddig] = useState([]);
  const [users, setUsers] = useState([]);

  // States to control the visibility of tables
  const [showTableOne, setShowTableOne] = useState(false);
  const [showTableTwo, setShowTableTwo] = useState(false);

  useEffect(() => {
    // Fetch users for group one
    const fetchUserInactive = async () => {
      try {
        const response = await fetch(`${BACKEND_URLCON}/customer/users`);
        if (!response.ok) throw new Error('Failed to fetch group one users');
        const data = await response.json();
        const panddingDoctors=data.filter(user => (user.role === 6)&&(user.status==='Inactive'))
        const inactiveUsers = data.filter(user => (user.role === 1)&&(user.status==='Inactive'));
        const Us =data.filter(user => (user.status==='Inactive'))
        
        setUsers(Us);
        setUserInactive(inactiveUsers); 
        setDoctorPanddig(panddingDoctors);
        
        
      } catch (error) {
        console.error("Error fetching group  users:", error);
      }
    };
    fetchUserInactive();
  }, []);

//////////////////////////////////////////////////////////////////////

const handleStatusChange = async (UserId, inputs) => {
    // Optimistically update the UI before the server responds
    const updatedUsers = users.map(user => {
      if (user.id === UserId) {
        return { ...user, status: inputs };
      }
      return user;
    });
    setUsers(updatedUsers);
    
    
    
 
    // updateing the user's status on the server
    try {
        const response = await fetch(`${BACKEND_URLCON}/customer/profile`, {
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
            alert("Faild Updating status!: "+result.message);
        }
        else{
            alert("Updating status had finished successfully");
            window.location.reload();
        
        }
      }catch (error) {
      console.error("Error updating user status:", error);
  
      
      setUsers(users.map(user => {
        if (user.id === UserId) {
          return { ...user, status: user.status }; // revert to the original status
        }
        return user;
      }));
      // Notify the user about the error
      alert('Failed to update user status. Please try again.');
    }
  };
  

/////////////////////////////////////////////////////////////////////



  // Function to render user tables
  const renderUserTable = (users) => (
    <table className="table">
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.fullname}</td>
            <td>{user.email}</td>
            <td>
              {/* Assuming React Bootstrap */}
              <Dropdown>
                <Dropdown.Toggle variant={user.status === 'Inactive' ? 'danger' : 'success'}>
                  {user.status}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleStatusChange(user._id, {status:"active"})}>Active</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleStatusChange(user._id, {status:"Inactive"})}>Inactive</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  useEffect(() => {
    // Directly select the element by ID and modify its class
    const adminaction = document.getElementById('adminActions');
    const defaultaction = document.getElementById('default');

    if (adminaction) {
      adminaction.classList.remove('md:hidden');
      adminaction.classList.remove('hidden');
    }
 
  if (defaultaction) {
    defaultaction.classList.add('md:hidden');
    defaultaction.classList.add('hidden');
  }
}, []);
  return (
    <div className=" dark:bg-gray-900 ">
      <div className="col  container ">
        <h1 className="dark:text-white "><b>Wellcome Backe! {user.fullname}</b></h1>
        <p className='dark:text-white'><b>Dashboard page: News</b></p>
        {/* Column for the first card and table group */}
        
        <div className="col z-10 ">
          <div className="card border-black mb-3 cursor-pointer md:w-[20%]" onClick={() => setShowTableOne(!showTableOne)}>
            <div className="card-body">
              <h5 className="card-title">New Users Inactive</h5>
              <p className="card-text">Number of users: {UserInactive.length}</p>
            </div>
          </div>
          {showTableOne && renderUserTable(UserInactive)}
        </div>

        {/* Column for the second card and table group */}
        <div className="col">
          <div className="card border-black mb-3 cursor-pointer md:w-[20%]" onClick={() => setShowTableTwo(!showTableTwo)}>
            <div className="card-body">
              <h5 className="card-title">New Doctors Pandding</h5>
              <p className="card-text">Number of Doctors: {DoctorPanddig.length}</p>
            </div>
          </div>
          {showTableTwo && renderUserTable(DoctorPanddig)}
        </div>
        <div><br></br></div>
      </div>
    </div>
  );
};

export default Master_Dashboard;
