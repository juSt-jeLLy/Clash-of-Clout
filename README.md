# 🎭 Clash-of-Clout

An AI-powered meme battle platform where creativity meets crypto rewards.

## 🚀 Overview

Clash-of-Clout is a revolutionary platform that combines AI-driven meme generation, social engagement, and blockchain rewards. Users can create, stake, and earn from viral crypto memes in a gamified ecosystem.

## ✨ Core Features

### 🤖 AI Meme Generation
- Real-time crypto trend analysis
- OpenAI GPT-powered caption generation
- Pre-made meme template integration via GAIANET
- Automated social media posting

### 📱 Social Engagement
- Cross-platform meme distribution (Twitter/Discord)
- Real-time engagement tracking
- Automated popularity scoring
- Social proof verification

### 💎 Staking & Voting
- Flow Token-based staking mechanism
- User-friendly voting interface
- Transparent stake management
- Flow testnet integration

### 🏆 Reward Distribution
Smart contract-powered reward allocation:
- 70% to meme creators
- 20% to winning meme stakers
- 10% to platform sustainability

## 🛠 Technical Stack

- **Frontend**: Next.js, TypeScript
- **Backend**: Express, Node.js, collabland's AI-Agent-Starter-Kit
- **Blockchain**: Flow Testnet
- **AI**: OpenAI GPT
- **Storage**: GAIANET
- **Social**: Twitter & Farcaster APIs


## 🔄 Workflow

1. AI generates trending crypto memes
2. Memes are posted to social platforms
3. Users stake tokens on favorite memes
4. System tracks engagement metrics
5. Smart contract distributes rewards
6. Winners claim their earnings

## 🎨 UX Focus

- Intuitive meme creation interface
- One-click staking and voting
- Real-time engagement tracking
- Seamless wallet integration

## 📊 Platform Metrics
- Meme Generation Success Rate
- Social Engagement Analytics  
- Staking Participation
- Reward Distribution Stats

## 🔗 Smart Contract Integration
- Automated reward distribution
- Transparent staking mechanism
- Secure token management
- Verifiable random winner selection

## 🌐 Social Integration
- Twitter API connectivity
- Discord API integration
- Engagement tracking
- Automated posting

## 🛡️ Security
- Smart contract auditing
- Secure wallet integration
- Rate limiting
- Anti-spam measures

## 📱 Mobile Support
- Responsive design
- Native-like experience
- Cross-platform compatibility

## 🌍 Global Impact
By democratizing meme creation and rewards, Clash-of-Clout empowers creators worldwide to:
- Participate in viral content creation
- Earn rewards for creativity
- Build global community engagement
- Create innovative meme trends

## 💡 Competitive Advantages

Feature | Traditional Platforms | Clash-of-Clout
--------|---------------------|----------------
Content Creation | Manual | AI-Assisted
Reward System | Limited | Token-Based
Engagement Tracking | Basic | Advanced Analytics
Payment Speed | Delayed | Instant
Community Input | Minimal | Stake-Based Voting

Join us in revolutionizing the crypto meme economy! 🚀

## 🚀 Getting Started

1. Prerequisites:

```bash
node >= 22 🟢
pnpm >= 9.14.1 📦
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the predev script:

```bash
pnpm run predev
```

4. Fire up the dev servers:

```bash
pnpm run dev
```

## 📁 Repository Structure

```
├── 📦 client/                 # Next.js frontend
├── ⚙️ server/               # Express.js backend
├── 📝 .env.example         # Root environment variables example for server
├── 🔧 package.json         # Root package with workspace config
```

## Backend

You should first run a gaianet node and add the GAIA_NODE_DOMAIN environment variable.

### Scripts

```bash
pnpm run dev        # Development mode
pnpm run build     # Build actions
pnpm run watch     # Watch mode
```