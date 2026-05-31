/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchCountries } from '../services/countryService';

const CountryContext = createContext(null);

export function CountriesProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCountries = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await fetchCountries();
      setCountries(data);
    } catch (loadError) {
      setError(loadError.message || 'Something went wrong while loading countries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isActive = true;

    const run = async () => {
      try {
        const data = await fetchCountries();
        if (isActive) {
          setCountries(data);
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError.message || 'Something went wrong while loading countries.');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    run();

    return () => {
      isActive = false;
    };
  }, []);

  const countriesByCode = useMemo(() => {
    return new Map(countries.map((country) => [country.code, country]));
  }, [countries]);

  const regions = useMemo(() => {
    return ['All', ...new Set(countries.map((country) => country.region).filter(Boolean))].sort((first, second) => {
      if (first === 'All') {
        return -1;
      }

      if (second === 'All') {
        return 1;
      }

      return first.localeCompare(second);
    });
  }, [countries]);

  const value = useMemo(() => {
    return {
      countries,
      loading,
      error,
      reload: loadCountries,
      regions,
      findCountryByCode: (code) => countriesByCode.get(code?.toUpperCase()),
    };
  }, [countries, loading, error, regions, countriesByCode]);

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export function useCountries() {
  const context = useContext(CountryContext);

  if (!context) {
    throw new Error('useCountries must be used inside CountriesProvider');
  }

  return context;
}