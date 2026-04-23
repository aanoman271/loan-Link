import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-base-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">Get in <span className="text-primary">Touch</span></h1>
          <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
            Have questions about our loan products or need assistance with your application? 
            Our team is here to help you every step of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {[
              { icon: <FaEnvelope />, title: "Email Us", detail: "support@loanlink.com", subDetail: "Response within 24 hours" },
              { icon: <FaPhoneAlt />, title: "Call Us", detail: "+1 (555) 000-0000", subDetail: "Mon-Fri, 9am - 6pm EST" },
              { icon: <FaMapMarkerAlt />, title: "Visit Office", detail: "123 Financial District", subDetail: "New York, NY 10001" }
            ].map((item, index) => (
              <div key={index} className="p-6 glass rounded-2xl border border-base-content/5 flex items-start gap-4 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-base-content font-medium">{item.detail}</p>
                  <p className="text-base-content/50 text-sm">{item.subDetail}</p>
                </div>
              </div>
            ))}

            {/* Social Links or Map Preview could go here */}
            <div className="p-8 bg-base-200 rounded-2xl border border-base-content/5 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <FaMapMarkerAlt className="w-24 h-24" />
                </div>
                <h3 className="font-bold text-xl mb-4">Our Presence</h3>
                <p className="text-sm text-base-content/70 leading-relaxed">
                    We operate globally with regional hubs in London, Singapore, and New York to provide localized financial expertise.
                </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form className="p-8 md:p-10 glass rounded-3xl border border-base-content/5 shadow-premium">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Full Name</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="input input-bordered w-full bg-base-200/50 focus:border-primary transition-all rounded-xl" 
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Email Address</span>
                  </label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="input input-bordered w-full bg-base-200/50 focus:border-primary transition-all rounded-xl" 
                  />
                </div>
              </div>
              
              <div className="form-control w-full mb-6">
                <label className="label">
                  <span className="label-text font-semibold">Subject</span>
                </label>
                <select className="select select-bordered w-full bg-base-200/50 focus:border-primary transition-all rounded-xl">
                  <option disabled selected>Select an option</option>
                  <option>General Inquiry</option>
                  <option>Loan Application Support</option>
                  <option>Repayment Questions</option>
                  <option>Business Partnerships</option>
                </select>
              </div>

              <div className="form-control w-full mb-8">
                <label className="label">
                  <span className="label-text font-semibold">Message</span>
                </label>
                <textarea 
                  className="textarea textarea-bordered h-32 bg-base-200/50 focus:border-primary transition-all rounded-xl" 
                  placeholder="Tell us how we can help..."
                ></textarea>
              </div>

              <button className="btn btn-primary w-full md:w-auto px-10 rounded-xl flex items-center gap-2 group">
                <span>Send Message</span>
                <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
