import React, { useState,useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import AddVideoExercise from './Master_UploadingNewVideoExercise';
import {useFetchVideos} from '../middleware/Fetch_Videos'
import videosImage from '../images/exerciseImage.jpg'
import ExerciseWatching from './WatchingExercise';

const BACKEND_URLCON= 'https://backend-mentalhealth-api.onrender.com';



function VideosUpload() {
  const {user}=useAuth();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [VideoId,setVideoid]=useState();
  const [video_name,setViedoname]=useState();
  const [videoHow_to_do,setvideoHow_to_do]=useState();
  const [IsWatcherExeOpen,setIsWatcherExeOpen]=useState();
  const {videos}= useFetchVideos();


  useEffect(() => {
    // Directly select the element by ID and modify its class
    const useraction = document.getElementById('userActions');
    const defaultaction = document.getElementById('default');
    const adminaction=document.getElementById('adminActions');
    

    if (defaultaction) {
      defaultaction.classList.add('md:hidden');
      defaultaction.classList.add('hidden');
      }

   if(user.role===1){
    useraction.classList.remove('md:hidden');
    useraction.classList.remove('hidden');
        document.getElementById('adminsehlphelp').classList.add('hidden')
        
    
}else if(user.role===10) {
    if (adminaction) {
        adminaction.classList.remove('hidden');
        adminaction.classList.remove('md:hidden');
        document.getElementById('userselfhelppage').classList.add('hidden')
      }
}
}, [user.role]);

const handledelete= async(videoId)=>{
  if(window.confirm("Are you suer that u want to delte al vedio")){
  try {
      const response =await fetch (`${BACKEND_URLCON}/customer/deleteVideo`,{
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({videoId}),
          });

  if (!response.ok) {
          throw new Error('Failed to delete video');
        }

        const result = await response.json();
        if(result.type==='error'){
          alert("Faild delteing video!: "+result.error);
      }
      else{
         window.location.reload();
          alert("the video had deleted successfully");
         
      }

  } catch (error) {
      console.error("Error deleteing avideo:", error);
  }
}
}
const handleFormSubmit = async (msg) => {
  if(msg.type==='error'){
    alert("Error: "+ msg.message);
  }
  else{
    setIsFormOpen(false);
  alert("new Video add succsefully!")
  window.location.reload();
  }
  
  };

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleOpenWatchExercise =(videoID,videoNAME,videoHow_to_do)=>{
    setVideoid(videoID);
    setViedoname(videoNAME)
    setvideoHow_to_do(videoHow_to_do)
    setIsWatcherExeOpen(true);


  }
    
  const handleClose = () => {
    setIsWatcherExeOpen(false);
    setVideoid(''); 
  };

  return (<div className="dark:bg-gray-900">
    <div id='adminsehlphelp' className="flex flex-col items-center justify-center text-center px-4">
  <h1 className="font-bold dark:text-white my-5 mb-4">you can upload/delete more Exercise video!</h1>
  <p className="w-full sm:w-2/3 lg:w-1/2">
    <button 
             type="button" 
            //  style={{display:(user.role===1?'none':'inline-block')}}
             className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
             onClick={handleFormOpen}
            >
                 Upload New Video! 
             <i className=" fa fa-upload"></i>              
          </button>
  </p>
  </div>
  <div id='userselfhelppage' className="flex flex-col items-center justify-center text-center px-4">
  <h1 className="font-bold dark:text-white mb-4">Welcome to Your Breathing Techniques Guide!</h1>
  <p className="w-full sm:w-2/3 dark:text-white lg:w-1/2">
    "Discover simple and effective breathing techniques to enhance your well-being. 
    Starting with just a few minutes a day, learn to incorporate mindful breathing into
     your routine for a calmer, more focused you."
  </p>
</div>

<div className="flex flex-wrap justify-center items-stretch space-x-0 sm:space-x-10 space-y-10">
  {videos.map((video, index) => (
    <div key={index} className="mt-5 w-full sm:w-auto">
      <div className="card mb-4 shadow-2xl w-[35rem] max-w-full mx-auto">
        <img src={videosImage} className="card-img-top" alt="Article visual" />
        <div className="card-body">
          <h5 className="card-title">{video.exerciseName}</h5>
          <p className="card-text">{video.description}</p>
          <div >
            { <button onClick={() => handleOpenWatchExercise(video._id,video.exerciseName,video.how_to_do)} type="button" className="btn btn-l btn-outline-secondary">
              <i className="fa fa-video"></i>  
            </button> }
            {<button onClick={() => handledelete(video._id)} type="button" className="btn btn-l btn-outline-secondary" 
             style={{display: user.role === 1 ? 'none' : 'inline-block'}}
            >
              <i className="fa fa-trash"></i>  
            </button> }
          </div>
        </div>
      </div>
    </div>
  ))}
  {IsWatcherExeOpen &&(
             <ExerciseWatching 
            isOpen={IsWatcherExeOpen}
             VideoID={VideoId}
            onClose={handleClose}
            videoName={video_name}
            videoHowtodo={videoHow_to_do}/>) }
</div>

  {isFormOpen && (
        <AddVideoExercise
          isOpen={isFormOpen}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}

</div>
  );
}

export default VideosUpload;
