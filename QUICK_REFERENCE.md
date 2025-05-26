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
- ✅ Advisor profiles with multi-state registration (complete)
- ✅ Dashboard and profile editing (complete)
- ✅ UI component library (foundational components done)
- 🔲 Clients table and management
- 🔲 Contact management for clients
- 🔲 Client onboarding forms
- 🔲 Document upload system
- 🔲 Compliance tracking
- 🔲 Reporting and analytics

## Design Decisions Summary
1. **Database**: Normalized structure, no JSON form storage
2. **Security**: RLS on all tables, encryption for PII
3. **UI**: Reusable components, Tailwind CSS
4. **Forms**: UI layer only, data goes to proper tables
5. **Compliance**: Built for SOC 2, SEC/FINRA requirements

## When Starting New Conversation
1. Copy/paste the entire content from `CONTEXT_PROMPT.md`
2. Mention current working area
3. Reference any specific files if needed
4. Specify what feature to work on next