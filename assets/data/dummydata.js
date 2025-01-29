import { AiOutlineCalendar } from "react-icons/ai"
import { TfiRulerPencil } from "react-icons/tfi"
import { VscFileSubmodule } from "react-icons/vsc"
import { BiUser } from "react-icons/bi"
import { BsLaptop, BsCode, BsWordpress } from "react-icons/bs"
import { FiPenTool } from "react-icons/fi"
import { MdOutlineAnalytics, MdOutlineContentCopy } from "react-icons/md"
import { FaGoogle, FaFacebookF, FaInstagram, FaShopify } from "react-icons/fa"
import { SiWebflow, SiAdobecreativecloud } from "react-icons/si"
import { RiAdvertisementLine } from "react-icons/ri"

export const home = [
  {
    id: 1,
    icon: <AiOutlineCalendar size={25} />,
    title: "10+ years of market experience",
  },
  {
    id: 2,
    icon: <TfiRulerPencil size={25} />,
    title: "Unique technologies & modern approach",
  },
  {
    id: 3,
    icon: <VscFileSubmodule size={25} />,
    title: "100+ successful cases in portfolio",
  },
  {
    id: 4,
    icon: <BiUser size={25} />,
    title: "Customer satisfaction is our top priority",
  },
]

export const expertise = [
  {
    id: 1,
    title: "Web Design & Development",
    cover: "../images/e1.jpg",
    icon: <BsLaptop size={40} />,
    shortDesc: "Creating stunning, responsive websites that drive results",
    desc: [
      { text: "Custom Website Design", details: "Unique designs tailored to your brand and business goals" },
      { text: "Frontend Development", details: "Responsive, interactive user interfaces built with modern technologies" },
      { text: "Backend Development", details: "Scalable server-side solutions for complex applications" },
      { text: "E-commerce Solutions", details: "Custom online stores with secure payment integration" },
      { text: "CMS Integration", details: "Easy-to-use content management systems" },
      { text: "Performance Optimization", details: "Fast-loading, optimized websites for better user experience" },
      { text: "SEO-Friendly Structure", details: "Built for maximum search engine visibility" },
      { text: "Security Implementation", details: "Robust protection against cyber threats" }
    ],
    technologies: ["React", "Next.js", "Node.js", "WordPress", "Shopify", "Vue.js"],
    process: [
      "Discovery & Planning",
      "Design & Wireframing",
      "Development",
      "Testing & QA",
      "Deployment",
      "Maintenance"
    ]
  },
  {
    id: 2,
    title: "Digital Marketing",
    cover: "../images/e2.jpg",
    icon: <MdOutlineAnalytics size={40} />,
    shortDesc: "Data-driven marketing strategies for business growth",
    desc: [
      { text: "SEO Optimization", details: "Improve search engine rankings and organic traffic" },
      { text: "Content Marketing", details: "Engaging content that converts visitors into customers" },
      { text: "Email Marketing", details: "Targeted email campaigns that drive engagement" },
      { text: "PPC Advertising", details: "Optimized paid search and display advertising" },
      { text: "Social Media Marketing", details: "Strategic social media presence and campaigns" },
      { text: "Analytics & Reporting", details: "Comprehensive data analysis and insights" },
      { text: "Conversion Optimization", details: "Improve conversion rates and ROI" },
      { text: "Marketing Automation", details: "Streamlined marketing processes and workflows" }
    ],
    technologies: ["Google Analytics", "SEMrush", "Mailchimp", "HubSpot", "Ahrefs"],
    process: [
      "Strategy Development",
      "Campaign Planning",
      "Content Creation",
      "Campaign Launch",
      "Performance Monitoring",
      "Optimization"
    ]
  },
  {
    id: 3,
    title: "E-Commerce Solutions",
    cover: "../images/e3.jpg",
    icon: <FaShopify size={40} />,
    shortDesc: "Building powerful online stores that drive sales",
    desc: [
      { text: "E-commerce Strategy", details: "Custom online retail solutions for your business" },
      { text: "Platform Development", details: "Scalable e-commerce platforms built for growth" },
      { text: "Payment Integration", details: "Secure payment gateways and processing" },
      { text: "Inventory Management", details: "Efficient stock control and management" },
      { text: "Mobile Commerce", details: "Mobile-first shopping experiences" },
      { text: "Order Management", details: "Streamlined order processing and fulfillment" },
      { text: "Customer Analytics", details: "In-depth customer behavior tracking" },
      { text: "Marketing Integration", details: "Built-in promotional tools and features" }
    ],
    technologies: ["Shopify", "WooCommerce", "Magento", "BigCommerce", "Stripe"],
    process: [
      "Requirements Analysis",
      "Platform Selection",
      "Store Setup",
      "Product Upload",
      "Payment Setup",
      "Launch & Marketing"
    ]
  },
  {
    id: 4,
    title: "Branding & Creative Services",
    cover: "../images/e4.jpg",
    icon: <FiPenTool size={40} />,
    shortDesc: "Creating memorable brand experiences",
    desc: [
      { text: "Brand Strategy", details: "Comprehensive brand development and positioning" },
      { text: "Visual Identity", details: "Logo design and brand identity systems" },
      { text: "Brand Messaging", details: "Compelling brand story and voice" },
      { text: "Marketing Collateral", details: "Professional print and digital materials" },
      { text: "Social Media Branding", details: "Consistent social media presence" },
      { text: "Brand Guidelines", details: "Detailed style and usage guides" },
      { text: "Rebranding", details: "Brand refresh and modernization" },
      { text: "Brand Monitoring", details: "Ongoing reputation management" }
    ],
    technologies: ["Adobe Creative Suite", "Figma", "Sketch", "Canva Pro"],
    process: [
      "Brand Discovery",
      "Market Research",
      "Concept Development",
      "Design Creation",
      "Implementation",
      "Brand Launch"
    ]
  }
]

