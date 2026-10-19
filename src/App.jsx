
import { useEffect, useMemo, useState } from 'react';

const API_BASE = 'https://rickandmortyapi.com/api/character';
const PAGE_NUMBERS = [1, 2, 3];

function StatCard({ label, value, note, icon }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <span className="stat-icon">{icon}</span>
      </div>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

function CharacterRow({ character }) {
  const statusClass = character.status.toLowerCase();

  return (
    <article className="character-row">
      <img
        src={character.image}
        alt={character.name}
        loading="lazy"
      />

      <div className="character-name">
        <h3>{character.name}</h3>
        <span>
          #{String(character.id).padStart(3, '0')}
          {' · '}
          {character.gender}
        </span>
      </div>

      <span className="species">{character.species}</span>

      <span className={`status ${statusClass}`}>
        <i />
        {character.status}
      </span>

      <span className="episode-count">
        {character.episode.length} episodes
      </span>

      <span className="location" title={character.origin.name}>
        {character.origin.name}
      </span>
    </article>
  );
}

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState('All');
  const [status, setStatus] = useState('All');
  const [minEpisodes, setMinEpisodes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadToken, setReloadToken] = useState(0);

  // Fetch character data from the API
  useEffect(() => {
    const controller = new AbortController();

    async function loadCharacters() {
      setLoading(true);
      setError('');

      try {
        const requests = PAGE_NUMBERS.map(async (page) => {
          const response = await fetch(
            `${API_BASE}?page=${page}`,
            { signal: controller.signal }
          );

          if (!response.ok) {
            throw new Error('Failed to fetch characters');
          }

          return response.json();
        });

        const pages = await Promise.all(requests);

        if (!controller.signal.aborted) {
          const allCharacters = pages.flatMap(
            (page) => page.results
          );
          setCharacters(allCharacters);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Could not load characters. Please try again.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadCharacters();

    return () => controller.abort();
  }, [reloadToken]);

  // Species options for dropdown
  const speciesOptions = useMemo(() => {
    return [
      ...new Set(characters.map((character) => character.species))
    ].sort();
  }, [characters]);

  // Maximum episode count for slider
  const maxEpisodes = useMemo(() => {
    return Math.max(
      0,
      ...characters.map((character) => character.episode.length)
    );
  }, [characters]);

  // Search and filter characters
  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      const matchesName = character.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesSpecies =
        species === 'All' || character.species === species;

      const matchesStatus =
        status === 'All' || character.status === status;

      const matchesEpisodes =
        character.episode.length >= minEpisodes;

      return (
        matchesName &&
        matchesSpecies &&
        matchesStatus &&
        matchesEpisodes
      );
    });
  }, [characters, search, species, status, minEpisodes]);

  // Calculate summary statistics
  const totalCharacters = characters.length;

  const aliveCount = characters.filter(
    (character) => character.status === 'Alive'
  ).length;

  const uniqueSpecies = new Set(
    characters.map((character) => character.species)
  ).size;

  const averageEpisodes = characters.length
    ? (
        characters.reduce(
          (sum, character) => sum + character.episode.length,
          0
        ) / characters.length
      ).toFixed(1)
    : '0.0';

  // Reset filters
  function resetFilters() {
    setSearch('');
    setSpecies('All');
    setStatus('All');
    setMinEpisodes(0);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a href="#home" className="brand">
          <span className="brand-logo">✳</span>
          MULTIVERSE<span>EXPLORER</span>
        </a>

        <span className="top-label">
          DATA DASHBOARD · PART 1
        </span>
      </header>

      <main id="home">
        <section className="hero">
          <div>
            <div className="eyebrow">
              <span className="live-dot" />
              EXPLORING THE MULTIVERSE
            </div>

            <h1>
              Every universe.
              <br />
              <em>Every character.</em>
            </h1>

            <p>
              Explore characters from Rick and Morty, compare
              their fates, and discover who appears across
              the most episodes.
            </p>
          </div>

          <div className="hero-art">
            <div className="portal">
              <span>R&amp;M</span>
            </div>
          </div>
        </section>

        <section className="statistics">
          <StatCard
            label="Characters loaded"
            value={totalCharacters}
            note="From three API pages"
            icon="◈"
          />

          <StatCard
            label="Alive characters"
            value={aliveCount}
            note="In the loaded sample"
            icon="♥"
          />

          <StatCard
            label="Unique species"
            value={uniqueSpecies}
            note="Species represented"
            icon="◎"
          />

          <StatCard
            label="Average appearances"
            value={averageEpisodes}
            note="Episodes per character"
            icon="✦"
          />
        </section>

        <section className="results-section">
          <div className="section-header">
            <div>
              <div className="eyebrow">
                THE CHARACTER DATABASE
              </div>

              <h2>Character directory</h2>

              <p>
                Search and filter the loaded characters.
              </p>
            </div>

            <div className="count-tag">
              {filteredCharacters.length} results
            </div>
          </div>

          <div className="filters">
            <label className="filter-group search-group">
              Search by name

              <input
                type="search"
                placeholder="e.g. Rick, Morty, Summer..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </label>

            <label className="filter-group">
              Species

              <select
                value={species}
                onChange={(event) =>
                  setSpecies(event.target.value)
                }
              >
                <option value="All">All species</option>

                {speciesOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="filter-group">
              Status

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
              >
                <option value="All">All statuses</option>
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="unknown">Unknown</option>
              </select>
            </label>

            <label className="filter-group range-group">
              Minimum episodes: {minEpisodes}

              <input
                type="range"
                min="0"
                max={maxEpisodes}
                value={Math.min(minEpisodes, maxEpisodes)}
                onChange={(event) =>
                  setMinEpisodes(Number(event.target.value))
                }
              />
            </label>

            <button
              className="reset-button"
              type="button"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>

          <div className="data-panel">
            <div className="table-head">
              <span>CHARACTER</span>
              <span>SPECIES</span>
              <span>STATUS</span>
              <span>APPEARANCES</span>
              <span>ORIGIN</span>
            </div>

            {loading ? (
              <div className="message">
                Loading characters from the API...
              </div>
            ) : error ? (
              <div className="message">
                {error}

                <br />

                <button
                  type="button"
                  onClick={() =>
                    setReloadToken((n) => n + 1)
                  }
                >
                  Retry
                </button>
              </div>
            ) : filteredCharacters.length > 0 ? (
              filteredCharacters.map((character) => (
                <CharacterRow
                  key={character.id}
                  character={character}
                />
              ))
            ) : (
              <div className="message">
                No characters match these filters.

                <br />

                <button
                  type="button"
                  onClick={resetFilters}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          <p className="footnote">
            Statistics and results are based on the first
            three pages returned by the public API, not
            every character in the full database.
          </p>
        </section>
      </main>

      <footer>
        Multiverse Explorer · Built with React + Vite ·
        Data from{' '}
        <a
          href="https://rickandmortyapi.com/"
          target="_blank"
          rel="noreferrer"
        >
          The Rick and Morty API
        </a>
      </footer>
    </div>
  );
}
