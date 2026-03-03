// src/components/SocialSidebar.jsx
import { FaInstagram, FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";

export default function SocialSidebar() {
  const socials = [
    { name: "Instagram", icon: <FaInstagram />, url: "https://instagram.com/crochetofindia?igsh=MWI2eW1hMzU3b3RxYQ==" },
    { name: "YouTube", icon: <FaYoutube />, url: "https://youtube.com/@crochetofindia?si=KbQp0GmkKU6g_SZy" },
    { name: "Facebook", icon: <FaFacebook />, url: "https://instagram.com/crochetofindia?igsh=MWI2eW1hMzU3b3RxYQ==" },
    { name: "Twitter", icon: <FaTwitter />, url: "https://instagram.com/crochetofindia?igsh=MWI2eW1hMzU3b3RxYQ==" },
  ];

  return (
    <div className="fixed top-1/3 left-0 flex flex-col space-y-4 z-50">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-gray-800 text-white hover:bg-gray-700 transition rounded-tr-md rounded-br-md shadow-lg"
          title={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}