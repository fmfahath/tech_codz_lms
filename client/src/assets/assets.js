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
import { Brain } from "lucide-react";
import { DatabaseZap } from "lucide-react";
import { BrainCircuit } from "lucide-react";
import { FolderCode } from "lucide-react";
import { CloudUpload } from "lucide-react";
import { ShieldBan } from "lucide-react";
import { UserCog } from "lucide-react";
import { BotMessageSquare } from "lucide-react";
import white_logo from "./white_logo.png";
import black_logo from "./black_logo.png";

export const Menus = [
    {
        name: "Courses",
        subMenuHeading: ["Get started"],
        subMenu: [
            {
                name: "Artificial Intelligence",
                desc: "Explore AI tools and innovations",
                icon: Brain,
            },
            {
                name: "Data Science",
                desc: "Analyze and visualize data trends",
                icon: DatabaseZap,
            },
            {
                name: "Machine Learning",
                desc: "Build and train intelligent models",
                icon: BrainCircuit,
            },
            {
                name: "Software Engineering",
                desc: "Design, develop, and optimize software",
                icon: FolderCode,
            },
            {
                name: "Cloud Computing",
                desc: "Deploy and scale applications in the cloud",
                icon: CloudUpload,
            },
            {
                name: "Cyber Security",
                desc: "Protect systems and secure digital assets",
                icon: ShieldBan,
            },
            {
                name: "Information Management",
                desc: "Organize, store, and manage information",
                icon: UserCog,
            },
            {
                name: "Robotics",
                desc: "Innovate with automation and robotics",
                icon: BotMessageSquare,
            },

        ],
        gridCols: 2,
    },
    {
        name: "Programs",
        subMenuHeading: ["Overview", "Features"],
        subMenu: [
            {
                name: "Bootcamps",
                desc: "Intensive hands-on training programs",
                icon: ShieldPlus,
            },
            {
                name: "Webinars",
                desc: "Live sessions with industry experts",
                icon: Users,
            },
            {
                name: "Workshops",
                desc: "Practical learning with real projects",
                icon: Dessert,
            },
            {
                name: "LMS",
                desc: "Manage courses and track learning",
                icon: Lock,
            },

        ],
        gridCols: 2,
    },
    {
        name: "Support",
        subMenu: [
            {
                name: "Help",
                desc: "Get support and FAQs",
                icon: CircleHelp,
            },
            {
                name: "Community",
                desc: "Connect and collaborate with peers",
                icon: MessageCircle,
            },
            {
                name: "Careers",
                desc: "Explore jobs and opportunities",
                icon: TriangleAlert,
            },
        ],
        gridCols: 1,
    },
    {
        name: "Contact",
    },
];

export const logo = { white_logo, black_logo }