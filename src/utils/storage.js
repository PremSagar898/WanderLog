export function readJson(key, fallbackValue) {
  try {
    const rawValue = localStorage.getItem(key);
    if (!rawValue) {
      return fallbackValue;
    }

    return JSON.parse(rawValue);
  } catch {
    return fallbackValue;
  }
}

export function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return false;
  }

  return true;
}

export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    return false;
  }

  return true;
}