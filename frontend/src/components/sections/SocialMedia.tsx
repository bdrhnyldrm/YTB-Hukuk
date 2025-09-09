import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-8">Sosyal Medya Hesaplarımız</h2>
        <div className="flex justify-center space-x-10">
          <a
            href="https://x.com/avaliihsanyldrm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 text-6xl transition-colors"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://www.instagram.com/ytbhukuk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-700 text-6xl transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/ali-ihsan-y%C4%B1ld%C4%B1r%C4%B1m-a64946181/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 text-6xl transition-colors"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
