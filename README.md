# Ustaad - Service Marketplace

Ustaad is a minimalistic, modern service marketplace connecting skilled workers with clients. Built with a focus on clean, card-based UI and excellent user experience, drawing inspiration from platforms like Upwork and Fiverr.

## Features

*   **Minimalistic UI**: Clean, card-based feed design avoiding generic tables and tiles.
*   **Modern Tech Stack**: Built with React, Vite, and Tailwind CSS 4.0.
*   **Routing**: Client-side routing managed by React Router DOM.
*   **Typography**: Uses Plus Jakarta Sans for a premium, readable feel.
*   **Customizable Theme**: A central primary color configuration via Tailwind CSS variables that can be easily updated.

## Getting Started

### Prerequisites

*   Node.js (v18+ recommended)
*   npm (or yarn/pnpm)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/hamzak22/ustaad-devops.git
    cd ustaad-devops
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

### Tech Stack Details

*   **Framework**: React (Vite template)
*   **Styling**: Tailwind CSS v4.0 (`@tailwindcss/vite` plugin)
*   **Routing**: `react-router-dom`
*   **Icons**: `react-icons`
*   **Fonts**: Plus Jakarta Sans (Google Fonts)

## Theme Configuration

The primary theme colors and fonts are configured centrally in `src/index.css`. You can easily change the primary color by updating the `--color-primary-*` CSS variables in the `@theme` block.

```css
@theme {
  --color-primary-500: #3b82f6; /* Change this to update the primary base color */
  /* ... */
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

# Change 1
# Change 2
# Change 3
# c4