export const serviceCategories = [
  {
    id: 1,
    name: "Web Development",
    icon: <BsLaptop />,
  },
  {
    id: 2,
    name: "Content Marketing",
    icon: <MdOutlineContentCopy />,
  },
  {
    id: 3,
    name: "Social Media Marketing",
    icon: <FaFacebookF />,
  },
  {
    id: 4,
    name: "PPC & Advertising",
    icon: <RiAdvertisementLine />,
  },
  {
    id: 5,
    name: "Branding Strategies",
    icon: <SiAdobecreativecloud />,
  },
]

export const servicesList = [
  {
    id: 1,
    categoryId: 1,
    icon: <BsCode />,
    title: "Custom Web Solutions",
    description: "Cutting-edge web applications built with modern technologies",
    features: [
      "Responsive Design Architecture",
      "Progressive Web Apps (PWA)",
      "API Integration & Development",
      "Performance Optimization",
      "Security Implementation",
    ],
    technologies: ["React", "Node.js", "Next.js", "GraphQL"],
    price: "Starting from $5,000",
  },
  {
    id: 2,
    categoryId: 1,
    icon: <BsWordpress />,
    title: "CMS Development",
    description: "Scalable content management solutions for your business",
    features: [
      "Custom Theme Development",
      "Plugin Integration",
      "E-commerce Solutions",
      "Migration Services",
      "Performance Tuning",
    ],
    technologies: ["WordPress", "Shopify", "WooCommerce", "Webflow"],
    price: "Starting from $3,000",
  },
  {
    id: 3,
    categoryId: 2,
    icon: <MdOutlineContentCopy />,
    title: "Strategic Content Creation",
    description: "Engaging content that converts visitors into customers",
    features: [
      "Content Strategy Development",
      "Blog Writing & Management",
      "Email Marketing Campaigns",
      "Whitepaper Creation",
      "Case Studies",
    ],
    technologies: ["SEMrush", "Mailchimp", "HubSpot", "WordPress"],
    price: "Starting from $1,000/month",
  },
  {
    id: 4,
    categoryId: 2,
    icon: <MdOutlineAnalytics />,
    title: "Content Analytics",
    description: "Data-driven content optimization and strategy",
    features: [
      "Performance Tracking",
      "Audience Analysis",
      "Conversion Optimization",
      "ROI Measurement",
      "Competitive Analysis",
    ],
    technologies: ["Google Analytics", "Ahrefs", "BuzzSumo"],
    price: "Starting from $800/month",
  },
  {
    id: 5,
    categoryId: 3,
    icon: <FaInstagram />,
    title: "Social Media Management",
    description: "Comprehensive social media presence management",
    features: [
      "Platform Strategy",
      "Content Calendar",
      "Community Management",
      "Influencer Outreach",
      "Analytics & Reporting",
    ],
    technologies: ["Hootsuite", "Buffer", "Sprout Social"],
    price: "Starting from $1,500/month",
  },
  {
    id: 6,
    categoryId: 3,
    icon: <FaFacebookF />,
    title: "Social Media Advertising",
    description: "Targeted social media advertising campaigns",
    features: [
      "Ad Strategy Development",
      "Audience Targeting",
      "Creative Design",
      "Campaign Management",
      "Performance Analysis",
    ],
    technologies: ["Facebook Ads", "Instagram Ads", "LinkedIn Ads"],
    price: "Starting from $1,000/month",
  },
  {
    id: 7,
    categoryId: 4,
    icon: <FaGoogle />,
    title: "Search Engine Marketing",
    description: "Results-driven PPC campaign management",
    features: [
      "Keyword Research",
      "Ad Copy Creation",
      "Bid Management",
      "Landing Page Optimization",
      "Conversion Tracking",
    ],
    technologies: ["Google Ads", "Bing Ads", "Analytics"],
    price: "Starting from $1,500/month",
  },
  {
    id: 8,
    categoryId: 4,
    icon: <RiAdvertisementLine />,
    title: "Display Advertising",
    description: "Strategic display and remarketing campaigns",
    features: [
      "Banner Ad Design",
      "Remarketing Strategy",
      "Placement Optimization",
      "A/B Testing",
      "Performance Tracking",
    ],
    technologies: ["Google Display Network", "AdRoll", "Perfect Audience"],
    price: "Starting from $1,200/month",
  },
  {
    id: 9,
    categoryId: 5,
    icon: <FiPenTool />,
    title: "Brand Identity Design",
    description: "Comprehensive brand identity development",
    features: [
      "Logo Design",
      "Visual Identity System",
      "Brand Guidelines",
      "Marketing Collateral",
      "Brand Strategy",
    ],
    technologies: ["Adobe Creative Suite", "Figma", "Sketch"],
    price: "Starting from $3,500",
  },
  {
    id: 10,
    categoryId: 5,
    icon: <SiAdobecreativecloud />,
    title: "Brand Strategy",
    description: "Strategic brand positioning and development",
    features: [
      "Market Research",
      "Positioning Strategy",
      "Voice & Tone Development",
      "Brand Architecture",
      "Brand Story",
    ],
    technologies: ["Brand Management Tools", "Market Research Tools"],
    price: "Starting from $5,000",
  },
]

