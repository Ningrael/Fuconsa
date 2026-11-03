import { useState, useEffect, useMemo, useCallback } from 'react';
import { FALLBACK_CATALOG } from '../data/fallbackCatalog.js';
import { normalizeSearchText } from '../utils/formatters.js';
import { getTranslation } from '../i18n/translations.js';

function matchesSearch(item, term, lang) {
  if (!term) return true;
  const normTerm = normalizeSearchText(term);
  const name = normalizeSearchText(getTranslation(item.name, lang));
  const brand = normalizeSearchText(item.brand || '');
  const id = normalizeSearchText(item.id || '');
  const section = normalizeSearchText(item.section || '');
  return name.includes(normTerm) || brand.includes(normTerm) || id.includes(normTerm) || section.includes(normTerm);
}

function filterCatalog(items, filters, lang) {
  const { sector, section, search, onlyWithPhoto } = filters;
  return items.filter((item) => {
    if (sector && item.sector !== sector) return false;
    if (section && item.section !== section) return false;
    if (onlyWithPhoto && !item.hasPhoto) return false;
    return matchesSearch(item, search, lang);
  });
}

function useCatalogFetch() {
  const [catalog, setCatalog] = useState(FALLBACK_CATALOG);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOffline, setIsOffline] = useState(false);

  const fetchCatalog = useCallback(async () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    try {
      const res = await fetch('/api/catalog', { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = data.data || data.items;
      if (Array.isArray(list) && list.length > 0) {
        setCatalog(list);
        setIsOffline(false);
      }
    } catch (err) {
      setError(err.message || 'Error de conexión');
      setIsOffline(true);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  return { catalog, loading, error, isOffline, retry: fetchCatalog };
}

export function useCatalog(lang = 'es') {
  const { catalog, loading, error, isOffline, retry } = useCatalogFetch();
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('');
  const [section, setSection] = useState('');
  const [onlyWithPhoto, setOnlyWithPhoto] = useState(false);

  const sections = useMemo(() => {
    const set = new Set();
    catalog.forEach((item) => {
      if (item.section) set.add(item.section);
    });
    return Array.from(set).sort();
  }, [catalog]);

  const filteredItems = useMemo(() => {
    return filterCatalog(catalog, { sector, section, search, onlyWithPhoto }, lang);
  }, [catalog, sector, section, search, onlyWithPhoto, lang]);

  return {
    items: filteredItems,
    allItems: catalog,
    loading,
    error,
    isOffline,
    retry,
    search,
    setSearch,
    sector,
    setSector,
    section,
    setSection,
    sections,
    onlyWithPhoto,
    setOnlyWithPhoto
  };
}
