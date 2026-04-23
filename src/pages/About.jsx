import React from "react";
import { FaRocket, FaUsers, FaShieldAlt, FaHandshake } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-6 transform origin-top-left -translate-y-12"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-base-content mb-6 tracking-tight">
              Empowering Your <span className="text-primary">Financial Future</span>
            </h1>
            <p className="text-lg md:text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
              LoanLink is more than just a lending platform. We're a technology-driven 
              financial partner dedicated to making credit accessible, transparent, 
              and fair for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-base-content">Our Mission</h2>
              <p className="text-base-content/70 text-lg leading-relaxed">
                To revolutionize the lending industry by leveraging cutting-edge technology 
                to provide seamless, secure, and personalized financial solutions. We believe 
                that everyone deserves the opportunity to achieve their dreams without being 
                held back by complex financial hurdles.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <h3 className="font-bold text-primary text-2xl">98%</h3>
                  <p className="text-sm text-base-content/60">Approval Rate</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                  <h3 className="font-bold text-secondary text-2xl">24h</h3>
                  <p className="text-sm text-base-content/60">Quick Processing</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000" 
                  alt="Team working" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 p-6 glass rounded-2xl hidden lg:block max-w-xs shadow-xl">
                <p className="text-sm font-medium italic text-base-content/80">
                  "Our technology simplifies the complex, so you can focus on what matters most to you."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-base-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-base-content mb-16">The Values That Drive Us</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <FaShieldAlt />, title: "Trust & Security", desc: "Your data and financial security are our top priorities." },
              { icon: <FaRocket />, title: "Innovation", desc: "We constantly evolve our tech to serve you better and faster." },
              { icon: <FaUsers />, title: "Inclusion", desc: "Financial services designed for everyone, everywhere." },
              { icon: <FaHandshake />, title: "Transparency", desc: "No hidden fees, no surprises. Just clear, honest lending." }
            ].map((value, index) => (
              <div key={index} className="p-8 glass rounded-2xl hover:shadow-premium transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-2xl mb-6 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-base-content/60 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 L100 0 L100 100 Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Ready to start your journey?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of satisfied customers who have found their financial freedom with LoanLink.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <button className="btn btn-white text-primary border-none hover:bg-base-100 px-8">Apply for Loan</button>
              <button className="btn btn-outline text-white hover:bg-white/10 px-8 border-white/30">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
