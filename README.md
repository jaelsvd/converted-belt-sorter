# Converted Belt Sorter 🤖

A smart sorting system that automates package handling based on dimensions and weight. This project simulates a robot arm that determines the appropriate stacking location for boxes based on their volume and weight characteristics.

## 🚀 Features

- Real-time package classification
- Volume-based sorting
- Weight-based sorting
- Three sorting categories: STANDARD, SPECIAL, and REJECTED
- Intuitive user interface

## 🛠 Technology Stack

- **Frontend Framework:** React 19.1.0
- **Language:** TypeScript 5.8.3
- **Styling:** Tailwind CSS 3.4.17
- **Build Tool:** Vite 7.0.4
- **Testing:**
    - Jest
    - React Testing Library
- **Development Tools:**
    - ESLint
    - PostCSS
    - Autoprefixer

## 📋 Prerequisites

- Node.js (LTS version recommended)
- npm or yarn package manager
- Git

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/converted-belt-sorter.git
   cd converted-belt-sorter/sortbot-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
    - Navigate to `http://localhost:5173`

## 🧪 Running Tests
1. **Setup directory**
    ```bash
   cd converted-belt-sorter/sortbot-ui
   ```
2. **Run tests**
    ```bash
   npm test
   ```

## 📏 Sorting Rules

- **Bulky Package:**
    - Volume ≥ 1,000,000 cm³, OR
    - Any dimension ≥ 150 cm

- **Heavy Package:**
    - Mass ≥ 20 kg

- **Classification:**
    - **REJECTED:** Both bulky AND heavy
    - **SPECIAL:** Either bulky OR heavy
    - **STANDARD:** Neither bulky nor heavy

## 👨‍💻 Development

- Recommended IDEs:
    - JetBrains Rider
    - Visual Studio Code

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 Author

**Jael Saavedra**
- Website: [jaelsvd.dev](https://jaelsvd.dev)
- GitHub: [@jaelsvd](https://github.com/jaelsvd)
