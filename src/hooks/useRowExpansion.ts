
import { useState, useMemo } from 'react'

export function useRowExpansion<T>(items: T[], itemsPerRow: number = 2) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  // Group items into rows
  const rows = useMemo(() => {
    const grouped: T[][] = []
    for (let i = 0; i < items.length; i += itemsPerRow) {
      grouped.push(items.slice(i, i + itemsPerRow))
    }
    return grouped
  }, [items, itemsPerRow])

  // Get row index for a specific item
  const getRowIndex = (itemIndex: number) => Math.floor(itemIndex / itemsPerRow)

  // Check if an item is expanded (based on its row)
  const isItemExpanded = (itemIndex: number) => {
    const rowIndex = getRowIndex(itemIndex)
    return expandedRows.has(rowIndex)
  }

  // Toggle expansion for an entire row
  const toggleRow = (itemIndex: number) => {
    const rowIndex = getRowIndex(itemIndex)
    setExpandedRows(prev => {
      const newSet = new Set(prev)
      if (newSet.has(rowIndex)) {
        newSet.delete(rowIndex)
      } else {
        newSet.add(rowIndex)
      }
      return newSet
    })
  }

  return {
    rows,
    isItemExpanded,
    toggleRow,
    expandedRows: Array.from(expandedRows)
  }
}
