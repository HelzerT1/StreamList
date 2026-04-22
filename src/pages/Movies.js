import React, { useState } from "react";

function Movies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movie data.");
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setError("There was a problem loading movie information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1>Movies</h1>
      <p>Search for movie information using TMDB.</p>

      <form className="form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="movie-results">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <h3>{movie.title}</h3>
            <p>
              <strong>Release Date:</strong>{" "}
              {movie.release_date || "Not available"}
            </p>
            <p>
              <strong>Rating:</strong>{" "}
              {movie.vote_average ? movie.vote_average : "Not available"}
            </p>
            <p>
              <strong>Overview:</strong>{" "}
              {movie.overview ? movie.overview : "No overview available."}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Movies;