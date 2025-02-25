import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

export const navbarLinks = [
  {
    id: 1,
    title: "INICIO",
    href: "/",
  },
  {
    id: 2,
    title: "PRODUCTOS",
    href: "/productos",
  },
  {
    id: 3,
    title: "SOBRE NOSOTROS",
    href: "/nosotros",
  },
];

export const socialLinks = [
  {
    id: 1,
    title: "Instagram",
    href: "https://www.instagram.com",
    icon: <FaInstagram />,
  },
  {
    id: 2,
    title: "Gmail",
    href: "https://www.gmail.com",
    icon: <FaEnvelope />,
  },
  {
    id: 3,
    title: "Facebook",
    href: "https://www.facebook.com",
    icon: <FaFacebookF />,
  },
  {
    id: 4,
    title: "Twitter",
    href: "https://www.twitter.com",
    icon: <FaXTwitter />,
  },
];
