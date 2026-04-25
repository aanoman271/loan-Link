import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

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

  return (
    <section className="py-20 bg-base-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-base-content tracking-tight">
            Hear from Our <span className="text-primary italic">Community</span>
          </h2>
          <p className="text-base-content/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Real stories from real people who have taken control of their financial destiny with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-8 glass rounded-3xl border border-base-content/5 relative group hover:shadow-premium transition-all"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white text-xl shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform">
                <FaQuoteLeft />
              </div>
              
              <div className="flex gap-1 mb-6 text-amber-500">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4" />
                ))}
              </div>

              <p className="text-base-content/80 mb-8 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-base-content">{testimonial.name}</h4>
                  <p className="text-sm text-base-content/50">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
