import React from "react";
import { Link } from "react-router";
import Logo from "../Logo";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Fotter = () => {
  return (
    <footer className="bg-neutral text-neutral-content pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Logo />
            <p className="text-neutral-content/70 text-sm leading-relaxed max-w-xs">
              LoanLink is your trusted partner for transparent microloan solutions. 
              We empower small businesses and individuals with fast, secure financial support.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-base-100/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-base-100/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-base-100/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <FaLinkedinIn />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-base-100/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-neutral-content/70">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/allLoan" className="hover:text-primary transition-colors">All Loans</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-neutral-content/70">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Stay Updated</h4>
            <p className="text-neutral-content/70 text-sm mb-4">
              Subscribe to our newsletter for the latest financial tips and news.
            </p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 bg-base-100/10 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <button className="w-full bg-primary hover:bg-primary-focus text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-content/50">
          <p>© 2026 LoanLink System. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Fotter;
