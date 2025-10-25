const { useState, useEffect } = React;

// Lucide icons as simple components (using text for now)
const Icon = ({ name, className = "w-6 h-6" }) => {
  const icons = {
    Calendar: "📅", Trophy: "🏆", User: "👤", Shield: "🛡️", Sword: "⚔️",
    Crown: "👑", Heart: "❤️", Star: "⭐", TrendingUp: "📈", Award: "🎖️",
    AlertCircle: "⚠️", Settings: "⚙️", DollarSign: "💰", Target: "🎯",
    Sparkles: "✨", Flame: "🔥", Wind: "💨", Zap: "⚡", Swords: "⚔️",
    AlertTriangle: "⚠️", Activity: "📊", BookOpen: "📖", Scroll: "📜", Map: "🗺️"
  };
  return <span className={className} style={{ display: 'inline-block' }}>{icons[name] || "•"}</span>;
};

const Calendar = (props) => <Icon name="Calendar" {...props} />;
const Trophy = (props) => <Icon name="Trophy" {...props} />;
const User = (props) => <Icon name="User" {...props} />;
const Shield = (props) => <Icon name="Shield" {...props} />;
const Sword = (props) => <Icon name="Sword" {...props} />;
const Crown = (props) => <Icon name="Crown" {...props} />;
const Heart = (props) => <Icon name="Heart" {...props} />;
const Star = (props) => <Icon name="Star" {...props} />;
const TrendingUp = (props) => <Icon name="TrendingUp" {...props} />;
const Award = (props) => <Icon name="Award" {...props} />;
const AlertCircle = (props) => <Icon name="AlertCircle" {...props} />;
const Settings = (props) => <Icon name="Settings" {...props} />;
const DollarSign = (props) => <Icon name="DollarSign" {...props} />;
const Target = (props) => <Icon name="Target" {...props} />;
const Sparkles = (props) => <Icon name="Sparkles" {...props} />;
const Flame = (props) => <Icon name="Flame" {...props} />;
const Wind = (props) => <Icon name="Wind" {...props} />;
const Zap = (props) => <Icon name="Zap" {...props} />;
const Swords = (props) => <Icon name="Swords" {...props} />;
const AlertTriangle = (props) => <Icon name="AlertTriangle" {...props} />;
const Activity = (props) => <Icon name="Activity" {...props} />;
const BookOpen = (props) => <Icon name="BookOpen" {...props} />;
const Scroll = (props) => <Icon name="Scroll" {...props} />;
const Map = (props) => <Icon name="Map" {...props} />;

// Generate stars ONCE at script load - prevents ANY re-render issues
const BACKGROUND_STARS = [...Array(50)].map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 5
}));

