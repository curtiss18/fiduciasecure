# FiduciaSecure Quick Reference

## Project Location
```
C:\Users\curti\OneDrive\Desktop\WebDev\fiduciasecure
```

## Quick Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## Key Files to Reference
- `CONTEXT_PROMPT.md` - Claude session starter prompt (copy/paste for new sessions)
- `PROJECT_DOCUMENTATION.md` - Comprehensive project overview
- `CURRENT_DATABASE_SCHEMA.sql` - Current database state
- `src/types/database.types.ts` - TypeScript type definitions
- `migrations/` - All database migrations

## Supabase Dashboard Areas
1. **SQL Editor** - Run migrations
2. **Table Editor** - View/edit data
3. **Authentication** - User management
4. **Database** - RLS policies

## Current Working Areas
- ✅ Authentication system (complete)
- ✅ Representatives with independence support (complete)
- ✅ Advisors table for optional firm entities (complete)
- ✅ Dashboard with adaptive UI (complete)
- ✅ UI component library (foundational components done)
- 🔲 Clients table implementation (needs update for representative_id)
- 🔲 Contact management for clients
- 🔲 Client onboarding forms
- 🔲 Document upload system
- 🔲 Compliance tracking
- 🔲 Reporting and analytics

## Design Decisions Summary
1. **Database**: Representatives are primary users, advisors are optional
2. **Independence**: Representatives can work independently or with advisory firms
3. **Security**: RLS on all tables, encryption for PII
4. **UI**: Adaptive components, "Practice" vs "Firm" terminology
5. **Forms**: UI layer only, data goes to proper tables
6. **Compliance**: Built for SOC 2, SEC/FINRA requirements

## When Starting New Conversation
1. Copy/paste the entire content from `CONTEXT_PROMPT.md`
2. Mention current working area
3. Reference any specific files if needed
4. Specify what feature to work on next