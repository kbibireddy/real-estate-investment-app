# Real Estate Investment Analysis Tool

A comprehensive web application for analyzing real estate investments, built with Next.js and Material UI. This tool helps investors make informed decisions by providing detailed financial analysis and visualizations.

## Features

### Property Analysis
- Interactive property value and loan amount calculations
- Customizable down payment and loan terms
- Real-time amortization schedule
- Property appreciation projections

### Financial Analysis
- Monthly and annual cash flow calculations
- Rental income projections with customizable growth rates
- Expense tracking (property tax, insurance, maintenance)
- Equity growth analysis

### Visualization
- Dynamic charts for property value and equity growth
- Cash flow analysis visualizations
- Loan amortization breakdown
- Interactive data switching between different metrics

### User Interface
- Modern, responsive Material UI design
- Dark theme with navy blue (#0a192f) and cyan (#64ffda) accents
- Intuitive slider controls for all inputs
- Detailed tooltips and help text
- Mobile-friendly layout

## Getting Started

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

## Technology Stack

- **Framework**: Next.js 14
- **UI Library**: Material UI (MUI)
- **State Management**: Redux Toolkit
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript

## Project Structure

```
src/
├── app/              # Next.js app router components
├── components/       # Reusable UI components
├── config/          # Configuration files
├── store/           # Redux store and slices
├── styles/          # Global styles
└── utils/           # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Original inspiration: [https://main.d3h1lgzt62unld.amplifyapp.com/](https://main.d3h1lgzt62unld.amplifyapp.com/)
- Material UI team for the excellent component library
- Next.js team for the amazing framework
