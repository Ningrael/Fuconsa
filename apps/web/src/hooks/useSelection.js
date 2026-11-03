import { useState, useCallback } from 'react';

export function useSelection() {
  const [selectedItems, setSelectedItems] = useState([]);

  const isSelected = useCallback(
    (id) => selectedItems.some((item) => item.id === id),
    [selectedItems]
  );

  const toggleItem = useCallback((item) => {
    setSelectedItems((prev) => {
      const exists = prev.some((it) => it.id === item.id);
      if (exists) {
        return prev.filter((it) => it.id !== item.id);
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setSelectedItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedItems([]);
  }, []);

  return {
    selectedItems,
    count: selectedItems.length,
    isSelected,
    toggleItem,
    removeItem,
    clearSelection
  };
}
