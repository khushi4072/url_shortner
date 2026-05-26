"use client"
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [inputUrl, setInputUrl] = useState("")
  const [shortenedUrl, setShortenedUrl] = useState("")

  const buildurl = async () => {
    try {
      const response = await axios.post('/api/shorten', {
        originalUrl: inputUrl
      })
      const url = response.data.shortUrl;
      setShortenedUrl(url)
    } catch (error) {
      console.error("Error shortening URL:", error)
      alert("Failed to shorten URL")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">URL Shortener</h1>
      
      <div className="w-full max-w-md space-y-4">
        <label className="block text-lg font-medium">Enter your URL:</label>
        <input 
          placeholder="https://example.com" 
          className="border-2 border-gray-300 rounded-md p-2 w-full text-black"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />
        
        <button 
          onClick={buildurl}
          className="bg-blue-600 text-white px-6 py-2 rounded-md w-full hover:bg-blue-700 transition"
        >
          Get Short URL
        </button>

        {shortenedUrl && (
          <div className="mt-8 p-4 bg-gray-100 rounded-md border border-gray-200">
            <p className="text-gray-600">Your shortened URL:</p>
            <a 
              href={`/${shortenedUrl}`} 
              className="text-blue-600 font-bold text-xl break-all"
              target="_blank"
            >
              {window.location.origin}/{shortenedUrl}
            </a>
          </div>
        )}
      </div>
    </main>
  )
}
