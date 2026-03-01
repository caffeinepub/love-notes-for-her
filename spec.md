# Love Notes for Her (Aarna)

## Current State
- 8 daily love notes stored in Motoko backend with hardcoded generic content
- Notes unlock based on days since first visit (day 1 = first visit, day 2 = 24hrs later, etc.)
- Frontend shows notes grid with envelope-style cards; locked notes show a wax seal
- Header says "A Note for Every Day" with generic subtitle

## Requested Changes (Diff)

### Add
- Aarna's name in the header subtitle and throughout note content
- Cute nicknames ("meri jaan", "my baby", "my love", "baby") woven naturally into note bodies
- Her name ("Aarna") used in note titles and bodies

### Modify
- All 8 note titles and bodies: personalised with Aarna's name and sweet nicknames
- Header subtitle to address Aarna by name
- Unlock logic: each note (2–8) unlocks exactly 24 hours after the FIRST note was opened (i.e. note N unlocks at (N-1) * 24hrs after startDate). Note 1 is always unlocked once visited.
- Locked card text: show how many hours remain until unlock (not just days)

### Remove
- Generic/placeholder note content

## Implementation Plan
1. Regenerate Motoko backend with:
   - Updated note content (titles + bodies with Aarna's name and nicknames)
   - Updated getNotes() unlock logic: note at index i is unlocked if currentTime >= startDate + i * 24hrs
2. Update frontend App.tsx:
   - Header: add "for Aarna" or similar personalised subtitle addressing her by name
   - Locked card: show hours remaining until next unlock (e.g. "Unlocks in 14 hours")
   - Note modal footer: change "with all my love" to something personalised
