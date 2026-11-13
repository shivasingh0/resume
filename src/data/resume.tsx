import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Shiv Rajawat",
  initials: "SR",
  url: "https://shiv-resume.vercel.app",
  location: "Indore, M.P.",
  locationLink: "https://maps.app.goo.gl/BzS6oHJd7NmYMWRm8",
  description: "Full Stack AI Engineer",
  summary:
    "Full Stack AI Engineer with 3+ years of experience building scalable web applications, backend services, and AI-powered business applications using Python, React.js, Next.js, Node.js, and AWS. Built an internal RAG assistant on Amazon Bedrock serving 400+ users, migrated an RCM platform's authentication from Firebase to AWS Cognito, and delivered production LMS, CRM, and SaaS platforms. Hands-on with OpenAI and Gemini APIs, LangChain, vector search (pgvector, Pinecone), AI voice agents, and n8n workflow automation.",
  avatarUrl: "/myImg.jpg",
  skills: [
    // Languages
    "JavaScript",
    "TypeScript",
    "Python",
    "SQL",
    "HTML",
    "CSS",

    // Frameworks & Libraries
    "React.js",
    "Next.js",
    "Redux",
    "Node.js",
    "Express.js",
    "NestJS",
    "FastAPI",
    "Tailwind CSS",
    "Mongoose",

    // AI & Automation
    "Amazon Bedrock",
    "OpenAI API",
    "Google Gemini API",
    "RAG Pipelines",
    "Embeddings",
    "Prompt Engineering",
    "AI Agent Workflows",
    "LangChain",
    "CrewAI",
    "Vapi Voice AI",
    "n8n",
    "Make.com",
    "Zapier",

    // Databases & Vector DBs
    "MongoDB",
    "PostgreSQL",
    "MSSQL",
    "pgvector",
    "Pinecone",
    "ChromaDB",

    // Cloud & DevOps
    "AWS",
    "AWS Bedrock",
    "AWS Cognito",
    "Secrets Manager",
    "EC2",
    "S3",
    "Lambda",
    "ECS",
    "ECR",
    "CloudFormation",
    "Docker",
    "CI/CD",
    "Git/GitHub",

    // Tools & Practices
    "Postman",
    "Figma",
    "Jira",
    "Agile",
    "MVC",
    "VS Code",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
  ],
  contact: {
    email: "shiva2003rajawat@gmail.com",
    tel: "+91-7007094154",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/shivasingh0",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/shivamangal/",
        icon: Icons.linkedin,
        navbar: true,
      },
      whatsapp: {
        name: "Call",
        url: "https://api.whatsapp.com/send?phone=7007094154",
        icon: Icons.whatsapp,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:shiva2003rajawat@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Svast Healthcare Technologies",
      href: "https://www.svasthealthtech.com/",
      badges: ["React.js", "Next.js", "Amazon Bedrock", "AWS Cognito", "Python", "FastAPI", "pgvector"],
      location: "Indore, M.P.",
      title: "Associate Software Developer",
      logoUrl: "/svast.jpg",
      start: "August 2026",
      end: "Present",
      description:
        "- Migrated the authentication flow of the internal Revenue Cycle Management (RCM) platform from Firebase to AWS Cognito.\n- Built an internal RAG assistant on Amazon Bedrock APIs (Python, FastAPI, pgvector), used by 400+ business stakeholders, billing team members, and other internal teams.\n- Integrated multiple foundation models through Bedrock, including Mistral Large, Llama 3 70B, DeepSeek V3.2, Qwen3 235B A22B, and Kimi K2.5.",
    },
    {
      company: "Webiwork Technologies Pvt. Ltd.",
      href: "https://webiwork.com/",
      badges: ["React.js", "Next.js", "Node.js", "Python", "LangChain", "CrewAI", "n8n"],
      location: "Indore, India",
      title: "Full Stack Developer",
      logoUrl: "https://webiwork.com/wp-content/uploads/2022/11/cropped-webiwork_Logo-32x32.png",
      start: "May 2025",
      end: "August 2026",
      description:
        "- Developed and maintained scalable full-stack applications using React.js, Next.js, Node.js, Express.js, and Python.\n- Built optimized REST APIs, webhooks, and third-party integrations supporting workflow automation and business applications.\n- Built AI-powered proof-of-concepts using OpenAI/Gemini APIs, LangChain, and Retrieval-Augmented Generation (RAG) for intelligent information retrieval.\n- Built n8n automation workflows to integrate business systems, automate notifications, and streamline operational processes.\n- Experimented with AI agent workflows using LangChain and CrewAI for task orchestration and conversational AI use cases.\n- Led backend architecture improvements focused on performance, scalability, and maintainability.\n- Collaborated with cross-functional teams to deliver high-quality, production-ready features.",
    },
    {
      company: "Mind Coders",
      href: "https://www.mindcoders.in/",
      badges: ["React.js", "Redux Toolkit", "LMS", "CRM", "Performance"],
      location: "Indore, India",
      title: "Software Developer",
      logoUrl: "https://www.mindcoders.in/assets/img/fevicon 01.webp",
      start: "October 2023",
      end: "April 2025",
      description:
        "- Built and deployed 5+ production-grade applications, including LMS and CRM platforms.\n- Improved application performance and accessibility using React Profiler and Lighthouse audits, reducing load time.\n- Integrated REST APIs using Redux Toolkit and custom hooks for efficient state management.\n- Developed reusable UI components and a scalable frontend architecture.",
    },
  ],
  education: [
    {
      school: "RGPV University",
      href: "https://aitr.ac.in/",
      degree: "Bachelor of Technology",
      logoUrl: "https://aitr.ac.in/wp-content/uploads/2023/03/cropped-White-Logos-for-Acropolis-32x32.png",
      start: "July 2019",
      end: "May 2023",
    },
  ],
  certificates: [
    {
      name: "Full Stack Web Development",
      date: "May 2023",
      description:
        "Hands-on program covering front-end and back-end development, databases, API integration, and deployment practices.",
    },
  ],
  projects: [
    {
      title: "Enterprise RAG Assistant – Amazon Bedrock",
      href: "#",
      dates: "2026",
      active: true,
      description:
        "- Built an internal retrieval-augmented generation platform that gives business stakeholders and the billing team grounded, context-aware answers from internal knowledge, serving 400+ users.\n- Designed the FastAPI backend with pgvector for embedding storage and semantic search, orchestrating retrieval and response generation through Amazon Bedrock APIs.\n- Enabled access to multiple models (Mistral Large, Llama 3 70B, DeepSeek V3.2, Qwen3 235B A22B, Kimi K2.5) for flexible, task-appropriate responses.",
      technologies: [
        "Python",
        "FastAPI",
        "Amazon Bedrock",
        "pgvector",
        "PostgreSQL",
        "AWS",
      ],
      links: [],
      image: undefined,
      video: "",
    },
    {
      title: "Maidway – AI-Integrated SaaS Platform",
      href: "https://maidway.com/",
      dates: "2025 - 2026",
      active: true,
      description:
        "- Integrated AI voice agents using Vapi to automate customer interactions, appointment scheduling, and booking workflows.\n- Developed conversational AI workflows for customer support, appointment reminders, and service inquiries.\n- Built automation pipelines using Twilio and SendGrid to reduce manual communication and improve operational efficiency.\n- Implemented intelligent scheduling and recurring booking workflows supporting 24/7 service automation.\n- Developed analytics dashboards for business insights and performance monitoring.",
      technologies: [
        "Replit",
        "React + Vite",
        "Tailwind CSS",
        "PostgreSQL",
        "Express.js",
        "Node.js",
        "Vapi",
      ],
      links: [
        {
          type: "Website",
          href: "https://maidway.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/maidway.png",
      video: "",
    },
    {
      title: "AimQTest – Career Guidance & Counselling Platform",
      href: "#",
      dates: "2024 - 2025",
      active: true,
      description:
        "- Built an AI-powered career guidance platform delivering personalized career recommendations from student assessments.\n- Developed scalable REST APIs and backend services for assessments, report generation, and counselling workflows.\n- Implemented real-time counselling with WebSockets to improve student–counselor engagement.\n- Designed recommendation workflows for career guidance and skill development suggestions.\n- Developed reusable React.js components and optimized performance for a seamless user experience.\n- Implemented secure authentication and role-based access control using JWT, with Dockerized services for deployment.",
      technologies: [
        "Python",
        "React.js",
        "Node.js",
        "NestJS",
        "MongoDB",
        "REST APIs",
        "WebSockets",
        "JWT",
        "Docker",
      ],
      links: [],
      image: undefined,
      video: "",
    },
    {
      title: "QReady",
      href: "https://myqready.com/",
      dates: "",
      active: true,
      description:
        "Worked on a digital QR-enabled platform that replaces manual clipboard tracking with automated asset/room management for fire, hospitality, and facility departments. Reduced operational inefficiencies by enabling fast QR scans, real-time logging, and accurate reporting across industries.",
      technologies: [
        "Next.js",
        "Bootstrap",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Docker",
        "AWS",
      ],
      links: [
        {
          type: "Website",
          href: "https://myqready.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/mqready.png",
      video: "",
    },
    {
      title: "Dental CRM",
      href: "https://panel.shribalajilaserdentalclinic.com",
      dates: "",
      active: true,
      description:
        "Dental CRM is a user-friendly software designed to streamline patient management for dental practices, enhancing patient care and operational efficiency.",
      technologies: [
        "React.js",
        "Tailwind CSS",
        "Redux",
        "MongoDB",
        "Express.js",
        "Node.js",
      ],
      links: [],
      image: "/dental.png",
      video: "",
    },
    {
      title: "E-Auction",
      href: "https://e-lite.co.in/",
      dates: "",
      active: true,
      description:
        "A real-time bidding web application that delivers instant bid updates and automated auction management. The platform supports dedicated dashboards for Admin, Client, and Bidders, ensuring secure and transparent bidding experiences.",
      technologies: [
        "React.js",
        "Tailwind CSS",
        "Redux",
        "MongoDB",
        "Express.js",
        "Node.js",
        "Hostinger (VPS)",
        "Socket.IO",
        "Node-Cron",
      ],
      links: [
        {
          type: "Website",
          href: "https://e-lite.co.in/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/elite.png",
      video: "",
    },
    {
      title: "e-Learning Management System",
      href: "https://learning.mindcoders.in/",
      dates: "",
      active: true,
      description:
        "LMS (Learning Management System) Portal is a comprehensive, user-friendly e-learning platform to enhance online education and training experiences.",
      technologies: [
        "React.js",
        "Tailwind CSS",
        "Redux Toolkit",
        "Node.js",
        "Express.js",
        "MongoDB",
        "RazorPay",
      ],
      links: [],
      image: "/lms.png",
      video: "",
    },
    {
      title: "Hello Educators",
      href: "https://www.helloeducators.in/",
      dates: "",
      active: true,
      description:
        "Hello Educators is a leading digital educational platform that offers the best-quality lectures at home from India’s best teachers, lecturers, professors, experienced professional educators, and relevant postgraduates.",
      technologies: [
        "React.js",
        "Tailwind CSS",
        "Redux",
        "MySQL",
        "Node.js",
        "Express.js",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.helloeducators.in/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/Mockup-HelloEducator.jpg",
      video: "",
    },
    {
      title: "Mindcoders",
      href: "https://mindcoders.in",
      dates: "",
      active: true,
      description:
        "Mind Coders is a One Stop for all IT Training Needs! They provide the best training with industry expert trainers.",
      technologies: [
        "React.js",
        "Tailwind CSS",
        "Magic UI",
        "Next.js",
        "RazorPay",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      links: [
        {
          type: "Website",
          href: "https://mindcoders.in",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/mindcoders.png",
      video: "",
    },
    {
      title: "Muhurat Investing",
      href: "https://www.muhuratinvesting.com/",
      dates: "",
      active: true,
      description:
        "Muhurat Investing Investment Advisor – Your Trusted Partner in Financial Success.",
      technologies: [
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.muhuratinvesting.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/Mockup-MuhuratInvesting.jpg",
      video: "",
    },
    {
      title: "Mindbulls",
      href: "https://mindbulls.vercel.app/",
      dates: "",
      active: true,
      description:
        "Developed and delivered comprehensive financial trading education at Mindbulls Trading Institute, empowering individuals to earn high incomes by investing in the stock market since 2020.",
      technologies: [
        "React.js",
        "Tailwind CSS",
      ],
      links: [
        {
          type: "Website",
          href: "https://mindbulls.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/Mockup-Mindbulls.jpg",
      video: "",
    },
    {
      title: "Fourpoints Holidays",
      href: "https://fourpointsholidays.in/",
      dates: "",
      active: true,
      description:
        "Fourpoints Holidays is a professionally managed travel services company. They offer hotel booking services, car and coach rentals in all three divisions of the state of Jammu and Kashmir.",
      technologies: [
        "HTML/CSS",
        "Bootstrap",
        "Php",
      ],
      links: [
        {
          type: "Website",
          href: "https://fourpointsholidays.in/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/fourpointsholidays.png",
      video: "",
    },
  ],
  hackathons: [],
} as const;
