# Calendar with Electron

![Lucky - Electron Calendar](https://s11.gifyu.com/images/SccJD.gif "Demo")

## What can you do?
- Add Event
- Update Event
- Delete Event
- Import iCalendar (ics) - sample ics file: [F1 Program 2023](https://github.com/LuckyMarty/lc_electron_calendar/blob/main/F1_Schedule.ics)
- Export as iCalendar (ics)

## Configurations

```bash
path: src/back/utils.ts
```
- Database
- DevTools

## Before launch

1. Install all dependency

```bash
  npm install
```

2. Generate Back-End files

```bash
  npm run build:back
```

3. Generate Front-End files

```bash
  npm run build:front
```

4. Download [Database Model](https://github.com/LuckyMarty/lc_electron_calendar/blob/main/electron_calendar.sql) and import it

## Launch

```bash
  npm start
```