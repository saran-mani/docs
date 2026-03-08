# Data Flow

## Overview

This document describes the complete data flow, component interactions, and system architecture of the OLO Nextron desktop application. The application is built on **Electron + Next.js (Nextron)** and operates with a hybrid local/cloud data model.

---

## Eye Metrics — Local Data Layer

### Overview

Eye metrics data is captured and stored locally on the user's machine using an **encrypted SQLite database**. This forms the primary offline data layer of the application.

### Initialization

On application startup, an encrypted SQLite database is initialized to store all eye metrics data. The database is set up before any metrics collection begins.

### Data Collection

While the application is running, new eye metrics data is appended to the local encrypted SQLite database at a fixed interval.

| Parameter | Value |
|-----------|-------|
| Write Interval | Every 1 minute |

### Visualization

The SQLite database is the **single source of truth** for the dashboard. All charts, stats, and visual displays in the UI read directly from the local database.

---

## Data Sync — Cloud Synchronization

### Trigger

Data sync is **user-initiated**. The user manually triggers a sync action from the application UI, which invokes backend APIs hosted on AWS Lambda. Sync only proceeds if an active internet connection is detected.

### Sync Flow

| # | Action | Details |
|---|--------|---------|
| 1 | User Initiates Sync | User manually triggers sync from within the application. |
| 2 | Connectivity Check | Application verifies that an internet connection is available. |
| 3 | Push Local → Cloud | Un-synced local SQLite records are pushed to TigerDB via AWS Lambda. |
| 4 | Pull Cloud → Local | Records in TigerDB not present in the local DB are fetched and written to SQLite. |
| 5 | Sync Complete | Both databases are now in a consistent, up-to-date state. |

### Infrastructure

| Component | Value |
|-----------|-------|
| Backend sync logic | AWS Lambda functions |
| Cloud database | TigerDB |
| Condition | Internet connection must be active |

---

## Authentication — Supabase

### Overview

All authentication is fully managed by **Supabase**. The application does not implement custom auth logic — all operations are delegated to Supabase Auth APIs and the Supabase database.

### Supported Operations

| Operation | Description |
|-----------|-------------|
| Sign Up | User registration via Supabase Auth API |
| Login | Session creation; access token issued |
| Forgot Password | Password reset email triggered via Supabase |
| Reset Password | Token-validated password update |
| Delete User | Account removal via Supabase Admin API |
| Profile Data | User metadata read/write via Supabase database |
| Referral Token | Referral tracking stored in Supabase database |

### Session & Token Management

| Parameter | Value |
|-----------|-------|
| Token Storage | Access token stored in both cookie storage and local storage |
| User Metadata | Stored in cookie storage and local storage |
| Access Token Expiry | 7 days |

---

## Gumlet Video Integration

### Overview

Video content is served via **Gumlet**. No Gumlet video data is persisted in any local or cloud database — all video URLs are resolved at runtime.

### Video URL Resolution Flow

| # | Action | Details |
|---|--------|---------|
| 1 | Client Request | The application calls a Supabase Edge Function with the requested playlist identifier. |
| 2 | Edge Function | The Supabase Edge Function makes a server-side API call to Gumlet to retrieve video URLs. |
| 3 | URL Delivery | Gumlet returns the video URLs to the Edge Function, which forwards them to the application. |
| 4 | Playback | The application uses the returned URLs to stream video content directly from Gumlet. |

### Key Design Notes

- No Gumlet data is stored in the application database (local or cloud).
- Video URLs are fetched fresh on each request via the Edge Function.
- Supabase Edge Functions act as a **secure proxy**, keeping Gumlet API credentials server-side.

---

## Auto Updater

### Update Check Trigger

The auto-updater runs a version check on every application launch. Additionally, users can manually trigger the update process at any time.

### Update Source

| Parameter | Value |
|-----------|-------|
| Storage | AWS S3 bucket: `olonextronbuilds` |
| Check Frequency | On every application launch |
| User Control | User can also manually trigger an update check and apply |

---

## Build Distribution

### CI/CD Pipeline

All build and release steps are automated via **GitHub Actions**. On each qualifying commit or tag, the workflow builds both Windows and macOS artifacts and uploads them to the S3 bucket.

### S3 Bucket Structure

Bucket name: `olonextronbuilds`

| S3 Path | Contents |
|---------|----------|
| `olonextronbuilds/releases/staging/latest/win/` | Windows staging builds (`.exe`) |
| `olonextronbuilds/releases/staging/latest/mac/` | Mac staging builds (`.dmg`, `arm64.dmg`) |
| `olonextronbuilds/releases/production/latest/win/` | Windows production builds (`.exe`) |
| `olonextronbuilds/releases/production/latest/mac/` | Mac production builds (`.dmg`, `arm64.dmg`) |

### Build Artifacts

| Platform | Artifact |
|----------|----------|
| Windows | `.exe` installer |
| macOS (Intel) | `.dmg` |
| macOS (Apple Silicon) | `arm64.dmg` |

### Environments

| Environment | Purpose |
|-------------|---------|
| Staging | Internal QA and pre-release validation |
| Production | Public distribution and end-user delivery |
