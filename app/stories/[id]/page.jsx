import React from 'react';
import axios from 'axios';

const fetchStory = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/stories/${id}`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGFkODE1OWVkOTgzM2I3MmEyOWJmN2UiLCJleHAiOjE2ODk3NDY0MTJ9.Lq6Cbt76w-SV3_AR5EScb5a5MAcfna6ahE786s-Vcm8',
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching story: ', error);
  }
};


const page = async ({params}) => {
  const { id } = params;
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
        <h1 className="text-4xl mb-4 text-center mx-auto">{story.title}</h1>
        <p className=""> {story.content}
        </p>
      </div>
    </div>
  );
}

export default page;