export const testimonial = [
  {
    id: 1,
    name: "Alexander Black",
    cover: "../images/e1.jpg",
    post: "Seven consulting - CEO",
    desc: "Nunc fermentum - tempus erat ligula, sit amet lacinia justo cursus ac. Suspendisse quis nulla tincidunt! Lorem ipsum dolor amet at ornare ex, quis fringilla tortor! Nunc consectetur feugiat rutrum. Sed rhoncus sapien!",
  },
  {
    id: 2,
    name: "Diana Green",
    cover: "../images/e2.jpg",
    post: "Seven Arts - marketing manager",
    desc: "Cras at ornare fermentum quam et tortor euismod, vel maximus metus tristique at ornare ex, quis fringilla tortor. Aenean semper neque quis consectetur lobortis. Quisque nec convallis ex. Aenean ut metus et nunc cursus aliquet.",
  },
  {
    id: 3,
    name: "Alexander Black",
    cover: "../images/e3.jpg",
    post: "Seven consulting - CEO",
    desc: "Nunc fermentum - tempus erat ligula, sit amet lacinia justo cursus ac. Suspendisse quis nulla tincidunt! Lorem ipsum dolor amet at ornare ex, quis fringilla tortor! Nunc consectetur feugiat rutrum. Sed rhoncus sapien!",
  },
  {
    id: 4,
    name: "Diana Green",
    cover: "../images/e4.jpg",
    post: "Seven Arts - marketing manager",
    desc: "Cras at ornare fermentum quam et tortor euismod, vel maximus metus tristique at ornare ex, quis fringilla tortor. Aenean semper neque quis consectetur lobortis. Quisque nec convallis ex. Aenean ut metus et nunc cursus aliquet.",
  },
]

