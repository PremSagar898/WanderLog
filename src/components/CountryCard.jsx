import { Link } from 'react-router-dom';
import { useBucketList } from '../context/BucketListContext';
import { formatArea, formatPopulation } from '../utils/format';

function CountryCard({ country }) {
  const { getStatus, markWant, markVisited } = useBucketList();
  const status = getStatus(country.code);

  return (
    <article className="country-card">
      <Link to={`/country/${country.code}`} className="country-flag-link">
        <img src={country.flag} alt={`${country.name} flag`} className="country-flag" />
      </Link>

      <div className="country-card-body">
        <div className="country-card-topline">
          <div>
            <h3>{country.name}</h3>
            <p>{country.capital}</p>
          </div>

          <span className={`status-pill status-${status}`}>{status === 'none' ? 'Open' : status}</span>
        </div>

        <div className="country-metrics">
          <div className="metric-row">
            <span className="metric-icon">📍</span>
            <span>{country.region}</span>
          </div>
          <div className="metric-row">
            <span className="metric-icon">👥</span>
            <span>{formatPopulation(country.population)}</span>
          </div>
          <div className="metric-row">
            <span className="metric-icon">⌁</span>
            <span>{formatArea(country.area)}</span>
          </div>
        </div>

        <div className="country-card-actions">
          <div className="card-action-row">
            <button type="button" className="icon-action icon-heart" onClick={() => markWant(country)} aria-label="Want to visit">
              ♡
            </button>
            <button type="button" className="icon-action icon-check" onClick={() => markVisited(country)} aria-label="Mark visited">
              ✓
            </button>
          </div>
          <Link to={`/country/${country.code}`} className="button button-secondary button-block">
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default CountryCard;