import { Link } from 'react-router-dom';
import { useBucketList } from '../context/BucketListContext';
import { formatPopulation } from '../utils/format';

function BucketPanel() {
  const { wantList, visitedList, wantCount, visitedCount, totalCount, removeFromList, clearList } = useBucketList();

  return (
    <aside className="bucket-panel panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Bucket list</p>
          <h2>Places you are tracking</h2>
        </div>
        <span className="stat-chip stat-chip-strong">{totalCount} saved</span>
      </div>

      <div className="bucket-stats">
        <div>
          <strong>{wantCount}</strong>
          <span>Want to visit</span>
        </div>
        <div>
          <strong>{visitedCount}</strong>
          <span>Visited</span>
        </div>
      </div>

      <section className="bucket-section">
        <div className="bucket-section-head">
          <h3>Want to visit</h3>
          <button type="button" className="text-button" onClick={() => clearList('want')}>
            Clear
          </button>
        </div>

        {wantList.length === 0 ? (
          <p className="empty-note">No countries in your wish list yet. Add one from the grid.</p>
        ) : (
          <div className="bucket-list">
            {wantList.map((country) => (
              <div key={country.code} className="bucket-item">
                <div>
                  <Link to={`/country/${country.code}`}>{country.name}</Link>
                  <span>{country.region}</span>
                </div>
                <div className="bucket-item-meta">
                  <span>{formatPopulation(country.population)}</span>
                  <button type="button" className="text-button" onClick={() => removeFromList('want', country.code)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bucket-section bucket-summary-note">
        <p className="bucket-note-label">World coverage</p>
        <strong>{wantCount + visitedCount} countries saved</strong>
        <span>Track places you want to see and the ones you already visited.</span>
      </section>

      <section className="bucket-section">
        <div className="bucket-section-head">
          <h3>Visited</h3>
          <button type="button" className="text-button" onClick={() => clearList('visited')}>
            Clear
          </button>
        </div>

        {visitedList.length === 0 ? (
          <p className="empty-note">Keep track of places you have already been.</p>
        ) : (
          <div className="bucket-list">
            {visitedList.map((country) => (
              <div key={country.code} className="bucket-item">
                <div>
                  <Link to={`/country/${country.code}`}>{country.name}</Link>
                  <span>{country.region}</span>
                </div>
                <div className="bucket-item-meta">
                  <span>{formatPopulation(country.population)}</span>
                  <button type="button" className="text-button" onClick={() => removeFromList('visited', country.code)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </aside>
  );
}

export default BucketPanel;