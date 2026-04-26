import React from "react";
import { FaRocket, FaUsers, FaShieldAlt, FaHandshake } from "react-icons/fa";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="bg-base-100 py-16 lg:py-24 overflow-hidden">
      {/* Introduction */}
      <section className="relative mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-base-content mb-6 tracking-tight">
              Empowering Your <span className="text-primary italic">Financial Future</span>
            </h2>
            <p className="text-base md:text-lg text-base-content/60 max-w-3xl mx-auto leading-relaxed">
              LoanLink is more than just a lending platform. We're a technology-driven
              financial partner dedicated to making credit accessible, transparent,
              and fair for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-base-content">Our Mission</h3>
                <p className="text-base-content/70 text-base md:text-lg leading-relaxed">
                  To revolutionize the lending industry by leveraging cutting-edge technology
                  to provide seamless, secure, and personalized financial solutions. We believe
                  that everyone deserves the opportunity to achieve their dreams without being
                  held back by complex financial hurdles.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 shadow-sm">
                  <h3 className="font-black text-primary text-3xl">98%</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-base-content/40 mt-1">Approval Rate</p>
                </div>
                <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/10 shadow-sm">
                  <h3 className="font-black text-secondary text-3xl">24h</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-base-content/40 mt-1">Quick Processing</p>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-premium group">
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000"
                  alt="Team working"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 p-6 glass rounded-2xl hidden xl:block max-w-xs shadow-xl animate-in slide-in-from-left-4 duration-1000">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-4 tracking-tight">The Values That Drive Us</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: <FaShieldAlt />, title: "Trust & Security", desc: "Your data and financial security are our top priorities." },
              { icon: <FaRocket />, title: "Innovation", desc: "We constantly evolve our tech to serve you better and faster." },
              { icon: <FaUsers />, title: "Inclusion", desc: "Financial services designed for everyone, everywhere." },
              { icon: <FaHandshake />, title: "Transparency", desc: "No hidden fees, no surprises. Just clear, honest lending." }
            ].map((value, index) => (
              <div key={index} className="p-8 card-modern group hover:-translate-y-2">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-base-content">{value.title}</h3>
                <p className="text-base-content/60 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-primary rounded-[2.5rem] p-6 sm:p-10 md:p-16 text-center text-white relative overflow-hidden shadow-premium">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black mb-6 relative z-10 tracking-tight leading-tight">
              Ready to start your <br className="hidden sm:block" /> journey?
            </h2>
            <p className="text-white/80 text-sm sm:text-base md:text-lg mb-10 max-w-xl mx-auto relative z-10 leading-relaxed">
              Join thousands of satisfied customers who have found their financial freedom with LoanLink.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Link to="/allLoan" className="btn bg-white hover:bg-base-200 text-primary border-none rounded-2xl px-8 sm:px-10 h-12 sm:h-14 font-bold shadow-lg shadow-black/10 transition-all active:scale-95">Apply for Loan</Link>
              <button className="btn btn-outline text-white hover:bg-white/10 border-white/30 rounded-2xl px-8 sm:px-10 h-12 sm:h-14 font-bold transition-all active:scale-95">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
