import React, { useState, useEffect } from 'react';
const BACKEND_URLCON= 'https://backend-mentalhealth-api.onrender.com';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);


  useEffect(() => {
    // Directly select the element by ID and modify its class
    const useraction = document.getElementById('userActions');
    const defaultaction = document.getElementById('default');
   

    if (useraction) {
        useraction.classList.remove('md:hidden');
        useraction.classList.remove('hidden');
    }
 
  if (defaultaction) {
    defaultaction.classList.add('md:hidden');
    defaultaction.classList.add('hidden');
  }
  
}, []);
 


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BACKEND_URLCON}/customer/users`);
        const data = await response.json();
        // Filter users to get only the ones with role === 6 (doctors)
        const doctorUsers = data.filter(user => user.role === 6);
        setDoctors(doctorUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="  dark:bg-gray-900">
      <div className="row ">
      <div className="flex flex-col items-center justify-center  text-center px-4">
      <div className="flex flex-col items-center justify-center text-center px-4">
  <h1 className="font-bold dark:text-white mb-4">Connect with Top Mental Health Professionals Today!</h1>
  <p className="w-full dark:text-white sm:w-2/3 lg:w-1/2">
  Welcome to the Mental Health Professional Connection , where immediate access to leading
   mental health experts awaits. Our platform enables direct contact via calls or emails with
    top doctors and specialists ready to provide personalized, expert care. Whether it's therapy, 
    medication, or specialized treatment, we've streamlined the process to connect you with the best
     in mental health care. Start your journey to wellness today by reaching out directly to our trusted professionals.
  </p>
</div>

</div>

        <div className="col-md-12 ">
          <div className="card my-8  container">
            <div className="card-body ">
              <h5 className="card-title text-uppercase mb-0"><b>Professional Doctors</b></h5>
            </div>
            <div className="table-responsive ">
              <table className="table no-wrap user-table mb-0 ">
                <thead>
                  <tr>
                    <th scope="col" className="border-0 text-uppercase font-medium pl-4">#</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Doctors Name</th>
                    <th scope="col" className="border-0 text-uppercase  font-medium">Clinc Name</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">location</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Email</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">PhoneNumber</th>
                  </tr>
                </thead>
                <tbody >
                  {doctors.map((doctors, index) => (
                    <tr key={index}>
                      <td className="pl-4">{index + 1}</td>
                      <td>
                        <h5 className="font-medium mb-0">{doctors.fullname}</h5>
                        <span className=" text-red-800">{"Calls for Emrgncy Situation"}</span>
                      </td>
                      <td>
                        <span className="text-muted">{doctors.clinicName}</span>
                      </td>
                      <td>
                        <span className="text-muted">{doctors.location}</span>
                      </td>
                      <td>
                      <a href={`mailto:${doctors.email}`}
                     >
                        
                        <button 
                            type="button" 
                            className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                        >
                            <i className="fa fa-envelope"></i>
                        </button>
                        </a>
                      </td>
                      
                      <td>
                        <a href={`tel:${doctors.phone}`}>
                            <button 
                                type="button" 
                                className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                            >
                                <i className="fa fa-phone"></i>
                            </button>
                            </a>
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
  )
};

export default DoctorList;
