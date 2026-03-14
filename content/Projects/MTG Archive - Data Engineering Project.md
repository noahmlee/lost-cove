---
tags:
  - project
  - computer-science
  - data-engineering
  - backend
  - MySQL
  - python
  - docker
  - aws
draft: true
title: MTG Archive
---
# MTG Archive
This was a project I started to sharpen my data engineering skills while also building something I could actually put in front of people. The premise is simple: pull every Magic: The Gathering card and its daily pricing data from the internet, store it in a database, and serve it through a dashboard where you can search cards and track prices.

## What is Magic: The Gathering?
Magic: The Gathering is a trading card game that has been around since 1993. It has a massive secondary market where individual cards can range in value from a few cents to thousands of dollars. The most expensive card I track, a Mox Emerald, sits at around $3,600. With over 100,000 unique printings across 855 sets, it's a surprisingly rich dataset to work with.

## Why build this?
I wanted a project that touched every layer of a real data pipeline: ingestion, storage, transformation, API serving, and a frontend to display it all. Most tutorial projects stop at "get data and put it in a database." I wanted to go further and actually deploy something that runs on a schedule, updates itself daily, and is accessible to anyone on the internet.

I also just think the MTG market is genuinely interesting data.

## The Stack
The project runs as four Docker containers orchestrated with Docker Compose:

- **MySQL** - stores cards, sets, daily prices, and market stats
- **Ingester** - a Python service that seeds the database and runs nightly pipelines
- **FastAPI** - a REST API that serves the data
- **React + Nginx** - the frontend, served behind an Nginx reverse proxy

Everything is deployed to an AWS EC2 instance behind Cloudflare, with a GitHub Actions CI/CD pipeline that automatically deploys on every push to main.

## The Data
The data comes from MTGJSON, a community-maintained project that aggregates Magic card data and pricing from TCGPlayer. There are two data sources:

- `AllPrintings.json` - a one-time seed file containing every card ever printed, about 300MB
- `AllPricesToday.json` - a daily snapshot of current prices

## The Ingester
This was the most interesting part of the project to build. The ingester is a Python service with three pipelines:

_Seed pipeline_ - Downloads and processes AllPrintings.json to populate the cards and sets tables. The first version of this used Python's standard `json.load()` to parse the file, which tried to load the entire 300MB into memory at once. On the AWS t3.micro instance I deployed to, this crashed the container every time. The fix was switching to `ijson`, a streaming JSON parser that processes one set at a time rather than loading everything into memory. That brought peak memory usage from several gigabytes down to essentially flat throughout the entire load.

_Daily price pipeline_ - Runs every night at 12:05 AM and fetches the latest prices. It processes around 143,000 price records per run and uses MySQL's `ON DUPLICATE KEY UPDATE` for upserts, which makes the pipeline idempotent, meaning it's safe to run multiple times without creating duplicate rows.

_Stats pipeline_ - After prices are loaded it runs a series of SQL aggregate queries to compile a daily market report. Things like the most expensive card, average price by color identity, average price by rarity, and average price by mana cost. I made a deliberate choice to do these aggregations in SQL rather than Python. It's just more efficient to let the database do what it's designed for than to pull hundreds of thousands of rows into memory and crunch them there.

## The API
The API is built with FastAPI, which I chose mainly because it auto-generates interactive documentation at `/docs`, really useful during development for testing endpoints without a separate tool. There are five endpoints covering card search, card detail with latest price, price history, and daily stats.

One thing I learned the hard way here is that `LEFT JOIN` matters. The card detail endpoint joins the cards table to the prices table to fetch the latest price. Using an `INNER JOIN` would silently exclude cards with no price data. The `LEFT JOIN` means every card returns regardless, with null price fields that the API handles gracefully.

## The Frontend
The frontend is React with a deliberately minimal dependency footprint, just Axios for API calls and no UI library. I wanted to style it myself. I went with a dark fantasy aesthetic using the Cinzel and Crimson Pro typefaces with gold accents, which felt appropriate for a Magic the Gathering app. The search bar debounces at 300ms so the API isn't hammered on every keystroke, and price history is cached in state so clicking the same card twice doesn't re-fetch.

## Deployment
The whole stack runs on a single AWS EC2 t3.micro instance. The frontend is served by Nginx which also acts as a reverse proxy, meaning all API calls go through `/api` on port 80 rather than hitting FastAPI directly on port 8000. Cloudflare sits in front of everything handling SSL termination and CDN caching for static assets.

The CI/CD pipeline is a GitHub Actions workflow that SSHs into the EC2 instance, pulls the latest code, rebuilds changed Docker images, and prunes old ones to keep disk usage in check. Push to main, done.

## What I'd do differently
A few things I'd change if I started over. I'd add Pydantic response models to the API endpoints from the start rather than returning raw dictionaries. I'd use AWS Secrets Manager instead of a `.env` file for credentials. And I'd write integration tests for the pipelines early, since I caught a few bugs through manual testing that proper tests would have flagged immediately.

That said, the project does what I set out for it to do. It runs on a schedule, updates itself, and is live at [mtga.noahlee.dev](https://mtga.noahlee.dev).