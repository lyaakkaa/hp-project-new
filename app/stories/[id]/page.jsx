'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const fetchStory = async (id) => {
  if (typeof window === "undefined") {
    return {}
  }
  const response = await axios.get(`https://fastapi-ht4s.onrender.com/stories/${id}`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem('token'),
      "accept": 'application/json',
    },
  });
  return response.data;
};

function removeNumbersAndParentheses(text) {
  const regex = /[0-9()"$]/g;
  return text.replace(regex, '');
}

const Story = () => {
  const params = useParams();
  const id = params.id;
  const [storyInfo, setStoryInfo] = useState(<></>);
  const [audioUrl, setAudioUrl] = useState('');
  const [isCreatingAudio, setIsCreatingAudio] = useState(false);

  
  const createAudio = async () => {
    try {
      setIsCreatingAudio(true);
      const response = await axios.post(
        "https://fastapi-ht4s.onrender.com/stories/create_audio",
        { story_id: id },
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
            "accept": 'application/json',
          },
        }
      );
      setAudioUrl(response.data);
      setIsCreatingAudio(false);
    } catch (error) {
      console.error("Error creating audio:", error);
      setIsCreatingAudio(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const story = await fetchStory(id);
        setStoryInfo(
          <div className="bg-[#D2B48C] absolute inset-0 flex justify-center items-start">
            <div className="bg-[#D2B48C] fixed w-full h-full flex flex-col justify-start items-start p-8 mt-8 overflow-auto">
              <h1 className="text-4xl mb-4 text-center mx-auto"> {removeNumbersAndParentheses(story.story.title) || `Story`}</h1>
              <p className='text-bold'>{removeNumbersAndParentheses(story.story.content)}</p>
              <button onClick={createAudio}>▶ Play</button>
              {isCreatingAudio ? (
                <p>Audio is being created...</p>
              ) : null}
              {audioUrl ? (
                <audio controls>
                  <source src={audioUrl} type="audio/mpeg" />
                </audio>
              ) : null}
            </div>
          </div>
        );
      } catch (error) {
        console.error("Error fetching story:", error);
      }
    }
    fetchData();
  }, [id, audioUrl, isCreatingAudio]); 

  return storyInfo;
};

export default Story;

