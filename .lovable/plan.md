## Goal
Make the "Date Added" column on the Companies table the first column and ensure dates actually render.

## Source field
The column reads `created_at` from the `companies2` table. Verified in the database: all 6,264 rows have a populated `created_at` timestamp (e.g., `2026-04-27 18:06:59+00`), and the column is already included in the `useCompanyQuery` select list.

## Why it appears blank
The current cell calls `row.getValue("created_at")`, but the column was placed at the end and the cell renders `null` when the value is falsy with no fallback. Combined with potential stale React Query cache, nothing visible is shown. We'll read from `row.original.created_at` directly, validate the parsed Date, and show a `—` placeholder if missing/invalid so the column is never silently empty.

## Changes

1. `src/components/companies-table/CompaniesTableColumns.tsx`
   - Move the `created_at` column definition to the top of the returned array so it renders as the first column.
   - Remove the duplicate definition from its current position (just before `systems`).
   - Read the value from `row.original.created_at` (more reliable than `getValue` for accessor keys with custom rendering).
   - Add a `—` fallback when value is missing or `new Date(value)` is invalid.
   - Add `whitespace-nowrap` so the date doesn't wrap awkwardly in the narrow column.
   - Replace the built-in `"datetime"` sortingFn with a custom comparator that converts to `getTime()` numbers, since values come from the API as ISO strings, not Date objects.

2. No DB migration needed — `created_at` already exists and is populated.

3. No changes to `src/types/company.ts` or `src/hooks/useCompanyQuery.ts` (already include `created_at`).

## Result
- "Date Added" becomes the leftmost column on the Companies table.
- Sorting by clicking the header sorts chronologically (ascending/descending).
- Dates display as e.g. "Apr 27, 2026".
