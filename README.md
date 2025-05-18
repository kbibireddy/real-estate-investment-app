# Real Estate Investment Analysis Tool

A comprehensive web application for analyzing real estate investments, built with Next.js and Material UI. This tool helps investors make informed decisions by providing detailed financial analysis and visualizations.

## 📚 User Guide

### Getting Started
1. Visit the application at [your-deployed-url].
2. You'll see the main dashboard with three sections:
   - Property Information
   - Income & Growth
   - Expenses

### 📊 Using the Control Panel

#### Property Information
- **Property Value**: Enter the total price of the property
- **Down Payment**: Input your intended down payment amount
- **Interest Rate**: Current mortgage interest rate (in %)
- **Loan Term**: Length of the mortgage in years
- **Closing Costs**: One-time fees associated with purchasing

#### Income & Growth
- **Monthly Rent**: Expected rental income per month
- **Rent Increase**: Annual rent appreciation rate (in %)
- **Appreciation**: Expected property value increase per year (in %)

#### Expenses
- **Property Tax**: Annual property tax amount
- **Insurance**: Annual property insurance cost
- **Maintenance**: Expected yearly maintenance costs
- **HOA**: Monthly homeowners association fees

### 📈 Analysis Tools

#### 1. Amortization Table
- Shows month-by-month breakdown of:
  - Principal payment
  - Interest payment
  - Remaining loan balance
  - Total equity
- Use this to understand how your loan is paid off over time

#### 2. Rent vs Buy Analysis
- Compares costs and benefits of renting versus buying
- Includes:
  - Monthly payment comparison
  - Total cost comparison over time
  - Break-even analysis
  - Investment return metrics

#### 3. Rental Property Analysis
- Analyzes property as an investment
- Shows:
  - Cash flow projections
  - Return on investment (ROI)
  - Cap rate
  - Cash-on-cash return

#### 4. Charts
- Visual representations of:
  - Equity growth over time
  - Monthly payment breakdown
  - Investment returns
  - Value appreciation

### 💡 Tips for Better Analysis

1. **Accurate Inputs**
   - Use real quotes for insurance and property tax
   - Research local rental rates
   - Check current mortgage rates

2. **Conservative Estimates**
   - Use lower appreciation rates
   - Include vacancy rates in rental calculations
   - Budget for maintenance and repairs

3. **Multiple Scenarios**
   - Try different down payment amounts
   - Adjust interest rates
   - Compare different property values

4. **Understanding Results**
   - Focus on total return metrics
   - Consider both cash flow and appreciation
   - Account for tax implications
   - Factor in time value of money

### ⚠️ Important Considerations

- All calculations are estimates
- Market conditions can vary
- Consult with financial advisors
- Results don't guarantee future performance

## 🛠 Technical Documentation

### Project Structure
```
src/
├── app/              # Next.js app router components
├── components/       # React components
│   ├── charts/      # Chart-related components
│   ├── forms/       # Form components
│   ├── tables/      # Table components
│   ├── layout/      # Layout components
│   └── common/      # Shared/reusable components
├── config/          # Configuration files
├── constants/       # Constants and default values
├── hooks/           # Custom React hooks
├── services/        # External services and APIs
├── store/           # Redux store and slices
├── styles/          # Global styles
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

### Key Features

#### Property Analysis
- Interactive property value and loan amount calculations
- Customizable down payment and loan terms
- Real-time amortization schedule
- Property appreciation projections

#### Financial Analysis
- Monthly and annual cash flow calculations
- Rental income projections with customizable growth rates
- Expense tracking (property tax, insurance, maintenance)
- Equity growth analysis

#### Visualization
- Dynamic charts for property value and equity growth
- Cash flow analysis visualizations
- Loan amortization breakdown
- Interactive data switching between different metrics

#### User Interface
- Modern, responsive Material UI design
- Dark theme with navy blue (#0a192f) and cyan (#64ffda) accents
- Intuitive slider controls for all inputs
- Detailed tooltips and help text
- Mobile-friendly layout

### State Management
- Uses Redux Toolkit for centralized state management
- Implements memoization for performance optimization
- Provides real-time calculations and updates

### Type Safety
- Comprehensive TypeScript interfaces
- Strict type checking
- Type-safe Redux actions and state

## 🚀 Development

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/real-estate-investment-app.git
cd real-estate-investment-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write clear documentation
- Follow the existing code style

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Original inspiration: [https://main.d3h1lgzt62unld.amplifyapp.com/](https://main.d3h1lgzt62unld.amplifyapp.com/)
- Material UI team for the excellent component library
- Next.js team for the amazing framework