export const showcase = [
  {
    id: 1,
    title: "Neon Lights",
    cover: "../images/s1.jpg",
    catgeory: "DIGITAL MARKETING",
    description: "A vibrant digital marketing campaign that illuminated brand awareness and engagement.",
    challenge: "The client needed to stand out in a saturated market and increase their digital presence while maintaining their unique brand identity. The main challenge was to create a campaign that would capture attention and drive meaningful engagement across multiple digital channels.",
    solution: [
      "Developed comprehensive digital strategy",
      "Created custom visual identity for the campaign",
      "Implemented cross-platform marketing automation",
      "Designed interactive social media content",
      "Optimized conversion funnels"
    ],
    results: {
      engagement: "50%",
      conversion: "35%",
      growth: "2.5x"
    },
    client: "TechGlow Industries",
    date: "December 2023",
    technologies: ["Adobe Creative Suite", "HubSpot", "Google Analytics", "Meta Ads"]
  },
  {
    id: 2,
    title: "Futuristic Furniture",
    cover: "../images/s2.jpg",
    catgeory: "WEBSITES",
    description: "Modern e-commerce platform for contemporary furniture design.",
    challenge: "The client required a cutting-edge e-commerce platform that would showcase their premium furniture collection while providing an immersive shopping experience. The platform needed to handle complex product configurations and maintain high performance.",
    solution: [
      "Built custom e-commerce platform",
      "Implemented 3D product visualization",
      "Created seamless checkout process",
      "Integrated inventory management",
      "Developed mobile-first design"
    ],
    results: {
      engagement: "75%",
      conversion: "40%",
      growth: "3x"
    },
    client: "ModernSpace Furniture",
    date: "January 2024",
    technologies: ["React", "Next.js", "Three.js", "Stripe", "Shopify"]
  },
  {
    id: 3,
    title: "Smart Living",
    cover: "../images/s3.jpg",
    catgeory: "WEBSITES",
    description: "IoT dashboard for smart home automation and control.",
    challenge: "Creating an intuitive and responsive dashboard for managing multiple smart home devices while ensuring real-time data synchronization and secure device control.",
    solution: [
      "Designed intuitive user interface",
      "Implemented real-time device monitoring",
      "Created custom automation workflows",
      "Developed secure API integration",
      "Built responsive dashboard"
    ],
    results: {
      engagement: "60%",
      conversion: "45%",
      growth: "2x"
    },
    client: "SmartHome Solutions",
    date: "November 2023",
    technologies: ["React", "Node.js", "WebSocket", "MongoDB", "Docker"]
  },
  {
    id: 4,
    title: "Light Painting",
    cover: "../images/s4.jpg",
    catgeory: "BRANDING",
    description: "Creative branding project for an innovative lighting design company.",
    challenge: "Developing a distinctive brand identity that would reflect the artistic and technical aspects of lighting design while appealing to both residential and commercial clients.",
    solution: [
      "Created comprehensive brand guidelines",
      "Designed versatile logo system",
      "Developed brand collateral",
      "Implemented visual storytelling",
      "Built brand style guide"
    ],
    results: {
      engagement: "55%",
      conversion: "30%",
      growth: "2.2x"
    },
    client: "Lumina Design Co",
    date: "October 2023",
    technologies: ["Adobe Creative Suite", "Figma", "Sketch", "InVision"]
  },
  {
    id: 5,
    title: "Ideabox",
    cover: "../images/s5.jpg",
    catgeory: "BRANDING",
    description: "Brand identity development for a creative thinking workshop series.",
    challenge: "Creating an engaging and flexible brand identity system that would work across various workshop materials and digital platforms while maintaining consistency and recognition.",
    solution: [
      "Developed modular brand system",
      "Created workshop materials",
      "Designed digital assets",
      "Built presentation templates",
      "Implemented brand guidelines"
    ],
    results: {
      engagement: "65%",
      conversion: "38%",
      growth: "2.8x"
    },
    client: "Creative Minds Institute",
    date: "September 2023",
    technologies: ["Adobe Creative Suite", "Figma", "Canva Pro", "Miro"]
  },
  {
    id: 6,
    title: "VR Experience",
    cover: "../images/s6.jpg",
    catgeory: "WEBSITES",
    description: "Immersive virtual reality platform for architectural visualization.",
    challenge: "Building a high-performance VR platform that would allow architects and clients to explore and interact with architectural designs in a virtual environment while maintaining visual quality.",
    solution: [
      "Developed VR visualization platform",
      "Implemented real-time rendering",
      "Created interactive features",
      "Optimized 3D performance",
      "Built cross-platform support"
    ],
    results: {
      engagement: "70%",
      conversion: "42%",
      growth: "3.5x"
    },
    client: "ArchViz Pro",
    date: "February 2024",
    technologies: ["Unity", "WebGL", "Three.js", "React", "WebXR"]
  }
]

