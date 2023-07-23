import { React, useState, useEffect } from 'react'
import useSWR from 'swr'


const fetcher = (...args) => fetch(...args).then((response) => response.json())

function Search() {

    const [search, setSearch] = useState([]);
    const [gameTitle, setGameTitle] = useState("");

    const searchGame = () => {
        fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
        .then((response) => response.json())
        .then((data) => {
            setSearch(data)
        })
    }

    const {data, error } = useSWR("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3", fetcher);



    return(
        <div className='GameBox'>

            <div className="searchBox">
            
            <h2>Search Game</h2>
                <input type="text" onChange={(event) => setGameTitle(event.target.value)} />
                <button onClick={searchGame}>Search</button>
            </div>
            
            <div className="games">
                {search.map((game, key) => {
                    return(
                        <div className="game" key={key}> 
                            {game.external}
                            <img src={game.thumb}/>
                            {game.cheapest}
                            
                        </div>
                    );
                })}
            </div>
<h1>Latest Deals</h1>
            <div className="dealsSection">
             
             {data && data.map((game,key) => {
                return (
                    <div key={key} className="gameDeals">
                       <h3>{game.title}</h3> 
                       <p>Normal Price : {game.normalPrice}</p>
                       <p>Deal Price : {game.salePrice}</p>
                       <h3>You SAVE {game.savings.substr(0,2)}%</h3>
                    </div>
                    
                )
             })}
            </div>
            
        </div>
    )
}

export default Search;