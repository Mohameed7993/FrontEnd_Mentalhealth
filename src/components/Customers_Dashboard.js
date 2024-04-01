import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import imge1 from '../images/Facebook_icon.svg.png';
import imge2 from '../images/Instagram_icon.png';
import imge3 from '../images/whatsapp_icon.png';
import articleimage from '../images/mentalheltharticlaimage.jpg'
import {useFetchFiles} from '../middleware/Fetch_Articles';
const BACKEND_URLCON= 'https://backend-mentalhealth-api.onrender.com';




const Customer_Dashboard=()=> {
  const images = [
    imge1,imge2,imge3
   ];
   const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
    const [filteredInformation,setfilteredInformation]=useState('');
    const {user}=useAuth();
    const [currentIndex, setCurrentIndex] = useState(0);

    const { files } = useFetchFiles();
    

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentIndex((currentIndex) => (currentIndex + 1) % files.length); // Cycle through the files
      }, 2000); // Change content every 2 seconds
  
      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [files.length]);
  
    const file = files[currentIndex];


    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentImageIndex(currentImageIndex => (currentImageIndex + 1) % images.length);
      }, 2000); // Change image every 2000 milliseconds (2 seconds)
   
      return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, [images.length]);
   

    useEffect(() => {
        // Directly select the element by ID and modify its class
        const useraction = document.getElementById('userActions');
        const defaultaction = document.getElementById('default');
       

        if (useraction) {
            useraction.classList.remove('hidden');
        }
     
      if (defaultaction) {
        defaultaction.classList.add('hidden');
      }
      
    }, []);

    useEffect(()=>{
      const FetchUserMentalInform=async()=>{

        try {
            const response = await fetch(`${BACKEND_URLCON}/customer/getmentalinformation`);
            if (!response.ok) throw new Error('Failed to fetch group one users');
            const data = await response.json();
            
            for(let i=0;i<data.length;i++){
              if(data[i].id===user._id){
                console.log(data[i])
                setfilteredInformation(data[i])
              }
            }

        } catch (error) {
          console.error("Error fetching information users:", error);
        }

      };
      FetchUserMentalInform();
    },[]);

  
      const hour = new Date().getHours();
      let greeting ='';
    
      if (hour < 12) {
        greeting="Good morning";
      } else {
        greeting="Good afternoon";
      }

  return (
    <div className="dark:bg-gray-900 text-white p-28">
    <div className="grid grid-cols-4 gap-4"> {/* Creates a grid with 4 columns */}
      
      <div className="col-span-3"> {/* Main content, taking up 3/4th of the space */}
        <div className="mx-auto dark:text-gray-900 dark:bg-white bg-gray-900 p-8 rounded-md shadow-md"> {/* Adjusted for grid layout */}
          <h1 className="text-2xl font-bold mb-8" id="greeting">{greeting}, {user.fullname}!</h1>
          <div id="mentalStatus" className="mb-2">Mental Status: {filteredInformation.mental_state}</div>
          <div id="anxietyLevel" className="mb-2">Anxiety Level: {filteredInformation.anxiety}</div>
          <div id="summary" className="mb-2">Summary: {filteredInformation.summary}</div>
          
        </div>
      </div>

      <div className="col-span-1"> {/* Left side for advertisements, taking up 1/4th of the space */}
        {/* Add your advertisement content here */}
        <div className="rounded overflow-hidden shadow-lg p-4 bg-white dark:bg-gray-800"> {/* Example advertisement box */}
        <b className='text-black'>1-Now you can Join to Social BroadCasts and share your Story</b>
        <div className="card my-1  lg:w-full hover:scale-105 transition-transform duration-200"> {/* Adjusted width for the grid layout */}
            <div className="rounded overflow-hidden shadow-lg">
            <a href="/support_groups">
              <img src={images[currentImageIndex]} alt="Dynamic content" className="w-auto h-auto object-cover" />
              </a>
            </div>
            
          </div>
          <b className='text-black'>2-Help you Self by reading Some Articles</b>
        <div className="card my-1 w-[15rem] lg:w-full hover:scale-105 transition-transform duration-200"> {/* Adjusted width for the grid layout */}
        <div className="flex flex-wrap justify-center items-center space-x-0 sm:space-x-10 space-y-10 mt-5">
      <div className="w-full sm:w-auto">
        <div className="w-[15rem] max-w-full mx-auto">
        <a href="/selfhelparticles">
          <img src={ articleimage} className="w-full h-auto object-cover" alt="Article visual" />
          </a>
          <div className="text-center mt-4">
            {file && (<h5 className="text-xl font-bold">{file.filename}</h5>)}
            {file && ( <p className="text-sm">{file.description}</p>)}
          </div>
        </div>
      </div>
    </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
  );
}

export default Customer_Dashboard;