export const brand = [
  {
    id: 1,
    cover: "../images/l1.svg",
  },
  {
    id: 2,
    cover: "../images/l2.svg",
  },
  {
    id: 3,
    cover: "../images/l3.svg",
  },
  {
    id: 4,
    cover: "../images/l4.svg",
  },
  {
    id: 5,
    cover: "../images/l5.svg",
  },
  {
    id: 6,
    cover: "../images/l6.svg",
  },
]

export const blogdata = [
  {
    id: 1,
    title: "Ligula vel urna accumsan placerat",
    cover: "../images/b1.webp",
    catgeory: "INDUSTRY",
    date: "JANUARY 12, 2023",
  },
  {
    id: 2,
    title: "Don't underestimate the lorem ipsum dolor amet",
    cover: "../images/b2.jpg",
    catgeory: "TIPS & TRICKS",
    date: "OCTOBER 20, 2023",
  },
  {
    id: 3,
    title: "Building the real VR lorem ipsum dolor amet glavrida from a scratch",
    cover: "../images/b3.jpg",
    catgeory: "TIPS & TRICKS",
    date: "OCTOBER 9, 2023",
  },
  {
    id: 4,
    title: "What eleifend posuere tincidunt",
    cover: "../images/b4.jpg",
    catgeory: "EVENTS",
    date: "OCTOBER 8, 2023",
  },
]

