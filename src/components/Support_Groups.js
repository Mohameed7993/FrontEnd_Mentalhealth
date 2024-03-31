import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import facbook_icon from '../images/Facebook_icon.svg.png';
import whatsapp_icon from '../images/whatsapp_icon.png';
import instgram_icon from '../images/Instagram_icon.png';
import { useAuth } from '../context/AuthContext';
import EditBroadcastLink from './Edit_Links_SupportGroups';
import { useSocialMediaLinks } from '../middleware/Fetch_SocialBroadcats';



const Support_Groups = () => {
    const {user}=useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [socialtochange,setsocialtochange]=useState('');
    
    const { facebook, whatsapp, instgram } = useSocialMediaLinks();
    
    

    const handleLinkSubmit = async ({ url }) => {
        console.log("Broadcast link submitted:", url);
        setIsModalOpen(false);

        try {
            const response=await fetch ('http://localhost:5000/customer/editsociallink',{
                method:'PATCH',
                headers:{
                    'Content-Type': 'application/json',
                  },
                  body:JSON.stringify({socialtochange,url})
            });
            if (!response.ok) {
                throw new Error('Failed to update broadcats Links');
              }

              const result = await response.json();

              if(result.type==='error'){
                alert("Faild Updating Links!: "+result.message);
            }
            else{
                alert("Updating socialLinks had finished successfully");
            }

        } catch (error) {
            console.error('Error updating links:', error);
          }};


      const handleModalClose = () => {
        console.log("Modal closed without submission.");
        setIsModalOpen(false); // Close modal
      };


    useEffect(() => {
        // Directly select the element by ID and modify its class
        const useraction = document.getElementById('userActions');
        const defaultaction = document.getElementById('default');
        const adminaction=document.getElementById('adminActions');
        console.log(user.role)

        if (defaultaction) {
            defaultaction.classList.add('hidden');
          }

       if(user.role===1){
            useraction.classList.remove('hidden');
        
    }else if(user.role===10) {
        if (adminaction) {
            adminaction.classList.remove('hidden');
            document.getElementById('titlesupportgrouppageuser').classList.add('hidden')
            document.getElementById('titlesupportgrouppagemaster').classList.remove('hidden')
          }
    }
    }, []);

    const handleClickButton = (isOpen, socialType) => {
        setIsModalOpen(isOpen);
        setsocialtochange(socialType);
        console.log("Editing social link for:", socialType);
      };

  return (
    <div className=' dark:bg-gray-900 dark:text-white'>

          <h1 id='titlesupportgrouppagemaster' className=" text-center px-4 hidden font-bold mb-4"><br></br>
          Hello master! here you can edit links for Social media BroadCasts</h1>


          
   <div id='titlesupportgrouppageuser' className="flex flex-col items-center justify-center  text-center px-4">
  <h1 className=" font-bold mb-4"><br></br>Welcome to our Mental Health Community Hub!</h1>
  <p className="w-full sm:w-2/3 lg:w-1/2">
    Welcome to our Mental Health Broadcast Hub! Here, we connect you with a selection
    of social media groups focused on mental health support and sharing. This platform is your gateway
    to find community, understanding, and resources to navigate your mental health journey.
    Whether you're here to share your story, seek advice, or just listen, you'll find a welcoming space to engage and heal.
    Join us to be part of a supportive network dedicated to fostering well-being and breaking the stigma around mental health.
  </p>
</div>



        <div className="flex flex-col sm:flex-row justify-center items-center space-x-0 sm:space-x-10 space-y-10 sm:space-y-0 ">
            {/* card1 */}
            <div className="card my-5 w-[18rem] hover:scale-105 transition-transform duration-200 " >
            <div className='bg-green-200'>
            <button 
             type="button" 
            style={{display:(user.role===1?'none':'inline-block')}}
             className="btn btn-outline-info  btn-circle btn-lg btn-circle ml-2"
             onClick={() => handleClickButton(true,'whatsapp')}>
             <i className="fa fa-edit"></i>              
            </button>
    <img src={whatsapp_icon} className="card-img-top "/>
    <div className="card-body">
      <h5 className="card-title">Whatsapp Broadcast</h5>
      <p className="card-text">
"Join our broadcast and become part of a supportive community focused on mental health and well-being. Share, listen, and grow with us."</p>
   <a href={whatsapp} target="_blank" className="btn btn-primary">Join broadcast</a>

    </div>
    </div>
  </div>
  {/* card2 */}
  
  <div className=" card my-5 w-[18rem] hover:scale-105 transition-transform duration-200 " >
  <div className='bg-blue-200'>
          <button 
             type="button" 
             style={{display:(user.role===1?'none':'inline-block')}}
             className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
             onClick={() => handleClickButton(true, 'facebook')}>
                
             <i className="fa fa-edit"></i>              
          </button>
    <img src={facbook_icon} className="card-img-top" />
    <div className="card-body ">
      <h5 className="card-title">Facebook Broadcast</h5>
      <p className="card-text">
"Join our broadcast and become part of a supportive community focused on mental health and well-being. Share, listen, and grow with us."</p>
      <a href={facebook} target="_blank" className="btn btn-primary">Join broadcast</a>
    </div>
  </div>
  </div>
  {/* card 3 */}
  <div className="card my-5 w-[18rem] hover:scale-105 transition-transform duration-200 " >
  <div className='bg-pink-200'>
          <button 
             type="button" 
             style={{display:(user.role===1?'none':'inline-block')}}
             className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
             onClick={() => handleClickButton(true, 'instgram')}>
             <i className="fa fa-edit"></i>              
         </button>
    <img src={instgram_icon} className="card-img-top w-full"/>
    <div className="card-body">
      <h5 className="card-title">Instgram Broadcast</h5>
      <p className="card-text">
"Join our broadcast and become part of a supportive community focused on mental health and well-being. Share, listen, and grow with us."</p> 
     <a href={instgram} target="_blank" className="btn btn-primary">Join broadcast</a>
    </div>
    </div>
  </div>
  </div>

  <EditBroadcastLink
        isOpen={isModalOpen}
        onSubmit={handleLinkSubmit}
        onClose={handleModalClose}
      />
  </div>
  );
};
export default Support_Groups;
