# Documentation Update Checklist

## After Each Work Session

### Database Changes
- [ ] Updated CURRENT_DATABASE_SCHEMA.sql with new tables/columns?
- [ ] Updated database.types.ts with TypeScript types?
- [ ] Created migration file in migrations/ folder?
- [ ] Updated PROJECT_DOCUMENTATION.md database section?

### New Features
- [ ] Added feature to PROJECT_DOCUMENTATION.md "Key Features Implemented"?
- [ ] Updated QUICK_REFERENCE.md progress checklist?
- [ ] Documented any new UI components?
- [ ] Added new routes/pages to file structure?

### Code Changes
- [ ] Updated file structure in documentation if needed?
- [ ] Documented new hooks or utilities?
- [ ] Updated "Next Implementation Priorities" if completed items?
- [ ] Added any new environment variables?

### Architecture Decisions
- [ ] Documented any new patterns or decisions?
- [ ] Updated security considerations if applicable?
- [ ] Added new compliance requirements?
- [ ] Noted any technical debt or TODOs?

## End of Session Summary Template

```markdown
## Session Summary - [DATE]

### Changes Made:
1. [List major changes]

### Documentation Updates Needed:
- [ ] PROJECT_DOCUMENTATION.md: [what sections]
- [ ] CURRENT_DATABASE_SCHEMA.sql: [what tables/changes]
- [ ] database.types.ts: [what types]
- [ ] QUICK_REFERENCE.md: [what updates]

### New Files Created:
- [List any new important files]

### Next Session Priority:
- [What to work on next]
```

## Quick Update Commands

When updating documentation, you can ask:
- "Update PROJECT_DOCUMENTATION.md with the new clients table"
- "Add the latest migration to CURRENT_DATABASE_SCHEMA.sql"
- "Update the progress checklist in QUICK_REFERENCE.md"
- "Generate a session summary for documentation updates"

## Versioning Strategy

Consider adding version comments to track major changes:
```sql
-- v1.1.0 - Added registration_states array support
-- v1.0.0 - Initial advisor_profiles implementation
```

```typescript
// v1.1.0 - Added registration_states array
export interface AdvisorProfile {
  // ...
}
```