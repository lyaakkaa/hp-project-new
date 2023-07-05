'use client'
import { useEffect } from "react";
import Balancer from "react-wrap-balancer";
import useSound from "use-sound";


export default function Landing() {
  const textGradientStyle = {
    backgroundImage: "linear-gradient(to right,#462523 0,#cb9b51 22%,#f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#462523 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animationDelay: "0.15s",
    animationFillMode: "forwards"
  };
  

  const [play, { stop }] = useSound("/hp.mp3", { volume: 1 });

  useEffect(() => {
    play();

    return () => {
      stop();
    };
  }, [play, stop]);

  return (
    <>
      <audio src="/hp.mp3" autoPlay loop />
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1
          className="animate-fade-up text-center font-display text-4xl font-bold tracking-[-0.02em] opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={textGradientStyle}
        >
          <Balancer>Meet your AI Harry Potter generator</Balancer>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-200 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>AI-powered Harry Potter expert that can generate wizarding world stories.</Balancer>
        </p>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
        </div>
      </div>
    </>
  );
}