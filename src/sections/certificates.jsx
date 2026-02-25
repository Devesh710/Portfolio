import React from "react";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const baseUrl = import.meta.env.BASE_URL || "/";

const certificates = [
  {
    id: 1,
    title: "Advanced React Patterns",
    // issuer: "Coursera",
    // date: "Jan 2024",
    image: `${baseUrl}images/certification/communication-skills.jpg`,
    // credentialLink: "https://example.com/credential/1",
  },
  {
    id: 2,
    title: "Full-Stack Web Development",
    // issuer: "Udemy",
    // date: "Feb 2024",
    image: `${baseUrl}images/certification/computer-basics.jpg`,
    // credentialLink: "https://example.com/credential/2",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    // issuer: "Google",
    // date: "Mar 2024",
    image: `${baseUrl}images/certification/computer-network-basics.jpg`,
    // credentialLink: "https://example.com/credential/3",
  },
  {
    id: 4,
    title: "JavaScript Mastery",
    // issuer: "Frontend Masters",
    // date: "Apr 2024",
    image: `${baseUrl}images/certification/computing-from-past-to-present.jpg`,
    // credentialLink: "https://example.com/credential/4",
  },
  {
    id: 5,
    title: "TypeScript in Depth",
    // issuer: "Pluralsight",
    // date: "May 2024",
    image: `${baseUrl}images/certification/information-technology-fundamentals.jpg`,
    //credentialLink: "https://example.com/credential/5",
  },
  {
    id: 6,
    title: "React Performance Optimization",
    // issuer: "Udacity",
    // date: "Jun 2024",
    image: `${baseUrl}images/certification/professional-skills.jpg`,
    // credentialLink: "https://example.com/credential/6",
  },
  {
    id: 7,
    title: "Next.js for Production",
    // issuer: "Vercel",
    // date: "Jul 2024",
    image: `${baseUrl}images/certification/security-basics.jpg`,
    // credentialLink: "https://example.com/credential/7",
  },
  {
    id: 8,
    title: "Advanced CSS & Animations",
    // issuer: "freeCodeCamp",
    // date: "Aug 2024",
    image: `${baseUrl}images/certification/support-a-customer.jpg`,
    // credentialLink: "https://example.com/credential/8",
  },
  {
    id: 9,
    title: "Web Accessibility",
    // issuer: "edX",
    // date: "Sep 2024",
    image: `${baseUrl}images/certification/support-basics.jpg`,
    // credentialLink: "https://example.com/credential/9",
  },
  {
    id: 10,
    title: "Design Systems",
    issuer: "LinkedIn Learning",
    // date: "Oct 2024",
    image: `${baseUrl}images/certification/troubleshooting-for-hardware.jpg`,
    // credentialLink: "https://example.com/credential/10",
  },
  {
    id: 11,
    title: "Framer Motion Animations",
    // issuer: "Scrimba",
    // date: "Nov 2024",
    image: `${baseUrl}images/certification/you-future-in-it-support.jpg`,
    // credentialLink: "https://example.com/credential/11",
  },
//   {
//     id: 12,
//     title: "Responsive Web Design",
//     issuer: "freeCodeCamp",
//     date: "Dec 2024",
//     image: "https://via.placeholder.com/600x400?text=Certificate+12",
//     credentialLink: "https://example.com/credential/12",
//   },
//   {
//     id: 13,
//     title: "Advanced UI Engineering",
//     issuer: "Coursera",
//     date: "Jan 2025",
//     image: "https://via.placeholder.com/600x400?text=Certificate+13",
//     credentialLink: "https://example.com/credential/13",
//   },
];

const Certificates = () => {
  return (
    <section id="certificates" className="relative w-full py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            My Certifications
          </h2>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            A curated collection of certifications showcasing my learning journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Swiper
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView={1}
            spaceBetween={30}
            coverflowEffect={{
              rotate: 25,
              stretch: 0,
              depth: 180,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 2800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
            }}
            className="w-full"
          >
            {certificates.map((cert) => (
              <SwiperSlide key={cert.id}>
                <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl shadow-black/30">
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    {/* <h3 className="text-lg font-semibold text-white">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-400">{cert.issuer}</p>
                    <p className="text-xs text-gray-500">{cert.date}</p> */}
                    {/* <a
                      href={cert.credentialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white bg-white/10 border border-white/10 transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                    >
                      View Credential
                    </a> */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
