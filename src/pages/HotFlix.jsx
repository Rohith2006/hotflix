import React, { useState } from 'react'

const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100vw;
    height: 100vh;
  }

  body {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`

const HotFlix = () => {
    const [input, setInput] = useState("")
    const [movieID, setMovieID] = useState("tt1375666")
    const [epi, setEpi] = useState(1)
    const [anime, setAnime] = useState('death-note')
    const [type, setType] = useState('movie')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchMovieId = async () => {
        setLoading(true)
        setError("")
        try {
            const res = await fetch(`https://www.omdbapi.com/?t=${input}&apikey=fff7fd4b`)
            const data = await res.json();
            if (data.Response === "False") {
                setError(data.Error)
                setMovieID("")
            } else {
                setMovieID(data.imdbID);
            }
        } catch (err) {
            setError("An error occurred while fetching the movie.")
        }
        setLoading(false)
    }

    const wantedType = () => type === 'movie' ? 'anime' : 'movie'
    const switchMode = () => setType(type === 'movie' ? 'anime' : 'movie')
    const fixAnime = () => {
        const ani = input.split(' ').join('-').toLowerCase();
        setAnime(ani)
    }

    return (
        <>
            <style>{globalStyles}</style>
            <div className="w-screen h-screen bg-gray-900 text-white flex flex-col p-[.4vw]">
                <div className="flex justify-between items-center p-2 bg-gray-800">
                    <h1 className="text-[4vh] font-bold ml-[1vw]">HotFlix</h1>
                    <button 
                        onClick={switchMode}
                        className="bg-blue-500 text-white font-semibold py-1 px-3 rounded text-m hover:bg-blue-600 transition duration-300"
                    >
                        Switch to {wantedType()}
                    </button>
                </div>
                
                <div className="flex space-x-2 p-2 bg-gray-800">
                    <input
                        className="flex-grow px-2 py-2 bg-gray-700 rounded text-[2vh] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Enter ${type} name`}
                    />
                    
                    <button
                        className="bg-green-500 text-white font-semibold py-1 px-5 rounded text-m hover:bg-green-600 transition duration-300"
                        onClick={type === 'movie' ? fetchMovieId : fixAnime}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Fetch'}
                    </button>
                </div>

                {type === 'anime' && (
                    <div className="flex items-center space-x-2 p-2 bg-gray-800">
                        <label className="font-semibold text-sm">Episode:</label>
                        <input
                            className="w-16 px-2 py-1 bg-gray-700 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="number"
                            value={epi}
                            onChange={(e) => setEpi(parseInt(e.target.value))}
                            min="1"
                        />
                        <button
                            className="bg-blue-500 text-white font-semibold py-1 px-3 rounded text-sm hover:bg-blue-600 transition duration-300"
                            onClick={() => setEpi(prev => prev + 1)}
                        >
                            Next Episode
                        </button>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500 text-white p-1 text-sm">
                        {error}
                    </div>
                )}

                <div className="flex-grow bg-black">
                    {type === 'movie' && movieID ? (
                        <iframe
                            src={`https://www.2embed.cc/embed/${movieID}`}
                            allowFullScreen
                            className="w-[95vw] h-[50vw] ml-[2.5vw] mt-[2vh] lg:w-full lg:h-full lg:ml-[0px] lg:mt-[0px]"
                        />
                    ) : type === 'anime' ? (
                        <iframe 
                            src={`https://2anime.xyz/embed/${anime}-episode-${epi}`}
                            allowFullScreen
                            className="w-[95vw] h-[50vw] ml-[2.5vw] mt-[2vh] lg:w-full lg:h-full lg:ml-[0px] lg:mt-[0px]"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-base text-center">
                                Enter a {type} name and click Fetch to start watching!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default HotFlix