export const teamdata = [
  {
    id: 1,
    title: "Alexander Black",
    cover: "../images/t1.jpg",
    post: "FOUNDER, CEO",
    experience: "15+ Years Experience",
    specialization: "Strategic Leadership & Innovation",
    expertise: [
      "Business Strategy",
      "Digital Transformation",
      "Team Leadership",
      "Innovation Management"
    ],
    education: "MBA in Business Administration, Harvard Business School",
    achievements: [
      "Led company growth from startup to industry leader",
      "Successfully launched 3 international offices",
      "Named Top 40 Under 40 in Tech Leadership"
    ]
  },
  {
    id: 2,
    title: "Anna Kovalenko",
    cover: "../images/t2.jpg",
    post: "FINANCE DIRECTOR",
    experience: "12+ Years Experience",
    specialization: "Financial Strategy & Planning",
    expertise: [
      "Financial Analysis",
      "Risk Management",
      "Investment Strategy",
      "Corporate Finance"
    ],
    education: "Master's in Finance, London School of Economics",
    achievements: [
      "Optimized company financial operations saving 30% annually",
      "Successfully managed $50M investment round",
      "Implemented innovative financial tracking systems"
    ]
  },
  {
    id: 3,
    title: "Tiffany White",
    cover: "../images/t3.jpg",
    post: "CREATIVE DIRECTOR",
    experience: "10+ Years Experience",
    specialization: "Brand Strategy & Design Innovation",
    expertise: [
      "Brand Development",
      "Creative Strategy",
      "UX/UI Design",
      "Design Systems"
    ],
    education: "BFA in Design, Parsons School of Design",
    achievements: [
      "Won multiple international design awards",
      "Led rebranding projects for Fortune 500 companies",
      "Speaker at major design conferences"
    ]
  },
  {
    id: 4,
    title: "Richard Greenwood",
    cover: "../images/t4.jpg",
    post: "LEAD DEVELOPER",
    experience: "8+ Years Experience",
    specialization: "Full-Stack Development",
    expertise: [
      "Web Development",
      "Mobile Apps",
      "Cloud Architecture",
      "DevOps"
    ],
    education: "MS in Computer Science, MIT",
    achievements: [
      "Developed award-winning mobile applications",
      "Created innovative cloud solutions",
      "Open source contributor"
    ]
  },
  {
    id: 5,
    title: "Jessica Brown",
    cover: "../images/t5.jpg",
    post: "MARKETING DIRECTOR",
    experience: "9+ Years Experience",
    specialization: "Digital Marketing & Growth",
    expertise: [
      "Digital Strategy",
      "Content Marketing",
      "SEO/SEM",
      "Analytics"
    ],
    education: "MBA in Marketing, Stanford University",
    achievements: [
      "Increased online presence by 300%",
      "Developed successful marketing campaigns",
      "Industry speaker on digital marketing"
    ]
  },
  {
    id: 6,
    title: "Gregory Windstorm",
    cover: "../images/t6.jpg",
    post: "ACCOUNTING MANAGER",
    experience: "7+ Years Experience",
    specialization: "Financial Operations",
    expertise: [
      "Financial Planning",
      "Tax Strategy",
      "Audit Management",
      "Compliance"
    ],
    education: "CPA, Master's in Accounting",
    achievements: [
      "Streamlined accounting processes",
      "Implemented new financial systems",
      "Reduced operational costs by 25%"
    ]
  },
  {
    id: 7,
    title: "Anna Red",
    cover: "../images/t7.jpg",
    post: "PROJECT MANAGER",
    experience: "6+ Years Experience",
    specialization: "Project Management & Delivery",
    expertise: [
      "Agile Methodology",
      "Risk Management",
      "Team Leadership",
      "Client Relations"
    ],
    education: "PMP Certified, BS in Business Management",
    achievements: [
      "Managed $10M+ worth of projects",
      "100% on-time project delivery rate",
      "Implemented new project management systems"
    ]
  },
  {
    id: 8,
    title: "Join our team!",
    cover: "../images/t8.jpg",
    post: "YOUR NEXT ROLE",
    experience: "We're Hiring!",
    specialization: "Multiple Positions Available",
    expertise: [
      "Development",
      "Design",
      "Marketing",
      "Project Management"
    ],
    education: "Various Requirements",
    achievements: [
      "Work with cutting-edge technologies",
      "Collaborative team environment",
      "Professional growth opportunities"
    ]
  }
]