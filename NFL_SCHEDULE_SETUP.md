# 🏈 NFL 2025 Season Schedule Integration Setup

Your SAKFootball site now has real NFL schedule integration for the upcoming 2025 season! Here's how to get it working:

## 🔑 Get Your Free API Key

1. **Visit [The Odds API](https://the-odds-api.com/)**
2. **Sign up for a free account**
3. **Get your API key** (free tier includes 500 requests/month)

## ⚙️ Setup Instructions

### 1. Create Environment File
Copy `.env.example` to `.env` and add your API key:

```bash
cp .env.example .env
```

### 2. Add Your API Key
Edit `.env` and replace `your_api_key_here` with your actual API key:

```env
NEXT_PUBLIC_ODDS_API_KEY=abc123def456ghi789
```

### 3. Restart Your Development Server
```bash
npm run dev
```

## 🎯 What You'll Get

- **Real NFL 2025 Schedule Data** - Live from The Odds API
- **All 32 Teams** - Complete coverage of every NFL team
- **0-0 Records** - Fresh start for the new season
- **Weekly Views** - Browse games by week
- **Upcoming Games** - See what's coming next
- **Today's Games** - Current day matchups
- **Team Filtering** - View schedules by team
- **Betting Odds** - Spread, totals, and moneyline
- **Game Status** - Live, final, scheduled
- **Network Info** - TV channels and broadcast info

## 📊 2025 Season Features

- **Season Start**: September 2025
- **All Teams**: Bills, Dolphins, Jets, Patriots, Ravens, Bengals, Browns, Steelers, Texans, Colts, Jaguars, Titans, Broncos, Chiefs, Raiders, Chargers, Cowboys, Giants, Eagles, Commanders, Bears, Lions, Packers, Vikings, Falcons, Panthers, Saints, Buccaneers, Cardinals, Rams, 49ers, Seahawks
- **Fresh Records**: Every team starts 0-0
- **Updated Schedule**: 2025 season dates and times

## 🚀 Next Steps

1. **Get your API key** from The Odds API
2. **Add it to your .env file**
3. **Deploy to Netlify** with the new features
4. **Enjoy real NFL 2025 data!**

## 🔧 Troubleshooting

- **"Using sample data" message**: You need to add your API key
- **No games showing**: Check your API key and restart the server
- **Rate limit errors**: Upgrade to paid plan or wait for next month

## 💡 Pro Tips

- The free tier is perfect for personal projects
- Data updates every few minutes during games
- Perfect for fantasy football and betting analysis
- Can be extended to include other sports

Your SAKFootball site is now ready for the 2025 NFL season! 🏈✨
