import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";``

export const DATA = {
  name: "Shiv",
  initials: "S",
  url: "https://shiv-resume.vercel.app",
  location: "Indore, M.P. India",
  locationLink: "https://maps.app.goo.gl/BzS6oHJd7NmYMWRm8",
  description:
    "Full-Stack Developer | React.js | Node.js | Next.js",
  summary:
    "Passionate Full-Stack Developer with a Bachelor's in Technology and specialized training from Physics Wallah. Currently contributing to innovative projects at Mind Coders, I excel in React.js, Node.js, and Next.js. My strengths include problem-solving, quick adaptation to new technologies, and a commitment to continuous learning. With a track record of delivering impactful solutions, I'm eager to take on new challenges and contribute my skills to a dynamic team. Let's connect and explore how I can add value to your organization!",
  avatarUrl: "/myImg.jpg",
  skills: [
    "React.js",
    "Next.js",
    "Javascript",
    "Typescript",
    "Node.js",
    "Nest.js",
    "Express.js",
    "MongoDB",
    "AWS",
    "Docker",
    "HTML/CSS",
    "Tailwind",
    "Bootstrap",
    "Material UI",
    "Git/Github",
    "Postman",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
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
      // X: {
      //   name: "X",
      //   url: "https://dub.sh/dillion-twitter",
      //   icon: Icons.x,

      //   navbar: true,
      // },
      // Youtube: {
      //   name: "Youtube",
      //   url: "https://dub.sh/dillion-youtube",
      //   icon: Icons.youtube,
      //   navbar: true,
      // },
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
      company: "WebiWork Technologies Pvt. Ltd.",
      href: "https://webiwork.com/",
      badges: [],
      location: "Indore, M.P., India",
      title: "Full Stack Developer",
      logoUrl: "https://webiwork.com/wp-content/uploads/2022/11/cropped-webiwork_Logo-32x32.png",
      start: "May 2025",
      end: "Present",
      description:
        "Full Stack Developer at WebiWork Technologies, building and optimizing scalable web applications using Next.js, React.js, Node.js, Express.js, and Tailwind css improving load performance by 20%, reducing integration issues by  10%, and enhancing code quality and development speed through reusable components and efficient backend API architecture.",
    },
    {
      company: "Mindcoders",
      href: "https://www.mindcoders.in/",
      badges: [],
      location: "Indore, M.P., India",
      title: "Software Developer",
      logoUrl: "https://www.mindcoders.in/assets/img/fevicon 01.webp",
      start: "October 2023",
      end: "April 2025",
      description:
        "Led frontend development initiatives for over five web applications, optimizing performance and usability, resulting in a 20% improvement in load times and user satisfaction. Developed responsive web UIs using HTML, CSS, JavaScript, React, and Tailwind, reducing design-to-development time by 15%. Collaborated with cross-functional teams, including both frontend and backend, to ensure seamless integration, which led to a 10% decrease in API-related issues. Implemented industry best practices and emerging technologies, enhancing overall code quality by 25%.",
    },
    {
      company: "Mindcoders",
      href: "https://www.mindcoders.in/",
      badges: [],
      location: "Indore, M.P., India",
      title: "Software Developer Intern",
      logoUrl: "https://www.mindcoders.in/assets/img/fevicon 01.webp",
      start: "July 2023",
      end: "September 2023",
      description:
        "",
    },
  ],
  education: [
    {
      school: "Acropolis Institute of Technology and Research",
      href: "https://aitr.ac.in/",
      degree: "Bachelor of Technology",
      logoUrl: "https://aitr.ac.in/wp-content/uploads/2023/03/cropped-White-Logos-for-Acropolis-32x32.png",
      start: "2019",
      end: "2023",
    },
  ],
  projects: [
    {
      title: "Maidway",
      href: "https://new.maidway.com/",
      dates: "",
      active: true,
      description:
        `Developed an online cleaning service platform with role-based access for Admin, Provider, and
Customer. Customers can book cleaning appointments based on service needs, while providers
manage requests and schedules. Admin handles overall service operations and user management.`,
      technologies: [
        "Replit",
        "React + Vite",
        "TailwindCSS",
        "PostgreSQL",
        "Express.js",
        "Node.js",
        "Vapi"
      ],
      links: [
        {
          type: "Website",
          href: "https://new.maidway.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/maidway.png",
      video:
        "",
    },
    {
      title: "QReady",
      href: "https://new.maidway.com/",
      dates: "",
      active: true,
      description:
        `Worked on a digital QR-enabled platform that replaces manual clipboard tracking with automated asset/room management for fire, hospitality, and facility departments. Reduced operational inefficiencies by enabling fast QR scans, real-time logging, and accurate reporting across industries.`,
      technologies: [
        "Next.js",
        "Bootstrap",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Dockers",
        "AWS"
      ],
      links: [
        // {
        //   type: "Website",
        //   href: "https://myqready.com/",
        //   icon: <Icons.globe className="size-3" />,
        // },
      ],
      image: "/mqready.png",
      video:
        "",
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
        "TailwindCSS",
        "Redux",
        "MongoDB",
        "Express.js",
        "Node.js",
      ],
      links: [
      //   {
      //     type: "Website",
      //     href: "https://panel.shribalajilaserdentalclinic.com",
      //     icon: <Icons.globe className="size-3" />,
      //   },
      ],
      image: "/dental.png",
      video:
        "",
    },
    {
      title: "E-Auction",
      href: "https://e-lite.co.in/",
      dates: "",
      active: true,
      description:
        `A real-time bidding web application that delivers instant bid updates and automated auction management. The
platform supports dedicated dashboards for Admin, Client, and Bidders, ensuring secure and transparent
bidding experiences.`,
      technologies: [
        "React.js",
        "TailwindCSS",
        "Redux",
        "MongoDB",
        "Express.js",
        "Node.js",
        "Hostinger (VPS)",
        "Socket.IO",
        "Node-Cron"
      ],
      links: [
        {
          type: "Website",
          href: "https://e-lite.co.in/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/elite.png",
      video:
        "",
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
        "TailwindCSS",
        "Redux Toolkit",
        "Node.js",
        "Express.js",
        "MongoDB",
        "RazorPay",
      ],
      links: [
      //   {
      //     type: "Website",
      //     href: "https://lms.mindcoders.in/",
      //     icon: <Icons.globe className="size-3" />,
      //   },
      //   // {
      //   //   type: "Source",
      //   //   href: "https://github.com/dillionverma/llm.report",
      //   //   icon: <Icons.github className="size-3" />,
      //   // },
      ],
      image: "/lms.png",
      video: "",
    },
    {
      title: "Hello Educators",
      href: "https://www.helloeducators.in/",
      dates: "",
      active: true,
      description:
        "Hello Educators is a leading digital educational platform that offers the best-quality lectures at home from India’s best teachers, lecturers, professors, experienced professional educators, and relevant postgraduates, i.e., mathematicians, engineers, scientists, and doctors.",
      technologies: [
        "React.js",
        "TailwindCSS",
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
        // {
        //   type: "Source",
        //   href: "https://github.com/magicuidesign/magicui",
        //   icon: <Icons.github className="size-3" />,
        // },
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
        "TailwindCSS",
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
      video:
        "",
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
        "TailwindCSS",
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
      video:
        "",
    },
    {
      title: "Mindbulls",
      href: "https://mindbulls.com/",
      dates: "",
      active: true,
      description:
        "Developed and delivered comprehensive financial trading education at Mindbulls Trading Institute, empowering individuals to earn high incomes by investing in the stock market since 2020.",
      technologies: [
        "React.js",
        "TailwindCSS",
      ],
      links: [
        {
          type: "Website",
          href: "https://mindbulls.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/Mockup-Mindbulls.jpg",
      video:
        "",
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
      video:
        "",
    },
    // {
    //   title: "Researchinn",
    //   href: "https://researchinn.com/",
    //   dates: "",
    //   active: true,
    //   description:
    //     "Contributed to a leading stock market tips agency by providing well-researched alerts and market recommendations, enabling clients to trade effortlessly and effectively.",
    //   technologies: [
    //     "HTML/CSS",
    //     "Bootstrap",
    //     "Php",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://researchinn.com/",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //   ],
    //   image: "/researchinn.png",
    //   video:
    //     "",
    // },
    // {
    //   title: "Finoledge",
    //   href: "https://www.finoledge.com/",
    //   dates: "",
    //   active: true,
    //   description:
    //     "Simplified financial market knowledge at Finoledge, India's most trusted financial education platform, empowering individuals to invest confidently with comprehensive 360-degree training.",
    //   technologies: [
    //     "HTML/CSS",
    //     "Bootstrap",
    //     "Php",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://www.finoledge.com/",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //   ],
    //   image: "/Finoledge.png",
    //   video:
    //     "",
    // },
  ],
  hackathons: [
    // {
    //   title: "Hack Western 5",
    //   dates: "November 23rd - 25th, 2018",
    //   location: "London, Ontario",
    //   description:
    //     "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
    //   links: [],
    // },
    // {
    //   title: "Hack The North",
    //   dates: "September 14th - 16th, 2018",
    //   location: "Waterloo, Ontario",
    //   description:
    //     "Developed a mobile application which delivers university campus wide events in real time to all students.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
    //   links: [],
    // },
    // {
    //   title: "FirstNet Public Safety Hackathon",
    //   dates: "March 23rd - 24th, 2018",
    //   location: "San Francisco, California",
    //   description:
    //     "Developed a mobile application which communcicates a victims medical data from inside an ambulance to doctors at hospital.",
    //   icon: "public",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/firstnet.png",
    //   links: [],
    // },
    // {
    //   title: "DeveloperWeek Hackathon",
    //   dates: "February 3rd - 4th, 2018",
    //   location: "San Francisco, California",
    //   description:
    //     "Developed a web application which aggregates social media data regarding cryptocurrencies and predicts future prices.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/developer-week.jpg",
    //   links: [
    //     {
    //       title: "Github",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/cryptotrends/cryptotrends",
    //     },
    //   ],
    // },
    // {
    //   title: "HackDavis",
    //   dates: "January 20th - 21st, 2018",
    //   location: "Davis, California",
    //   description:
    //     "Developed a mobile application which allocates a daily carbon emission allowance to users to move towards a sustainable environment.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-davis.png",
    //   win: "Best Data Hack",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2018/white.svg",
    //   links: [
    //     {
    //       title: "Devpost",
    //       icon: <Icons.globe className="h-4 w-4" />,
    //       href: "https://devpost.com/software/my6footprint",
    //     },
    //     {
    //       title: "ML",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/Wallet6/my6footprint-machine-learning",
    //     },
    //     {
    //       title: "iOS",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/Wallet6/CarbonWallet",
    //     },
    //     {
    //       title: "Server",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/Wallet6/wallet6-server",
    //     },
    //   ],
    // },
    // {
    //   title: "ETH Waterloo",
    //   dates: "October 13th - 15th, 2017",
    //   location: "Waterloo, Ontario",
    //   description:
    //     "Developed a blockchain application for doctors and pharmacists to perform trustless transactions and prevent overdosage in patients.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/eth-waterloo.png",
    //   links: [
    //     {
    //       title: "Organization",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/ethdocnet",
    //     },
    //   ],
    // },
    // {
    //   title: "Hack The North",
    //   dates: "September 15th - 17th, 2017",
    //   location: "Waterloo, Ontario",
    //   description:
    //     "Developed a virtual reality application allowing users to see themselves in third person.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
    //   links: [
    //     {
    //       title: "Streamer Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/justinmichaud/htn2017",
    //     },
    //     {
    //       title: "Client Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/dillionverma/RTSPClient",
    //     },
    //   ],
    // },
    // {
    //   title: "Hack The 6ix",
    //   dates: "August 26th - 27th, 2017",
    //   location: "Toronto, Ontario",
    //   description:
    //     "Developed an open platform for people shipping items to same place to combine shipping costs and save money.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-6ix.jpg",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
    //   links: [
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/ShareShip/ShareShip",
    //     },
    //     {
    //       title: "Site",
    //       icon: <Icons.globe className="h-4 w-4" />,
    //       href: "https://share-ship.herokuapp.com/",
    //     },
    //   ],
    // },
    // {
    //   title: "Stupid Hack Toronto",
    //   dates: "July 23rd, 2017",
    //   location: "Toronto, Ontario",
    //   description:
    //     "Developed a chrome extension which tracks which facebook profiles you have visited and immediately texts your girlfriend if you visited another girls page.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/stupid-hackathon.png",
    //   links: [
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/nsagirlfriend/nsagirlfriend",
    //     },
    //   ],
    // },
    // {
    //   title: "Global AI Hackathon - Toronto",
    //   dates: "June 23rd - 25th, 2017",
    //   location: "Toronto, Ontario",
    //   description:
    //     "Developed a python library which can be imported to any python game and change difficulty of the game based on real time emotion of player. Uses OpenCV and webcam for facial recognition, and a custom Machine Learning Model trained on a [Kaggle Emotion Dataset](https://www.kaggle.com/c/challenges-in-representation-learning-facial-expression-recognition-challenge/leaderboard) using [Tensorflow](https://www.tensorflow.org/Tensorflow) and [Keras](https://keras.io/). This project recieved 1st place prize at the Global AI Hackathon - Toronto and was also invited to demo at [NextAI Canada](https://www.nextcanada.com/next-ai).",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/global-ai-hackathon.jpg",
    //   win: "1st Place Winner",
    //   links: [
    //     {
    //       title: "Article",
    //       icon: <Icons.globe className="h-4 w-4" />,
    //       href: "https://syncedreview.com/2017/06/26/global-ai-hackathon-in-toronto/",
    //     },
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/TinySamosas/",
    //     },
    //   ],
    // },
    // {
    //   title: "McGill AI for Social Innovation Hackathon",
    //   dates: "June 17th - 18th, 2017",
    //   location: "Montreal, Quebec",
    //   description:
    //     "Developed realtime facial microexpression analyzer using AI",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/ai-for-social-good.jpg",
    //   links: [],
    // },
    // {
    //   title: "Open Source Circular Economy Days Hackathon",
    //   dates: "June 10th, 2017",
    //   location: "Toronto, Ontario",
    //   description:
    //     "Developed a custom admin interface for food waste startup <a href='http://genecis.co/'>Genecis</a> to manage their data and provide analytics.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/open-source-circular-economy-days.jpg",
    //   win: "1st Place Winner",
    //   links: [
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/dillionverma/genecis",
    //     },
    //   ],
    // },
    // {
    //   title: "Make School's Student App Competition 2017",
    //   dates: "May 19th - 21st, 2017",
    //   location: "International",
    //   description: "Improved PocketDoc and submitted to online competition",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/make-school-hackathon.png",
    //   win: "Top 10 Finalist | Honourable Mention",
    //   links: [
    //     {
    //       title: "Medium Article",
    //       icon: <Icons.globe className="h-4 w-4" />,
    //       href: "https://medium.com/make-school/the-winners-of-make-schools-student-app-competition-2017-a6b0e72f190a",
    //     },
    //     {
    //       title: "Devpost",
    //       icon: <Icons.globe className="h-4 w-4" />,
    //       href: "https://devpost.com/software/pocketdoc-react-native",
    //     },
    //     {
    //       title: "YouTube",
    //       icon: <Icons.youtube className="h-4 w-4" />,
    //       href: "https://www.youtube.com/watch?v=XwFdn5Rmx68",
    //     },
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/dillionverma/pocketdoc-react-native",
    //     },
    //   ],
    // },
    // {
    //   title: "HackMining",
    //   dates: "May 12th - 14th, 2017",
    //   location: "Toronto, Ontario",
    //   description: "Developed neural network to optimize a mining process",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-mining.png",
    //   links: [],
    // },
    // {
    //   title: "Waterloo Equithon",
    //   dates: "May 5th - 7th, 2017",
    //   location: "Waterloo, Ontario",
    //   description:
    //     "Developed Pocketdoc, an app in which you take a picture of a physical wound, and the app returns common solutions or cures to the injuries or diseases.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/waterloo-equithon.png",
    //   links: [
    //     {
    //       title: "Devpost",
    //       icon: <Icons.globe className="h-4 w-4" />,
    //       href: "https://devpost.com/software/pocketdoc-react-native",
    //     },
    //     {
    //       title: "YouTube",
    //       icon: <Icons.youtube className="h-4 w-4" />,
    //       href: "https://www.youtube.com/watch?v=XwFdn5Rmx68",
    //     },
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/dillionverma/pocketdoc-react-native",
    //     },
    //   ],
    // },
    // {
    //   title: "SpaceApps Waterloo",
    //   dates: "April 28th - 30th, 2017",
    //   location: "Waterloo, Ontario",
    //   description:
    //     "Developed Earthwatch, a web application which allows users in a plane to virtually see important points of interest about the world below them. They can even choose to fly away from their route and then fly back if they choose. Special thanks to CesiumJS for providing open source world and plane models.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/space-apps.png",
    //   links: [
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/dillionverma/earthwatch",
    //     },
    //   ],
    // },
    // {
    //   title: "MHacks 9",
    //   dates: "March 24th - 26th, 2017",
    //   location: "Ann Arbor, Michigan",
    //   description:
    //     "Developed Super Graphic Air Traffic, a VR website made to introduce people to the world of air traffic controlling. This project was built completely using THREE.js as well as a node backend server.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/mhacks-9.png",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
    //   links: [
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/dillionverma/threejs-planes",
    //     },
    //   ],
    // },
    // {
    //   title: "StartHacks I",
    //   dates: "March 4th - 5th, 2017",
    //   location: "Waterloo, Ontario",
    //   description:
    //     "Developed at StartHacks 2017, Recipic is a mobile app which allows you to take pictures of ingredients around your house, and it will recognize those ingredients using ClarifAI image recognition API and return possible recipes to make. Recipic recieved 1st place at the hackathon for best pitch and hack.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/starthacks.png",
    //   win: "1st Place Winner",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
    //   links: [
    //     {
    //       title: "Source (Mobile)",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/mattBlackDesign/recipic-ionic",
    //     },
    //     {
    //       title: "Source (Server)",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/mattBlackDesign/recipic-rails",
    //     },
    //   ],
    // },
    // {
    //   title: "QHacks II",
    //   dates: "February 3rd - 5th, 2017",
    //   location: "Kingston, Ontario",
    //   description:
    //     "Developed a mobile game which enables city-wide manhunt with random lobbies",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/qhacks.png",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
    //   links: [
    //     {
    //       title: "Source (Mobile)",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/dillionverma/human-huntr-react-native",
    //     },
    //     {
    //       title: "Source (API)",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/mattBlackDesign/human-huntr-rails",
    //     },
    //   ],
    // },
    // {
    //   title: "Terrible Hacks V",
    //   dates: "November 26th, 2016",
    //   location: "Waterloo, Ontario",
    //   description:
    //     "Developed a mock of Windows 11 with interesting notifications and functionality",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/terrible-hacks-v.png",
    //   links: [
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/justinmichaud/TerribleHacks2016-Windows11",
    //     },
    //   ],
    // },
    // {
    //   title: "Portal Hackathon",
    //   dates: "October 29, 2016",
    //   location: "Kingston, Ontario",
    //   description:
    //     "Developed an internal widget for uploading assignments using Waterloo's portal app",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/portal-hackathon.png",
    //   links: [
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/UWPortalSDK/crowmark",
    //     },
    //   ],
    // },
  ],
} as const;
