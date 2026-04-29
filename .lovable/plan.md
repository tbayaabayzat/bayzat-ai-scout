## Goal
Make the companies table default-sort by Date Added, newest first.

## Change
In `src/components/CompaniesTable.tsx`:
- Initialize sorting state to `[{ id: "created_at", desc: true }]` instead of `[]`.
- Update the filter-change reset effect to reset back to that same default (not `[]`), so toggling semantic search keeps the newest-first default.

No column or data changes needed — `created_at` column already exists with a timestamp-based `sortingFn`.

## Result
- On page load, rows display newest `created_at` first.
- Date Added column shows the descending sort indicator by default.
- Users can still click headers to change sort; clearing/applying semantic filter returns to the newest-first default.