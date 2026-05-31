/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { getCountrySummary } from '../utils/format';
import { readJson, writeJson } from '../utils/storage';

const BucketListContext = createContext(null);

const emptyLists = {
  want: [],
  visited: [],
};

function uniqueByCode(items) {
  const seen = new Set();

  return items.filter((item) => {
    if (!item?.code || seen.has(item.code)) {
      return false;
    }

    seen.add(item.code);
    return true;
  });
}

function addOrReplace(items, country) {
  const nextItems = items.filter((item) => item.code !== country.code);
  nextItems.unshift(country);
  return uniqueByCode(nextItems);
}

export function BucketListProvider({ children, storageKey }) {
  const [lists, setLists] = useState(() => {
    if (!storageKey) {
      return emptyLists;
    }

    const storedLists = readJson(storageKey, emptyLists);

    return {
      want: uniqueByCode(storedLists.want || []),
      visited: uniqueByCode(storedLists.visited || []),
    };
  });

  const updateLists = (updater) => {
    if (!storageKey) {
      return;
    }

    setLists((currentLists) => {
      const nextLists = updater(currentLists);
      writeJson(storageKey, nextLists);
      return nextLists;
    });
  };

  const markWant = (country) => {
    const summary = getCountrySummary(country);

    updateLists((currentLists) => ({
      want: addOrReplace(currentLists.want, summary),
      visited: currentLists.visited.filter((item) => item.code !== summary.code),
    }));
  };

  const markVisited = (country) => {
    const summary = getCountrySummary(country);

    updateLists((currentLists) => ({
      want: currentLists.want.filter((item) => item.code !== summary.code),
      visited: addOrReplace(currentLists.visited, summary),
    }));
  };

  const removeFromList = (listName, code) => {
    updateLists((currentLists) => ({
      ...currentLists,
      [listName]: currentLists[listName].filter((item) => item.code !== code),
    }));
  };

  const clearList = (listName) => {
    updateLists((currentLists) => ({
      ...currentLists,
      [listName]: [],
    }));
  };

  const getStatus = (code) => {
    if (lists.visited.some((item) => item.code === code)) {
      return 'visited';
    }

    if (lists.want.some((item) => item.code === code)) {
      return 'want';
    }

    return 'none';
  };

  return (
    <BucketListContext.Provider
      value={{
        wantList: lists.want,
        visitedList: lists.visited,
        wantCount: lists.want.length,
        visitedCount: lists.visited.length,
        totalCount: lists.want.length + lists.visited.length,
        markWant,
        markVisited,
        removeFromList,
        clearList,
        getStatus,
      }}
    >
      {children}
    </BucketListContext.Provider>
  );
}

export function useBucketList() {
  const context = useContext(BucketListContext);

  if (!context) {
    throw new Error('useBucketList must be used inside BucketListProvider');
  }

  return context;
}