const QuitQuestRPG = () => {
  // Game States
  const [gameState, setGameState] = useState('setup'); // 'setup', 'playing'
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard', 'achievements', 'profile', 'battle', 'story'
  
  // Story System
  const [storyChapter, setStoryChapter] = useState(0);
  const [unlockedStoryDays, setUnlockedStoryDays] = useState([]);
  const [todayStoryViewed, setTodayStoryViewed] = useState(false);
  
  // Battle State
  const [battleState, setBattleState] = useState({
    inBattle: false,
    currentEnemy: null,
    playerHP: 100,
    enemyHP: 100,
    playerMaxHP: 100,
    enemyMaxHP: 100,
    battleLog: [],
    playerTurn: true,
    battleReward: 0,
    comboCount: 0,
    specialCharge: 0,
    battlesWon: 0,
    perfectVictories: 0
  });

  // User Data
  const [userData, setUserData] = useState({
    heroName: '',
    quitDate: '',
    cigarettesPerDay: 20,
    pricePerPack: 12.50,
    achievements: [],
    totalExperience: 0,
    avatarClass: 'warrior', // warrior, mage, rogue
    battlesWon: 0,
    cravingsDefeated: 0,
    storyProgress: [],
    activities: {
      walks: 0,
      exercises: 0,
      meditations: 0,
      waterDrinks: 0,
      breathingExercises: 0,
      socialCalls: 0,
      hobbies: 0,
      healthyMeals: 0
    },
    specialEvents: {
      weekends: 0,
      parties: 0,
      stressfulDays: 0,
      morningSkips: 0,
      nightSkips: 0,
      coffeeWithout: 0,
      drivingWithout: 0,
      holidays: 0
    },
    currentStreak: 0,
    longestStreak: 0,
    settings: {
      dailyReminders: true,
      notificationsEnabled: true
    }
  });

  // Setup Form State
  const [setupStep, setSetupStep] = useState(1);
  const [setupForm, setSetupForm] = useState({
    heroName: '',
    quitDate: '',
    cigarettesPerDay: '',
    pricePerPack: '',
    avatarClass: 'warrior'
  });

  // Calculated Stats
  const [stats, setStats] = useState({
    daysSmokeFree: 0,
    moneySaved: 0,
    cigarettesAvoided: 0,
    knightLevel: 1,
    healthStatus: '',
    nextGoal: '',
    healthPercentage: 100,
    experienceToNext: 0
  });

  // Animation states
  const [isLevelingUp, setIsLevelingUp] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [battleAnimation, setBattleAnimation] = useState('');
  const [enemyAnimation, setEnemyAnimation] = useState('');
  const [selectedStoryDay, setSelectedStoryDay] = useState(null);

  // Story Content System
  const storyContent = {
    prologue: {
      title: "The Shadow Falls",
      text: "In the Kingdom of Breathonia, a dark curse known as the Smoke Shadow has plagued the land for generations. You, brave {heroName}, have taken the sacred oath to break free from its grasp and restore light to the realm..."
    },
    chapters: [
      // Chapter 1: Days 1-30 (The Awakening)
      { day: 1, title: "The First Dawn", text: "You awaken in the Temple of Clean Air. The monks whisper of your courage. The first day without the Shadow's touch begins. Your lungs already sing a different song." },
      { day: 2, title: "The Cleansing", text: "The Shadow's poison begins to leave your blood. The monks say by sunset, your body will be free of the demon's immediate grasp." },
      { day: 3, title: "Pure Blood", text: "Three suns have risen. The nicotine demon has fled your veins completely. You feel the first stirrings of true strength." },
      { day: 4, title: "The Taste Returns", text: "Food has flavor again! The innkeeper's stew tastes of herbs and spices you'd forgotten existed." },
      { day: 5, title: "Breathing Lessons", text: "The old warrior trainer nods approvingly. 'Your breath comes easier now, young one. The Shadow loosens its grip on your chest.'" },
      { day: 7, title: "The Week Mark", text: "Seven days! The village celebrates your first victory. Children throw flower petals as you pass. You've earned your first honor badge." },
      { day: 10, title: "Growing Power", text: "Your health meter glows brighter. The local sage notes your improved circulation - 'The life force flows freely now.'" },
      { day: 14, title: "Fortnight Champion", text: "Two weeks of freedom! The Shadow sends stronger cravings to test you, but your resolve holds firm. Your armor gleams brighter." },
      { day: 21, title: "Breaking Chains", text: "The wise woman speaks: 'Twenty-one days to break a curse, twenty-one days to forge a new path. You have done both, warrior.'" },
      { day: 30, title: "The First Month", text: "A full moon cycle complete! Your transformation amazes the kingdom. The Shadow's hold weakens significantly. You are promoted to Knight Second Class!" },
      
      // Chapter 2: Days 31-60 (The Journey)
      { day: 35, title: "New Horizons", text: "Your quest map expands. New territories open up, previously hidden by the Shadow's fog. Your reputation spreads to neighboring villages." },
      { day: 40, title: "The Temptation Woods", text: "You traverse the Temptation Woods where the Shadow whispers its false promises. But your will is iron now." },
      { day: 45, title: "Meeting the Dragon", text: "A wise dragon tells you: 'I too was once enslaved by the Shadow. Your path is true, young knight. Continue.'" },
      { day: 50, title: "Half Century", text: "Fifty days! Bards compose songs of your journey. Your name is spoken with respect in the taverns." },
      { day: 60, title: "The Second Moon", text: "Two full moons of freedom! Your lung capacity has notably improved. The Shadow's influence on your body continues to fade." },
      
      // Chapter 3: Days 61-90 (The Trials)
      { day: 70, title: "The Storm Test", text: "A great storm tests your resolve. Others seek the Shadow's false comfort, but you stand firm against the tempest." },
      { day: 75, title: "Ancient Wisdom", text: "You discover ancient texts in the library: 'Those who conquer the Shadow for 75 days begin to see the world in new colors.'" },
      { day: 80, title: "The Clear Path", text: "Your morning runs no longer leave you breathless. The training master promotes you to elite status." },
      { day: 90, title: "Season's End", text: "Three months! A full season without the Shadow! Your risk of falling has decreased dramatically. Knight First Class achieved!" },
      
      // Chapter 4: Days 91-120 (The Transformation)
      { day: 100, title: "Century Warrior", text: "ONE HUNDRED DAYS! The kingdom erupts in celebration! You're awarded the Legendary Hero medallion. The Shadow trembles at your name." },
      { day: 105, title: "The Healing", text: "The court physician marvels: 'Your blood flows like a river freed from dam. Your heart beats with the strength of two!'" },
      { day: 110, title: "Shadow's Desperation", text: "The Shadow makes its strongest attack yet, sending waves of cravings. You laugh and dispel them with ease." },
      { day: 120, title: "Four Moons Strong", text: "Four lunar cycles complete. You barely remember the person enslaved by Shadow. That was another life, another world." },
      
      // Chapter 5: Days 121-150 (The Mastery)
      { day: 130, title: "The Teacher", text: "Young squires seek your guidance. You've become a beacon of hope for those still fighting the Shadow." },
      { day: 140, title: "Deep Healing", text: "Your cells regenerate with newfound vigor. The damage of years past continues to reverse itself." },
      { day: 150, title: "The Milestone", text: "150 days! The royal court honors you with a feast. Your transformation inspires an entire movement against the Shadow." },
      
      // Chapter 6: Days 151-180 (The Legend)
      { day: 160, title: "Beyond Measure", text: "Your power level exceeds all predictions. The Shadow's influence on you is now merely a distant memory." },
      { day: 170, title: "The Inspiration", text: "Statues are erected in your honor. Your story spreads across the land, giving hope to thousands still trapped." },
      { day: 180, title: "Half Year Hero", text: "SIX MONTHS FREE! The Shadow's curse is truly broken! You stand as living proof that anyone can defeat this ancient enemy. The kingdom rejoices!" },
      
      // Special Milestones
      { day: 200, title: "Transcendent", text: "You've transcended beyond what most thought possible. The Shadow no longer exists in your reality." },
      { day: 250, title: "The Guide", text: "You've become a legendary guide, leading others through their own journeys. Your wisdom is sought throughout the realm." },
      { day: 300, title: "The Immortal", text: "300 days! Songs of your victory will be sung for generations. You've achieved what many thought impossible." },
      { day: 365, title: "The Dragon Slayer", text: "ONE FULL YEAR! The ultimate victory! You've slain the Smoke Dragon permanently. You are forever free, forever legendary. Your name is etched in the stars themselves!" },
    ],
  };

  // Enemy types for battle system
  const enemies = [
    { id: 1, name: 'Craving Imp', emoji: '👹', hp: 50, attack: 10, defense: 5, reward: 50 },
    { id: 2, name: 'Nicotine Demon', emoji: '😈', hp: 80, attack: 15, defense: 8, reward: 100 },
    { id: 3, name: 'Withdrawal Wraith', emoji: '👻', hp: 120, attack: 20, defense: 12, reward: 150 },
    { id: 4, name: 'Smoke Dragon', emoji: '🐉', hp: 200, attack: 30, defense: 20, reward: 300 }
  ];

  // Comprehensive Achievement System with Health Milestones
  const achievementsList = [
    // Time-Based Achievements with Health Milestones
    { id: 'HOUR_1', title: 'The First Hour', description: 'One hour smoke-free! Your body begins healing.', icon: '⏰', hoursRequired: 1, experience: 10, rarity: 'common', category: 'time', healthBenefit: 'Heart rate starts to normalize' },
    { id: 'HOUR_12', title: 'Half Day Hero', description: '12 hours! Carbon monoxide levels dropping.', icon: '🌓', hoursRequired: 12, experience: 25, rarity: 'common', category: 'time', healthBenefit: 'Carbon monoxide in blood drops to normal' },
    { id: 'HOUR_24', title: 'First Victory', description: '24 hours! Oxygen levels improving.', icon: '🛡️', daysRequired: 1, experience: 100, rarity: 'common', category: 'time', healthBenefit: 'Oxygen levels return to normal' },
    { id: 'DAY_2', title: 'Taste Returns', description: '2 days! Nerve endings regrowing.', icon: '👅', daysRequired: 2, experience: 150, rarity: 'common', category: 'time', healthBenefit: 'Sense of taste and smell improving' },
    { id: 'DAY_3', title: 'Clean Blood', description: '3 days! Nicotine-free blood.', icon: '🩸', daysRequired: 3, experience: 200, rarity: 'common', category: 'time', healthBenefit: 'Nicotine eliminated from bloodstream' },
    { id: 'WEEK_1', title: 'Weekly Warrior', description: 'One week! Major health improvements.', icon: '⚔️', daysRequired: 7, experience: 500, rarity: 'uncommon', category: 'time', healthBenefit: 'Lungs clearing, breathing easier' },
    { id: 'WEEK_2', title: 'Circulation Master', description: 'Two weeks! Blood flow improved.', icon: '💓', daysRequired: 14, experience: 750, rarity: 'uncommon', category: 'time', healthBenefit: 'Circulation greatly improved' },
    { id: 'DAY_21', title: 'Habit Breaker', description: '21 days - Cravings weakening!', icon: '🔨', daysRequired: 21, experience: 900, rarity: 'uncommon', category: 'time', healthBenefit: 'Psychological addiction breaking' },
    { id: 'MONTH_1', title: 'Monthly Champion', description: '30 days! Lung function up 30%.', icon: '🏆', daysRequired: 30, experience: 1000, rarity: 'rare', category: 'time', healthBenefit: 'Lung function increased by 30%' },
    { id: 'DAY_45', title: 'Respiratory Rejuvenation', description: 'Lung cilia regrowing!', icon: '🫁', daysRequired: 45, experience: 1400, rarity: 'rare', category: 'time', healthBenefit: 'Lung cilia regrowth accelerating' },
    { id: 'MONTH_2', title: 'Two Moon Warrior', description: '60 days! Stroke risk dropping.', icon: '🌙', daysRequired: 60, experience: 1800, rarity: 'rare', category: 'time', healthBenefit: 'Stroke risk reduced significantly' },
    { id: 'DAY_90', title: 'Season Master', description: '3 months! Major health milestone.', icon: '🍂', daysRequired: 90, experience: 2200, rarity: 'rare', category: 'time', healthBenefit: 'Heart attack risk reduced by 50%' },
    { id: 'MILESTONE_100', title: 'Century Mark', description: '100 days! You are thriving.', icon: '💯', daysRequired: 100, experience: 2500, rarity: 'epic', category: 'time', healthBenefit: 'Overall health dramatically improved' },
    { id: 'MONTH_6', title: 'Half Year Hero', description: 'Six months! COPD risk reduced.', icon: '🌟', daysRequired: 180, experience: 5000, rarity: 'epic', category: 'time', healthBenefit: 'COPD risk reduced, immune system strong' },
    { id: 'DAY_270', title: 'Three Quarter Victory', description: '9 months! Lung regeneration complete.', icon: '🎯', daysRequired: 270, experience: 6500, rarity: 'epic', category: 'time', healthBenefit: 'Lungs fully regenerated' },
    { id: 'YEAR_1', title: 'Dragon Slayer', description: 'ONE YEAR! Heart disease risk halved.', icon: '🐉', daysRequired: 365, experience: 10000, rarity: 'legendary', category: 'time', healthBenefit: 'Heart disease risk reduced by 50%' },
    { id: 'YEAR_2', title: 'Legend Reborn', description: 'Two years! Stroke risk normalized.', icon: '🔥', daysRequired: 730, experience: 20000, rarity: 'legendary', category: 'time', healthBenefit: 'Stroke risk same as non-smoker' },
    { id: 'YEAR_5', title: 'Cancer Defeater', description: 'Five years! Cancer risk halved.', icon: '🎗️', daysRequired: 1825, experience: 50000, rarity: 'legendary', category: 'time', healthBenefit: 'Lung cancer risk reduced by 50%' },
    { id: 'YEAR_10', title: 'Immortal Legend', description: 'Ten years! Health fully restored.', icon: '👼', daysRequired: 3650, experience: 100000, rarity: 'mythic', category: 'time', healthBenefit: 'Cancer risk same as non-smoker' },
    
    // Money Saved Achievements
    { id: 'SAVE_10', title: 'Copper Collector', description: 'Saved $10!', icon: '🪙', moneySaved: 10, experience: 50, rarity: 'common', category: 'money' },
    { id: 'SAVE_25', title: 'Silver Saver', description: 'Saved $25!', icon: '🥈', moneySaved: 25, experience: 100, rarity: 'common', category: 'money' },
    { id: 'SAVE_50', title: 'Gold Getter', description: 'Saved $50!', icon: '💰', moneySaved: 50, experience: 150, rarity: 'common', category: 'money' },
    { id: 'SAVE_100', title: 'Treasure Hunter', description: 'Saved $100!', icon: '💵', moneySaved: 100, experience: 300, rarity: 'uncommon', category: 'money' },
    { id: 'SAVE_250', title: 'Wealth Builder', description: 'Saved $250!', icon: '💎', moneySaved: 250, experience: 600, rarity: 'uncommon', category: 'money' },
    { id: 'SAVE_500', title: 'Gold Hoarder', description: 'Saved $500!', icon: '🏦', moneySaved: 500, experience: 1000, rarity: 'rare', category: 'money' },
    { id: 'SAVE_1000', title: 'Wealthy Hero', description: 'Saved $1,000!', icon: '💸', moneySaved: 1000, experience: 2000, rarity: 'rare', category: 'money' },
    { id: 'SAVE_2500', title: 'Financial Freedom', description: 'Saved $2,500!', icon: '🏰', moneySaved: 2500, experience: 4000, rarity: 'epic', category: 'money' },
    { id: 'SAVE_5000', title: 'Fortune Master', description: 'Saved $5,000!', icon: '👑', moneySaved: 5000, experience: 8000, rarity: 'epic', category: 'money' },
    { id: 'SAVE_10000', title: 'Legendary Wealth', description: 'Saved $10,000!', icon: '🌟', moneySaved: 10000, experience: 15000, rarity: 'legendary', category: 'money' },
    
    // Cigarettes Avoided Achievements
    { id: 'AVOID_20', title: 'First Pack Defeated', description: 'Avoided 20 cigarettes!', icon: '📦', cigarettesAvoided: 20, experience: 100, rarity: 'common', category: 'resistance' },
    { id: 'AVOID_100', title: 'Smoke Slayer', description: 'Avoided 100 cigarettes!', icon: '🚭', cigarettesAvoided: 100, experience: 300, rarity: 'uncommon', category: 'resistance' },
    { id: 'AVOID_200', title: 'Carton Crusher', description: 'Avoided 200 cigarettes!', icon: '⚡', cigarettesAvoided: 200, experience: 500, rarity: 'uncommon', category: 'resistance' },
    { id: 'AVOID_500', title: 'Smoke Destroyer', description: 'Avoided 500 cigarettes!', icon: '💪', cigarettesAvoided: 500, experience: 1000, rarity: 'rare', category: 'resistance' },
    { id: 'AVOID_1000', title: 'Nicotine Nemesis', description: 'Avoided 1,000 cigarettes!', icon: '⚔️', cigarettesAvoided: 1000, experience: 2000, rarity: 'rare', category: 'resistance' },
    { id: 'AVOID_2000', title: 'Ultimate Resister', description: 'Avoided 2,000 cigarettes!', icon: '🛡️', cigarettesAvoided: 2000, experience: 3500, rarity: 'epic', category: 'resistance' },
    { id: 'AVOID_5000', title: 'Addiction Annihilator', description: 'Avoided 5,000 cigarettes!', icon: '🔥', cigarettesAvoided: 5000, experience: 7500, rarity: 'epic', category: 'resistance' },
    { id: 'AVOID_10000', title: 'Legendary Resister', description: 'Avoided 10,000 cigarettes!', icon: '⭐', cigarettesAvoided: 10000, experience: 15000, rarity: 'legendary', category: 'resistance' },
    
    // Battle Achievements
    { id: 'BATTLE_1', title: 'First Blood', description: 'Won your first battle!', icon: '⚡', battlesRequired: 1, experience: 100, rarity: 'common', category: 'battle' },
    { id: 'BATTLE_5', title: 'Combat Ready', description: 'Won 5 battles!', icon: '🗡️', battlesRequired: 5, experience: 250, rarity: 'common', category: 'battle' },
    { id: 'BATTLE_10', title: 'Battle Veteran', description: 'Won 10 battles!', icon: '⚔️', battlesRequired: 10, experience: 500, rarity: 'uncommon', category: 'battle' },
    { id: 'BATTLE_25', title: 'Warrior Elite', description: 'Won 25 battles!', icon: '🏹', battlesRequired: 25, experience: 1000, rarity: 'uncommon', category: 'battle' },
    { id: 'BATTLE_50', title: 'Craving Slayer', description: 'Won 50 battles!', icon: '🛡️', battlesRequired: 50, experience: 2000, rarity: 'rare', category: 'battle' },
    { id: 'BATTLE_100', title: 'Battle Master', description: 'Won 100 battles!', icon: '👑', battlesRequired: 100, experience: 4000, rarity: 'epic', category: 'battle' },
    { id: 'BATTLE_250', title: 'War Champion', description: 'Won 250 battles!', icon: '🌟', battlesRequired: 250, experience: 8000, rarity: 'epic', category: 'battle' },
    { id: 'BATTLE_500', title: 'Legendary Warrior', description: 'Won 500 battles!', icon: '🔥', battlesRequired: 500, experience: 15000, rarity: 'legendary', category: 'battle' },
    
    // Perfect Victory Achievements
    { id: 'PERFECT_1', title: 'Flawless Fighter', description: 'First perfect victory!', icon: '✨', perfectRequired: 1, experience: 200, rarity: 'uncommon', category: 'battle' },
    { id: 'PERFECT_5', title: 'Untouchable', description: '5 perfect victories!', icon: '💫', perfectRequired: 5, experience: 500, rarity: 'rare', category: 'battle' },
    { id: 'PERFECT_10', title: 'Perfect Warrior', description: '10 perfect victories!', icon: '🌟', perfectRequired: 10, experience: 1000, rarity: 'rare', category: 'battle' },
    { id: 'PERFECT_25', title: 'Invincible Hero', description: '25 perfect victories!', icon: '👼', perfectRequired: 25, experience: 2500, rarity: 'epic', category: 'battle' },
    
    // Streak Achievements
    { id: 'STREAK_7', title: 'Week Streak', description: '7-day perfect streak!', icon: '🔥', streakDays: 7, experience: 400, rarity: 'uncommon', category: 'streak' },
    { id: 'STREAK_30', title: 'Month Streak', description: '30-day perfect streak!', icon: '⭐', streakDays: 30, experience: 1500, rarity: 'rare', category: 'streak' },
    { id: 'STREAK_100', title: 'Unbreakable', description: '100-day perfect streak!', icon: '💎', streakDays: 100, experience: 5000, rarity: 'epic', category: 'streak' },
    { id: 'STREAK_365', title: 'Eternal Streak', description: '365-day perfect streak!', icon: '♾️', streakDays: 365, experience: 20000, rarity: 'legendary', category: 'streak' },
    
    // Special Activity Achievements
    { id: 'ACTIVITY_25', title: 'Active Hero', description: 'Logged 25 activities!', icon: '🏃', activitiesTotal: 25, experience: 300, rarity: 'common', category: 'activity' },
    { id: 'ACTIVITY_100', title: 'Wellness Warrior', description: 'Logged 100 activities!', icon: '💪', activitiesTotal: 100, experience: 1000, rarity: 'rare', category: 'activity' },
    { id: 'ACTIVITY_250', title: 'Lifestyle Master', description: 'Logged 250 activities!', icon: '🌟', activitiesTotal: 250, experience: 2500, rarity: 'epic', category: 'activity' },
  ];

  // Initialize unlocked story days based on current progress
  useEffect(() => {
    if (gameState === 'playing' && stats.daysSmokeFree > 0) {
      // Unlock all days up to current day
      const daysToUnlock = [];
      storyContent.chapters.forEach(chapter => {
        if (chapter.day > 0 && chapter.day <= stats.daysSmokeFree) {
          daysToUnlock.push(chapter.day);
        }
      });
      setUnlockedStoryDays(daysToUnlock);
      // Set initial selected day
      if (selectedStoryDay === null) {
        setSelectedStoryDay(stats.daysSmokeFree);
      }
    }
  }, [gameState, stats.daysSmokeFree]);

  // Calculate stats whenever userData changes
  useEffect(() => {
    if (userData.quitDate) {
      const quit = new Date(userData.quitDate);
      const today = new Date();
      const diffTime = Math.abs(today - quit);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      const cigarettesAvoided = diffDays * userData.cigarettesPerDay;
      const packsAvoided = cigarettesAvoided / 20;
      const moneySaved = packsAvoided * userData.pricePerPack;
      
      // Level calculation: 1 level per week
      const level = Math.max(1, Math.floor(diffDays / 7) + 1);
      const experienceToNext = 7 - (diffDays % 7);
      
      // Health status
      let healthStatus = '';
      let healthPercentage = 100;
      
      if (diffDays >= 365) {
        healthStatus = 'Full Recovery - Legendary Health';
        healthPercentage = 100;
      } else if (diffDays >= 180) {
        healthStatus = 'Advanced Recovery';
        healthPercentage = 95;
      } else if (diffDays >= 90) {
        healthStatus = 'Significant Improvement';
        healthPercentage = 85;
      } else if (diffDays >= 30) {
        healthStatus = 'Healing Well';
        healthPercentage = 75;
      } else if (diffDays >= 14) {
        healthStatus = 'Early Recovery';
        healthPercentage = 65;
      } else if (diffDays >= 7) {
        healthStatus = 'Initial Healing';
        healthPercentage = 55;
      } else {
        healthStatus = 'Beginning Recovery';
        healthPercentage = 50;
      }
      
      setStats({
        daysSmokeFree: diffDays,
        moneySaved: moneySaved.toFixed(2),
        cigarettesAvoided,
        knightLevel: level,
        healthStatus,
        healthPercentage,
        experienceToNext
      });

      // Unlock story chapters
      const newUnlocked = storyContent.chapters
        .filter(chapter => chapter.day <= diffDays)
        .map(chapter => chapter.day);
      setUnlockedStoryDays(newUnlocked);
    }
  }, [userData.quitDate, userData.cigarettesPerDay, userData.pricePerPack]);

  // Check for new achievements
  useEffect(() => {
    const newAchievements = [];
    const hours = stats.daysSmokeFree * 24;
    const activitiesTotal = Object.values(userData.activities).reduce((sum, val) => sum + val, 0);
    
    achievementsList.forEach(achievement => {
      if (!userData.achievements.includes(achievement.id)) {
        let earned = false;
        
        // Check different achievement types
        if (achievement.hoursRequired && hours >= achievement.hoursRequired) {
          earned = true;
        } else if (achievement.daysRequired && stats.daysSmokeFree >= achievement.daysRequired) {
          earned = true;
        } else if (achievement.moneySaved && parseFloat(stats.moneySaved) >= achievement.moneySaved) {
          earned = true;
        } else if (achievement.cigarettesAvoided && stats.cigarettesAvoided >= achievement.cigarettesAvoided) {
          earned = true;
        } else if (achievement.battlesRequired && userData.battlesWon >= achievement.battlesRequired) {
          earned = true;
        } else if (achievement.perfectRequired && battleState.perfectVictories >= achievement.perfectRequired) {
          earned = true;
        } else if (achievement.streakDays && userData.currentStreak >= achievement.streakDays) {
          earned = true;
        } else if (achievement.activitiesTotal && activitiesTotal >= achievement.activitiesTotal) {
          earned = true;
        }
        
        if (earned) {
          newAchievements.push(achievement.id);
        }
      }
    });
    
    if (newAchievements.length > 0) {
      setUserData(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...newAchievements],
        totalExperience: prev.totalExperience + newAchievements.reduce((sum, id) => {
          const ach = achievementsList.find(a => a.id === id);
          return sum + (ach?.experience || 0);
        }, 0)
      }));
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 3000);
    }
  }, [stats, battleState, userData.achievements, userData.activities]);

  // Setup form handlers
  const handleSetupChange = (field, value) => {
    setSetupForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSetupNext = () => {
    if (setupStep < 5) {
      setSetupStep(setupStep + 1);
    } else {
      // Complete setup
      setUserData({
        ...userData,
        heroName: setupForm.heroName,
        quitDate: setupForm.quitDate,
        cigarettesPerDay: parseInt(setupForm.cigarettesPerDay) || 20,
        pricePerPack: parseFloat(setupForm.pricePerPack) || 12.50,
        avatarClass: setupForm.avatarClass
      });
      setGameState('playing');
    }
  };

  const handleSetupBack = () => {
    if (setupStep > 1) {
      setSetupStep(setupStep - 1);
    }
  };

  // Battle System
  const startBattle = () => {
    const enemy = enemies[Math.floor(Math.random() * enemies.length)];
    setBattleState({
      ...battleState,
      inBattle: true,
      currentEnemy: enemy,
      playerHP: battleState.playerMaxHP,
      enemyHP: enemy.hp,
      battleLog: [`A wild ${enemy.name} ${enemy.emoji} appears!`],
      playerTurn: true,
      comboCount: 0,
      specialCharge: 0
    });
    setCurrentScreen('battle');
  };

  const playerAttack = (type) => {
    if (!battleState.playerTurn || !battleState.inBattle) return;

    let damage = 0;
    let newLog = [...battleState.battleLog];
    let newCombo = battleState.comboCount;
    let newSpecial = battleState.specialCharge;

    switch(type) {
      case 'normal':
        damage = 15 + Math.floor(Math.random() * 10);
        newCombo++;
        newSpecial += 10;
        newLog.push(`You attack for ${damage} damage! Combo: ${newCombo}`);
        break;
      case 'strong':
        damage = 30 + Math.floor(Math.random() * 15);
        newCombo = 0;
        newSpecial += 20;
        newLog.push(`Powerful strike! ${damage} damage dealt!`);
        break;
      case 'special':
        if (newSpecial >= 100) {
          damage = 50 + Math.floor(Math.random() * 20);
          newSpecial = 0;
          newCombo = 0;
          newLog.push(`⚡ SPECIAL ATTACK! ${damage} devastating damage! ⚡`);
        } else {
          newLog.push(`Not enough charge! Need ${100 - newSpecial}% more.`);
          return;
        }
        break;
    }

    setBattleAnimation('player-attack');
    setTimeout(() => setBattleAnimation(''), 500);

    const newEnemyHP = Math.max(0, battleState.enemyHP - damage);

    if (newEnemyHP === 0) {
      // Victory!
      newLog.push(`🎉 Victory! You defeated the ${battleState.currentEnemy.name}!`);
      newLog.push(`Earned ${battleState.currentEnemy.reward} gold!`);
      
      const isPerfect = battleState.playerHP === battleState.playerMaxHP;
      if (isPerfect) {
        newLog.push('✨ PERFECT VICTORY! No damage taken!');
      }

      setBattleState({
        ...battleState,
        enemyHP: 0,
        battleLog: newLog,
        battlesWon: battleState.battlesWon + 1,
        perfectVictories: isPerfect ? battleState.perfectVictories + 1 : battleState.perfectVictories,
        inBattle: false
      });

      setUserData(prev => ({
        ...prev,
        battlesWon: prev.battlesWon + 1,
        totalExperience: prev.totalExperience + battleState.currentEnemy.reward
      }));
    } else {
      setBattleState({
        ...battleState,
        enemyHP: newEnemyHP,
        battleLog: newLog,
        playerTurn: false,
        comboCount: newCombo,
        specialCharge: newSpecial
      });

      // Enemy turn
      setTimeout(() => enemyAttack(newLog), 1500);
    }
  };

  const enemyAttack = (currentLog) => {
    const damage = battleState.currentEnemy.attack + Math.floor(Math.random() * 10);
    const newPlayerHP = Math.max(0, battleState.playerHP - damage);
    const newLog = [...currentLog, `${battleState.currentEnemy.name} attacks for ${damage} damage!`];

    setEnemyAnimation('enemy-attack');
    setTimeout(() => setEnemyAnimation(''), 500);

    if (newPlayerHP === 0) {
      newLog.push('💀 You have been defeated! Try again!');
      setBattleState({
        ...battleState,
        playerHP: 0,
        battleLog: newLog,
        inBattle: false
      });
    } else {
      setBattleState({
        ...battleState,
        playerHP: newPlayerHP,
        battleLog: newLog,
        playerTurn: true
      });
    }
  };

  const defeatCraving = () => {
    setUserData(prev => ({
      ...prev,
      cravingsDefeated: prev.cravingsDefeated + 1,
      totalExperience: prev.totalExperience + 25
    }));
    startBattle();
  };

  // Track activity
  const trackActivity = (activity) => {
    setUserData(prev => ({
      ...prev,
      activities: {
        ...prev.activities,
        [activity]: prev.activities[activity] + 1
      },
      totalExperience: prev.totalExperience + 10
    }));
  };

  // Components
  const CharacterAvatar = ({ size = 'large' }) => {
    const avatarSize = size === 'large' ? 'w-32 h-32 text-6xl' : 'w-16 h-16 text-3xl';
    const level = stats.knightLevel;
    
    let avatarEmoji = '🤺';
    let borderColor = 'border-blue-500';
    let bgColor = 'bg-gradient-to-br from-blue-900 to-blue-700';
    
    if (userData.avatarClass === 'warrior') {
      if (level >= 15) { avatarEmoji = '👑'; borderColor = 'border-yellow-500'; bgColor = 'bg-gradient-to-br from-yellow-600 to-yellow-800'; }
      else if (level >= 10) { avatarEmoji = '⚔️'; borderColor = 'border-purple-500'; bgColor = 'bg-gradient-to-br from-purple-700 to-purple-900'; }
      else if (level >= 5) { avatarEmoji = '🛡️'; borderColor = 'border-blue-500'; bgColor = 'bg-gradient-to-br from-blue-700 to-blue-900'; }
      else { avatarEmoji = '🗡️'; borderColor = 'border-gray-500'; bgColor = 'bg-gradient-to-br from-gray-700 to-gray-900'; }
    } else if (userData.avatarClass === 'mage') {
      if (level >= 15) { avatarEmoji = '🧙‍♂️'; borderColor = 'border-purple-500'; bgColor = 'bg-gradient-to-br from-purple-600 to-purple-800'; }
      else if (level >= 10) { avatarEmoji = '🔮'; borderColor = 'border-indigo-500'; bgColor = 'bg-gradient-to-br from-indigo-700 to-indigo-900'; }
      else if (level >= 5) { avatarEmoji = '✨'; borderColor = 'border-blue-500'; bgColor = 'bg-gradient-to-br from-blue-700 to-blue-900'; }
      else { avatarEmoji = '📖'; borderColor = 'border-gray-500'; bgColor = 'bg-gradient-to-br from-gray-700 to-gray-900'; }
    } else if (userData.avatarClass === 'rogue') {
      if (level >= 15) { avatarEmoji = '🥷'; borderColor = 'border-red-500'; bgColor = 'bg-gradient-to-br from-red-600 to-red-800'; }
      else if (level >= 10) { avatarEmoji = '🗡️'; borderColor = 'border-orange-500'; bgColor = 'bg-gradient-to-br from-orange-700 to-orange-900'; }
      else if (level >= 5) { avatarEmoji = '🎯'; borderColor = 'border-yellow-500'; bgColor = 'bg-gradient-to-br from-yellow-700 to-yellow-900'; }
      else { avatarEmoji = '🔪'; borderColor = 'border-gray-500'; bgColor = 'bg-gradient-to-br from-gray-700 to-gray-900'; }
    }

    return (
      <div className={`${avatarSize} ${bgColor} ${borderColor} border-4 rounded-lg flex items-center justify-center shadow-lg`}>
        <span>{avatarEmoji}</span>
      </div>
    );
  };

  const ParticleEffect = () => {
    if (!showParticles) return null;
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: '2rem'
            }}
          >
            ✨
          </div>
        ))}
      </div>
    );
  };

  const LevelUpAnimation = () => {
    if (!isLevelingUp) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-yellow-600 to-amber-600 p-8 rounded-lg border-4 border-yellow-400 animate-scale-up">
          <h2 className="text-4xl font-bold text-white text-center mb-4 pixelated">LEVEL UP!</h2>
          <p className="text-xl text-white text-center pixelated">Level {stats.knightLevel}</p>
        </div>
      </div>
    );
  };

  // Setup Screen
  const SetupScreen = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full">
        <div className="bg-gradient-to-br from-yellow-600 to-amber-600 border-4 border-yellow-500 rounded-lg p-6 mb-6 shadow-2xl relative overflow-hidden pixelated">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
          <h1 className="text-3xl font-bold text-slate-900 text-center mb-2 relative z-10">🏰 QUIT QUEST</h1>
          <p className="text-slate-800 text-center relative z-10">Begin your legendary smoke-free adventure!</p>
        </div>

        <div className="bg-slate-800 border-4 border-slate-700 rounded-lg p-6 mb-4 backdrop-blur-lg bg-opacity-90">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-yellow-500 text-sm pixelated">Quest Setup Progress</span>
              <span className="text-gray-400 text-sm pixelated">Step {setupStep} of 5</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-amber-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(setupStep / 5) * 100}%` }}
              />
            </div>
          </div>

          {setupStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-yellow-500 mb-4 pixelated text-center">⚔️ HERO NAME</h2>
              <p className="text-gray-300 mb-4 text-center">What shall the bards call you, brave warrior?</p>
              <input
                type="text"
                value={setupForm.heroName}
                onChange={(e) => handleSetupChange('heroName', e.target.value)}
                placeholder="Enter your hero name..."
                className="w-full max-w-md mx-auto block px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none text-center pixelated"
              />
            </div>
          )}

          {setupStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-yellow-500 mb-4 pixelated text-center">📅 QUIT DATE</h2>
              <p className="text-gray-300 mb-4 text-center">When did you start this heroic quest?</p>
              <input
                type="date"
                value={setupForm.quitDate}
                onChange={(e) => handleSetupChange('quitDate', e.target.value)}
                className="w-full max-w-md mx-auto block px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded text-white focus:border-yellow-500 focus:outline-none text-center pixelated"
              />
            </div>
          )}

          {setupStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-yellow-500 mb-4 pixelated text-center">🚬 DAILY HABIT</h2>
              <p className="text-gray-300 mb-4 text-center">How many cigarettes did you smoke per day?</p>
              <input
                type="number"
                value={setupForm.cigarettesPerDay}
                onChange={(e) => handleSetupChange('cigarettesPerDay', e.target.value)}
                placeholder="20"
                className="w-full max-w-md mx-auto block px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none text-center pixelated"
              />
            </div>
          )}

          {setupStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-yellow-500 mb-4 pixelated text-center">💰 PACK PRICE</h2>
              <p className="text-gray-300 mb-4 text-center">How much did a pack cost? (in dollars)</p>
              <input
                type="number"
                step="0.01"
                value={setupForm.pricePerPack}
                onChange={(e) => handleSetupChange('pricePerPack', e.target.value)}
                placeholder="12.50"
                className="w-full max-w-md mx-auto block px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none text-center pixelated"
              />
            </div>
          )}

          {setupStep === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-yellow-500 mb-4 pixelated text-center">🎭 CHOOSE CLASS</h2>
              <p className="text-gray-300 mb-4 text-center">Select your hero class:</p>
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                {['warrior', 'mage', 'rogue'].map(classType => (
                  <button
                    key={classType}
                    onClick={() => handleSetupChange('avatarClass', classType)}
                    className={`p-4 rounded-lg border-4 transition-all ${
                      setupForm.avatarClass === classType
                        ? 'border-yellow-500 bg-yellow-900'
                        : 'border-slate-600 bg-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-4xl mb-2">
                      {classType === 'warrior' ? '⚔️' : classType === 'mage' ? '🔮' : '🗡️'}
                    </div>
                    <div className="text-white font-bold capitalize pixelated">{classType}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            {setupStep > 1 && (
              <button
                onClick={handleSetupBack}
                className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded border-4 border-slate-600 transition-all pixelated"
              >
                ← BACK
              </button>
            )}
            <button
              onClick={handleSetupNext}
              disabled={
                (setupStep === 1 && !setupForm.heroName) ||
                (setupStep === 2 && !setupForm.quitDate) ||
                (setupStep === 3 && !setupForm.cigarettesPerDay) ||
                (setupStep === 4 && !setupForm.pricePerPack)
              }
              className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-slate-900 font-bold rounded border-4 border-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed pixelated"
            >
              {setupStep === 5 ? '⚔️ START QUEST' : 'NEXT →'}
            </button>
          </div>
        </div>
      </div>
    </div>
    );
  };

  // Dashboard Screen
  const DashboardScreen = () => (
    <div className="space-y-4 animate-fade-in">
      {/* Hero Stats Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-slate-700 rounded-lg p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <CharacterAvatar size="large" />
            <div>
              <h2 className="text-2xl font-bold text-yellow-500 pixelated">{userData.heroName}</h2>
              <p className="text-gray-400 pixelated">Level {stats.knightLevel} {userData.avatarClass}</p>
              <div className="mt-2">
                <div className="w-48 bg-slate-700 rounded-full h-3 border-2 border-slate-600">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all"
                    style={{ width: `${((7 - stats.experienceToNext) / 7) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1 pixelated">{7 - stats.experienceToNext}/7 days to Level {stats.knightLevel + 1}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-700 rounded-lg p-4 border-2 border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400 text-sm pixelated">Days Free</span>
            </div>
            <p className="text-3xl font-bold text-white pixelated">{stats.daysSmokeFree}</p>
          </div>
          <div className="bg-slate-700 rounded-lg p-4 border-2 border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-gray-400 text-sm pixelated">Gold Saved</span>
            </div>
            <p className="text-3xl font-bold text-white pixelated">${stats.moneySaved}</p>
          </div>
          <div className="bg-slate-700 rounded-lg p-4 border-2 border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-red-400" />
              <span className="text-gray-400 text-sm pixelated">Avoided</span>
            </div>
            <p className="text-3xl font-bold text-white pixelated">{stats.cigarettesAvoided}</p>
          </div>
        </div>

        {/* Health Status */}
        <div className="bg-gradient-to-r from-green-900 to-emerald-900 rounded-lg p-4 border-2 border-green-600">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-bold pixelated">Health Status</span>
          </div>
          <p className="text-white text-lg pixelated">{stats.healthStatus}</p>
          <div className="mt-2 w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full transition-all"
              style={{ width: `${stats.healthPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800 border-4 border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-yellow-500 mb-4 pixelated">⚔️ QUICK ACTIONS</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={defeatCraving}
            className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-4 px-6 rounded-lg border-4 border-red-500 transition-all pixelated"
          >
            <Flame className="w-6 h-6 mx-auto mb-2" />
            Defeat Craving
          </button>
          <button
            onClick={startBattle}
            className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold py-4 px-6 rounded-lg border-4 border-purple-500 transition-all pixelated"
          >
            <Swords className="w-6 h-6 mx-auto mb-2" />
            Start Battle
          </button>
        </div>
      </div>

      {/* Next Milestone */}
      <div className="bg-slate-800 border-4 border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-yellow-500 mb-4 pixelated">🎯 NEXT MILESTONE</h3>
        <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg p-4 border-2 border-slate-600">
          <p className="text-white text-lg font-bold pixelated mb-2">{stats.nextGoal}</p>
          <p className="text-gray-400 text-sm">Keep going, hero! Your next achievement awaits!</p>
        </div>
      </div>
    </div>
  );

  // Story Screen - Enhanced with interactive story viewing
  const StoryScreen = () => {
    const selectedDay = selectedStoryDay || stats.daysSmokeFree;
    const selectedStory = storyContent.chapters.find(c => c.day === selectedDay);
    
    return (
      <div className="space-y-4 animate-fade-in">
        {/* Current Story Display */}
        {selectedStory && (
          <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 border-4 border-purple-500 rounded-lg p-6 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <Scroll className="w-10 h-10 text-yellow-400 animate-pulse" />
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-yellow-400 pixelated mb-1">{selectedStory.title}</h2>
                <p className="text-purple-300 text-sm pixelated">Day {selectedStory.day} Chronicle</p>
              </div>
              {selectedDay === stats.daysSmokeFree && (
                <div className="bg-yellow-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold pixelated">
                  TODAY
                </div>
              )}
            </div>
            <div className="bg-black bg-opacity-30 rounded-lg p-6 border-2 border-purple-700">
              <p className="text-white text-lg leading-relaxed whitespace-pre-line">
                {selectedStory.text.replace('{heroName}', userData.heroName)}
              </p>
            </div>
            
            {/* Story Navigation */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  const prevDay = storyContent.chapters.findIndex(c => c.day === selectedDay);
                  if (prevDay > 0) {
                    const prev = storyContent.chapters[prevDay - 1];
                    if (prev.day <= stats.daysSmokeFree) {
                      setSelectedStoryDay(prev.day);
                    }
                  }
                }}
                disabled={selectedDay <= 1 || selectedDay <= (storyContent.chapters.find((c, i) => c.day === selectedDay && i === 0)?.day || 1)}
                className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg border-2 border-purple-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed pixelated"
              >
                ← Previous
              </button>
              <button
                onClick={() => {
                  const nextDay = storyContent.chapters.findIndex(c => c.day === selectedDay);
                  if (nextDay < storyContent.chapters.length - 1) {
                    const next = storyContent.chapters[nextDay + 1];
                    if (next.day <= stats.daysSmokeFree) {
                      setSelectedStoryDay(next.day);
                    }
                  }
                }}
                disabled={selectedDay >= stats.daysSmokeFree}
                className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg border-2 border-purple-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed pixelated"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Journey Progress Overview */}
        <div className="bg-slate-800 border-4 border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-yellow-500 flex items-center gap-2 pixelated">
              <BookOpen className="w-6 h-6" />
              STORY PROGRESS
            </h3>
            <div className="text-gray-400 pixelated text-sm">
              {unlockedStoryDays.length} / {storyContent.chapters.filter(c => c.day > 0).length} Unlocked
            </div>
          </div>
          
          {/* Chapter Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {[
              { day: 1, title: "The Awakening", chapter: 1, color: "blue" },
              { day: 7, title: "First Trial", chapter: 2, color: "green" },
              { day: 14, title: "Growing Strength", chapter: 2, color: "green" },
              { day: 30, title: "The Turning Point", chapter: 3, color: "yellow" },
              { day: 60, title: "Rising Hero", chapter: 4, color: "orange" },
              { day: 90, title: "The Liberation", chapter: 5, color: "purple" },
              { day: 180, title: "Half Year Legend", chapter: 6, color: "red" },
              { day: 365, title: "Dragon Slayer", chapter: 7, color: "gold" }
            ].map(milestone => {
              const isUnlocked = stats.daysSmokeFree >= milestone.day;
              const isCurrent = selectedDay === milestone.day;
              return (
                <button
                  key={milestone.day}
                  onClick={() => isUnlocked && setSelectedStoryDay(milestone.day)}
                  disabled={!isUnlocked}
                  className={`p-4 rounded-lg border-4 transition-all text-left ${
                    isCurrent
                      ? 'bg-gradient-to-r from-yellow-600 to-amber-600 border-yellow-400 ring-4 ring-yellow-500 scale-105'
                      : isUnlocked
                      ? `bg-gradient-to-r from-${milestone.color}-900 to-${milestone.color}-800 border-${milestone.color}-600 hover:scale-105`
                      : 'bg-slate-700 border-slate-600 opacity-40 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-2xl font-bold pixelated ${isCurrent ? 'text-white' : isUnlocked ? 'text-yellow-400' : 'text-gray-600'}`}>
                      Day {milestone.day}
                    </span>
                    {isUnlocked && <Star className="w-5 h-5 text-yellow-400" />}
                    {!isUnlocked && <span className="text-gray-500 text-sm pixelated">🔒 LOCKED</span>}
                  </div>
                  <p className={`font-bold pixelated ${isCurrent ? 'text-white' : isUnlocked ? 'text-white' : 'text-gray-600'}`}>
                    {milestone.title}
                  </p>
                  <p className={`text-xs mt-1 ${isCurrent ? 'text-yellow-200' : isUnlocked ? 'text-gray-400' : 'text-gray-700'}`}>
                    Chapter {milestone.chapter}
                  </p>
                </button>
              );
            })}
          </div>

          {/* All Days Grid */}
          <h4 className="text-lg font-bold text-yellow-500 mb-3 pixelated">📜 ALL CHRONICLES</h4>
          <div className="grid grid-cols-10 gap-2">
            {storyContent.chapters
              .filter(c => c.day > 0 && c.day <= 180)
              .map(chapter => {
                const isUnlocked = chapter.day <= stats.daysSmokeFree;
                const isCurrent = chapter.day === selectedDay;
                const isToday = chapter.day === stats.daysSmokeFree;
                return (
                  <button
                    key={chapter.day}
                    onClick={() => isUnlocked && setSelectedStoryDay(chapter.day)}
                    disabled={!isUnlocked}
                    className={`aspect-square p-2 rounded border-2 transition-all font-bold pixelated text-sm ${
                      isCurrent
                        ? 'bg-yellow-500 border-yellow-400 text-slate-900 ring-2 ring-yellow-300 scale-110 z-10'
                        : isToday
                        ? 'bg-purple-600 border-purple-400 text-white ring-2 ring-purple-300 animate-pulse'
                        : isUnlocked
                        ? 'bg-blue-600 border-blue-500 text-white hover:bg-blue-500 hover:scale-105'
                        : 'bg-slate-700 border-slate-600 text-gray-600 cursor-not-allowed opacity-30'
                    }`}
                    title={isUnlocked ? chapter.title : 'Locked'}
                  >
                    {chapter.day}
                  </button>
                );
              })}
          </div>
          
          <div className="mt-4 flex items-center gap-4 text-sm pixelated">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 border-2 border-yellow-400 rounded"></div>
              <span className="text-gray-400">Viewing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-600 border-2 border-purple-400 rounded animate-pulse"></div>
              <span className="text-gray-400">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 border-2 border-blue-500 rounded"></div>
              <span className="text-gray-400">Unlocked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-700 border-2 border-slate-600 rounded opacity-30"></div>
              <span className="text-gray-400">Locked</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Battle Screen
  const BattleScreen = () => {
    if (!battleState.inBattle && battleState.battleLog.length === 0) {
      return (
        <div className="text-center py-12 animate-fade-in">
          <div className="bg-slate-800 border-4 border-slate-700 rounded-lg p-8">
            <Swords className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-2xl font-bold text-yellow-500 mb-4 pixelated">BATTLE ARENA</h2>
            <p className="text-gray-400 mb-6">Face your demons and earn rewards!</p>
            <button
              onClick={startBattle}
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-4 px-8 rounded-lg border-4 border-red-500 transition-all pixelated"
            >
              ⚔️ START BATTLE
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4 animate-fade-in">
        {/* Battle Area */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 border-4 border-slate-700 rounded-lg p-6">
          <div className="grid grid-cols-2 gap-8 mb-6">
            {/* Player */}
            <div className={`text-center ${battleAnimation}`}>
              <CharacterAvatar />
              <h3 className="text-xl font-bold text-yellow-500 mt-4 pixelated">{userData.heroName}</h3>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>HP</span>
                  <span>{battleState.playerHP}/{battleState.playerMaxHP}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4 border-2 border-slate-600">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full transition-all"
                    style={{ width: `${(battleState.playerHP / battleState.playerMaxHP) * 100}%` }}
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Special</span>
                  <span>{battleState.specialCharge}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 border-2 border-slate-600">
                  <div 
                    className="bg-gradient-to-r from-yellow-500 to-amber-400 h-full rounded-full transition-all"
                    style={{ width: `${battleState.specialCharge}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Enemy */}
            {battleState.currentEnemy && (
              <div className={`text-center ${enemyAnimation}`}>
                <div className="w-32 h-32 mx-auto text-6xl flex items-center justify-center bg-red-900 border-4 border-red-600 rounded-lg">
                  {battleState.currentEnemy.emoji}
                </div>
                <h3 className="text-xl font-bold text-red-500 mt-4 pixelated">{battleState.currentEnemy.name}</h3>
                <div className="mt-2">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>HP</span>
                    <span>{battleState.enemyHP}/{battleState.currentEnemy.hp}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-4 border-2 border-slate-600">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-red-700 h-full rounded-full transition-all"
                      style={{ width: `${(battleState.enemyHP / battleState.currentEnemy.hp) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Battle Actions */}
          {battleState.inBattle && battleState.playerTurn && (
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => playerAttack('normal')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg border-4 border-blue-500 transition-all pixelated"
              >
                ⚔️ Attack
                <div className="text-xs text-gray-300">15-25 DMG</div>
              </button>
              <button
                onClick={() => playerAttack('strong')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg border-4 border-purple-500 transition-all pixelated"
              >
                💥 Strong
                <div className="text-xs text-gray-300">30-45 DMG</div>
              </button>
              <button
                onClick={() => playerAttack('special')}
                disabled={battleState.specialCharge < 100}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-lg border-4 border-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed pixelated"
              >
                ⚡ Special
                <div className="text-xs text-gray-300">50-70 DMG</div>
              </button>
            </div>
          )}

          {/* Combo Counter */}
          {battleState.comboCount > 0 && (
            <div className="mt-4 text-center">
              <span className="text-yellow-500 font-bold text-xl pixelated animate-pulse">
                {battleState.comboCount}x COMBO!
              </span>
            </div>
          )}
        </div>

        {/* Battle Log */}
        <div className="bg-slate-800 border-4 border-slate-700 rounded-lg p-4">
          <h4 className="text-yellow-500 font-bold mb-2 pixelated">⚔️ BATTLE LOG</h4>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {battleState.battleLog.map((log, index) => (
              <p key={index} className="text-gray-300 text-sm">
                {log}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Achievements Screen
  const AchievementsScreen = () => {
    const categories = {
      time: { name: 'Health Milestones', icon: '🫁', color: 'green' },
      money: { name: 'Financial Victory', icon: '💰', color: 'yellow' },
      resistance: { name: 'Resistance', icon: '🛡️', color: 'blue' },
      battle: { name: 'Battle Glory', icon: '⚔️', color: 'red' },
      streak: { name: 'Perfect Streaks', icon: '🔥', color: 'orange' },
      activity: { name: 'Wellness', icon: '💪', color: 'purple' }
    };

    const groupedAchievements = {};
    achievementsList.forEach(ach => {
      if (!groupedAchievements[ach.category]) {
        groupedAchievements[ach.category] = [];
      }
      groupedAchievements[ach.category].push(ach);
    });

    return (
      <div className="space-y-4 animate-fade-in">
        <div className="bg-slate-800 border-4 border-slate-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4 flex items-center gap-2 pixelated">
            <Trophy className="w-8 h-8" />
            HALL OF GLORY
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-700 rounded-lg p-4 border-2 border-slate-600">
              <p className="text-gray-400 text-sm pixelated">Unlocked</p>
              <p className="text-3xl font-bold text-yellow-500 pixelated">{userData.achievements.length}</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 border-2 border-slate-600">
              <p className="text-gray-400 text-sm pixelated">Total</p>
              <p className="text-3xl font-bold text-white pixelated">{achievementsList.length}</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 border-2 border-slate-600">
              <p className="text-gray-400 text-sm pixelated">Experience</p>
              <p className="text-3xl font-bold text-cyan-400 pixelated">{userData.totalExperience}</p>
            </div>
          </div>

          {Object.entries(groupedAchievements).map(([category, achievements]) => (
            <div key={category} className="mb-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2 pixelated" style={{ color: `var(--${categories[category]?.color || 'gray'}-500)` }}>
                <span>{categories[category]?.icon || '🏆'}</span>
                {categories[category]?.name || category.toUpperCase()}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {achievements.map(achievement => {
                  const isUnlocked = userData.achievements.includes(achievement.id);
                  return (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-4 transition-all ${
                        isUnlocked
                          ? 'bg-gradient-to-br from-yellow-900 to-amber-900 border-yellow-600'
                          : 'bg-slate-700 border-slate-600 opacity-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`font-bold pixelated ${isUnlocked ? 'text-yellow-500' : 'text-gray-500'}`}>
                              {achievement.title}
                            </h4>
                            {isUnlocked && <Star className="w-5 h-5 text-yellow-500" />}
                          </div>
                          <p className="text-sm text-gray-400 mb-1">{achievement.description}</p>
                          {achievement.healthBenefit && (
                            <p className="text-xs text-green-400 italic">
                              ❤️ {achievement.healthBenefit}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs px-2 py-1 rounded ${
                              achievement.rarity === 'legendary' ? 'bg-orange-600' :
                              achievement.rarity === 'epic' ? 'bg-purple-600' :
                              achievement.rarity === 'rare' ? 'bg-blue-600' :
                              achievement.rarity === 'uncommon' ? 'bg-green-600' :
                              'bg-gray-600'
                            } text-white font-bold`}>
                              {achievement.rarity.toUpperCase()}
                            </span>
                            <span className="text-xs text-yellow-400 font-bold">
                              +{achievement.experience} XP
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Profile Screen
  const ProfileScreen = () => (
    <div className="space-y-4 animate-fade-in">
      {/* Hero Info */}
      <div className="bg-slate-800 border-4 border-slate-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-yellow-500 mb-6 flex items-center gap-2 pixelated">
          <User className="w-8 h-8" />
          HERO PROFILE
        </h2>

        <div className="flex items-center gap-6 mb-6">
          <CharacterAvatar />
          <div>
            <h3 className="text-3xl font-bold text-white pixelated">{userData.heroName}</h3>
            <p className="text-gray-400 pixelated">Level {stats.knightLevel} {userData.avatarClass}</p>
            <p className="text-gray-400 text-sm mt-2">Total XP: {userData.totalExperience}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-700 rounded-lg p-4 border-2 border-slate-600">
            <div className="text-gray-400 text-sm mb-1 pixelated">Quit Date</div>
            <div className="text-white font-bold">{userData.quitDate}</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-4 border-2 border-slate-600">
            <div className="text-gray-400 text-sm mb-1 pixelated">Days Free</div>
            <div className="text-white font-bold text-2xl">{stats.daysSmokeFree}</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-4 border-2 border-slate-600">
            <div className="text-gray-400 text-sm mb-1 pixelated">Battles Won</div>
            <div className="text-white font-bold text-2xl">{userData.battlesWon}</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-4 border-2 border-slate-600">
            <div className="text-gray-400 text-sm mb-1 pixelated">Achievements</div>
            <div className="text-white font-bold text-2xl">{userData.achievements.length}</div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-slate-800 border-4 border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-yellow-500 mb-4 pixelated">📊 STATISTICS</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Money Saved</span>
            <span className="text-green-400 font-bold">${stats.moneySaved}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Cigarettes Avoided</span>
            <span className="text-red-400 font-bold">{stats.cigarettesAvoided}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Cravings Defeated</span>
            <span className="text-purple-400 font-bold">{userData.cravingsDefeated}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Current Streak</span>
            <span className="text-blue-400 font-bold">{stats.daysSmokeFree} days</span>
          </div>
        </div>
      </div>

      {/* Activities Summary */}
      <div className="bg-slate-800 border-4 border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-yellow-500 mb-4 pixelated">🏃 ACTIVITIES</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(userData.activities).map(([key, value]) => (
            <div key={key} className="bg-slate-700 rounded-lg p-3 border-2 border-slate-600">
              <div className="text-gray-400 text-sm capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-white font-bold text-xl">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Main Game Screen
  const GameScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Particle Effects */}
      <ParticleEffect />
      
      {/* Level Up Animation */}
      <LevelUpAnimation />
      
      {/* Header */}
      <div className="bg-slate-900 border-b-4 border-slate-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-transparent to-purple-900 opacity-30"></div>
        <div className="max-w-4xl mx-auto p-4 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-yellow-500 pixelated">🏰 QUIT QUEST</h1>
            <div className="flex items-center gap-3">
              <CharacterAvatar size="small" />
              <div className="text-right">
                <p className="text-yellow-500 font-bold pixelated">{userData.heroName}</p>
                <p className="text-gray-400 text-xs pixelated">Day {stats.daysSmokeFree}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-800 border-b-4 border-slate-700">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-5">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className={`py-3 text-center transition-all pixelated ${
                currentScreen === 'dashboard' 
                  ? 'bg-gradient-to-b from-slate-700 to-slate-800 text-yellow-500 border-b-4 border-yellow-500' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Shield className="w-6 h-6 mx-auto mb-1" />
              <span className="text-xs font-bold">QUEST</span>
            </button>
            <button
              onClick={() => setCurrentScreen('story')}
              className={`py-3 text-center transition-all relative pixelated ${
                currentScreen === 'story' 
                  ? 'bg-gradient-to-b from-slate-700 to-slate-800 text-yellow-500 border-b-4 border-yellow-500' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <BookOpen className="w-6 h-6 mx-auto mb-1" />
              <span className="text-xs font-bold">STORY</span>
              {!todayStoryViewed && unlockedStoryDays.includes(stats.daysSmokeFree) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              )}
            </button>
            <button
              onClick={() => setCurrentScreen('battle')}
              className={`py-3 text-center transition-all relative pixelated ${
                currentScreen === 'battle' 
                  ? 'bg-gradient-to-b from-slate-700 to-slate-800 text-yellow-500 border-b-4 border-yellow-500' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Swords className="w-6 h-6 mx-auto mb-1" />
              <span className="text-xs font-bold">BATTLE</span>
              {battleState.inBattle && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>
            <button
              onClick={() => setCurrentScreen('achievements')}
              className={`py-3 text-center transition-all pixelated ${
                currentScreen === 'achievements' 
                  ? 'bg-gradient-to-b from-slate-700 to-slate-800 text-yellow-500 border-b-4 border-yellow-500' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Trophy className="w-6 h-6 mx-auto mb-1" />
              <span className="text-xs font-bold">GLORY</span>
            </button>
            <button
              onClick={() => setCurrentScreen('profile')}
              className={`py-3 text-center transition-all pixelated ${
                currentScreen === 'profile' 
                  ? 'bg-gradient-to-b from-slate-700 to-slate-800 text-yellow-500 border-b-4 border-yellow-500' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <User className="w-6 h-6 mx-auto mb-1" />
              <span className="text-xs font-bold">HERO</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4">
        {currentScreen === 'dashboard' && <DashboardScreen />}
        {currentScreen === 'story' && <StoryScreen />}
        {currentScreen === 'battle' && <BattleScreen />}
        {currentScreen === 'achievements' && <AchievementsScreen />}
        {currentScreen === 'profile' && <ProfileScreen />}
      </div>
    </div>
  );

  return gameState === 'setup' ? <SetupScreen /> : <GameScreen />;
};

// Make component available globally
window.QuitQuestRPG = QuitQuestRPG;
