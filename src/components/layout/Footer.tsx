import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Dock from "../Dock";
import TrueFocus from "../ui/true-focus";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialItems = [
    {
      icon: <Twitter size={20} />,
      label: "Twitter",
      onClick: () => window.open("https://twitter.com/yourhandle", "_blank"),
    },
    {
      icon: <Github size={20} />,
      label: "GitHub",
      onClick: () => window.open("#", "_blank"),
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      onClick: () =>
        window.open("https://linkedin.com/company/yourcompany", "_blank"),
    },
    {
      icon: <Mail size={20} />,
      label: "Contact",
      onClick: () => window.open("mailto:contact@medhive.com"),
    },
  ];

  const linkGroups = [
    {
      title: "Platform",
      links: [
        { name: "Model Hub", path: "/model-hub" },
        { name: "Contribute", path: "/contribute" },
        { name: "Pricing", path: "/pricing" },
        { name: "Documentation", path: "/docs" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Blog", path: "/blog" },
        { name: "Careers", path: "/careers" },
        { name: "Contact", path: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Data Protection", path: "/data-protection" },
        { name: "Security", path: "/security" },
      ],
    },
  ];

  return (
    <footer className="py-8 mt-15">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-1">
              <TrueFocus
                sentence="MH MedHive"
                manualMode={false}
                blurAmount={5}
                borderColor="cyan"
                glowColor="rgba(0, 255, 255, 0.6)"
                animationDuration={2.0}
                pauseBetweenAnimations={0.5}
              />
            </Link>
            <p className="text-gray-400 mb-6 max-w-md font-['Poppins']">
              A secure federated learning platform that enables hospitals to
              collaboratively train ML models without compromising patient
              privacy.
            </p>

            <Dock
              items={socialItems}
              panelHeight={64}
              baseItemSize={40}
              magnification={50}
              //className="relative mx-auto"
            />
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-['Lilita_One'] text-white mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-white hover:text-medhive-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-5 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm font-['Poppins']">
              © {currentYear} MedHive. All rights reserved.
            </p>
            <div className="flex items-center mt-4 sm:mt-0">
              <p className="text-gray-400 text-sm font-['Poppins']">
                Built with passion for medical innovation
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
