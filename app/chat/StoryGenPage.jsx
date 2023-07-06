import Chat from "./chat";

const StoryGenPage = () => {
  return (
    <>
    <div className="flex flex-column w-full h-[90vh] overflow-auto">
        <div className="flex inset-y-0 left-0 basis-1/3 border-r border-gray-300"><Chat/></div>
        <div className="flex inset-y-0 right-0 basis-2/3 bg-white">StoryGenPage</div>
    </div>
   </>
  );
}

export default StoryGenPage