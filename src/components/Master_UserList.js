import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

const BACKEND_URLCON= 'https://backend-mentalhealth-api.onrender.com';


const Userlist = () => {
    
  const [users, setUsers] = useState([]);
  const nav=useNavigate();


/////////////////////////handle delete user!/////////////////////////////
const handleDeleteUser= async (User_Id)=>{
    console.log(User_Id)

    if(window.confirm("Are you sure you want to delete this item?")){
        try {
            const response=await fetch(`${BACKEND_URLCON}/customer/deleteuser`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({User_Id}),
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
              }
    
              const result = await response.json();
              if(result.type==='error'){
                alert("Faild delteing user!: "+result.message);
            }
            else{
                alert("deleting user finished successfully");
                window.location.reload();
            }
    
        } catch (error) {
            console.error("Error delete user", error);
        }
        
    }



    
}

/////////////////////////handle delete user!/////////////////////////////


//////////////////handlestatus change!////////////////////////////
const handleStatususersChange = async (UserId, inputs) => {
    // Optimistically update the UI before the server responds
    const updatedUsers = users.map(user => {
      if (user.id === UserId) {
        return { ...user, status: inputs };
      }
      return user;
    });
    setUsers(updatedUsers);
    
    // Attempt to update the user's status on the server
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
  /////////////////////////////////////////////////////////////////

  useEffect(() => {
    // Directly select the element by ID and modify its class
    const adminaction = document.getElementById('adminActions');
    const defaultaction = document.getElementById('default');

    if (adminaction) {
      adminaction.classList.remove('hidden');
    }
 
  if (defaultaction) {
    defaultaction.classList.add('hidden');
  }
}, []);

    
  useEffect(() => {
    // Simulate fetching data from an API
    const fetchUsers = async () => {
      // Replace with your actual fetch request
      const response = await fetch(`${BACKEND_URLCON}/customer/users`);
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="  dark:bg-gray-900">
      <div className="row ">
        <div className="col-md-12 ">
          <div className="card my-8  container">
            <div className="card-body ">
              <h5 className="card-title text-uppercase mb-0"><b>Manage Users</b></h5>
            </div>
            <div className="table-responsive ">
              <table className="table no-wrap user-table mb-0">
                <thead>
                  <tr>
                    <th scope="col" className="border-0 text-uppercase font-medium pl-4">#</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Name</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Role</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Email</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">PhoneNumber</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Status</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="pl-4">{index + 1}</td>
                      <td>
                        <h5 className="font-medium mb-0">{user.fullname}</h5>
                        <span className="text-muted">{user.location}</span>
                      </td>
                      <td>
                        <span className="text-muted">{(user.role===1)?"Customer":(user.role===6)?"doctor":"Master"}</span>
                      </td>
                      <td>
                        <span className="text-muted">{user.email}</span>
                      </td>
                      <td>
                        <span className="text-muted">{user.phonenumber}</span>
                      </td>
                      <td>
                        <span className="text-muted">{

                        <Dropdown>
                <Dropdown.Toggle variant={user.status === 'Inactive' ? 'danger' : 'success'}>
                  {user.status}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleStatususersChange(user._id, {status:"active"})}>Active</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleStatususersChange(user._id, {status:"Inactive"})}>Inactive</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
                        
                        
                        }</span>
                      </td>
                     
                      <td>
                        {/* Example of button */}
                        <button 
                            type="button" 
                            className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                            onClick={()=>handleDeleteUser(user._id)}>
                                <i className="fa fa-trash"></i>
                                
                            
                        </button>
                        {/* Add other buttons similarly */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userlist;
