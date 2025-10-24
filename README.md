# Quit Quest RPG

A gamified quit-smoking application that turns your journey to quit smoking into an epic RPG adventure!

## Description

Quit Quest RPG is a web-based React application that helps users quit smoking by gamifying the experience. Track your progress, battle cravings, unlock story chapters, earn achievements, and watch your health improve day by day.

## Features

- **Character Creation**: Choose your hero name and class (Warrior, Mage, or Rogue)
- **Progress Tracking**: Track days smoke-free, money saved, and cigarettes avoided
- **Story System**: Unlock 180+ days of story content as you progress
- **Battle System**: Fight cravings and demons in an RPG-style battle system
- **Achievements**: Earn over 50 achievements based on time, battles, streaks, and more
- **Health Milestones**: See real health benefits as you progress
- **Activity Logging**: Track healthy activities like walks, meditation, and exercise

## How to Run

### Option 1: Using a Local Web Server (Recommended)

1. Install a simple HTTP server if you don't have one:
   ```bash
   # Using Python 3
   python3 -m http.server 8000

   # OR using Node.js
   npx http-server -p 8000
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

### Option 2: Direct File Opening

Simply open `index.html` in your web browser. Note that some browsers may have restrictions with file:// protocol that could affect functionality.

## File Structure

```
Quit-Quest/
├── index.html           # Main HTML file with all dependencies
├── QuitQuestMain.jsx    # React application component
└── README.md           # This file
```

## Technologies Used

- **React 18**: UI framework
- **Tailwind CSS**: Styling
- **Babel Standalone**: JSX transformation in browser
- **Google Fonts**: Press Start 2P font for pixelated RPG feel

## Code Review Summary

The code has been reviewed and the following fixes were applied:

1. ✅ Renamed main file from `QuitQuestMain` to `QuitQuestMain.jsx` for proper file extension
2. ✅ Created `index.html` with all necessary dependencies (React, ReactDOM, Babel, Tailwind)
3. ✅ Fixed styled-jsx syntax (changed `<style jsx>` to `<style>`)
4. ✅ Moved CSS animations to index.html to avoid styled-jsx dependency
5. ✅ Added missing `selectedStoryDay` state variable
6. ✅ Verified all component definitions and state management

## Running Status

The application is now ready to run! All syntax errors have been fixed and dependencies are properly loaded.

## Browser Support

Works best on modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

All rights reserved.
