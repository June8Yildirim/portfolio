import type { ProjectDetail } from "~/types/ProjectDetails";

export const projects = [
  {
    id: "0",
    title: "SaveEasy",
    company: "Turina Technologies",
    technologies: [
      "TypeScript",
      "React-Native",
      "Expo",
      "Docker",
      "Git",
      ".NET",
      "MSServer",
    ],
    achievements: [
      "Engineered an AI-powered receipt processing pipeline using [OpenAI/Gemini] and OCR, achieving a 98.5% extraction accuracy rate for key financial fields (Total, Tax, Vendor, Date).",
      "Architected a high-performance reporting engine capable of generating accountant-ready PDF/CSV reports in under 1.5 seconds, even for datasets exceeding 500+ transactions.",
      "Implemented robust data security by securing connection strings through environment variables and applying Row-Level Security (RLS) to ensure users can only access their own financial records.",
      "Apple and Google Play Store.",
    ],
    mainImage: "/images/SaveEasyMain.png",
    images: [
      "/images/SaveEasyMain.png",
      "/images/SaveEasyExp.png",
      "/images/SaveEasyAuth.png",
    ],
    gradient: "from-emerald-600 to-teal-600",
  },
  {
    id: "1",
    title: "VDrivers",
    company: "Turina Technologies",
    technologies: [
      "Spring Boot",
      "Maven",
      "MSSQL",
      "TypeScript",
      "React-Native",
      "Expo",
      "Docker",
      "Git",
      "TanStackQuery",
      "Axios",
    ],
    achievements: [
      "Architected a 3-tier application ecosystem (Driver App, Business App, and Web Admin) using React Native/Expo and Spring Boot, enabling seamless job matching for 100+ concurrent users during peak rush hours.",
      "Engineered a real-time communication layer using Firebase Cloud Messaging (FCM), achieving a 99.9% notification delivery rate and reducing worker response times by 70% (from minutes to seconds).",
      "Developed a high-performance backend with Spring Boot and Maven, implementing RESTful APIs optimized for mobile clients with TanStack Query to ensure data consistency and offline caching.",
      "Optimized mission-critical SQL Server queries for real-time driver availability, reducing database search latency by 45% through the implementation of Stored Procedures and Non-Clustered Indexes.",
    ],
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    id: "3",
    title: "Assignment Organizer",
    company: "Cuneyt Yildirim",
    technologies: [
      "SwiftUI",
      "Swift",
      "CoreData",
      "CloudKit",
      "WidgetKit",
      "UserNotifications",
      "Keychain",
      "CryptoKit",
      "Git",
    ],
    achievements: [
      "Architected a native iOS academic ecosystem using SwiftUI and CoreData, implementing a multi-view organization system that allows students to filter assignments by Date, Priority, Subject, and Completion status.",
      "Engineered a seamless cross-device synchronization layer using NSPersistentCloudKitContainer, ensuring real-time data continuity and conflict resolution across all user devices signed into iCloud.",
      "Developed a high-visibility productivity suite by integrating WidgetKit for 'at-a-glance' home screen tracking and a custom Local Notification system that proactively alerts users to upcoming deadlines.",
      "Secured sensitive student data by implementing a local authentication system using Keychain Services for token storage and CryptoKit for salted password hashing.",
    ],
    gradient: "from-teal-600 to-emerald-600",
    mainImage: "/images/mainScreen.png",
    images: [
      "/images/AssignmentScreen.png",
      "/images/AssignmentDaily2.png",
      "/images/AssignmentSchedule.png",
    ],
  },
  {
    id: "4",
    title: "HabitTracking",
    company: "Cuneyt Yildirim",
    technologies: [
      "SwiftUI",
      "SwiftData",
      "CloudKit",
      "Swift Charts",
      "Combine",
      "WidgetKit",
      "Git",
    ],
    achievements: [
      "Designed a versatile habit-tracking engine supporting six distinct data types (Boolean, Numeric, Duration, Checklist, Streak, Periodic) to accommodate diverse user goals and measurable behavioral changes.",
      "Integrated a sophisticated mood-correlation system featuring 20 distinct emotional states, allowing users to visualize the relationship between mental well-being and habit consistency through interactive charts.",
      "Implemented an advanced visual analytics dashboard using the Swift Charts framework, providing users with heatmaps, trend lines, and completion rate statistics across weekly, monthly, and yearly intervals.",
      "Leveraged SwiftData and CloudKit to build a modern, reactive persistence layer that automates data synchronization while maintaining a zero-latency, offline-first user experience.",
    ],
    gradient: "from-fuchsia-600 to-violet-600",
    mainImage: "/images/HabitMain.png",
    images: [
      "/images/HabitMain.png",
      "/images/HabitMood.png",
      "/images/HabitReport.png",
      "/images/HabitPomodoro.png",
    ],
  },
  {
    id: "5",
    title: "Tutoring Manager",
    company: "Respect Development",
    technologies: [
      "React Native",
      "Expo",
      "Firebase",
      "TanStack Query",
      "Cloud Functions",
      "FCM",
      "Node.js",
    ],
    gradient: "from-cyan-600 to-slate-600",
    achievements: [
      "Architected a real-time session management ecosystem for iOS, Android, and Web, utilizing Firebase Firestore listeners and TanStack Query to achieve near-instant UI updates (under 200ms).",
      "Engineered an automated notification engine using Expo Notifications and Firebase Cloud Messaging, delivering critical session reminders 15 minutes prior to start times.",
      "Developed a secure, server-side student onboarding workflow using Firebase Cloud Functions and the Admin SDK, allowing instructors to manage student credentials without local authentication conflicts.",
      "Implemented a dual-workflow request system (Enrollment & Timeslots) with role-based access control, ensuring distinct, secure experiences for both instructors and students.",
    ],
    images: [
      "/images/TuttorMain.png",
      "/images/TutorWeekschedule.png",
      "/images/TutorThemes.png",
      "/images/TutorSess.png",
      "/images/TutorInst.png",
      "/images/Tutordetailsession.png",
      "/images/TutorProfile.png",
    ],
  },
  {
    title: "Restaurant Project",
    company: "Saadat Development",
    technologies: [
      "TypeScript",
      "ReactJs",
      "NextJs",
      "TailwindCSS",
      "NextAuthJs",
      "LeafletJS",
      "JWT",
      "Git",
    ],
    id: "2",
    achievements: [
      "Optimized delivery logistics by implementing a 'Shortest Path' algorithm, resulting in a 15% improvement in delivery time estimates and a 10% reduction in total fuel/distance costs.",
      "Developed a responsive, mobile-first UI using Tailwind CSS, ensuring consistent branding and high performance across web and mobile platforms.",
      "Designed a scalable NoSQL schema with MongoDB and Mongoose, managing complex data relations between recipes, user geolocation data, and order history. Implemented secure authentication flows integrating NextAuth.js and JWT.",
    ],
    gradient: "from-purple-600 to-pink-600",
    mainImage: "/images/restaurant.gif",
  },
  {
    title: "Budget Manager",
    company: "",
    technologies: ["SwiftUI", "Vision", "CoreData", "iCloudDatabase", "Git"],
    id: "7",
    achievements: [
      "Built SwiftUI budget app with responsive design and custom UI components",
      "Implemented Vision framework for receipt scanning and text recognition",
      "Created CoreData model with iCloud sync for multi-device access",
      "Developed financial dashboards using Swift Charts with animations",
      "Added ML-powered spending insights using CreateML",
      "Integrated biometric authentication and Home Screen widgets",
      "Optimized performance for handling thousands of transactions",
    ],
    gradient: "from-purple-600 to-pink-600",
    images: [
      "/images/BudgetMain.png",
      "/images/BudgetReport.png",
      "/images/BudgetExpense.png",
      "/images/BudgetCategories.png",
    ],
  },
  {
    title: "Camping Project",
    company: "",
    technologies: [
      "JavaScript",
      "ReactJs",
      "LeafletJS",
      "NodeJS",
      "MongoDB",
      "ExpressJS",
      "JWT",
      "Cloudinary",
      "Git",
    ],
    id: "7",
    achievements: [
      "Developed full-stack camping platform using MERN stack (MongoDB, Express, React, Node.js) with RESTful API architecture",
      "Implemented interactive map interface using LeafletJS with campground clustering, custom markers, and geolocation features",
      "Built user authentication system with JWT tokens, encrypted passwords, and role-based access control (user/admin)",
      "Created campground CRUD operations allowing users to create, read, update, and delete camping locations with images",
      "Designed responsive React frontend with reusable components, React Router for navigation, and Context API for state management",
      "Implemented image upload functionality with Cloudinary integration for storing and optimizing campground photos",
      "Developed review system allowing users to rate campgrounds and leave comments with star ratings",
      "Built search and filtering functionality for campgrounds by location, amenities, price range, and ratings",
      "Implemented pagination and infinite scroll for better performance with large campground datasets",
      // "Created admin dashboard for managing users, campgrounds, and reviews with moderation capabilities",
      "Optimized MongoDB queries with indexing and aggregation pipelines for faster campground searches",
      // "Implemented email notifications for booking confirmations, review responses, and password resets",
      // "Deployed full-stack application using AWS EC2/Docker or Heroku with CI/CD pipeline using GitHub Actions",
    ],
    gradient: "from-purple-600 to-pink-600",
    images: ["/images/camping1.gif", "/images/camping2.gif"],
  },
  {
    title: "Hotel Management System",
    company: "Personal Project (5 Years)",
    technologies: [
      "Node.js",
      "Express",
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "JWT",
      "NextAuth",
      "React Native",
      "Expo",
      "Redux",
      "Redux Sagas",
      "TailwindCSS",
      "Docker",
      "Nginx",
      "Husky",
      "Jest",
    ],
    id: "8",
    achievements: [
      "Architected a 6-application ecosystem — Express backend, Admin portal, Owner portal, Hotel portal, Agency portal, and a React Native mobile app — all orchestrated via Docker Compose with Nginx reverse proxy.",
      "Built a shared Express/MongoDB REST API (port 4000) serving all 4 Next.js portals with centralized JWT auth, role management, and booking/room logic.",
      "Engineered granular RBAC across the agency→hotel→branch hierarchy, enabling fine-grained permission assignment per user per branch.",
      "Developed a customer-facing React Native/Expo mobile app with Redux + Redux Sagas for async state, supporting auth, hotel discovery, room booking, and favourites.",
      "Implemented Husky pre-commit hooks, Jest test suites across all portals, and Nginx routing for all 4 web portals under a single domain.",
    ],
    gradient: "from-indigo-600 to-blue-600",
  },
  {
    title: "Family Tree",
    company: "Personal Project",
    technologies: [
      "React",
      "TypeScript",
      "D3.js",
      "TanStack Router",
      "TanStack Query",
      "TailwindCSS",
      "Vite",
    ],
    id: "9",
    achievements: [
      "Built an interactive family tree visualization using D3.js SVG rendering with custom multi-generational layout algorithm supporting marriage connections and sibling grouping.",
      "Implemented zoom, pan, and drag controls via D3 zoom behavior allowing users to navigate large family trees seamlessly.",
      "Designed a unified tree builder that resolves parent-child relationships bidirectionally through both explicit children arrays and fatherId/motherId references.",
      "Integrated TanStack Router and TanStack Query for type-safe routing and server-state management across the family member CRUD workflows.",
    ],
    gradient: "from-green-600 to-teal-600",
  },
  {
    title: "GitHub Dev Tracker",
    company: "Personal Project",
    technologies: [
      "React Router",
      "TypeScript",
      "GitHub REST API",
      "GitHub GraphQL API",
      "Recharts",
      "TailwindCSS",
      "Docker",
    ],
    id: "10",
    achievements: [
      "Built a GitHub OAuth SSR dashboard using React Router with server-side session management, fetching live contribution data via both REST and GraphQL APIs.",
      "Implemented a contribution heatmap rendering 52 weeks of daily activity with color-coded intensity levels and month/day axis labels.",
      "Engineered a streak calculation algorithm that correctly handles current-day and yesterday edge cases across the full contribution calendar.",
      "Visualized developer insights with Recharts: contributions breakdown (pie), top repositories by commits (bar), and language distribution (pie).",
    ],
    gradient: "from-slate-600 to-gray-700",
  },
  {
    title: "Spaced Repetition iOS",
    company: "Cuneyt Yildirim",
    technologies: [
      "SwiftUI",
      "Swift",
      "CoreData",
      "CloudKit",
      "WidgetKit",
      "Gemini AI",
      "LaTeX",
      "UserNotifications",
      "Git",
    ],
    id: "11",
    achievements: [
      "Implemented a full Spaced Repetition System (SRS) algorithm with four review queues — Critical, Soon, Stable, and Mastered — each backed by separate CoreData entities.",
      "Engineered five card types: FlashCard, True/False, Multiple Choice, Note, and Fill-in-the-Blank, each with a distinct backside interaction model.",
      "Integrated Gemini AI (GeminiService) for AI-powered card generation from text or images, including camera capture and image card support.",
      "Added LaTeX rendering, Markdown import/export, WidgetKit home-screen widget, achievement system, 7 color themes, and local push notifications.",
    ],
    gradient: "from-violet-600 to-purple-700",
  },
  {
    title: "Chores Auction iOS",
    company: "Cuneyt Yildirim",
    technologies: [
      "SwiftUI",
      "Swift",
      "CoreData",
      "CloudKit",
      "Git",
    ],
    id: "12",
    achievements: [
      "Built a household chore management app using CloudKit public database for real-time team sharing without a custom backend.",
      "Implemented team share codes allowing households to join a shared workspace where chores are visible and assignable across all members.",
      "Designed CoreData models with teamId and assignedPerson fields enabling per-team chore ownership and local-first offline access.",
      "Shipped full privacy policy compliance with data-minimization patterns using CloudKit's public record zones.",
    ],
    gradient: "from-orange-600 to-amber-600",
  },
];

