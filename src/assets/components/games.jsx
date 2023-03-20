import React, { useEffect, useState } from "react";
import { BsWindows } from "react-icons/bs";
import { CircleLoader } from "react-spinners";

const Games = () => {
  const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "4cfa140e50mshbf5073fc1648f15p1c4b62jsn32bcae2865ba",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const [Games, setGames] = useState();
  const fetchApi = async () => {
    const response = await fetch(url, options);
    const resonseJSON = await response.json();
    setItems([...resonseJSON].splice(0, itemPage));
    setGames(resonseJSON);
    setDataApi(resonseJSON);
    console.log(items);
  };

  const itemPage = 28;
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState(Games);
  const [dataApi, setDataApi] = useState();

  useEffect(() => {
    fetchApi();
  }, []);

  const nextHandler = () => {
    const elements = dataApi.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * itemPage;
    if (firstIndex > elements) return;
    setItems([...dataApi].splice(firstIndex, itemPage));
    setCurrentPage(nextPage);
    document.documentElement.scrollTop = 0;
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * itemPage;
    setItems([...dataApi].splice(firstIndex, itemPage));
    setCurrentPage(prevPage);
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      <ul className="lu">
        {!items ? (
          <div className="loader">
            <CircleLoader color="#36d7b7" size={100} />
          </div>
        ) : (
          items.map((item, index) => {
            return (
              <li key={index} className="lio">
                <a href={item.game_url} className="url" target={"_blank"}>
                  <img src={item.thumbnail} className="img" />
                  <h2 className="genre">{item.genre}</h2>
                  <h5 className="description">{item.short_description}</h5>
                  <h2 className="free">
                    <BsWindows /> / Free
                  </h2>
                </a>
              </li>
            );
          })
        )}
      </ul>
      <button onClick={prevHandler} className="next prevpage">
        prev
      </button>
      <button onClick={nextHandler} className="next nextpage">
        next
      </button>
    </>
  );
};

export default Games;
