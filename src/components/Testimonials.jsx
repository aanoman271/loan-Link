import React, { useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Small Business Owner",
      content:
        "LoanLink transformed my business. The application process was incredibly smooth, and I received the funds within 24 hours. Their transparency is unmatched.",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      content:
        "I was skeptical about online lenders, but LoanLink proved me wrong. Their rates were the most competitive I found, and the dashboard makes management easy.",
      avatar: "https://i.pravatar.cc/150?u=michael",
      rating: 5,
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Freelance Designer",
      content:
        "As a freelancer, traditional banks often rejected me. LoanLink understood my situation and provided a personalized loan that helped me upgrade my studio.",
      avatar: "https://i.pravatar.cc/150?u=elena",
      rating: 4,
    },
  ];

  // Duplicate testimonials for seamless loop - two sets is enough for -50% animation
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-app-surface-hover/30 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-app-text tracking-tight"
          >
            Hear from Our <span className="text-primary italic">Community</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-app-text-secondary text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Real stories from real people who have taken control of their financial destiny with us.
          </motion.p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-hidden group">
        {/* Gradient Edge Masks - using CSS variables for theme consistency */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-app-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-48 bg-gradient-to-l from-app-bg to-transparent z-10 pointer-events-none" />

        {/* Scrolling Content - Using CSS animation for perfect infinite loop and pause support */}
        <div
          className="flex gap-8 py-4 px-4 animate-marquee"
          style={{ 
            width: 'max-content',
            willChange: 'transform'
          }}
        >
          {duplicatedTestimonials.map((testimonial, idx) => (
            <motion.div
              key={`${testimonial.id}-${idx}`}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              className="w-[350px] md:w-[450px] flex-shrink-0 p-8 bg-app-surface rounded-3xl border border-app-border-subtle relative transition-all duration-300 hover:border-primary/50"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white text-xl shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform">
                <FaQuoteLeft />
              </div>

              <div className="flex gap-1 mb-6 text-amber-500">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4" />
                ))}
              </div>

              <p className="text-app-text-secondary mb-8 leading-relaxed italic text-lg">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 shadow-inner">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-app-text text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-app-text-muted font-medium">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); } /* Offset by half of gap if needed, but -50% is usually enough */
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};

export default Testimonials;