export const projectDetail: ProjectDetail[] = [
  {
    id: "0",
    app_identity: {
      name: "SaveEasy",
      developer: "Turina Tech",
      platforms: [
        "Apple App Store",
        "Google Play Store",
        "React Native",
        "Expo",
      ],
      url: "https://apps.apple.com/ca/app/saveeasy/id6738876717",
      tagline: "Personal finance and expense management application",
    },
    core_purpose: {
      mission:
        "Bridge the gap between daily spending and long-term financial organization.",
      problem_solved: [
        "Receipt clutter",
        "Expense confusion",
        "Manual data entry",
      ],
      positioning:
        "Digital financial assistant for real-time tracking and automated processing.",
    },
    key_features: [
      {
        title: "AI-Powered Receipt Processing",
        description:
          "Utilizes AI to extract price, date, and merchant details from photos of physical receipts.",
        automation_level: "High",
      },
      {
        title: "Real-Time Expense Tracking",
        description:
          "Live dashboard with spending visualization and categorization (e.g., Food, Transport, Rent).",
        benefit: "Identifies high-level spending patterns.",
      },
      {
        title: "Hassle-Free Tax Preparation",
        description:
          "Categorization of receipts for deductions and generation of reports for accountants.",
        export_formats: ["PDF", "Spreadsheet"],
      },
      {
        title: "Multi-Device Synchronization",
        description:
          "Cloud-based backup allowing seamless transition between iPhone, Mac, and iPad.",
        storage_type: "Cloud-synced",
      },
      {
        title: "Regional Customization",
        description:
          "Supports specific fields like Tax1 and Tax2 for regions with multiple sales taxes.",
        localizations: [
          "Currency",
          "Tax Compliance",
          "Country-specific selection",
        ],
      },
    ],
    user_experience: {
      design_philosophy: "Quick and Clean",
      workflow_steps: [
        "Open the app",
        "Snap photo or upload file",
        "Confirm AI-extracted data",
        "Log expense and discard physical receipt",
      ],
    },
    target_audience: [
      {
        persona: "The Tax-Conscious Professional",
        use_case: "Business expense reimbursements and tax write-offs.",
      },
      {
        persona: "The Organized Budgeter",
        use_case: "Monthly cash flow overview without manual typing.",
      },
      {
        persona: "The Paper-Hater",
        use_case: "Eliminating physical receipt storage.",
      },
    ],
    security_and_privacy: {
      data_encryption: "Industry-standard for data in transit",
      authentication_methods: ["Sign in with Apple", "Google Login"],
      data_integrity: "Secure financial record keeping",
    },
    summary:
      "SaveEasy is a productivity tool for the wallet that utilizes AI to remove the manual labor of data entry, providing a professional-grade reporting system.",
  },
  {
    id: "1",
    app_identity: {
      name: "VDrivers",
      developer: "Turina Technologies",
      platforms: [
        "Apple App Store",
        "Google Play Store",
        "React Native",
        "Expo",
      ],
      url: null, // Add URL if available
      tagline:
        "Scalable logistics and driver-on-demand orchestration ecosystem",
    },
    core_purpose: {
      mission:
        "Streamline the connection between businesses and drivers through real-time job matching.",
      problem_solved: [
        "High worker response latency",
        "Inefficient manual dispatching",
        "Lack of real-time driver visibility",
      ],
      positioning:
        "A 3-tier enterprise ecosystem for high-concurrency logistics management.",
    },
    key_features: [
      {
        title: "Real-Time Dispatching Engine",
        description:
          "Utilizes Firebase Cloud Messaging (FCM) to push job alerts to drivers instantly.",
        automation_level: "High",
      },
      {
        title: "Mission-Critical Backend",
        description:
          "Spring Boot architecture optimized with stored procedures for ultra-low latency searches.",
        benefit: "Reduces search latency by 45% during peak rush hours.",
      },
      {
        title: "Triple-App Ecosystem",
        description:
          "Dedicated interfaces for Drivers, Business Clients, and Web Administrators.",
        components: ["Driver App", "Business App", "Web Admin Portal"],
      },
      {
        title: "Offline-Ready Data Sync",
        description:
          "Implemented TanStack Query for robust client-side caching and data consistency.",
        storage_type: "Local-first / Cloud-synced",
      },
      {
        title: "Containerized Infrastructure",
        description:
          "Docker-based deployment ensuring environment parity across CI/CD pipelines.",
        dev_ops: ["Docker", "Maven", "Git"],
      },
    ],
    user_experience: {
      design_philosophy: "Latency-First & Responsive",
      workflow_steps: [
        "Business posts a job requirement",
        "AI-driven logic identifies available drivers",
        "Drivers receive instant push notification",
        "Real-time tracking and job completion",
      ],
    },
    target_audience: [
      {
        persona: "Logistics Managers",
        use_case: "Coordinating 100+ concurrent drivers during rush periods.",
      },
      {
        persona: "On-Demand Drivers",
        use_case: "Receiving and accepting jobs within seconds via mobile.",
      },
      {
        persona: "System Administrators",
        use_case:
          "Monitoring system health and driver availability across the region.",
      },
    ],
    security_and_privacy: {
      data_encryption:
        "Secure RESTful API communication with token-based authentication",
      authentication_methods: ["JWT", "OAuth 2.0 Integration"],
      data_integrity: "Enterprise-grade MSSQL ACID compliance",
    },
    summary:
      "VDrivers is a high-performance logistics platform that reduced worker response times by 70% through a custom real-time communication layer and optimized SQL architecture.",
  },
  {
    id: "2",
    app_identity: {
      name: "Restaurant Project",
      developer: "",
      platforms: ["React"],
      url: null, // Add URL if available
      tagline:
        "High-performance food delivery and logistics orchestration platform",
    },
    core_purpose: {
      mission:
        "Revolutionize local food delivery through algorithmic optimization and seamless geospatial tracking.",
      problem_solved: [
        "Inaccurate delivery estimates",
        "Inefficient delivery routing",
        "Fragmented user and order management",
      ],
      positioning:
        "A full-stack Next.js solution prioritizing logistics efficiency and user geolocation accuracy.",
    },
    key_features: [
      {
        title: "Logistics Optimization Engine",
        description:
          "Implemented a custom 'Shortest Path' algorithm to calculate the most efficient routes between vendors and customers.",
        automation_level: "High",
        impact:
          "15% faster delivery estimates and 10% reduction in fuel costs.",
      },
      {
        title: "Geospatial Integration",
        description:
          "Integrated LeafletJS for real-time geolocation tracking and interactive map interfaces for both customers and drivers.",
        technology: "LeafletJS",
      },
      {
        title: "Secure Auth Architecture",
        description:
          "Advanced authentication layer combining NextAuth.js for session management with JWT for secure API communication.",
        security_type: "Token-based",
      },
      {
        title: "Scalable Data Modeling",
        description:
          "Engineered a high-performance NoSQL schema to handle complex relations between recipes, orders, and user history.",
        database: "MongoDB / Mongoose",
      },
      {
        title: "Mobile-First Design",
        description:
          "Leveraged Tailwind CSS for a fully responsive UI that maintains 100% brand consistency across all device resolutions.",
        styling: "TailwindCSS",
      },
    ],
    user_experience: {
      design_philosophy: "Visual, Intuitive, and Performance-Driven",
      workflow_steps: [
        "User discovers recipes via geolocation-aware listings",
        "Secure checkout with automated route calculation",
        "Real-time order tracking via interactive map",
        "Automated driver dispatch based on shortest-path logic",
      ],
    },
    target_audience: [
      {
        persona: "Hungry Consumers",
        use_case:
          "Discovering local food with highly accurate delivery timing.",
      },
      {
        persona: "Delivery Drivers",
        use_case:
          "Accessing optimized routes to minimize travel time and distance.",
      },
      {
        persona: "Restaurant Partners",
        use_case:
          "Managing high-volume orders with organized recipe and stock relations.",
      },
    ],
    security_and_privacy: {
      data_encryption:
        "JWT-encrypted session tokens and secure HTTPS communication",
      authentication_methods: ["NextAuth.js", "JWT (JSON Web Tokens)"],
      data_integrity: "NoSQL document validation through Mongoose schemas",
    },
    summary:
      "A sophisticated food-tech platform that leverages Next.js and algorithmic routing to optimize delivery logistics, cutting operational costs by 10% while delivering a premium mobile-first user experience.",
  },
  {
    id: "5",
    app_identity: {
      name: "Booking Bee",
      developer: "Respect Development",
      platforms: [
        "Apple App Store",
        "Google Play Store",
        "React Native",
        "Expo",
      ],
      url: "https://bookingbee-lnw2.onrender.com/profile",
      tagline:
        "Comprehensive tutoring session management platform with real-time scheduling and automated notifications",
    },
    core_purpose: {
      mission:
        "Streamline the tutoring experience by connecting instructors and students through intelligent session scheduling, request management, and automated communication.",
      problem_solved: [
        "Fragmented session scheduling and booking workflows",
        "Manual enrollment and timeslot request processes",
        "Lack of automated session reminders and notifications",
        "Inadequate visibility into weekly session calendars",
      ],
      positioning:
        "A full-stack React Native solution leveraging Firebase for real-time data synchronization and Expo for cross-platform deployment, prioritizing seamless instructor-student interaction.",
    },
    key_features: [
      {
        title: "Role-Based Authentication & Access Control",
        description:
          "Firebase Authentication with role-based routing (instructor/student) and secure session management using Expo SecureStore for sensitive credentials.",
        automation_level: "High",
        security_type: "Token-based (Firebase Auth)",
      },
      {
        title: "Dynamic Weekly Session Scheduling",
        description:
          "Multi-view calendar system (Day, 3-Day, Week, Full Week) with real-time session tracking. Instructors can create sessions directly, while students can request enrollment or specific timeslots.",
        automation_level: "High",
        impact:
          "Eliminates manual scheduling conflicts and provides instant visibility into availability.",
      },
      {
        title: "Request Management System",
        description:
          "Dual request workflow: Enrollment Requests (students join instructor classrooms via unique codes) and Timeslot Requests (students book specific time slots). Instructors can approve/reject with optional Zoom link assignment.",
        automation_level: "Medium",
        technology: "Firebase Firestore Real-time Listeners",
      },
      {
        title: "Push Notification Engine",
        description:
          "Expo Notifications integration with automated session reminders (15 minutes before sessions), custom notification creation, and Firebase Cloud Messaging for cross-platform delivery.",
        automation_level: "High",
        technology: "Expo Notifications, Firebase Cloud Messaging",
      },
      {
        title: "Real-Time Data Synchronization",
        description:
          "TanStack React Query hooks with Firestore real-time listeners ensure instant updates across all clients. Optimistic UI updates and intelligent caching reduce network overhead.",
        automation_level: "High",
        technology: "TanStack React Query, Firebase Firestore",
      },
      {
        title: "Zoom Integration",
        description:
          "Direct Zoom link embedding in sessions with one-tap access through Expo Web Browser. Links can be auto-generated or manually assigned by instructors.",
        automation_level: "Medium",
        technology: "Expo Web Browser API",
      },
      {
        title: "Adaptive Theme System",
        description:
          "Context-based theme management with dark/light mode support, system preference detection, and consistent theming across all components using React Context API.",
        automation_level: "Low",
        styling: "Custom Theme Context",
      },
      {
        title: "Firebase Cloud Functions",
        description:
          "Server-side student creation workflow using Firebase Admin SDK, enabling instructors to create student accounts without authentication conflicts.",
        automation_level: "Medium",
        technology: "Firebase Cloud Functions, Admin SDK",
      },
    ],
    user_experience: {
      design_philosophy: "Intuitive, Role-Aware, and Real-Time Responsive",
      workflow_steps: [
        "Users authenticate via Firebase Auth (role detection: instructor/student)",
        "Instructors: Create sessions directly or manage enrollment/timeslot requests",
        "Students: Join classrooms via unique codes or request specific timeslots",
        "Real-time calendar views update automatically as sessions are approved/rejected",
        "Automated push notifications remind users 15 minutes before sessions",
        "One-tap Zoom link access launches sessions directly from the app",
      ],
    },
    target_audience: [
      {
        persona: "Tutoring Instructors",
        use_case:
          "Managing multiple students, scheduling sessions efficiently, approving enrollment and timeslot requests, and tracking weekly availability.",
      },
      {
        persona: "Students Seeking Tutoring",
        use_case:
          "Joining instructor classrooms, requesting specific session times, tracking approved sessions, and receiving automated reminders.",
      },
      {
        persona: "Educational Institutions",
        use_case:
          "Coordinating tutoring programs with centralized session management and real-time communication.",
      },
    ],
    security_and_privacy: {
      data_encryption:
        "Firebase Auth secure token management, Expo SecureStore for sensitive data, HTTPS for all network communication",
      authentication_methods: [
        "Firebase Authentication (Email/Password)",
        "Secure Token Storage (Expo SecureStore)",
        "Role-based Access Control (Instructor/Student)",
      ],
      data_integrity:
        "Firestore security rules for collection-level access control, document validation, and real-time synchronization with conflict resolution",
    },
    summary:
      "A sophisticated tutoring management platform built with React Native/Expo that leverages Firebase's real-time infrastructure and TanStack React Query to deliver seamless session scheduling, automated notifications, and intelligent request workflows. The app eliminates manual coordination overhead while providing instructors and students with instant visibility into their tutoring schedules across iOS, Android, and Web platforms.",
  },
  {
    id: "3",
    app_identity: {
      name: "Assignment Organizer",
      developer: "Cuneyt Yildirim",
      platforms: ["iOS (SwiftUI / Swift)"],
      url: "https://apps.apple.com/ca/app/assignment-organizer/id6757585892",
      tagline:
        "Comprehensive assignment management platform with intelligent scheduling, real-time notifications, and seamless CloudKit synchronization",
    },
    core_purpose: {
      mission:
        "Streamline academic assignment management by providing students with an intuitive platform for tracking deadlines, organizing by subjects, prioritizing tasks, and maintaining schedules with automated reminders and cloud synchronization.",
      problem_solved: [
        "Fragmented assignment tracking across multiple subjects and classes",
        "Manual deadline management and reminder systems",
        "Lack of visual organization by date, priority, and subject",
        "Inadequate schedule integration with assignment deadlines",
        "No cloud synchronization across devices",
        "Limited visibility into upcoming and overdue assignments",
      ],
      positioning:
        "A native iOS application built with SwiftUI and CoreData, leveraging CloudKit for seamless cross-device synchronization, WidgetKit for home screen integration, and local notifications for timely reminders. Designed with a focus on user experience, real-time updates, and comprehensive assignment lifecycle management.",
    },
    key_features: [
      {
        title: "Multi-View Assignment Organization",
        description:
          "Four distinct viewing modes for assignments: By Date (grouped into Overdue, Today, Tomorrow, This Week, Next Week, Later), By Subject/Class (organized by course), By Priority (Critical, High, Medium, Low), and Completed assignments. Real-time filtering and search capabilities across all views.",
        automation_level: "High",
        impact:
          "Eliminates manual organization overhead and provides instant visibility into assignment status across multiple dimensions.",
        technology:
          "SwiftUI @FetchRequest, CoreData predicates, Dictionary grouping algorithms",
      },
      {
        title: "CloudKit Synchronization",
        description:
          "NSPersistentCloudKitContainer integration enables automatic synchronization of assignments, subjects, timetables, and user data across all iOS devices signed into the same iCloud account. Real-time updates with automatic conflict resolution.",
        automation_level: "High",
        impact:
          "Seamless data continuity across iPhone, iPad, and other iOS devices without manual backup/restore processes.",
        technology:
          "CoreData + CloudKit, NSPersistentCloudKitContainer, automatic merging",
      },
      {
        title: "Local Notification System",
        description:
          "Automated notification scheduling 1 hour before assignment due dates. Notifications are automatically cancelled when assignments are marked complete or deleted. System handles authorization requests and manages notification lifecycle.",
        automation_level: "High",
        impact:
          "Proactive deadline reminders prevent missed assignments and improve time management.",
        technology:
          "UserNotifications framework, UNCalendarNotificationTrigger, singleton NotificationManager",
      },
      {
        title: "iOS Widget Extension",
        description:
          "Home screen widget available in Small, Medium, and Large sizes displaying upcoming assignments and deadlines. Shared CoreData access via App Groups enables real-time widget updates. Supports multiple widget families with adaptive layouts.",
        automation_level: "High",
        impact:
          "At-a-glance assignment visibility without opening the app, improving productivity and deadline awareness.",
        technology:
          "WidgetKit, StaticConfiguration, App Groups (group.com.yildirim.AssignmentOrganizer), shared CoreData store",
      },
      {
        title: "Schedule/Timetable Management",
        description:
          "Weekly schedule view with day-by-day timetable visualization. Subjects can have multiple time slots per week. Color-coded schedule blocks with subject information, room numbers, building details, and instructor names. Interactive schedule blocks for viewing subject details.",
        automation_level: "Medium",
        impact:
          "Visual integration of class schedules with assignment tracking provides comprehensive academic overview.",
        technology:
          "SwiftUI custom layout, CoreData Timetable entity, ScheduleItem model",
      },
      {
        title: "Subject/Class Management",
        description:
          "Complete subject lifecycle management with custom colors, room numbers, building locations, instructor names, and timetable association. Subjects can be linked to multiple assignments. Subject-based assignment filtering and organization.",
        automation_level: "Medium",
        impact:
          "Centralized course information management with visual organization capabilities.",
        technology: "CoreData Subject entity, one-to-many relationships",
      },
      {
        title: "Priority-Based Task Management",
        description:
          "Four-tier priority system (Critical, High, Medium, Low) with visual indicators and sorting capabilities. Priority-based grouping and filtering for focused task management. Priority badges and color coding throughout the UI.",
        automation_level: "Medium",
        impact:
          "Enables users to focus on high-priority assignments and manage workload effectively.",
        technology:
          "AssignmentPriority enum, priority-based sorting algorithms",
      },
      {
        title: "Today Screen with Calendar Integration",
        description:
          "Dedicated today view with horizontal calendar scroll and assignment list for selected date. Real-time date selection updates assignment display. Integrated timetable view showing today's classes alongside assignments.",
        automation_level: "Medium",
        impact:
          "Centralized daily view combining schedule and assignments for optimal daily planning.",
        technology:
          "SwiftUI CalendarHorizontalView, SelectedDate observable, date-based filtering",
      },
      {
        title: "Local Authentication System",
        description:
          "Secure user authentication using Keychain Services for token storage. Password hashing with salt using CryptoKit. Support for email/password authentication and Apple Sign In integration. User profiles with customizable colors and information.",
        automation_level: "High",
        security_type: "Keychain-based token storage, salted password hashing",
        technology:
          "KeychainManager, CryptoKit, AuthenticationServices (Apple Sign In), CoreData User entity",
      },
      {
        title: "Adaptive Theme System",
        description:
          "System-wide theme management supporting Light and Dark modes with user preference persistence. Automatic theme detection and manual override capabilities. Consistent theming across all screens and components.",
        automation_level: "Low",
        styling:
          "Theme observable object, UserDefaults persistence, ColorScheme environment",
      },
      {
        title: "Assignment Lifecycle Management",
        description:
          "Complete CRUD operations for assignments with swipe gestures for quick actions (delete, edit, mark complete). Assignment cards with completion checkboxes, strikethrough effects, priority badges, subject tags, and due date indicators. Long-press context menus for additional actions.",
        automation_level: "Medium",
        impact:
          "Intuitive interaction patterns reduce friction in assignment management workflows.",
        technology:
          "SwiftUI gestures, AssignmentCard component, CoreData relationships",
      },
      {
        title: "Search and Filter Capabilities",
        description:
          "Real-time search across assignment titles, notes, and subject names. Search results update dynamically as user types. Works across all assignment view modes (Date, Subject, Priority, Completed).",
        automation_level: "Medium",
        impact:
          "Quick assignment discovery in large datasets improves usability and efficiency.",
        technology:
          "SwiftUI @State search binding, localized case-insensitive string matching",
      },
      {
        title: "App Groups Data Sharing",
        description:
          "Shared CoreData store between main app and widget extension using App Group container (group.com.yildirim.AssignmentOrganizer). Enables real-time data access in widgets without network calls. Automatic migration from default CoreData location.",
        automation_level: "High",
        impact:
          "Seamless widget functionality with live data updates and no performance overhead.",
        technology:
          "App Groups, shared persistent store, NSPersistentStoreDescription migration",
      },
    ],
    user_experience: {
      design_philosophy: "Intuitive, Visual, and Context-Aware",
      workflow_steps: [
        "Users authenticate via local authentication or Apple Sign In",
        "Create and manage subjects/classes with custom colors and details",
        "Add assignments with title, notes, due dates, priorities, and subject association",
        "View assignments in multiple modes: By Date, By Subject, By Priority, or Completed",
        "Navigate Today screen for daily overview of classes and assignments",
        "View weekly schedule with timetable integration",
        "Receive automated notifications 1 hour before assignment deadlines",
        "Mark assignments complete, edit, or delete with swipe gestures",
        "Access assignments from home screen via iOS widget",
        "All data automatically syncs via CloudKit across iOS devices",
      ],
      ui_components: [
        "Custom tab bar navigation (Today, Schedule, Assignments, Settings)",
        "Assignment cards with swipe gestures",
        "Priority badges with color coding",
        "Subject tags and color indicators",
        "Due date badges with relative time display",
        "Floating action button for quick assignment creation",
        "Search bar with real-time filtering",
        "Empty state views with helpful messaging",
        "Toast notifications for user feedback",
        "Horizontal calendar scroll view",
        "Schedule grid with color-coded blocks",
        "Theme-aware gradient backgrounds",
      ],
    },
    technical_architecture: {
      platform: "iOS",
      minimum_deployment: "iOS 18.5",
      framework: "SwiftUI",
      language: "Swift 5.0+",
      data_persistence: {
        primary: "CoreData with CloudKit",
        container: "NSPersistentCloudKitContainer",
        sync_service: "CloudKit (iCloud.com.yildirim.AssignmentOrganizer)",
        local_storage:
          "App Groups container (group.com.yildirim.AssignmentOrganizer)",
        user_preferences: "UserDefaults",
        secure_storage: "Keychain Services",
      },
      observable_objects: [
        "AuthManager - User authentication state",
        "Theme - Theme management and ColorScheme",
        "SelectedAssignment - Currently selected assignment",
        "SelectedDate - Currently selected date",
        "SelectedSubject - Currently selected subject",
        "ToasterVisiblity - Toast notification state",
      ],
      extensions: [
        "Widget Extension (Assignment WidgetExtension) - Home screen widgets",
      ],
    },
    target_audience: [
      {
        persona: "Students (Primary)",
        use_case:
          "Managing academic assignments across multiple subjects, tracking deadlines, organizing by priority, maintaining class schedules, and receiving timely reminders for upcoming due dates.",
      },
      {
        persona: "Academic Professionals",
        use_case:
          "Organizing teaching schedules, tracking assignment submissions, and managing course-related deadlines.",
      },
      {
        persona: "Educational Institutions",
        use_case:
          "Providing students with a centralized assignment management tool that integrates schedules and deadlines.",
      },
    ],
    security_and_privacy: {
      authentication_methods: [
        "Local authentication with Keychain token storage",
        "Apple Sign In (AuthenticationServices)",
        "Salted password hashing (CryptoKit)",
      ],
      data_encryption:
        "Keychain Services for secure credential storage, CloudKit end-to-end encryption for iCloud data",
      data_storage:
        "CoreData with CloudKit sync, App Groups for widget data sharing, UserDefaults for preferences",
      privacy_features: [
        "All data stored locally with optional CloudKit sync",
        "No third-party analytics or tracking",
        "User controls data synchronization via iCloud settings",
        "Secure password storage with industry-standard hashing",
      ],
    },
    notifications: {
      type: "Local Notifications (UserNotifications framework)",
      scheduling: "1 hour before assignment due date",
      content: "Assignment title, due time, subject information",
      management: "Automatic cancellation on assignment completion or deletion",
      authorization: "Runtime permission requests with graceful handling",
    },
    widget_integration: {
      platform: "WidgetKit",
      sizes: ["systemSmall", "systemMedium", "systemLarge"],
      update_frequency: "Automatic (WidgetKit timeline)",
      data_source: "Shared CoreData store via App Groups",
      display_content: "Upcoming assignments, deadlines, closest due dates",
      configuration: "StaticConfiguration",
    },
    ui_features: {
      theming: "Light and Dark mode support with user preference persistence",
      animations:
        "SwiftUI native animations, spring animations, smooth transitions",
      gestures:
        "Swipe to delete/edit, long-press context menus, pull-to-refresh",
      accessibility:
        "SwiftUI accessibility support, system font scaling, color contrast compliance",
      responsive_design:
        "Adaptive layouts for different screen sizes, iPad support",
    },
    data_sync: {
      method: "CloudKit via NSPersistentCloudKitContainer",
      scope: "All CoreData entities (Assignments, Subjects, Timetables, Users)",
      conflict_resolution: "Automatic merging with last-write-wins semantics",
      offline_support: "Full offline functionality with sync when online",
      multi_device:
        "Automatic sync across all iOS devices with same iCloud account",
    },
    development_details: {
      sample_data: "",
      code_organization: [
        "Models/ - CoreData models and business logic",
        "Screens/ - Main screen views (Assignments, Schedule, Today, Settings)",
        "Utils/ - Helper functions and utilities",
        "Models/Observables/ - Observable state management classes",
        "Models/Enums/ - Type definitions and enums",
        "Models/Extensions/ - SwiftUI extensions and custom modifiers",
        "Assignment Widget/ - Widget extension code",
      ],
      design_system:
        "Custom design system inspired by Florencia Yannuzzi design principles",
      testing: "Preview-based development with CoreData preview contexts",
      version_control: "Git-based with Xcode project file management",
    },
    summary:
      "A sophisticated native iOS assignment management application built with SwiftUI and CoreData that leverages CloudKit for seamless cross-device synchronization, WidgetKit for home screen integration, and local notifications for timely reminders. The app provides comprehensive assignment lifecycle management with multiple viewing modes, priority-based organization, schedule integration, and intuitive user interactions. Designed with a focus on user experience, real-time updates, visual organization, and automated workflows to eliminate manual coordination overhead while providing students with instant visibility into their academic assignments across iOS devices.",
  },
  {
    id: "4",
    app_identity: {
      name: "HabitTracking",
      developer: "Cuneyt Yildirim",
      platforms: ["iOS (SwiftUI / SwiftData)"],
      url: "https://apps.apple.com/ca/app/habitizer/id6757522855",
      tagline:
        "Comprehensive habit tracking platform with mood integration, intelligent scheduling, visual analytics, and seamless CloudKit synchronization",
    },
    core_purpose: {
      mission:
        "Empower users to build and maintain positive habits through intuitive tracking, visual progress visualization, mood correlation, and comprehensive analytics. The app provides flexible habit management with multiple tracking types, scheduling options, and detailed insights to support long-term behavioral change.",
      problem_solved: [
        "Fragmented habit tracking across multiple apps and manual systems",
        "Lack of visual progress representation and analytics",
        "Difficulty maintaining consistency without reminders and scheduling",
        "No correlation between mood and habit completion patterns",
        "Limited flexibility in tracking different types of habits (boolean, numeric, duration, etc.)",
        "Inadequate streak tracking and motivation systems",
        "No cloud synchronization across iOS devices",
        "Limited insights into completion rates and trends over time",
      ],
      positioning:
        "A native iOS application built with SwiftUI and SwiftData, leveraging CloudKit for seamless cross-device synchronization. Designed with a focus on flexibility, visual feedback, mood integration, and comprehensive analytics to support users in building lasting habits.",
    },
    key_features: [
      {
        title: "Multi-Type Habit Tracking",
        description:
          "Support for six distinct habit types: Boolean (Yes/No), Numeric (quantifiable values like steps, glasses of water), Duration (time-based tracking), Checklist (multiple subtasks), Streak (consecutive days), and Periodic (weekly/monthly goals). Each type supports custom target values and units.",
        automation_level: "High",
        impact:
          "Enables users to track diverse habits from simple daily tasks to complex measurable goals with appropriate tracking mechanisms.",
        technology:
          "SwiftData @Model, HabitType enum, type-specific completion logic",
      },
      {
        title: "Flexible Scheduling System",
        description:
          "Four frequency options: Daily, Weekly (with custom day selection), Monthly (specific day of month), and Custom (user-defined patterns). Habits support start and end dates, allowing for time-bound habit challenges. Automatic scheduling logic determines when habits appear based on frequency and date ranges.",
        automation_level: "High",
        impact:
          "Provides flexibility for habits that don't follow daily patterns, enabling realistic goal setting and tracking.",
        technology:
          "HabitFrequency enum, WeekDay enum, isScheduledForDate() logic, customFrequencyDays array",
      },
      {
        title: "CloudKit Synchronization",
        description:
          "SwiftData with CloudKit integration enables automatic synchronization of all habit data, completions, moods, and user profiles across all iOS devices signed into the same iCloud account. Real-time updates with automatic conflict resolution.",
        automation_level: "High",
        impact:
          "Seamless data continuity across iPhone, iPad, and other iOS devices without manual backup/restore processes.",
        technology:
          "SwiftData ModelContainer with cloudKitDatabase: .automatic, NSPersistentCloudKitContainer",
      },
      {
        title: "Mood Tracking Integration",
        description:
          "Comprehensive mood tracking with 20 distinct mood types (ecstatic, happy, content, neutral, tired, anxious, sad, angry, sick, stressed, productive, creative, relaxed, grateful, loved, motivated, overwhelmed, lonely, proud, excited, peaceful). Moods can be associated with dates, include optional notes, and are categorized as Positive, Neutral, or Negative. Monthly calendar view for mood visualization.",
        automation_level: "Medium",
        impact:
          "Enables users to correlate mood patterns with habit completion, providing insights into emotional well-being and habit effectiveness.",
        technology:
          "Mood @Model entity, MoodType enum with 20 cases, MonthlyMoodCalendarView, MoodTrendChart",
      },
      {
        title: "Habit Completion System",
        description:
          "Four completion statuses: Completed, Partial, Skipped, and Missed. Each completion can include value tracking, optional notes, and mood association. Automatic streak calculation and longest streak tracking. Completion history stored with timestamps for analytics.",
        automation_level: "High",
        impact:
          "Provides nuanced tracking beyond simple yes/no, allowing for partial completions and better reflection of real-world habit adherence.",
        technology:
          "HabitCompletion @Model, CompletionStatus enum, updateStreak() method, automatic streak calculation",
      },
      {
        title: "Visual Analytics and Reporting",
        description:
          "Comprehensive reporting system with three time periods (Week, Month, Year). Features include: completion rate statistics, mood trend charts, habit completion charts, calendar heatmaps, week/month/year calendar views, streak statistics, and success rate calculations. Repository-style card layout for key metrics.",
        automation_level: "High",
        impact:
          "Provides actionable insights into habit performance, trends, and patterns over time, motivating continued engagement.",
        technology:
          "Swift Charts framework, HeatmapCalendarView, WeekCalendarView, MonthCalendarView, HabitCompletionChart, MoodTrendChart",
      },
      {
        title: "Habit Categories and Organization",
        description:
          "Nine predefined categories: Health, Fitness, Productivity, Learning, Mindfulness, Social, Creativity, Finance, and Other. Each category has associated colors and icons. Habits can be filtered and organized by category. Custom color and icon selection for individual habits.",
        automation_level: "Medium",
        impact:
          "Enables visual organization and quick identification of habit types, improving user experience and habit management.",
        technology:
          "HabitCategory enum, colorHex and icon properties, category-based filtering",
      },
      {
        title: "Habit Status Management",
        description:
          "Five status states: Active, DisActive, Paused, Completed, and Archived. Allows users to temporarily pause habits, mark them as completed, or archive old habits without deletion. Status affects habit visibility and scheduling.",
        automation_level: "Medium",
        impact:
          "Provides lifecycle management for habits, allowing users to adapt their tracking as goals evolve.",
        technology: "HabitStatus enum, status-based filtering in queries",
      },
      {
        title: "Daily Habits Screen",
        description:
          "Home screen showing habits organized by sections: 'This Week' (weekly habits), 'Today' (incomplete daily habits), 'Completed' (completed today), and 'Other Habits' (active but not due today). Real-time filtering based on scheduling logic and completion status.",
        automation_level: "High",
        impact:
          "Provides focused daily view of relevant habits, reducing cognitive load and improving daily engagement.",
        technology:
          "DailyHabitsScreen, HabitRowView, WeeklyHabitRowView, isScheduledForDate() filtering",
      },
      {
        title: "All Habits Management Screen",
        description:
          "Comprehensive list of all active habits with swipe actions for edit and delete. Supports habit creation and editing through AddHabitView. Habit cards display completion status, streaks, and key information.",
        automation_level: "Medium",
        impact:
          "Centralized habit management interface for viewing, editing, and organizing all habits.",
        technology:
          "AllHabitScreen, AddHabitView, swipeActions modifier, HabitRowView",
      },
      {
        title: "Habit Activation Tracking",
        description:
          "Tracks when habits are started/activated on specific dates. Separate from completion tracking, allowing users to record when they begin working on a habit. Supports activation status (activated/deactivated) with date tracking.",
        automation_level: "Medium",
        impact:
          "Provides additional granularity in habit tracking, distinguishing between starting and completing habits.",
        technology:
          "HabitActivation @Model, ActivationStatus enum, activations relationship",
      },
      {
        title: "Statistics and Metrics",
        description:
          "Automatic calculation and tracking of: current streak, longest streak, total completions, total attempts, completion rate, expected vs actual completions for time periods, and progress calculations. Statistics update automatically with each completion.",
        automation_level: "High",
        impact:
          "Provides motivation through visible progress metrics and enables data-driven habit improvement.",
        technology:
          "Computed properties, updateStreak(), getProgress(), getExpectedCompletions(), completionRate calculation",
      },
      {
        title: "Calendar Heatmap Visualization",
        description:
          "Year-view calendar heatmap showing habit completion intensity across days. Color-coded visualization indicates completion frequency and patterns. Supports multiple time period views (week, month, year).",
        automation_level: "High",
        impact:
          "Visual representation of consistency over time, making patterns and gaps immediately apparent.",
        technology:
          "HeatmapCalendarView, YearCalendarGridView, color intensity mapping",
      },
      {
        title: "Mood Calendar View",
        description:
          "Monthly calendar grid displaying mood entries with emoji indicators. Color-coded by mood category. Interactive date selection for viewing and editing mood entries. Shows mood trends and patterns over time.",
        automation_level: "Medium",
        impact:
          "Provides visual overview of emotional patterns and enables quick mood entry and review.",
        technology:
          "MonthlyMoodCalendarView, mood color mapping, date-based mood queries",
      },
      {
        title: "Habit Templates System",
        description:
          "Support for habit templates (HabitTemplate entity) enabling users to create reusable habit configurations. Templates can be used to quickly create new habits with predefined settings.",
        automation_level: "Low",
        impact:
          "Reduces friction in habit creation by allowing users to save and reuse common habit configurations.",
        technology: "HabitTemplate @Model entity",
      },
      {
        title: "User Profile Management",
        description:
          "UserProfile entity for storing user-specific information and preferences. Supports personalization and user data management.",
        automation_level: "Low",
        impact: "Enables personalization and future multi-user support.",
        technology: "UserProfile @Model entity",
      },
      {
        title: "Sample Data Seeding",
        description:
          "Development feature that automatically loads sample habits and mood entries for testing and demonstration. Includes comprehensive sample data with various habit types, categories, and completion histories.",
        automation_level: "High",
        impact:
          "Facilitates development, testing, and provides users with example data to understand app capabilities.",
        technology:
          "DataSeeder singleton, UserDefaults flag tracking, sample data generation",
      },
      {
        title: "Adaptive Theme System",
        description:
          "System-wide theme management supporting Light and Dark modes. Custom color extensions for background, borders, and accent colors. Theme-aware UI components throughout the app.",
        automation_level: "Low",
        impact:
          "Provides comfortable viewing experience in any lighting condition and respects user system preferences.",
        technology:
          "Color extensions (Color+Ext.swift), colorScheme environment, backgroundPrimary/backgroundTertiary helpers",
      },
      {
        title: "Habit Reminders (Infrastructure)",
        description:
          "Infrastructure for reminder scheduling with reminderTime and isReminderEnabled properties. HabitReminder entity exists for future notification implementation.",
        automation_level: "Low",
        status: "Infrastructure ready, implementation pending",
        impact:
          "Will enable proactive habit reminders to improve completion rates.",
        technology:
          "HabitReminder entity, reminderTime property, isReminderEnabled flag",
      },
      {
        title: "Habit Tags System",
        description:
          "HabitTag entity for categorizing and organizing habits with custom tags. Supports flexible tagging beyond predefined categories.",
        automation_level: "Low",
        impact:
          "Enables additional organization and filtering capabilities for users with many habits.",
        technology: "HabitTag @Model entity",
      },
    ],
    user_experience: {
      design_philosophy: "Intuitive, Visual, and Data-Driven",
      workflow_steps: [
        "Users launch app and see Daily Habits screen with today's relevant habits",
        "Create new habits via Add Habit button, selecting type, category, frequency, and customization options",
        "View habits organized by sections: This Week, Today, Completed, Other Habits",
        "Complete habits by tapping habit rows, entering values for quantifiable habits",
        "Track mood daily via Mood screen with emoji selection and optional notes",
        "View all habits in dedicated All Habits screen with edit/delete swipe actions",
        "Review comprehensive analytics in Reports screen with charts, heatmaps, and statistics",
        "Navigate between Week, Month, and Year views for different time perspectives",
        "All data automatically syncs via CloudKit across iOS devices",
      ],
      ui_components: [
        "Tab bar navigation (Home, Habits, Mood, Reports)",
        "Habit row views with completion checkboxes and status indicators",
        "Weekly habit row views for multi-day habits",
        "Mood selection sheet with emoji grid",
        "Monthly mood calendar with color-coded entries",
        "Calendar heatmap views for year visualization",
        "Week and month calendar grid views",
        "Repository-style stat cards for key metrics",
        "Line charts for completion and mood trends",
        "Floating action buttons for quick habit creation",
        "Swipe actions for edit and delete",
        "Empty state views with helpful messaging",
        "Theme-aware backgrounds and color schemes",
      ],
    },
    technical_architecture: {
      platform: "iOS",
      minimum_deployment: "iOS 18.5+",
      framework: "SwiftUI",
      language: "Swift 5.0+",
      data_persistence: {
        primary: "SwiftData with CloudKit",
        container: "ModelContainer with cloudKitDatabase: .automatic",
        sync_service: "CloudKit (automatic iCloud sync)",
        local_storage: "SwiftData local store",
        user_preferences: "UserDefaults",
        sample_data_flag: "UserDefaults key: hasLoadedSampleData_v4",
      },
      swiftdata_entities: [
        {
          name: "Habit",
          attributes: [
            "id (UUID)",
            "name (String)",
            "habitDescription (String?)",
            "category (HabitCategory)",
            "frequency (HabitFrequency)",
            "status (HabitStatus)",
            "type (HabitType)",
            "entries ([Date])",
            "targetValue (Int)",
            "unit (String?)",
            "isQuantifiable (Bool)",
            "reminderTime (Date?)",
            "isReminderEnabled (Bool)",
            "customFrequencyDays ([WeekDay]?)",
            "monthlyDay (Int?)",
            "colorHex (String)",
            "icon (String)",
            "createdAt (Date)",
            "updatedAt (Date)",
            "startDate (Date)",
            "endDate (Date?)",
            "notes (String?)",
            "lastCompletedDate (Date?)",
            "currentStreak (Int)",
            "longestStreak (Int)",
            "totalCompletions (Int)",
            "totalAttempts (Int)",
          ],
          relationships: [
            "completions ([HabitCompletion]?) - cascade delete",
            "activations ([HabitActivation]?) - cascade delete",
          ],
          key_methods: [
            "isScheduledForDate(_ date: Date) -> Bool",
            "isDueToday -> Bool",
            "completeToday(value:notes:mood:)",
            "skipToday()",
            "updateStreak()",
            "getCompletionStatus(for date: Date) -> CompletionStatus?",
            "getProgress(for period: DateInterval) -> Double",
            "getExpectedCompletions(for period: DateInterval) -> Int",
          ],
        },
        {
          name: "HabitCompletion",
          attributes: [
            "id (UUID)",
            "date (Date)",
            "value (Int)",
            "status (CompletionStatus)",
            "notes (String?)",
            "mood (Int?)",
          ],
          relationships: ["habit (Habit?)"],
        },
        {
          name: "HabitActivation",
          attributes: ["id (UUID)", "date (Date)", "status (ActivationStatus)"],
          relationships: ["habit (Habit?)"],
        },
        {
          name: "Mood",
          attributes: [
            "id (UUID)",
            "moodDate (Date)",
            "moodType (MoodType)",
            "note (String?)",
            "createdAt (Date)",
            "updatedAt (Date?)",
          ],
          relationships: [],
        },
        {
          name: "HabitTag",
          attributes: ["id (UUID)", "name (String)", "color (String?)"],
          relationships: [],
        },
        {
          name: "HabitTemplate",
          attributes: [
            "id (UUID)",
            "name (String)",
            "description (String?)",
            "category (HabitCategory)",
            "frequency (HabitFrequency)",
            "type (HabitType)",
          ],
          relationships: [],
        },
        {
          name: "UserProfile",
          attributes: [
            "id (UUID)",
            "name (String)",
            "email (String?)",
            "createdAt (Date)",
          ],
          relationships: [],
        },
        {
          name: "EmojiItem",
          attributes: [
            "id (UUID)",
            "symbol (String)",
            "timestamp (Date)",
            "title (String)",
            "color (String)",
            "category (String)",
          ],
          relationships: [],
        },
      ],
      enums: [
        {
          name: "HabitCategory",
          cases: [
            "health",
            "fitness",
            "productivity",
            "learning",
            "mindfulness",
            "social",
            "creativity",
            "finance",
            "other",
          ],
          properties: ["displayName", "icon", "color"],
        },
        {
          name: "HabitFrequency",
          cases: ["daily", "weekly", "monthly", "custom"],
          properties: ["displayName"],
        },
        {
          name: "HabitType",
          cases: [
            "boolean",
            "numeric",
            "duration",
            "checklist",
            "streak",
            "periodic",
          ],
          properties: ["displayName"],
        },
        {
          name: "HabitStatus",
          cases: ["disactive", "active", "paused", "completed", "archived"],
          properties: ["displayName", "color"],
        },
        {
          name: "CompletionStatus",
          cases: ["completed", "partial", "skipped", "missed"],
          properties: ["displayName", "color"],
        },
        {
          name: "MoodType",
          cases: [
            "ecstatic",
            "happy",
            "content",
            "neutral",
            "tired",
            "anxious",
            "sad",
            "angry",
            "sick",
            "stressed",
            "productive",
            "creative",
            "relaxed",
            "grateful",
            "loved",
            "motivated",
            "overwhelmed",
            "lonely",
            "proud",
            "excited",
            "peaceful",
          ],
          properties: ["emoji", "name", "color", "category"],
        },
        {
          name: "MoodCategory",
          cases: ["positive", "neutral", "negative"],
        },
        {
          name: "WeekDay",
          cases: [
            "sunday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
          ],
          raw_values: [1, 2, 3, 4, 5, 6, 7],
          properties: ["displayName", "shortName"],
        },
        {
          name: "TimePeriod",
          cases: ["week", "month", "year"],
        },
        {
          name: "ActivationStatus",
          cases: ["activated", "deactivated"],
          properties: ["displayName"],
        },
      ],
      observable_objects: ["DataSeeder - Sample data management singleton"],
      extensions: [],
    },
    target_audience: [
      {
        persona: "Habit Builders (Primary)",
        use_case:
          "Individuals seeking to build and maintain positive habits across various life domains (health, fitness, productivity, learning, mindfulness). Users who want visual progress tracking, mood correlation, and data-driven insights to support long-term behavioral change.",
      },
      {
        persona: "Wellness Enthusiasts",
        use_case:
          "Users focused on holistic wellness who want to track habits alongside mood patterns to understand the relationship between activities and emotional well-being.",
      },
      {
        persona: "Productivity Seekers",
        use_case:
          "Professionals and students tracking productivity habits, learning goals, and time management with detailed analytics and progress visualization.",
      },
      {
        persona: "Fitness Trackers",
        use_case:
          "Fitness enthusiasts tracking workout routines, nutrition habits, and health metrics with quantifiable tracking and streak motivation.",
      },
    ],
    security_and_privacy: {
      data_encryption:
        "CloudKit end-to-end encryption for iCloud data, SwiftData local encryption",
      data_storage:
        "SwiftData with CloudKit sync, UserDefaults for preferences",
      privacy_features: [
        "All data stored locally with optional CloudKit sync",
        "No third-party analytics or tracking",
        "User controls data synchronization via iCloud settings",
        "Data remains on device and user's iCloud account",
      ],
    },
    data_sync: {
      method: "CloudKit via SwiftData ModelContainer",
      scope:
        "All SwiftData entities (Habits, Completions, Activations, Moods, Tags, Templates, UserProfile)",
      conflict_resolution:
        "Automatic merging with CloudKit conflict resolution",
      offline_support: "Full offline functionality with sync when online",
      multi_device:
        "Automatic sync across all iOS devices with same iCloud account",
    },
    development_details: {
      code_organization: [
        "Models/ - Core data models and business logic",
        "Models/Habit/ - Habit-related models and enums",
        "Models/Extensions/ - SwiftUI extensions and utilities",
        "Entities/ - SwiftData entity definitions",
        "Screens/ - Main screen views (DailyHabits, AllHabits, Mood, Reports)",
        "Screens/HabitScreenViews/ - Habit-specific UI components",
        "Screens/MoodScreenViews/ - Mood-specific UI components",
        "Screens/ReportScreenView/ - Report and analytics components",
        "Observables/ - Observable state management classes",
      ],
      design_system:
        "Custom color system with theme support, SF Symbols for icons",
      testing:
        "Preview-based development with SwiftData preview contexts, sample data seeding",
      version_control: "Git-based with Xcode project file management",
      sample_data:
        "Comprehensive sample data generation with 30+ sample habits and 30 days of mood entries",
    },
    ui_features: {
      theming: "Light and Dark mode support with custom color extensions",
      animations: "SwiftUI native animations, smooth transitions",
      gestures:
        "Swipe to edit/delete, tap to complete, long-press for context menus",
      accessibility: "SwiftUI accessibility support, system font scaling",
      responsive_design:
        "Adaptive layouts for different screen sizes, iPad support",
    },
    analytics_and_reporting: {
      completion_statistics: {
        metrics: [
          "Completion rate (completed/total expected)",
          "Total completions count",
          "Success rate percentage",
          "Expected vs actual completions",
        ],
        time_periods: ["Week", "Month", "Year"],
        visualizations: ["Line charts", "Bar charts", "Calendar heatmaps"],
      },
      mood_analytics: {
        metrics: [
          "Average mood by category",
          "Mood trends over time",
          "Mood distribution",
          "Mood correlation with habits",
        ],
        visualizations: [
          "Mood trend charts",
          "Monthly mood calendar",
          "Mood stat cards",
        ],
      },
      streak_analytics: {
        metrics: [
          "Current streak per habit",
          "Longest streak per habit",
          "Total combined streaks",
          "Best streak across all habits",
        ],
        visualizations: [
          "Streak indicators on habit cards",
          "Streak statistics cards",
        ],
      },
      calendar_views: {
        week_view:
          "WeekCalendarView - Grid showing habits and completion status for each day of the week",
        month_view:
          "MonthCalendarView - Calendar grid with habit completion indicators",
        year_view:
          "HeatmapCalendarView - Year heatmap showing completion intensity",
      },
    },
    habit_lifecycle: {
      creation: {
        steps: [
          "User taps Add Habit button",
          "Opens AddHabitView sheet",
          "User enters name, description, selects category, type, frequency",
          "Configures target value and unit (if quantifiable)",
          "Sets custom frequency days (if weekly/custom)",
          "Selects color and icon",
          "Sets start date (and optional end date)",
          "Habit created with status 'disactive' or 'active'",
        ],
      },
      activation: {
        description:
          "Habits can be activated/deactivated. Activation creates HabitActivation record. Status can be: active, disactive, paused, completed, archived",
      },
      completion: {
        methods: [
          "completeToday(value:notes:mood:) - Marks habit as completed with optional value, notes, and mood",
          "skipToday() - Marks habit as skipped for today",
          "Automatic status determination: completed if value >= targetValue, otherwise partial",
        ],
        effects: [
          "Creates HabitCompletion record",
          "Updates totalCompletions and totalAttempts",
          "Updates lastCompletedDate",
          "Triggers streak recalculation",
          "Updates updatedAt timestamp",
        ],
      },
      streak_calculation: {
        algorithm: "updateStreak() method:",
        steps: [
          "Sorts completions by date (newest first)",
          "Iterates through completions starting from today",
          "Counts consecutive days with completions",
          "Updates currentStreak",
          "Updates longestStreak if current exceeds previous longest",
        ],
      },
      scheduling_logic: {
        "isScheduledForDate() method": {
          checks: [
            "Date is within habit's startDate and endDate range",
            "Habit status is active or disactive",
            "Frequency-based scheduling:",
            "  - Daily: always true",
            "  - Weekly: checks if date's weekday matches customFrequencyDays",
            "  - Monthly: checks if date's day matches monthlyDay",
            "  - Custom: same as weekly logic",
          ],
        },
      },
    },
    mood_tracking: {
      mood_types: {
        positive: [
          "ecstatic",
          "happy",
          "excited",
          "content",
          "peaceful",
          "relaxed",
          "grateful",
          "loved",
          "proud",
        ],
        neutral: ["neutral", "productive", "creative", "motivated"],
        negative: [
          "tired",
          "anxious",
          "sad",
          "angry",
          "sick",
          "stressed",
          "overwhelmed",
          "lonely",
        ],
      },
      features: [
        "Daily mood entry with emoji selection",
        "Optional notes for mood entries",
        "Monthly calendar visualization",
        "Mood trend charts over time",
        "Mood statistics and averages",
        "Mood association with habit completions (via mood property in HabitCompletion)",
      ],
      ui_components: [
        "MoodSelectionSheet - Emoji grid for mood selection",
        "MoodInputSheet - Note input for mood entries",
        "MonthlyMoodCalendarView - Calendar grid with mood indicators",
        "MoodTrendChart - Line chart showing mood trends",
        "MoodStatCard - Statistics card for mood analytics",
      ],
    },
    reporting_features: {
      stat_cards: [
        "Completion Rate - Shows percentage and count",
        "Average Mood - Displays mood statistics for period",
        "Active Habits - Count of currently active habits",
        "Total Streaks - Sum of all current streaks",
        "Best Streak - Longest streak across all habits",
        "Success Rate - Completion percentage for period",
      ],
      charts: [
        "HabitCompletionChart - Line chart showing completion trends over time",
        "MoodTrendChart - Line chart showing mood patterns",
      ],
      calendar_visualizations: [
        "WeekCalendarView - Week grid with habit completion status",
        "MonthCalendarView - Month calendar with completion indicators",
        "HeatmapCalendarView - Year heatmap with intensity colors",
      ],
      period_selector:
        "Segmented control for switching between Week, Month, Year views",
    },
    summary:
      "A sophisticated native iOS habit tracking application built with SwiftUI and SwiftData that leverages CloudKit for seamless cross-device synchronization. The app provides comprehensive habit lifecycle management with six distinct habit types, flexible scheduling options, mood tracking integration, and detailed analytics. Features include visual progress representation through heatmaps and charts, automatic streak calculation, completion rate statistics, and mood correlation analysis. Designed with a focus on flexibility, visual feedback, and data-driven insights to support users in building and maintaining lasting positive habits across health, fitness, productivity, learning, mindfulness, and other life domains.",
  },
  {
    id: "8",
    app_identity: {
      name: "Hotel Management System",
      developer: "Cuneyt Yildirim",
      platforms: [
        "Web — Admin Portal (Next.js)",
        "Web — Owner Portal (Next.js)",
        "Web — Hotel Portal (Next.js)",
        "Web — Agency Portal (Next.js)",
        "Mobile — React Native / Expo",
        "Backend — Node.js / Express",
        "Infrastructure — Docker / Nginx",
      ],
      url: null,
      tagline: "6-application hotel management ecosystem: 4 Next.js portals + Express API + React Native mobile, orchestrated with Docker Compose and Nginx",
    },
    core_purpose: {
      mission: "Build a full ecosystem covering every stakeholder in the hotel industry — platform admins, hotel owners, hotel-level staff, travel agencies, and end customers — through purpose-built portals backed by a shared REST API.",
      problem_solved: [
        "No single platform covering all hotel stakeholders (admin, owner, hotel, agency, customer) in one ecosystem",
        "Fragmented role and permission management across hotel branches",
        "Lack of agency-hotel relationship tooling with booking visibility",
        "Manual room type and employee management within hotel branches",
        "No mobile customer-facing app connecting to the hotel backend",
        "Complex multi-service deployment requiring manual coordination",
      ],
      positioning: "A production-grade 6-application monorepo spanning 5 years of active development, with a shared Express/MongoDB API at its core, 4 Next.js web portals for distinct user roles, and a React Native mobile app for end customers — all wired together with Docker Compose and Nginx.",
    },
    key_features: [
      {
        title: "Express REST API — Shared Backend (Port 4000)",
        description: "Central Node.js/Express server providing all REST endpoints for every portal. Handles authentication (JWT + bcrypt), hotel/branch/room/booking/employee/department CRUD, subscription management, and audit logging. MongoDB + Mongoose with comprehensive schema validation.",
        automation_level: "High",
        technology: "Node.js, Express, MongoDB, Mongoose, JWT, bcrypt",
      },
      {
        title: "Admin Portal — Platform-Level Control (Port 3001)",
        description: "Next.js dashboard for platform super-admins. Manages all agencies and hotels on the platform, configures global subscription plans and tiers, handles user roles and permissions across all levels, runs data seeders for initial setup, and provides system-wide audit logs.",
        automation_level: "High",
        technology: "Next.js, TypeScript, TailwindCSS, JWT",
      },
      {
        title: "Owner Portal — Hotel Owner Dashboard (Port 3002)",
        description: "Next.js portal for hotel owners. Full management of branches, room types (with image upload via Cloudinary/local), individual rooms and availability, employee accounts, department creation, and granular permission assignment per employee. Owners can configure which staff members access which hotel features.",
        automation_level: "High",
        technology: "Next.js, TypeScript, TailwindCSS, Multipart image upload",
      },
      {
        title: "Hotel Portal — Branch-Level Operations (Port 3003)",
        description: "Next.js portal for hotel branch staff. Day-to-day hotel management: viewing room availability, processing bookings, updating room statuses, and managing guest check-ins/check-outs. Role-gated views ensure staff only see features their permissions allow.",
        automation_level: "Medium",
        technology: "Next.js, TypeScript, TailwindCSS, JWT role middleware",
      },
      {
        title: "Agency Portal — Travel Agency Dashboard (Port 3004)",
        description: "Next.js portal for travel agencies partnering with hotels. Agencies can view partner hotel inventories, manage guest bookings on behalf of clients, track reservation statuses, and handle agency-specific workflows. NextAuth integration for agency-specific session handling.",
        automation_level: "Medium",
        technology: "Next.js, TypeScript, NextAuth, TailwindCSS",
      },
      {
        title: "Mobile App — Customer-Facing React Native",
        description: "Expo React Native app for end customers. Features hotel discovery, room browsing, booking flow, and a favourites system. State managed with Redux + Redux Sagas for complex async booking flows. Connects to the central Express API for all data.",
        automation_level: "High",
        technology: "React Native, Expo, Redux, Redux Sagas, TypeScript",
      },
      {
        title: "Nginx Reverse Proxy — Unified Routing",
        description: "Nginx container routes incoming traffic to the appropriate Next.js portal (Admin/Owner/Hotel/Agency) and the Express API — all under a single entry point. Eliminates CORS complexity and simplifies SSL termination.",
        automation_level: "High",
        technology: "Nginx, Docker Compose networking",
      },
      {
        title: "Docker Compose Orchestration",
        description: "Single docker-compose.yml spins up all 6 services (Express API, 4 Next.js portals, Nginx) with isolated networks, shared MongoDB instance, and environment-specific config. Enables one-command full-stack startup for development and production.",
        automation_level: "High",
        technology: "Docker, Docker Compose, multi-stage Dockerfiles",
      },
      {
        title: "Granular RBAC Across Hierarchy",
        description: "Role and permission engine spanning the Agency→Hotel→Branch hierarchy. Roles are dynamically created and permissions are assigned granularly. A user can have admin rights in one branch and read-only in another. Middleware enforces role checks on every protected endpoint.",
        automation_level: "High",
        technology: "MongoDB RBAC models, Express middleware, JWT claims",
      },
      {
        title: "Code Quality Tooling — Husky + Jest",
        description: "Husky pre-commit hooks enforce linting and type checks across all portals before any commit. Jest test suites cover API controllers and critical business logic across the Express backend and Next.js portals.",
        automation_level: "Medium",
        technology: "Husky, lint-staged, Jest, TypeScript",
      },
    ],
    user_experience: {
      design_philosophy: "Role-specific portals — each stakeholder gets a purpose-built interface with only the controls they need",
      workflow_steps: [
        "Platform admin registers agencies and configures subscription plans via Admin Portal",
        "Agency creates hotel accounts and assigns owner credentials",
        "Hotel owner sets up branches, room types (with images), departments, and employees via Owner Portal",
        "Employees log in to Hotel Portal with role-gated access to their allowed features",
        "Travel agency staff use Agency Portal to browse partner hotels and book rooms for clients",
        "End customers browse hotels and book rooms through the React Native mobile app",
        "Nginx routes all traffic; Docker Compose manages all services from a single command",
      ],
    },
    target_audience: [
      { persona: "Platform Administrators", use_case: "Managing agencies, hotels, subscriptions, and system-wide roles via the Admin Portal." },
      { persona: "Hotel Owners", use_case: "Setting up and managing branches, room inventory, staff, and permissions via the Owner Portal." },
      { persona: "Hotel Branch Staff", use_case: "Handling bookings, room availability, and guest operations via the Hotel Portal." },
      { persona: "Travel Agencies", use_case: "Browsing partner hotel inventory and managing guest bookings via the Agency Portal." },
      { persona: "Hotel Guests", use_case: "Discovering hotels, browsing rooms, and making bookings via the React Native mobile app." },
    ],
    security_and_privacy: {
      authentication_methods: [
        "JWT Bearer Tokens (Express API)",
        "NextAuth sessions (Agency Portal)",
        "Email/Password with bcrypt hashing",
        "Password reset via time-limited email tokens",
      ],
      data_encryption: "bcrypt password hashing, JWT signed tokens, HTTPS via Nginx",
      data_integrity: "Mongoose schema validation, role-gated Express middleware, pre-commit Husky hooks",
    },
    summary: "A 5-year, 6-application hotel management ecosystem built as a full monorepo. A central Express/MongoDB REST API powers four purpose-built Next.js portals (Admin, Owner, Hotel, Agency) and a React Native mobile app for customers — all orchestrated with Docker Compose and routed through Nginx. Features granular RBAC across a three-level agency→hotel→branch hierarchy, full booking/room/employee management, subscription plans, audit logging, and enforced code quality via Husky and Jest.",
  },
  {
    id: "9",
    app_identity: {
      name: "Family Tree",
      developer: "Cuneyt Yildirim",
      platforms: ["Web (React)", "Netlify"],
      url: null,
      tagline: "Interactive multi-generational family tree visualization with D3.js and member management",
    },
    core_purpose: {
      mission: "Allow families to digitally map and explore their lineage through an interactive, zoomable tree visualization.",
      problem_solved: [
        "No intuitive visual tool for building and exploring family trees",
        "Manual diagramming tools that don't handle complex sibling/marriage layouts",
        "No type-safe family member CRUD with relationship tracking",
      ],
      positioning: "A React + D3.js app with TanStack Router and TanStack Query for a fully interactive family tree with real-time updates.",
    },
    key_features: [
      {
        title: "Custom D3.js Tree Layout",
        description: "Multi-generational tree layout algorithm that positions nodes by generation level, groups siblings, centers married couples, and draws parent-child + marriage connection lines.",
        automation_level: "High",
        technology: "D3.js SVG, custom Fibonacci/level positioning algorithm",
      },
      {
        title: "Zoom & Pan Navigation",
        description: "D3 zoom behavior with scale extent [0.5x–2x] and auto-centering on initial render for seamless navigation of large trees.",
        automation_level: "High",
        technology: "d3.zoom, SVG transform, zoomIdentity",
      },
      {
        title: "Member CRUD with Relationships",
        description: "Add family members with first/last name, birthdate, gender, spouse, parents, and children. Bidirectional relationship resolution (fatherId/motherId + children array).",
        automation_level: "Medium",
        technology: "TanStack Query mutations, React Hook Form",
      },
      {
        title: "Marriage & Sibling Grouping",
        description: "Married couples are placed side-by-side with a connector line. Siblings are grouped under their shared parents with correct horizontal spacing.",
        automation_level: "High",
        technology: "Custom sibling group algorithm, D3 line renderer",
      },
      {
        title: "Type-Safe Routing",
        description: "TanStack Router with file-based routing and type-safe params for family tree, profile, dashboard, and member management views.",
        automation_level: "Low",
        technology: "TanStack Router, routeTree.gen.ts",
      },
    ],
    user_experience: {
      design_philosophy: "Visual-first, explore then edit",
      workflow_steps: [
        "User lands on tree view showing the full family graph",
        "Zoom and pan to explore generational branches",
        "Click a person node to open action menu (add child, parent, spouse, or edit)",
        "New members appear immediately in the tree",
      ],
    },
    target_audience: [
      { persona: "Families", use_case: "Documenting and visualizing multi-generational family history." },
      { persona: "Genealogy Enthusiasts", use_case: "Building a digital, interactive family archive." },
    ],
    security_and_privacy: {
      data_storage: "Client-side state, future backend integration planned",
      data_integrity: "TypeScript type guards on Person and FamilyTreeData models",
    },
    summary: "An interactive family tree app built with React, D3.js, and TanStack Router featuring a custom multi-generational layout algorithm, zoom/pan navigation, and full member CRUD with bidirectional relationship resolution.",
  },
  {
    id: "10",
    app_identity: {
      name: "GitHub Dev Tracker",
      developer: "Cuneyt Yildirim",
      platforms: ["Web (React Router SSR)", "Docker"],
      url: null,
      tagline: "Personal GitHub analytics dashboard with contribution heatmap, streak tracking, and language insights",
    },
    core_purpose: {
      mission: "Give developers a beautiful, self-hosted dashboard to visualize their GitHub activity, streaks, and language usage without relying on third-party services.",
      problem_solved: [
        "GitHub's native contribution graph lacks streak tracking and repo-level insights",
        "No single view combining heatmap, work breakdown, and language distribution",
        "Dependency on third-party tools for personal developer analytics",
      ],
      positioning: "A server-rendered React Router app using GitHub OAuth + REST/GraphQL APIs to deliver live developer insights.",
    },
    key_features: [
      {
        title: "GitHub OAuth SSR Auth",
        description: "Server-side session management with GitHub OAuth token storage. Loader redirects unauthenticated users and signs them out cleanly.",
        automation_level: "High",
        technology: "React Router sessions, GitHub OAuth, cookie-based sessions",
      },
      {
        title: "Contribution Heatmap",
        description: "52-week contribution calendar with color-coded intensity levels (0–4), month labels, and day-of-week axis. Built from GitHub GraphQL API data.",
        automation_level: "High",
        technology: "GitHub GraphQL contributionCalendar, custom Heatmap component",
      },
      {
        title: "Streak Calculator",
        description: "Algorithm computing current and longest contribution streaks with edge-case handling for today's contributions and yesterday boundaries.",
        automation_level: "High",
        technology: "Custom calculateStreaks() utility, ContributionCalendar data",
      },
      {
        title: "Work Breakdown Chart",
        description: "Donut chart showing split between commits, pull requests, issues, and PR reviews from GitHub GraphQL contributionsCollection.",
        automation_level: "Medium",
        technology: "Recharts PieChart, GitHub GraphQL API",
      },
      {
        title: "Top Repositories by Commits",
        description: "Horizontal bar chart of top 10 repositories ranked by commit count in the current year.",
        automation_level: "Medium",
        technology: "Recharts BarChart, commitContributionsByRepository",
      },
      {
        title: "Language Distribution",
        description: "Aggregates language bytes across all owned repositories and renders as a donut chart with GitHub's official language colors.",
        automation_level: "High",
        technology: "GitHub GraphQL languages edges, Recharts PieChart",
      },
    ],
    user_experience: {
      design_philosophy: "Clean, data-dense, developer-focused",
      workflow_steps: [
        "User signs in with GitHub OAuth",
        "Dashboard loads with live data via parallel REST + GraphQL fetches",
        "View streaks, heatmap, charts, and recent repo activity",
        "Sign out clears session and redirects to login",
      ],
    },
    target_audience: [
      { persona: "Developers", use_case: "Tracking personal coding activity, streaks, and language habits." },
      { persona: "Team Leads", use_case: "Self-hosted alternative to third-party GitHub stat tools." },
    ],
    security_and_privacy: {
      authentication_methods: ["GitHub OAuth"],
      data_encryption: "Server-side session cookies, token never exposed to client",
      data_integrity: "All data fetched live from GitHub APIs per request",
    },
    summary: "A self-hosted GitHub analytics dashboard built with React Router SSR, featuring OAuth authentication, a 52-week contribution heatmap, streak calculation, work breakdown and language distribution charts, and a live repository activity feed — all powered by GitHub's REST and GraphQL APIs.",
  },
  {
    id: "11",
    app_identity: {
      name: "Spaced Repetition iOS",
      developer: "Cuneyt Yildirim",
      platforms: ["iOS (SwiftUI / Swift)", "App Store"],
      url: null,
      tagline: "AI-powered spaced repetition flashcard system with SRS algorithm, LaTeX rendering, Gemini AI card generation, and WidgetKit integration",
    },
    core_purpose: {
      mission: "Help learners memorize and retain complex material using a scientifically-backed spaced repetition algorithm, with AI to automate card creation and rich card types for diverse content.",
      problem_solved: [
        "Rote memorization without intelligent review scheduling leads to rapid forgetting",
        "Manual flashcard creation is time-consuming for dense study material",
        "Existing apps lack support for LaTeX, multiple card types, and AI generation",
        "No home screen widget for at-a-glance review reminders",
        "Limited personalization — no themes, no achievement system, no markdown import",
      ],
      positioning: "A native iOS SRS app built with SwiftUI and CoreData, integrating Gemini AI for card generation, LaTeX rendering for math/science content, 5 card types, WidgetKit, 7 color themes, and Markdown import/export.",
    },
    key_features: [
      {
        title: "Spaced Repetition System (SRS) Algorithm",
        description: "Custom SRSManager.swift implementing the SRS algorithm with SRSAlgorithm enum. Cards are distributed across four review queues — Critical (overdue), Soon (due today), Stable (scheduled), and Mastered — each stored as a separate CoreData entity to optimize fetch performance.",
        automation_level: "High",
        technology: "SRSManager.swift, SRSAlgorithm enum, CoreData queue entities",
      },
      {
        title: "Five Card Types",
        description: "FlashCard (front/back), True/False (TFBackside), Multiple Choice (MCBackside with distractors), Note (NoteBackside for reference cards), and Fill-in-the-Blank (FIBBackSideView with inline input). Each type has a distinct review interaction tailored to its format.",
        automation_level: "High",
        technology: "SwiftUI custom card views, CardType enum, CoreData polymorphic models",
      },
      {
        title: "Gemini AI Card Generation",
        description: "GeminiService.swift integrates Google's Gemini API to auto-generate flashcard content from user-provided text prompts or images. Cards are created directly into the current deck without manual entry.",
        automation_level: "High",
        technology: "GeminiService.swift, URLSession async/await, Gemini REST API",
      },
      {
        title: "LaTeX Rendering",
        description: "LaTeXText.swift renders mathematical and scientific notation inline within card content, making the app suitable for STEM subjects like calculus, physics, and chemistry.",
        automation_level: "High",
        technology: "LaTeXText.swift, custom SwiftUI renderer",
      },
      {
        title: "Markdown Import / Export",
        description: "MarkdownFileHandler and MarkdownExtract parse Markdown files into decks and cards. DeckExporter and CreateMarkDownFile export decks back to Markdown for sharing or backup. Enables interoperability with Obsidian, Notion, and other note tools.",
        automation_level: "High",
        technology: "MarkdownFileHandler, MarkdownExtract, DeckExporter, CreateMarkDownFile",
      },
      {
        title: "Subjects + Decks Organization",
        description: "Cards are organized into Decks, which belong to Subjects. Users navigate subject → deck → card review sessions. Both Cram review (all cards regardless of schedule) and regular SRS review sessions are supported.",
        automation_level: "Medium",
        technology: "CoreData Subject/Deck/Card hierarchy, SwiftUI NavigationStack",
      },
      {
        title: "WidgetKit Home Screen Widget",
        description: "WidgetDataWriter writes review queue counts to a shared container. The widget displays pending Critical/Soon card counts on the home screen, prompting users to review without opening the app.",
        automation_level: "High",
        technology: "WidgetKit, App Groups, WidgetDataWriter.swift",
      },
      {
        title: "7 Color Themes",
        description: "AppColorScheme struct defines 7 full color themes (primary, secondary, accent, background, text, border, card surface). Users can switch themes globally from settings, with all UI components reacting immediately.",
        automation_level: "Low",
        technology: "AppColorScheme struct, SwiftUI environment, UserDefaults persistence",
      },
      {
        title: "Achievement System",
        description: "AchievementStore tracks study milestones: cards reviewed, streaks maintained, decks completed. Achievements are displayed in AchievementsView and DeckStatsView, providing gamification and motivation.",
        automation_level: "Medium",
        technology: "AchievementStore.swift, CoreData, AchievementsView",
      },
      {
        title: "Camera & Image Card Support",
        description: "CardImageManager and CameraPickerView allow users to attach photos to cards — capturing diagrams, handwritten notes, or printed text directly from the camera and embedding them into the card content.",
        automation_level: "Medium",
        technology: "CardImageManager.swift, CameraPickerView, UIImagePickerController",
      },
      {
        title: "Local Push Notifications",
        description: "NotificationManager schedules daily review reminders and session completion alerts. Notifications respect user-defined review times and are cancelled/rescheduled when review sessions are completed early.",
        automation_level: "High",
        technology: "UserNotifications framework, NotificationManager.swift",
      },
      {
        title: "Stats & Progress Dashboards",
        description: "StatsView and DeckStatsView display review history, accuracy rates, cards per session, queue distribution, and streak data. Visual breakdowns help users understand their retention performance over time.",
        automation_level: "High",
        technology: "Swift Charts, StatsView, DeckStatsView, CoreData aggregation queries",
      },
      {
        title: "Multiple Deck View Modes",
        description: "Decks can be browsed in List, Grid, Stacked (StackedDeckView with layered card fan), or Wheel Picker modes, allowing users to choose the visual layout that suits their study style.",
        automation_level: "Low",
        technology: "SwiftUI custom layouts, StackedDeckView, WheelPicker",
      },
    ],
    user_experience: {
      design_philosophy: "Study-session-first: minimal friction from launch to first card review, with depth available through stats, themes, and AI tooling",
      workflow_steps: [
        "User creates a Subject and a Deck (or imports a Markdown file)",
        "Cards are added manually, via AI generation (Gemini), or via camera image",
        "Daily WidgetKit widget shows pending Critical and Soon review counts",
        "User taps into a review session — SRS algorithm surfaces the right cards",
        "Cards are rated (Again, Hard, Good, Easy) and rescheduled automatically",
        "Cram mode is available for ad-hoc full-deck review before exams",
        "Achievements unlock as study milestones are reached",
        "Stats screens show accuracy, session history, and queue health",
      ],
    },
    target_audience: [
      { persona: "Students (STEM)", use_case: "Memorizing formulas, definitions, and theorems with LaTeX rendering and AI card generation from lecture notes." },
      { persona: "Language Learners", use_case: "Building vocabulary decks with spaced repetition for optimal long-term retention." },
      { persona: "Medical / Law Students", use_case: "Managing thousands of high-volume flashcards with fill-in-the-blank and multiple choice formats." },
      { persona: "Lifelong Learners", use_case: "Importing Markdown notes from Obsidian/Notion and converting them into SRS review decks." },
    ],
    security_and_privacy: {
      authentication_methods: ["Local CoreData storage", "iCloud CloudKit sync (optional)"],
      data_encryption: "CoreData local encryption, CloudKit end-to-end encryption",
      data_integrity: "CoreData schema validation, SRS queue integrity enforced by SRSManager",
    },
    summary: "A feature-rich native iOS spaced repetition app built with SwiftUI and CoreData, implementing a custom SRS algorithm across four review queues (Critical, Soon, Stable, Mastered). Supports five card types including LaTeX, fill-in-the-blank, and multiple choice. Integrates Gemini AI for automatic card generation, Markdown import/export for Obsidian/Notion interoperability, WidgetKit for home screen review prompts, 7 color themes, an achievement system, camera image support, and comprehensive stats dashboards.",
  },
  {
    id: "12",
    app_identity: {
      name: "Chores Auction iOS",
      developer: "Cuneyt Yildirim",
      platforms: ["iOS (SwiftUI / Swift)", "App Store"],
      url: null,
      tagline: "Household chore management with CloudKit team sharing, join codes, and real-time assignment tracking",
    },
    core_purpose: {
      mission: "Remove the friction from household chore coordination by giving families and flatmates a shared, real-time chore board accessible to all team members without requiring accounts or a custom backend.",
      problem_solved: [
        "Household chores are assigned informally with no visibility or accountability",
        "Existing task apps are personal — not built for shared household use without backend complexity",
        "No easy way to join a shared household workspace on iOS without a sign-in flow",
        "Offline-first requirement: chores need to be accessible even without connectivity",
      ],
      positioning: "A native iOS SwiftUI app using CloudKit's public database as a zero-backend shared workspace, with team join codes for frictionless onboarding and CoreData for offline-first local storage.",
    },
    key_features: [
      {
        title: "CloudKit Public Database Team Sharing",
        description: "Uses CloudKit's public record zone — not the private iCloud container — so all team members share the same chore board in real time without individual iCloud accounts needing to be linked. All chore records include a teamId field for multi-team isolation.",
        automation_level: "High",
        technology: "CloudKit CKDatabase.publicCloudDatabase, CKRecord, teamId field",
      },
      {
        title: "Team Join Codes",
        description: "Households generate a unique share code. Other members enter the code to join the team's shared workspace. Team membership is stored in CloudKit with the teamId tying all records together.",
        automation_level: "High",
        technology: "CloudKit record queries, teamId-based filtering, share code generation",
      },
      {
        title: "Chore Assignment Tracking",
        description: "Each chore record has an assignedPerson field. Team members can claim or assign chores, mark them complete, and see who is responsible for each task in real time.",
        automation_level: "Medium",
        technology: "CKRecord assignedPerson field, SwiftUI list views, CloudKit fetch + save",
      },
      {
        title: "CoreData Offline-First Storage",
        description: "Chores are mirrored into CoreData for full offline access. Users can view and update their local chore state without connectivity, with changes synced to CloudKit when back online.",
        automation_level: "High",
        technology: "CoreData NSPersistentContainer, sync bridge between CoreData and CloudKit",
      },
      {
        title: "Privacy-First Architecture",
        description: "No custom backend server, no user accounts, no email collection. CloudKit handles all persistence with Apple's privacy guarantees. Includes a full in-app Privacy Policy screen as required for App Store submission.",
        automation_level: "Low",
        technology: "CloudKit, SwiftUI Privacy Policy view, no third-party analytics",
      },
    ],
    user_experience: {
      design_philosophy: "Zero-friction onboarding — create or join a team in seconds, then see the shared chore board immediately",
      workflow_steps: [
        "First user creates a household team and receives a share code",
        "Other members open the app and enter the share code to join",
        "All members see the shared chore board in real time via CloudKit",
        "Chores are assigned to specific people or claimed voluntarily",
        "Completed chores are marked done and the board updates for everyone",
        "Offline changes sync automatically when connectivity is restored",
      ],
    },
    target_audience: [
      { persona: "Families", use_case: "Assigning and tracking household chores among family members with real-time visibility." },
      { persona: "Flatmates / Roommates", use_case: "Coordinating shared living space responsibilities without a group chat." },
      { persona: "Small Shared Households", use_case: "Replacing informal verbal chore agreements with a transparent digital board." },
    ],
    security_and_privacy: {
      authentication_methods: ["No account required — CloudKit public database access via team join code"],
      data_encryption: "CloudKit server-side encryption, data transmitted over TLS",
      data_integrity: "CoreData local validation, teamId-scoped CloudKit queries prevent cross-team data leaks",
    },
    summary: "A native iOS household chore management app built with SwiftUI, CoreData, and CloudKit's public database. Households create a team and share a join code — no accounts required. All chores are synced in real time across team members via CloudKit with CoreData providing offline-first access. Chores track an assignedPerson field and a teamId for multi-household isolation, with a privacy-first architecture that uses no custom backend and no user tracking.",
  },
];
