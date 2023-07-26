import { throttle } from '@/lib/throttle'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import cx from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { ChatLine, LoadingChatLine } from './chat-line'

export const initialMessages = [
  {
    role: 'assistant',
    content: 'Hi! I am an AI-powered Harry Potter expert that can generate wizarding world stories!✨ Who are the main characters?',
  },
]

const InputMessage = ({ input, setInput, sendMessage, loading }) => {
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false)
  const [question, setQuestion] = useState(null)
  const [questionError, setQuestionError] = useState(null)
  const inputRef = useRef(null)

  const shouldShowLoadingIcon = loading || isGeneratingQuestion
  const inputActive = input !== '' && !shouldShowLoadingIcon

  useEffect(() => {
    const input = inputRef?.current
    if (question && input) {
      input.focus()
      input.setSelectionRange(input.value.length, input.value.length)
    }
  }, [question, inputRef])

  useEffect(() => {
    if (questionError) {
      toast.error(questionError)
    }
  }, [questionError])

  return (
    <div className="bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-white to-white flex flex-col items-center clear-both">
      <div className="mx-2 my-4 flex-1 w-full md:mx-4 md:mb-[52px] lg:max-w-2xl xl:max-w-3xl">
        <div className="relative mx-2 flex-1 flex-col rounded-md border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] sm:mx-4">
          <input
            ref={inputRef}
            aria-label="chat input"
            required
            className="m-0 w-full border-0 bg-transparent p-0 py-3 pl-4 pr-12 text-black"
            placeholder="Type a message..."
            value={input}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage(input)
                setInput('')
              }
            }}
            onChange={(e) => {
              setInput(e.target.value)
            }}
            disabled={isGeneratingQuestion}
          />
          <button
            className={cx(
              shouldShowLoadingIcon && "hover:bg-inherit hover:text-inhert",
              inputActive && "bg-black hover:bg-neutral-800 hover:text-neutral-100",
              "absolute right-2 top-2 rounded-sm p-1 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:text-neutral-900 transition-colors")}
            type="submit"
            onClick={() => {
              sendMessage(input)
              setInput('')
            }}
            disabled={shouldShowLoadingIcon}
          >
            {shouldShowLoadingIcon
              ? <div className="h-6 w-6 animate-spin rounded-full border-t-2 border-neutral-800 opacity-60 dark:border-neutral-100"></div>
              : <div className={cx(inputActive && "text-white", "w-6 h-6")}>
                <PaperAirplaneIcon />
              </div>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

const useMessages = () => {
  const [messages, setMessages] = useState(initialMessages)
  const [isMessageStreaming, setIsMessageStreaming] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);

  const [part, setParts] = useState("1");

  const sendMessage = async (newMessage) => {
    setLoading(true)
    setError(null)
    const newMessages = [
      ...messages,
      { role: 'user', content: newMessage },
    ]
    setMessages(newMessages)
    const last10messages = newMessages.slice(-10)

    let response = "";

    if(part == "1"){
      localStorage.removeItem('story_id')
      localStorage.removeItem('next_question')
      response = await fetch('https://fastapi-ht4s.onrender.com/stories/question1', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
          answer: newMessage,
        }),
    })
    console.log("first part is generated " + localStorage.getItem('token'))
    setParts("2")
  }else if(part == "2"){
     response = await fetch('https://fastapi-ht4s.onrender.com/stories/question2', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        _id: localStorage.getItem("story_id"),
        answer: newMessage,
        question: localStorage.getItem("next_question")
      }),
    })
    console.log("second part is generated " + localStorage.getItem('token'))
    setParts("3")
  }else if(part == "3"){
    response = await fetch('https://fastapi-ht4s.onrender.com/stories/question3', {
     method: 'POST',
     headers: {
       'accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('token')
     },
     body: JSON.stringify({
      _id: localStorage.getItem("story_id"),
      answer: newMessage,
      question: localStorage.getItem("next_question")
     }),
   })
   console.log("third part is generated " + localStorage.getItem('token'))
   setParts("4")
 }else if(part == "4"){
  response = await fetch('https://fastapi-ht4s.onrender.com/stories/question4', {
   method: 'POST',
   headers: {
     'accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + localStorage.getItem('token')
   },
   body: JSON.stringify({
    _id: localStorage.getItem("story_id"),
    answer: newMessage,
    question: localStorage.getItem("next_question")
   }),
 })
 console.log("fourth part is generated " + localStorage.getItem('token'))
 localStorage.removeItem('story_id')
 localStorage.removeItem('next_question')
 setParts("5")
}


  const data = response.body
  if (!data) {
    return
  }
  const responseData = await response.json(); 

  console.log("reseponse data: ", responseData)
  const { _id, next_question } = responseData;
  console.log("_id: ", _id) 
  console.log("Next question: ", next_question)
  localStorage.setItem("story_id", _id)
  localStorage.setItem("next_question", next_question)


  setMessages([
    ...newMessages,
    { role: 'assistant', content: next_question }, 
  ]);

  setLoading(false);

  setIsMessageStreaming(false)
  }

  return {
  messages,
  isMessageStreaming,
  loading,
  error,
  sendMessage,
  }
}

export default function Chat() {
  const [input, setInput] = useState('')
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { messages, isMessageStreaming, loading, error, sendMessage } = useMessages()

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const bottomTolerance = 30;

      if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
        setAutoScrollEnabled(false);
      } else {
        setAutoScrollEnabled(true);
      }
    }
  };

  const scrollDown = useCallback(() => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView(true)
    }
  }, [autoScrollEnabled])
  const throttledScrollDown = throttle(scrollDown, 250);

  useEffect(() => {
    throttledScrollDown()
  }, [messages, throttledScrollDown]);

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    <div className="flex flex-col flex-1 w-full border-zinc-100 bg-white overflow-hidden y-full">
      <div
        ref={chatContainerRef}
        className="flex-1 w-full relative max-h-[calc(100vh-4rem)] overflow-x-hidden overflow-y-scroll "
        onScroll={handleScroll}
      >
        {messages.map(({ content, role }, index) => (
          <ChatLine key={index} role={role} content={content} isStreaming={index === messages.length - 1 && isMessageStreaming} />
        ))}

        {loading && <LoadingChatLine />}

        <div
          className="h-[54vh] bg-white"
          ref={messagesEndRef}
        />
      </div>
      <InputMessage
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        loading={loading || isMessageStreaming}
      />
      <Toaster />
    </div>
  )
}