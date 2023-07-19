'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const fetchStory = async (id) => {
  if (typeof window === "undefined") {
    return {}
  }
  const response = await axios.get(http://localhost:8000/stories/${id}, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem('token'),
      "accept": 'application/json',
    },
  });
  return response.data;
};

const Story = () => {
  const params = useParams();
  const id = params.id;
  const [storyInfo, setStoryInfo] = useState(<></>);
  const storyContentRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const story = await fetchStory(id);
      const updatedContent = story.story.content.replace(/)/g, "");
      setStoryInfo(
        <div>
          <h1 className="text-2xl items-center text-center">{story.story.title}</h1>
          <div ref={storyContentRef} className="p-16 w-[70%] mx-auto text-lg">{updatedContent}</div>
          <button onClick={playFullStory}>Play Full Story</button>
        </div>
      );
    }
    fetchData();
  }, []);

  const playFullStory = () => {
    const text = storyContentRef.current.innerText;
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;

    // Adjust speech properties
    speech.rate = 0.8; // Adjust the speech rate
    // speech.pitch = 0.9; // Adjust the pitch
    // speech.volume = 0.9; // Adjust the volume

    window.speechSynthesis.onvoiceschanged = () => {
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(voice => voice.name === 'Eddy (English (UK))');
      speech.voice = selectedVoice;
      window.speechSynthesis.speak(speech);
    };
  };


  //Eddy (English (UK))

  return storyInfo;
};

export default Story;