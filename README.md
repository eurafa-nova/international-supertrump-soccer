# International Superstar Soccer — Player Cards

This project was created by a super fan of the SNES game International Superstar Soccer! This has been an old idea that was finally implemented.

![Galfano (ITA-10)](screenshot.png)

Check it out live: [https://international-supertrump-soccer.vercel.app/](https://international-supertrump-soccer.vercel.app/)

## Prerequisites
- Node.js 18 or later

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Contributing
For graphics (player images), designers can create or edit PNGs in `src/data/player-images/`! Player images should follow the naming pattern: `{nationalityShort}{number}-{id}.png` (e.g. `arg1-garcia.png`). If a custom image doesn't exist, `player.png` will be used as a fallback.

For code improvements, raise a PR!
