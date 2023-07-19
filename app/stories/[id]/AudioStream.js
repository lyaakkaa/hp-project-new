'use client'
import React, { useState, useEffect } from "react";

const CHUNK_SIZE = 2500;
const PLAYBACK_DELAY = 1000;

const AudioStream = ({ input }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chunks, setChunks] = useState([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);

  useEffect(() => {
    // Split the text into chunks of 2500 characters each
    const textChunks = input.match(new RegExp(`.{1,${CHUNK_SIZE}}`, "g")) || [];
    setChunks(textChunks);
    setCurrentChunkIndex(0);
  }, [input]);

  const playCurrentChunk = async (chunk) => {
    const baseUrl = "https://api-inference.huggingface.co/models/espnet/kan-bayashi_ljspeech_vits";
    const headers = { "Authorization": "Bearer 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" };

    const requestBody = {
      input: chunk,
    };

    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const audioBuffer = await response.arrayBuffer();
        const audioContext = new AudioContext();
        const audioSource = audioContext.createBufferSource();

        audioContext.decodeAudioData(audioBuffer, (buffer) => {
          audioSource.buffer = buffer;
          audioSource.connect(audioContext.destination);
          audioSource.start();

          audioSource.onended = () => {
            // Play the next chunk when the current one ends
            if (currentChunkIndex < chunks.length - 1) {
              setCurrentChunkIndex(currentChunkIndex + 1);
            } else {
              // All chunks played
              setLoading(false);
            }
          };
        });
      } else {
        setError("Error: Unable to stream audio.");
        setLoading(false);
      }
    } catch (error) {
      setError("Error: Unable to stream audio.");
      setLoading(false);
    }
  };

  const startStreaming = async () => {
    setLoading(true);
    setError("");

    for (let i = currentChunkIndex; i < chunks.length; i++) {
      setCurrentChunkIndex(i);
      await playCurrentChunk(chunks[i]);
      // Add a delay between playing chunks to ensure smooth playback
      await new Promise((resolve) => setTimeout(resolve, PLAYBACK_DELAY));
    }
  };

  return (
    <div>
      <button onClick={startStreaming} disabled={loading}>
        {loading ? "Streaming..." : "Start Streaming"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AudioStream;
