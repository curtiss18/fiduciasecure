# Documentation Maintenance Guide

## Automatic Reminders System

### 1. In Your Context Prompt
The updated prompt now includes:
- Reminder to update documentation after changes
- Request for session summary
- List of key files to maintain

### 2. Documentation Update Triggers

**Update PROJECT_DOCUMENTATION.md when:**
- New features are implemented
- Database schema changes
- Architecture decisions are made
- Security measures are added
- New UI components are created

**Update CURRENT_DATABASE_SCHEMA.sql when:**
- New tables are created
- Columns are added/modified
- Indexes are created
- RLS policies change
- Functions/triggers are added

**Update database.types.ts when:**
- Database schema changes
- New enums are added
- Interface properties change

**Update QUICK_REFERENCE.md when:**
- Progress on features changes
- New commands are needed
- Key decisions are made

### 3. Best Practices

1. **End of Session**: Always ask for a documentation summary
   ```
   "Please provide a documentation update summary for this session"
   ```

2. **Major Changes**: Update docs immediately after:
   - Creating new tables
   - Adding major features
   - Changing architecture

3. **Version Tracking**: Add version comments
   ```typescript
   // v1.2.0 - Added clients table support
   ```

### 4. Quick Documentation Commands

You can ask me to:
- "Update docs with the clients table we just created"
- "Generate a migration summary for documentation"
- "Create a session summary with all changes"
- "Check what documentation needs updating"

### 5. Documentation Health Check

Periodically ask:
- "Are the docs up to date with current implementation?"
- "What documentation might be out of sync?"
- "Review PROJECT_DOCUMENTATION.md against current code"

## Sample End-of-Session Request

```
We've finished working on [feature]. Please:
1. Provide a session summary
2. List all documentation that needs updating
3. Update PROJECT_DOCUMENTATION.md with our changes
4. Update CURRENT_DATABASE_SCHEMA.sql if needed
5. Check if QUICK_REFERENCE.md needs updates
```

This ensures documentation stays current and useful!