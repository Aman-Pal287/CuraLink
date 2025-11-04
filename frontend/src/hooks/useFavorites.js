import { useEffect, useState } from "react";

const KEY = "medlink:favorites"; // { pubs:[], trials:[], experts:[] }

export default function useFavorites() {
  const [favorites, setFavorites] = useState({
    pubs: [],
    trials: [],
    experts: [],
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggle = (type, item) => {
    setFavorites((prev) => {
      const arr = prev[type] || [];
      const exists = arr.find((x) => x._id === item._id);
      const next = exists
        ? arr.filter((x) => x._id !== item._id)
        : [...arr, item];
      return { ...prev, [type]: next };
    });
  };

  const isSaved = (type, id) => {
    const arr = favorites[type] || [];
    return !!arr.find((x) => x._id === id);
  };

  return { favorites, toggle, isSaved };
}
