
import './App.css'
import "./index.css";
import axios from 'axios';
import { useState } from 'react';

function App() {

  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCopied(false);

    try {
      const response = await axios.post("https://minifyurl.rishabhsingh007.com/api/v1/shorten", {
        originalUrl: originalUrl,
      });
      console.log(response.data.data.shortUrl);
      
      setShortUrl(response.data.data.shortUrl);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div className="container h-[40rem] bg-gray-300 flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-200 shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-600">MINIFY-URL</h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="mb-6">
              <input
                type="text"
                placeholder="Enter URL to shorten"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="w-full px-4 py-2 border text-black border-gray-600 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Shorten URL
              </button>
            </form>

            {/* Shortened URL Result */}
            {shortUrl && (
              <div className="bg-white p-4 rounded shadow flex items-center justify-between">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 break-all"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={handleCopy}
                  className="ml-4 text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App