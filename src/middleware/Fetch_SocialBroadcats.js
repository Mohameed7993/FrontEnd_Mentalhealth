// useSocialMediaLinks.js
import { useState, useEffect } from 'react';

export function  useSocialMediaLinks () {
  const [facebook, setFacebook] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instgram, setInstagram] = useState(''); // Fixed typo in 'instagram'

  useEffect(() => {
    const fetchSocialMediaBroadcasts = async () => {
      try {
        const response = await fetch("http://localhost:5000/customer/getsociallinks");
        if (!response.ok) throw new Error('Failed to fetch the links');
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
          switch (data[i].socialtype) {
            case 'facebook':
              setFacebook(data[i].url);
              break;
            case 'whatsapp':
              setWhatsapp(data[i].url);
              break;
            case 'instagram': // Fixed typo in 'instagram'
              setInstagram(data[i].url);
              break;
            default:
              break;
          }
        }
      } catch (error) {
        console.error("Error fetching Links", error);
      }
    };

    fetchSocialMediaBroadcasts();
  }, []);

  return { facebook, whatsapp, instgram }; // Return the links as an object
 

};
