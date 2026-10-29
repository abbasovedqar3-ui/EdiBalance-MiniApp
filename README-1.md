# EdiBalance Mini App

This repository hosts the static frontend for the EdiBalance Telegram Mini App.

## Current status

- `index.html` is the V9.11-style standalone interface prototype.
- The current HTML does **not** yet include Telegram WebApp authentication or calls to the Python backend API.
- Some screens/actions may be demonstration-only until backend integration is completed.

## Deployment

GitHub Pages can publish the static frontend over HTTPS. It does not run the Python bot or backend.

## Before production

1. Add Telegram WebApp SDK integration and send `Telegram.WebApp.initData` to the backend for validation.
2. Configure the public HTTPS backend API URL in the frontend (do not put the bot token in frontend files).
3. Connect real profile, trades, statistics, risk manager, EDI365, rankings, plans, and payment flows to backend endpoints.
4. Host the Python backend and database separately; use PostgreSQL for production.
5. Test the Mini App with two Telegram accounts, including real Telegram Stars payments/refunds where applicable.

Never commit bot tokens, API keys, database files, or private user data to this public repository.
