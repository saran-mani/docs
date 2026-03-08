# Page Details

Document each page with behavior, dependencies, and edge cases.

## Template

### Page: `<route>`

- Audience:
- Entry points:
- Primary actions:
- Data dependencies:
- Access rules:
- Loading and empty states:
- Error states:
- Analytics events:
- Related APIs/services:

## Example: Dashboard (`/dashboard`)

- Audience: Authenticated users
- Entry points: Post-login redirect, main navigation
- Primary actions: Review summary cards, quick navigation
- Data dependencies: User summary API, notifications API
- Access rules: Requires valid session token
- Loading and empty states: Skeleton loader, no-data card
- Error states: Retry action with support message
- Analytics events: `dashboard_viewed`, `dashboard_action_clicked`
- Related APIs/services: `GET /api/dashboard`, notifications service
