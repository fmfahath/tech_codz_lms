import { Bolt } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { BellDot } from "lucide-react";
import { BookOpenText } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { TriangleAlert } from "lucide-react";
import { Users } from "lucide-react";
import { Lock } from "lucide-react";
import { Dessert } from "lucide-react";
import { ShieldPlus } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Images } from "lucide-react";
import { Figma } from "lucide-react";
import { Play } from "lucide-react";
import { MapPin } from "lucide-react";
import { Database } from "lucide-react";
import { PanelsTopLeft } from "lucide-react";
import { PanelTop } from "lucide-react";
import white_logo from "./white_logo.png";
import black_logo from "./black_logo.png";
import hero1 from "./hero1.png";
import hero2 from "./hero2.png";
import hero3 from "./hero3.png";

export const Menus = [
    {
        name: "Features",
        subMenuHeading: ["Design", "Scale"],
        subMenu: [
            {
                name: "Design",
                desc: "Responsive design",
                icon: PanelsTopLeft,
            },
            {
                name: "Management",
                desc: "Site control",
                icon: Bolt,
            },
            {
                name: "Navigation",
                desc: "Link pages",
                icon: PanelTop,
            },
            {
                name: "CMS",
                desc: "Management content",
                icon: Database,
            },
        ],
        gridCols: 2,
    },
    {
        name: "Resources",
        subMenuHeading: ["Get started", "Programs", "Recent"],
        subMenu: [
            {
                name: "Markplace",
                desc: "Browse templates",
                icon: ShoppingBag,
            },
            {
                name: "Meetups",
                desc: "Upcoming events",
                icon: MapPin,
            },
            {
                name: "Updates",
                desc: "Changelog",
                icon: BellDot,
            },
            {
                name: "Academy",
                desc: "Watch lessions",
                icon: Play,
            },
            {
                name: "Blog",
                desc: "Posts",
                icon: BookOpenText,
            },
            {
                name: "Figma",
                desc: "Plugin",
                icon: Figma,
            },
            {
                name: "Experts",
                desc: "Jobs",
                icon: BriefcaseBusiness,
            },
            {
                name: "Gallery",
                desc: "Images",
                icon: Images,
            },
        ],
        gridCols: 3,
    },
    {
        name: "Support",
        subMenu: [
            {
                name: "Help",
                desc: "Center",
                icon: CircleHelp,
            },
            {
                name: "Community",
                desc: "Project help",
                icon: MessageCircle,
            },
            {
                name: "Emergency",
                desc: "Urgent issues",
                icon: TriangleAlert,
            },
        ],
        gridCols: 1,
    },
    {
        name: "Enterprise",
        subMenuHeading: ["Overview", "Features"],
        subMenu: [
            {
                name: "Enterprise",
                desc: "Overview",
                icon: ShieldPlus,
            },
            {
                name: "Collaboration",
                desc: "Design together",
                icon: Users,
            },
            {
                name: "Customers",
                desc: "Stories",
                icon: Dessert,
            },
            {
                name: "Security",
                desc: "Your site secured",
                icon: Lock,
            },
        ],
        gridCols: 2,
    },
    {
        name: "Pricing",
    },
    {
        name: "Contact",
    },
];

export const heroSliderData = [
    {
        title: "React for Beginners",
        subTitle: "Learn to build dynamic user interfaces and interactive web apps using one of the most popular JavaScript libraries.",
        image: hero1
    },
    {
        title: "Python for Data Science",
        subTitle: "Master Python programming to analyze data, create visualizations, and uncover insights that drive smarter decisions.",
        image: hero2
    },
    {
        title: "AWS Cloud Practitioner",
        subTitle: "Get a foundational understanding of cloud computing and AWS services to start your journey in the cloud industry.",
        image: hero3
    }
]

export const logo = { white_logo, black_logo }