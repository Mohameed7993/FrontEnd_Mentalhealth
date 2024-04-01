import React ,{useEffect ,useState} from "react";
import { useAuth } from "../context/AuthContext";
import articleimage from '../images/mentalheltharticlaimage.jpg'
import AddPdfDocument from "./Master_UploadingNewArticles";
import PdfViewer from "./PDF_Viwer";
import {useFetchFiles} from '../middleware/Fetch_Articles';
const BACKEND_URLCON= 'https://backend-mentalhealth-api.onrender.com';


  const Selfhelp = () => {
    const {user}=useAuth();
    const [isPDFViwerOpen, setIsPDFViwerOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [PdfFileID, setPdfFile] = useState();

    //fetching files details!
    const { files } = useFetchFiles();



    const handleOpenPdfViewer = (fileId) => {
        setPdfFile(fileId); 
        setIsPDFViwerOpen(true); 
      };

      const handleClose = () => {
        setIsPDFViwerOpen(false); // closeing the viewer
        setPdfFile(''); 
      };

    const handleFormOpen = () => {
      setIsFormOpen(true);
    };
  
    const handleFormClose = () => {
      setIsFormOpen(false);
    };

    const handledelete= async(filename)=>{
        try {
            const response =await fetch (`${BACKEND_URLCON}/customer/deletearticles`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({filename}),
                });

        if (!response.ok) {
                throw new Error('Failed to delete article');
              }
    
              const result = await response.json();
              if(result.type==='error'){
                alert("Faild delteing article!: "+result.message);
            }
            else{
                alert("the article had deleted successfully");
                window.location.reload();
            }
    
        } catch (error) {
            console.error("Error deleteing articles:", error);
        }
    }
  
    const handleFormSubmit = async (formData) => {
        setIsFormOpen(false);
        alert("new article add succsefully!")
        window.location.reload();
        };


    useEffect(() => {
        // Directly select the element by ID and modify its class
        const useraction = document.getElementById('userActions');
        const defaultaction = document.getElementById('default');
        const adminaction=document.getElementById('adminActions');
        

        if (defaultaction) {
            defaultaction.classList.add('hidden');
          }

       if(user.role===1){
            useraction.classList.remove('hidden');
            document.getElementById('adminsehlphelp').classList.add('hidden')
            
        
    }else if(user.role===10) {
        if (adminaction) {
            adminaction.classList.remove('hidden');
            document.getElementById('userselfhelppage').classList.add('hidden')
          }
    }
    }, [user.role]);

    return (

        <div className="  dark:bg-gray-900 ">
    <div id='userselfhelppage' className="flex flex-col items-center justify-center text-center px-4">
  <h1 className="font-bold dark:text-white mb-4">Welcome to Your Personalized Mental Health Resource Hub!</h1>
  <p className="w-full sm:w-2/3 dark:text-white lg:w-1/2">
  "Explore articles and resources crafted for your mental well-being in our Self-Help Hub.
   From managing stress to improving mental health, find support that suits your needs and journey at your pace."
  </p>
</div>

<div id='adminsehlphelp' className="flex flex-col items-center justify-center text-center px-4">
  <h1 className=" dark:text-white my-5 font-bold mb-4">you can upload new articles!</h1>
  <p className="w-full sm:w-2/3 lg:w-1/2">


    <button 
             type="button" 
             style={{display:(user.role===1?'none':'inline-block')}}
             className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
             onClick={handleFormOpen}
            >
                 Upload New Articles 
             <i className=" fa fa-upload"></i>              
          </button>
  </p>
  {isFormOpen && (
        <AddPdfDocument
          isOpen={isFormOpen}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}
</div>

<div className="flex flex-wrap justify-center items-stretch space-x-0 sm:space-x-10 space-y-10">
  {files.map((file, index) => (
    <div key={index} className="mt-5 w-full sm:w-auto">
      <div className="card mb-4 w-[35rem] max-w-full mx-auto">
        <img src={articleimage} className="card-img-top" alt="Article visual" />
        <div className="card-body">
          <h5 className="card-title">{file.documentName}</h5>
          <p className="card-text">{file.description}</p>
          <div className="btn-group">
            <button onClick={() => handleOpenPdfViewer(file._id)} type="button" className="btn btn-l btn-outline-secondary">
              <i className="fa fa-file"></i>  
            </button>
            <button onClick={() => handledelete(file.filename)} type="button" className="btn btn-l btn-outline-secondary" 
            style={{display: user.role === 1 ? 'none' : 'inline-block'}}>
              <i className="fa fa-trash"></i>  
            </button>
            <PdfViewer isOpen={isPDFViwerOpen} pdfFileID={PdfFileID} onClose={handleClose} />
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
    );
  };
  
  export default Selfhelp;
  
