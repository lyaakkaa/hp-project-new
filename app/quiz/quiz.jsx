import React from 'react';

const Quiz = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-cover bg-center wrapper absolute inset-0 overflow-auto bg-gray-800">
      <div className="w-full h-full p-32 mx-auto flex rounded-lg shadow-xl bg-cover bg-center relative" style={{ backgroundImage: "url('/quiz-bg.jpg')" }}>
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-[320px] h-[320px] rounded-full flex items-center justify-center relative">
            <div className="border-4 border-white border-solid rounded-full absolute w-full h-full animate-spin"></div>
            <div className="w-[280px] h-[280px] rounded-full bg-center bg-cover" style={{ backgroundImage: "url('/harryhag.jpg')", backgroundPosition: 'center', backgroundSize: 'cover' }}></div> {/* Круглое изображение */}
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-center pl-32">
          <h1 className="text-3xl font-bold mb-4 text-white">Добро пожаловать в квиз!</h1>
          <p className="text-lg mb-8 text-white">Ответьте на вопросы и проверьте свои знания.</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Начать квиз
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
