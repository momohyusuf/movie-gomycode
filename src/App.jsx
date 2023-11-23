import { useState, useMemo } from "react";
import CreateNewMovie from "./components/CreateNewMovie";
import Filter from "./components/Filter";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import { movies } from "./data";

function App() {
  const [myMovies, setMyMovies] = useState(movies);
  const [random, setRandom] = useState(0);

  // let memorize the my movies in a useMemo Hook
  const memorizedMovies = useMemo(() => {
    return {
      myMemorizedMovies: myMovies,
    };
  }, [random]);
  // ***************************************
  // ***************************************

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto flex justify-between py-8">
        {/* filter component */}
        <Filter setMyMovies={setMyMovies} memorizedMovies={memorizedMovies} />
        {/* ****************************** */}
        {/* *************************** */}

        {/* create new movie component */}
        <CreateNewMovie
          memorizedMovies={memorizedMovies}
          setMyMovies={setMyMovies}
          setRandom={setRandom}
        />
        {/* ******************************* */}
        {/* ****************************** */}
      </div>

      {myMovies.length === 0 ? (
        <div className="text-center py-24 text-3xl">
          Searched movies did not return any result
        </div>
      ) : (
        <MovieList myMovies={myMovies} />
      )}
    </div>
  );
}

export default App;
