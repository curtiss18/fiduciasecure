# Registration States Update

## Changes Made

### 1. Database Schema Update
- Changed from `registration_state` (single string) to `registration_states` (array of strings)
- Advisors can now be registered in multiple states
- Added GIN index for performance on array queries

### 2. UI Components
- Created a new `MultiSelect` component for selecting multiple states
- Includes "Select All/Clear All" functionality
- Shows count of selected states
- Scrollable list with checkboxes

### 3. Profile Form Updates
- Replaced single state dropdown with multi-select component
- Form now properly handles array of states
- Dashboard displays comma-separated list of states

## Migration Instructions

### Option 1: Fresh Database (Recommended for Development)
Run the full migration in `registration-states-migration.sql`:
```sql
-- This will:
-- 1. Add the new registration_states column
-- 2. Migrate existing data
-- 3. Drop the old registration_state column
-- 4. Add constraints and indexes
```

### Option 2: Safe Migration (For Existing Data)
Run the safe migration in `migrations/safe-registration-states.sql`:
```sql
-- This will:
-- 1. Add the new column without dropping the old one
-- 2. Copy existing data to the new column
-- 3. Create indexes
-- You can drop the old column later when ready
```

## Temporary Compatibility
The code includes a compatibility layer in `useAdvisorProfile.ts` that handles both column names during the transition period. This can be removed after the migration is complete.

## Testing
1. Run the appropriate migration
2. Edit your profile and select multiple states
3. Verify states are saved and displayed correctly
4. Check that existing single state data is preserved