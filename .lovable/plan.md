## Switch "Date Added" to use `updated_at` instead of `created_at`

The companies2 table has both `created_at` and `updated_at`. We'll swap the field used for the "Date Added" column (display, sorting, default sort) to `updated_at`. Other tables (e.g. company requests) are unaffected.

### Changes

1. **`src/hooks/useCompanyQuery.ts`**
   - Add `updated_at` to the `.select(...)` list on the `companies2` query (keep or remove `created_at` — we'll keep it harmless, but switch usage).

2. **`src/utils/companyDataUtils.ts`**
   - In `transformCompanyData`, map `created_at: item.updated_at` (so the existing `created_at` field on the `Company` type carries the `updated_at` value), OR add a new `updated_at` field. Cleaner: add `updated_at` and update consumers.
   - Decision: add `updated_at: item.updated_at` and switch consumers to read it.

3. **`src/types/company.ts`**
   - Add `updated_at?: string` to the `Company` type.

4. **`src/components/companies-table/CompaniesTableColumns.tsx`**
   - Change the "Date Added" column:
     - `accessorKey: "updated_at"`
     - `sortingFn` reads `rowA.original.updated_at` / `rowB.original.updated_at`
     - cell reads `row.original.updated_at`

5. **`src/components/CompaniesTable.tsx`**
   - Update `defaultSorting` to `[{ id: "updated_at", desc: true }]` so the table still defaults to newest-first by the new field.

### Out of scope
- `CompanyRequestForm.tsx` and `company-request/RequestsTable.tsx` use `created_at` on a different table (`linkedin_queue` / requests) — left untouched.
- No DB schema changes needed; both columns already exist on `companies2`.