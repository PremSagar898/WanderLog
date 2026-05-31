import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BucketPanel from '../components/BucketPanel';
import CountryCard from '../components/CountryCard';
import { useCountries } from '../context/CountryContext';
import { formatNumber } from '../utils/format';

function ExplorePage() {
  const { countries, loading, error, reload, regions } = useCountries();
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const visibleCountries = useMemo(() => {
    const filteredCountries = countries.filter((country) => {
      const matchesQuery = country.name.toLowerCase().includes(query.trim().toLowerCase());
      const matchesRegion = region === 'All' || country.region === region;

      return matchesQuery && matchesRegion;
    });

    return [...filteredCountries].sort((firstCountry, secondCountry) => {
      if (sortBy === 'population') {
        return secondCountry.population - firstCountry.population;
      }

      if (sortBy === 'area') {
        return secondCountry.area - firstCountry.area;
      }

      return firstCountry.name.localeCompare(secondCountry.name);
    });
  }, [countries, query, region, sortBy]);

  const worldPopulation = useMemo(() => {
    return countries.reduce((sum, country) => sum + country.population, 0);
  }, [countries]);

  if (loading) {
    return (
      <div className="screen-center">
        <div className="status-card">Loading countries...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="screen-center">
        <div className="status-card">
          <p>{error}</p>
          <button type="button" className="button button-primary" onClick={reload}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-layout explore-layout">
      <header className="explore-topbar panel">
        <div>
          <Link to="/auth" className="brand-link compact-brand">
            <span className="brand-icon">🌍</span>
            WanderLog
          </Link>
        </div>

        <label className="topbar-search">
          <span className="sr-only">Search country</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search countries..." />
        </label>

        <div className="topbar-stats">
          <div className="user-avatar">{countries.length > 0 ? '👤' : '○'}</div>
        </div>
      </header>

      <section className="explore-toolbar panel">
        <div className="region-chips">
          {regions.map((regionName) => (
            <button
              key={regionName}
              type="button"
              className={`region-chip ${region === regionName ? 'region-chip-active' : ''}`}
              onClick={() => setRegion(regionName)}
            >
              {regionName}
            </button>
          ))}
        </div>

        <label className="field sort-field">
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="name">Name</option>
            <option value="population">Population</option>
            <option value="area">Area</option>
          </select>
        </label>
      </section>

      <section className="explore-summary panel">
        <div className="summary-card">
          <span>Total population</span>
          <strong>{formatNumber(worldPopulation)}</strong>
        </div>
        <div className="summary-card">
          <span>Visible results</span>
          <strong>{visibleCountries.length}</strong>
        </div>
        <div className="summary-card">
          <span>Active region</span>
          <strong>{region}</strong>
        </div>
      </section>

      <section className="content-grid">
        <div>
          <div className="section-head">
            <div>
              <p className="eyebrow">Countries</p>
              <h2>Explore the grid</h2>
            </div>
            <span className="stat-chip stat-chip-strong">{visibleCountries.length} visible</span>
          </div>

          {visibleCountries.length === 0 && (
            <div className="empty-state panel">
              <h3>No countries match this view</h3>
              <p>Try a different search term or switch back to All regions.</p>
            </div>
          )}

          <div className="country-grid">
            {visibleCountries.map((country) => (
              <CountryCard key={country.code} country={country} />
            ))}
          </div>
        </div>

        <BucketPanel />
      </section>
    </div>
  );
}

export default ExplorePage;