# 🍎 Nutrition Scanner

A modern SaaS platform that uses AI to analyze food nutrition through barcode scanning and camera integration.

## ✨ Features

### Core Functionality
- **Real-time Camera Scanning** - Use device camera to scan product barcodes
- **Nutrition Analysis** - Comprehensive nutritional information display
- **Health Scoring** - AI-powered health ratings for products
- **Product Database** - Extensive food product information
- **Alternative Suggestions** - Healthier product recommendations

### SaaS Features
- **User Authentication** - Secure login/signup system
- **Subscription Tiers** - Free, Pro, and Premium plans
- **Usage Limits** - Daily scan limits for free users
- **Premium Features** - AI analysis, export reports, unlimited scans
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Camera API**: MediaDevices getUserMedia
- **Storage**: LocalStorage for demo purposes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/nutrition-scanner.git
cd nutrition-scanner
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Usage

### For Users
1. **Sign Up** - Create a free account
2. **Scan Products** - Use camera to scan barcodes
3. **View Analysis** - Get detailed nutrition information
4. **Upgrade** - Access premium features with paid plans

### Subscription Plans
- **Free**: 5 scans/day, basic nutrition info
- **Pro ($9.99/month)**: Unlimited scans, AI recommendations, export reports
- **Premium ($19.99/month)**: Everything + personal nutritionist chat, meal plans

## 🏗️ Project Structure

```
nutrition-scanner/
├── app/
│   ├── components/
│   │   ├── Auth.tsx           # Authentication component
│   │   ├── BarcodeScanner.tsx # Camera barcode scanner
│   │   ├── NutritionScanner.tsx # Main app component
│   │   └── Pricing.tsx        # Subscription plans
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── public/                    # Static assets
├── .gitignore
├── package.json
├── tailwind.config.js
└── README.md
```

## 🔧 Configuration

### Tailwind CSS
Custom components and animations are defined in `globals.css`:
- `.glass-green` - Glassmorphism effect
- `.scanner-frame` - Camera frame styling
- `.nutrition-bar` - Progress bar animations

### Environment Variables
For production, add:
```env
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
```

## 🎨 Design System

### Colors
- Primary: Green (#34d399, #10b981)
- Secondary: Purple (#a855f7)
- Accent: Blue (#3b82f6)
- Text: Gray scale

### Typography
- Font: Poppins (Google Fonts)
- Headings: Bold weights
- Body: Regular weight

## 📊 Features Breakdown

### Authentication System
- Local storage based (demo)
- Login/signup forms
- User session management
- Plan-based access control

### Camera Integration
- Real camera access
- Barcode detection simulation
- Error handling for permissions
- Mobile-optimized interface

### Nutrition Database
- Product lookup by barcode
- Comprehensive nutrition data
- Health score calculation
- Alternative product suggestions

### Premium Features
- AI-powered analysis
- Export functionality
- Unlimited scanning
- Priority support

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
- Lucide for beautiful icons

## 📞 Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

Made with ❤️ and lots of ☕