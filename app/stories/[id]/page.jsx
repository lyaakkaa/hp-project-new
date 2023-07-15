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
  const params = useParams()
  const id = params.id
  const [storyInfo, setStoryInfo] = useState(<></>)

  useEffect(() => {
    async function fetchData() {
      const story = await fetchStory(id);
      setStoryInfo(
        <div className="absolute inset-0 bg-black flex justify-center items-start">
          <div className="bg-white fixed w-5/12 h-full flex flex-col justify-start items-start p-8 overflow-auto">
            <h1 className="text-4xl mb-4 text-center mx-auto">{story.story.title}</h1>
            <p className="">{removeNumbersAndParentheses(story.story.content)}</p>
          </div>
        </div>
      )
    }
    fetchData()
  }, [])
  return storyInfo

}

export default Story;