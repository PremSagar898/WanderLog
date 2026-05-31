const numberFormatter = new Intl.NumberFormat('en-US');

export function formatNumber(value) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '—';
  }

  return numberFormatter.format(Number(value));
}

export function formatPopulation(value) {
  return `${formatNumber(value)} people`;
}

export function formatArea(value) {
  return `${formatNumber(value)} km²`;
}

export function joinList(values) {
  if (!values || values.length === 0) {
    return '—';
  }

  return values.join(', ');
}

export function getCountrySummary(country) {
  return {
    code: country.code,
    name: country.name,
    flag: country.flag,
    region: country.region,
    population: country.population,
    area: country.area,
  };
}