# ⚡ SUJAL.DEV | Neo-Brutalist AI Portfolio

![Neo-Brutalism Banner](public/banner.webp)

<div align="center">
    <div style="display:inline-block;padding:16px 20px;border:4px solid #050505;background:#FAFAFA;box-shadow:8px 8px 0 #050505;max-width:540px;font-family:'Space Mono','Courier New',monospace;text-transform:uppercase;letter-spacing:0.5px;">
        <span style="color:#050505;">Tech Nerd</span>
        <span style="padding:2px 6px;margin:0 6px;border:3px solid #050505;background:#FFDE59;box-shadow:4px 4px 0 #050505;display:inline-block;color:#050505;">with</span>
        <span style="color:#050505;">a Human Touch.</span>
    </div>

</div>
<div align="center" style="margin-top:16px;">
    <a href="https://sujal-chhajed.vercel.app/" aria-label="Live Demo">
        <img src="https://img.shields.io/badge/LIVE_DEMO-%23FF66C4?style=for-the-badge&labelColor=050505&logo=rocket&logoColor=FFDE59" alt="Live Demo" style="box-shadow:6px 6px 0 #050505;border:3px solid #050505;" />
    </a>
</div>

<div align="center" style="margin:20px auto 8px auto;max-width:600px;">
    <div style="padding:12px 16px;border:3px solid #050505;background:#FFDE59;box-shadow:6px 6px 0 #050505;font-family:'Space Mono','Courier New',monospace;text-transform:uppercase;letter-spacing:0.6px;font-weight:700;color:#050505;">
        NEO-BRUTALIST RULE: Loud colors, hard borders, zero fluff.
    </div>
</div>

---

## 👨‍💻 About Me

Hi, I'm **Sujal Sanjay Chhajed**, a Computer Science & Engineering student at **VIT Chennai** specializing in **Artificial Intelligence & Machine Learning**.

I describe myself as a code-blooded sports junkie. When I'm not training deep learning models or building full-stack applications, you'll find me cheering for Ferrari in F1, analyzing cricket strategies, or re-watching Dragon Ball Z. 

I believe in building technology that isn't just functional but has **personality**—bridging the gap between raw data and human experience.

*   **📍 Location**: Chennai, India
*   **🎓 Focus**: NLP, Computer Vision, and Interactive Web Experiences
*   **🏎️ Passion**: Formula 1, Cricket, & Anime

---

## 🚀 What This Project Does

This portfolio rejects standard corporate minimalism in favor of **Neo-Brutalism**—a design style characterized by bold colors, hard borders, high contrast, and raw typography. 

Beyond the aesthetics, this is a technical demonstration of **AI Integration** and **Modern Frontend Architecture**.

### Key Features

*   **🤖 Gemini-Powered AI Twin**: A RAG-enabled chatbot that answers questions about me as if it *were* me. It has context on my resume, projects, and personality traits.
*   **🎨 Neo-Brutalist Design System**: Custom Tailwind configuration for hard shadows, bold borders, and vibrant "Neo" color palettes.
*   **⌨️ Command Palette (`Cmd+K`)**: A developer-centric navigation system accessible via keyboard shortcuts.
*   **⚡ Performance Optimized**: Uses `requestAnimationFrame` for custom cursors and canvas backgrounds to maintain 60FPS.
*   **📱 Responsive & Accessible**: Fully functional on mobile with touch-optimized navigation and ARIA attributes.

---

## 🛠️ Tools & Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18 (Vite)<br/>[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#) [![Vite](https://img.shields.io/badge/Vite-18181B?style=for-the-badge&logo=vite&logoColor=646CFF)](#) |
| **Language** | TypeScript (Strict Mode)<br/>[![TypeScript](https://img.shields.io/badge/TypeScript-0F172A?style=for-the-badge&logo=typescript&logoColor=3178C6)](#) |
| **Styling** | Tailwind CSS (Custom Theme Config)<br/>[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0B1120?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)](#) |
| **AI Model** | Google Gemini 1.5/2.5 Flash (via Backend Proxy)<br/>[![Google Gemini](https://img.shields.io/badge/Google_Gemini-1A73E8?style=for-the-badge&logo=google&logoColor=FFFFFF)](#) |
| **Animations** | Framer Motion & CSS Keyframes<br/>[![Framer Motion](https://img.shields.io/badge/Framer_Motion-000000?style=for-the-badge&logo=framer&logoColor=FF4154)](#) |
| **Icons** | Lucide React<br/>[![Lucide](https://img.shields.io/badge/Lucide-111827?style=for-the-badge&logo=lucide&logoColor=FACC15)](#) |
| **Deployment** | Vercel<br/>[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=FFFFFF)](#) |

---

## 💻 How to Run It

This project uses a split architecture. The frontend (this repo) communicates with a separate backend server for secure AI processing.

### Prerequisites
*   Node.js (v18+)
*   npm or yarn

### Steps

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Dragonballsuper-1995/my-portfolio.git
    cd my-portfolio
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start the Development Server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173`.

> **Note**: You do **not** need an API key to run this frontend. It is pre-configured to communicate with my public backend (`gemini-backend-portfolio.vercel.app`) which handles the API key security and rate limiting.

---

## 🧠 What I Learned

Building this project was an exercise in balancing **creative expression** with **software engineering principles**.

1.  **System Prompt Engineering**: 
    *   *Challenge*: Making an AI sound like me, not a robot.
    *   *Solution*: I crafted a detailed system instruction set that injects my personality quirks (F1 fan, foodie) into the model's context window, allowing it to "roleplay" effectively.

2.  **Neo-Brutalist Design Implementation**:
    *   *Challenge*: Implementing "hard" design (no blur, 100% opacity shadows) in a way that feels interactive, not broken.
    *   *Solution*: Created custom Tailwind utility classes for `box-shadow` offsets and hover states to create tactile feedback without relying on standard material design tropes.

3.  **Performance at Scale**:
    *   *Challenge*: Running canvas animations and custom cursors without blocking the main thread.
    *   *Solution*: Utilized React's `useRef` for direct DOM manipulation where React's render cycle was too slow, and offloaded heavy visual calculations to CSS animations where possible.

4.  **Architecture**:
    *   *Challenge*: Securing the Gemini API key.
    *   *Solution*: Decoupled the AI logic into a separate backend service, ensuring the frontend remains lightweight and credentials are never exposed to the client.

---

## 📬 Contact

*   **Email**: [sujalchhajed925@gmail.com](mailto:sujalchhajed925@gmail.com)
*   **GitHub**: [Dragonballsuper-1995](https://github.com/Dragonballsuper-1995/)
*   **LinkedIn**: [Sujal Sanjay Chhajed](https://www.linkedin.com/in/sujalchhajed925/)

---
<div align="center">
  <i>Built with 💻, ☕, and a lot of Ferrari hope by Sujal.</i>
</div>
