import { Project, Skill, SocialLink } from './types';

export const PERSONAL_INFO = {
  name: "Sujal Sanjay Chhajed",
  role: "AI Developer & ML Engineer",
  tagline: "Crafting intelligent solutions — from NLP-powered systems to interactive web experiences.",
  bio: "I’m Sujal Sanjay Chhajed! A Computer Science & Engineering student at VIT Chennai with a sprinkle of AI & ML. I describe myself as a sports junkie, movie lover, and proud foodie who loves mixing creativity with code. Whether it’s the roar of an F1 engine or the strategy of a cricket match, I bring that same passion to building tech that matters.",
  email: "sujalchhajed925@gmail.com",
  phone: "+91 9307346453",
  location: "Chennai, India",
  resumeLink: "https://dragonballsuper-1995.github.io/my-portfolio/Assets/Updated%20Resume.pdf"
};

export const SKILLS: Skill[] = [
  { name: "Python", icon: "Snake", level: 95 },
  { name: "Machine Learning", icon: "Brain", level: 90 },
  { name: "NLP", icon: "MessageSquare", level: 85 },
  { name: "Data Analysis", icon: "BarChart", level: 85 },
  { name: "Web Development", icon: "Globe", level: 80 },
  { name: "TensorFlow/PyTorch", icon: "Cpu", level: 85 },
  { name: "SQL", icon: "Database", level: 80 },
  { name: "AI Deployment", icon: "Rocket", level: 75 },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Fantasy Premier League Analytics Hub",
    description: "A fully automated analytics hub that uses Python (Pandas, XGBoost) and GitHub Actions to fetch live FPL data, retrain 5 ML models, and deploy daily player point predictions to a responsive dashboard.",
    tags: ["Python", "Machine Learning", "GitHub Actions", "Pandas", "JavaScript", "Tailwind CSS", "Chart.js"],
    link: "https://dragonballsuper-1995.github.io/Fantasy_Premier_League_Analytics_Hub/",
    github: "https://github.com/Dragonballsuper-1995/Fantasy_Premier_League_Analytics_Hub",
    image: "./Assets/fpl-analytics-hub.webp",
    category: "Data Science"
  },
  {
    id: 2,
    title: "Urban Escapade",
    description: "Interactive website showcasing India's diverse states with cultural, regional, and geographical information.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    link: "https://siddharth-y26.github.io/Urban-Escapade/",
    github: "https://github.com/Siddharth-Y26/Urban-Escapade",
    image: "./Assets/urban-escapade.webp",
    category: "Web Dev"
  },
  {
    id: 3,
    title: "YouTube Title & Description Generator",
    description: "AI-powered tool to automatically generate SEO-friendly YouTube titles, descriptions, hashtags, and tags from any video script or summary.",
    tags: ["T5 Model", "BART", "RAKE Algorithm", "Gradio UI"],
    link: "https://huggingface.co/spaces/SujalChhajed925/yt-title-desc-generator",
    github: "https://github.com/Dragonballsuper-1995/yt-title-desc-generator",
    image: "./Assets/yt-title-desc-generator.webp",
    category: "AI/ML"
  },
  {
    id: 4,
    title: "AnomLogBERT",
    description: "Deep learning framework for automated anomaly detection in system log files using transformer-based models.",
    tags: ["all-MiniLM-L12-v2", "Transformers", "Log Analysis", "Anomaly Detection"],
    link: "https://huggingface.co/spaces/ayush-shukla135/AnomLogBert",
    github: "https://github.com/Ayushs135/AnomLogBert",
    image: "./Assets/anomlogbert.webp",
    category: "AI/ML"
  }
];

export const SOCIALS: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/Dragonballsuper-1995/", iconName: "Github" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/sujalchhajed925/", iconName: "Linkedin" },
  { platform: "Instagram", url: "https://www.instagram.com/sujalchhajed925/", iconName: "Instagram" },
  { platform: "Twitter", url: "https://x.com/sujal_chhajed", iconName: "Twitter" },
];