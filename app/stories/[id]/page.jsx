'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const fetchStory = async (id) => {
  console.log("in")
  if (typeof window === "undefined") {
    return {}
  }
  const response = await axios.get(`http://localhost:8000/stories/${id}`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem('token'),
      "accept": 'application/json',
    },
  });
  console.log(response.data);
  return response.data;
};

function removeNumbersAndParentheses(text) {
  const regex = /[0-9()]/g;
  return text.replace(regex, '');
}

const Story = () => {
  const params = useParams();
  const id = params.id;
  const [storyInfo, setStoryInfo] = useState(<></>);

  const speakText = async (text) => {
    try {
      const response = await axios.post(
        'https://play.ht/api/v2/tts',
        {
          text: text,
          voice: 'larry', // Указываем голос, можно заменить на другой голос по желанию
        },
        {
          headers: {
            'Authorization': 'Bearer a157e48cf0644782975601a0503d44ef', // Здесь используем ваш токен
            'X-USER-ID': 'gC49M7Fcv3cFpzBKnUVyRDC649p1', // Здесь ваш USER ID
            'accept': 'text/event-stream',
            'content-type': 'application/json',
          },
          responseType: 'blob',
        }
      );

      // Создаем объект Audio для воспроизведения аудио
      const audio = new Audio(URL.createObjectURL(response.data));
      audio.play();
    } catch (error) {
      console.error('Error occurred while fetching the audio:', error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const story = await fetchStory(id);
      setStoryInfo(
        <div className="absolute inset-0 bg-black flex justify-center items-start">
          <div className="bg-white fixed w-5/12 h-full flex flex-col justify-start items-start p-8 overflow-auto">
            <h1 className="text-4xl mb-4 text-center mx-auto">{story.story.title}</h1>
            <p className="">{removeNumbersAndParentheses(story.story.content)}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => speakText(story.story.content)}
            >
              Озвучить текст
            </button>
          </div>
        </div>
      );
    }
    fetchData();
  }, []);

  return storyInfo;
};

export default Story;