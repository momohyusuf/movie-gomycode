import { useState } from "react";
import CreateNewMovie from "./components/CreateNewMovie";
import Filter from "./components/Filter";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import { movies } from "./data";

function App() {
  const [myMovies, setMyMovies] = useState(movies);

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto flex justify-between py-8">
        <Filter />
        <CreateNewMovie />
      </div>

      <MovieList myMovies={myMovies} />
    </div>
  );
}

export default App;
