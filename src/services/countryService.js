const COUNTRY_FIELDS = [
  'cca3',
  'name',
  'capital',
  'region',
  'subregion',
  'population',
  'area',
  'flags',
  'continents',
  'languages',
].join(',');

const COUNTRY_ENDPOINT = `https://restcountries.com/v3.1/all?fields=${COUNTRY_FIELDS}`;
const COUNTRY_DETAIL_ENDPOINT = 'https://restcountries.com/v3.1/alpha';

function toTextList(value) {
  return Object.values(value || {}).filter(Boolean);
}

export function normalizeCountry(country) {
  return {
    code: country.cca3,
    name: country.name?.common || 'Unknown country',
    officialName: country.name?.official || country.name?.common || 'Unknown country',
    capital: country.capital?.[0] || 'Not listed',
    region: country.region || 'Other',
    subregion: country.subregion || 'Not listed',
    population: country.population || 0,
    area: country.area || 0,
    flag: country.flags?.svg || country.flags?.png || '',
    continent: country.continents?.[0] || 'Unknown',
    languages: toTextList(country.languages),
    currencies: Object.values(country.currencies || {})
      .map((currency) => {
        if (currency.name && currency.symbol) {
          return `${currency.name} (${currency.symbol})`;
        }

        return currency.name || currency.symbol || '';
      })
      .filter(Boolean),
    timezones: country.timezones || [],
    borders: country.borders || [],
    topLevelDomains: country.tld || [],
    independent: Boolean(country.independent),
    landlocked: Boolean(country.landlocked),
  };
}

export async function fetchCountries() {
  const response = await fetch(COUNTRY_ENDPOINT);

  if (!response.ok) {
    throw new Error('Country data could not be loaded right now.');
  }

  const data = await response.json();

  return data.map(normalizeCountry).sort((firstCountry, secondCountry) => {
    return firstCountry.name.localeCompare(secondCountry.name);
  });
}

export async function fetchCountryByCode(code) {
  const response = await fetch(`${COUNTRY_DETAIL_ENDPOINT}/${code}`);

  if (!response.ok) {
    throw new Error('Country detail could not be loaded right now.');
  }

  const data = await response.json();
  const country = Array.isArray(data) ? data[0] : data;

  return normalizeCountry(country);
}