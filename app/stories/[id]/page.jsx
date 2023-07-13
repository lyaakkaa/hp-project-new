import React from 'react';
import axios from 'axios';

const fetchStory = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/stories/${id}`, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGFlMjUwM2FkZDUwNmQ0OGM4ZjBiMjAiLCJleHAiOjE2ODk4ODU1Nzl9.jJTTzxYEbpbg7D0hoxBDDH43nPKW_3QB4tYe_rLhP3g",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching story: ', error);
  }
};


const page = async ({params}) => {
  const { id } = params;
  console.log(id)
  let story = null;

  try {
    story = await fetchStory(id);
    console.log(story);
  } catch (error) {
    console.error('Error fetching story: ', error);
  }

  return (
    <div className="absolute inset-0 bg-black flex justify-center items-start">
      <div className="bg-white fixed w-5/12 h-full flex flex-col justify-start items-start p-8 overflow-auto">
        <h1 className="text-4xl mb-4 text-center mx-auto">{story.story.title}</h1>
        <p className=""> 
        </p>
      </div>
    </div>
  );
}

export default page;