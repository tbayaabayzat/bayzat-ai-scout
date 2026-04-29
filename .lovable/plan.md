Root cause found: the Supabase query is returning `created_at`, but `transformCompanyData()` drops that field when converting raw `companies2` rows into the app's `Company` objects. The table is rendering `row.original.created_at`, so it receives `undefined` for every transformed row.

Plan:

1. Preserve `created_at` during company transformation
   - Update `src/utils/companyDataUtils.ts` so `transformCompanyData()` includes:
     - `created_at: item.created_at`
   - This will make the already-fetched `companies2.created_at` value available to the table.

2. Keep the Date Added column as the first column
   - Leave `src/components/companies-table/CompaniesTableColumns.tsx` with `created_at` first.
   - Keep the current fallback (`—`) only for genuinely missing or invalid dates.
   - Keep custom timestamp sorting.

3. Force the data cache to refresh cleanly
   - Update the companies React Query cache key version in `src/hooks/useCompanyQuery.ts` from the current version to a new one, so users do not keep seeing transformed cached rows that were created before `created_at` was preserved.

Expected result:
- The first column will display dates from `companies2.created_at`, e.g. `Sep 9, 2025`.
- Sorting the Date Added column will use the actual timestamp.
- Blank cells will only appear if a row truly has no valid `created_at` value.