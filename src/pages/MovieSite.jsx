import React, { useState } from 'react'

const MovieSite = () => {

    const [input, setInput] = useState("")
    const [movieID, setMovieID] = useState("tt1375666")
    const [epi, setEpi] = useState(1)
    const [anime, setAnime] = useState('death-note')
    const [type, setType] = useState('movie')

    const fetchMovieId = async () => {
        const res = await fetch(`https://www.omdbapi.com/?t=${input}&apikey=fff7fd4b`)
        const data = await res.json();
        setMovieID(data.imdbID);
        console.log(movieID);
    }

    const wantedType = () => {
        if (type === 'movie') {
            return 'anime'
        }
        else {
            return 'movie'
        }
    }

    const switchMode = () => {
        if (type === 'movie') {
            setType('anime')
        }
        else {
            setType('movie')
        }
    }

    const fixAnime = () => {
        const ani = input.split(' ').join('-');
        console.log(ani)
        setAnime(ani)
    }

    return (
        <div className='mt-[3vh] flex flex-col justify-center items-center'>
            <button onClick={() => switchMode()}>
                Watch {wantedType()}
            </button>
            {type === 'movie'
                ?
                <div id='movie'>
                    <div className="flex items-center space-x-4">
                        <input
                            className="w-[20vw] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="tel"
                            onChange={(e) => { setInput(e.target.value); console.log(input); }}
                            placeholder="Enter Movie Name"
                        />

                        <button
                            className="ml-[2vw]"
                            onClick={() => fetchMovieId()}
                        >
                            Fetch
                        </button>
                    </div>

                    {movieID
                        ?
                        <div className='mt-[3vh] rounded-[20px]'>
                            <iframe
                                height={800}
                                width={1600}
                                src={`https://www.2embed.cc/embed/${movieID}`}
                                allowFullScreen
                            />
                        </div>
                        :
                        <div className="h-[800px] w-[1600px] flex justify-center items-center bg-slate-500 mt-[3vh] rounded-[20px] mx-auto shadow-lg p-6">
                            <h1 className="text-white text-center font-semibold text-[5vh]">
                                Movie requested <span className="font-bold text-yellow-300">{input}</span> not found, try another one 😅.
                            </h1>
                        </div>
                    }
                </div>
                :
                <div id='anime'>
                    <input
                        className="w-[20vw] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="tel"
                        onChange={(e) => { setInput(e.target.value); console.log(input); }}
                        placeholder="Enter Anime Name"
                    />

                    <button className='ml-[2vw]' onClick={() => fixAnime()}>fetch</button>

                    <iframe height={800}
                        width={1600} src={`https://2anime.xyz/embed/${anime}-episode-${epi}`} allowFullScreen></iframe>
                    <div className='flex'>
                        <div className='flex mt-[1vh]'>
                            <h1>Watch  </h1>
                            <input className='text-[2vw] w-[6vw] ml-[1vw] pl-[10px]' onChange={(e) => setEpi(e.target.value)} type="number" />
                            <button className='ml-[1vw]' onClick={() => setEpi(epi + 1)}>next</button>
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}

export default MovieSite