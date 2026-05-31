import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useBucketList } from '../context/BucketListContext';
import { useCountries } from '../context/CountryContext';
import { fetchCountryByCode } from '../services/countryService';
import { formatArea, formatPopulation, joinList } from '../utils/format';

function CountryDetailPage() {
  const { code } = useParams();
  const { findCountryByCode, loading, error, reload } = useCountries();
  const { getStatus, markWant, markVisited } = useBucketList();
  const navigate = useNavigate();
  const [country, setCountry] = useState(() => findCountryByCode(code) || null);
  const [detailLoading, setDetailLoading] = useState(true);
  const [detailError, setDetailError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadCountry = async () => {
      setDetailLoading(true);
      setDetailError('');

      try {
        const detail = await fetchCountryByCode(code);

        if (isActive) {
          setCountry(detail);
        }
      } catch (loadError) {
        if (isActive) {
          setDetailError(loadError.message || 'Country detail could not be loaded right now.');
        }
      } finally {
        if (isActive) {
          setDetailLoading(false);
        }
      }
    };

    loadCountry();

    return () => {
      isActive = false;
    };
  }, [code]);

  if (loading) {
    return (
      <div className="screen-center">
        <div className="status-card">Loading country detail...</div>
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

  if (detailLoading) {
    return (
      <div className="screen-center">
        <div className="status-card">Loading country detail...</div>
      </div>
    );
  }

  if (detailError) {
    return (
      <div className="screen-center">
        <div className="status-card">
          <p>{detailError}</p>
          <button type="button" className="button button-primary" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="screen-center">
        <div className="status-card">
          <p>Country not found.</p>
          <button type="button" className="button button-primary" onClick={() => navigate('/explore', { replace: true })}>
            Back to explore
          </button>
        </div>
      </div>
    );
  }

  const status = getStatus(country.code);

  return (
    <div className="detail-page">
      <button type="button" className="back-link" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/explore', { replace: true }))}>
        ← Back
      </button>

      <section className="detail-hero panel">
        <div className="detail-flag-wrap">
          <img src={country.flag} alt={`${country.name} flag`} className="detail-flag" />
        </div>

        <div className="detail-copy">
          <h1>{country.name}</h1>
          <p className="detail-location">{country.capital}</p>

          <div className="detail-card-grid">
            <div className="detail-stat-card">
              <span>Capital</span>
              <strong>{country.capital}</strong>
            </div>
            <div className="detail-stat-card">
              <span>Population</span>
              <strong>{formatPopulation(country.population)}</strong>
            </div>
            <div className="detail-stat-card">
              <span>Languages</span>
              <strong>{joinList(country.languages)}</strong>
            </div>
            <div className="detail-stat-card">
              <span>Time zone</span>
              <strong>{country.timezones[0] || 'Not listed'}</strong>
            </div>
            <div className="detail-stat-card">
              <span>Currencies</span>
              <strong>{joinList(country.currencies)}</strong>
            </div>
            <div className="detail-stat-card">
              <span>Region</span>
              <strong>{country.region}</strong>
            </div>
          </div>

          <div className="detail-actions">
            <span className={`status-pill status-${status}`}>{status === 'none' ? 'Open' : status}</span>
            <button type="button" className="button button-secondary button-block" onClick={() => markWant(country)}>
              Add to Bucket List
            </button>
            <button type="button" className="button button-primary button-block" onClick={() => markVisited(country)}>
              Mark as Visited
            </button>
          </div>
        </div>
      </section>

      <section className="detail-grid">
        <div className="info-card panel">
          <h2>Country info</h2>
          <div className="info-list">
            <div>
              <span>Region</span>
              <strong>{country.region}</strong>
            </div>
            <div>
              <span>Subregion</span>
              <strong>{country.subregion}</strong>
            </div>
            <div>
              <span>Continent</span>
              <strong>{country.continent}</strong>
            </div>
            <div>
              <span>Area</span>
              <strong>{formatArea(country.area)}</strong>
            </div>
          </div>
        </div>

        <div className="info-card panel">
          <h2>Nearby details</h2>
          <div className="info-list">
            <div>
              <span>Currencies</span>
              <strong>{joinList(country.currencies)}</strong>
            </div>
            <div>
              <span>Top level domains</span>
              <strong>{joinList(country.topLevelDomains)}</strong>
            </div>
            <div>
              <span>Borders</span>
              <strong>{country.borders.length ? country.borders.join(', ') : 'No border countries'}</strong>
            </div>
            <div>
              <span>Code</span>
              <strong>{country.code}</strong>
            </div>
          </div>
        </div>

        <div className="info-card panel wide-card">
          <h2>More details</h2>
          <div className="info-list three-col">
            <div>
              <span>Independent</span>
              <strong>{country.independent ? 'Yes' : 'No'}</strong>
            </div>
            <div>
              <span>Landlocked</span>
              <strong>{country.landlocked ? 'Yes' : 'No'}</strong>
            </div>
            <div>
              <span>Official name</span>
              <strong>{country.officialName}</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CountryDetailPage;