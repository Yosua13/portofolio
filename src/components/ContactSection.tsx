"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, Send } from "lucide-react";
import SectionHeader from "./SectionHeader";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    
    // Simulate API request
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 4000);
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      id="contact"
      className="scroll-mt-32 border-t border-white/5 pt-16 space-y-12"
    >
      <SectionHeader
        topText="Get In Touch"
        mainText="Contact"
        subText="Say Hello"
        bottomText="Interested in working together? Let's build something reliable and useful."
        watermark="CONNECT"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto text-left">
        {/* Left Side: Contact Information cards */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white font-sans tracking-wide">
              Let&apos;s build something great
            </h3>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out via email, phone, or any of my social channels.
            </p>
          </div>

          <div className="space-y-4">
            {/* Email Card */}
            <div className="flex items-center gap-4 p-4 bg-[#0d0f18]/45 border border-white/5 hover:border-indigo-500/35 rounded-2xl transition-all duration-300">
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-0.5">Email</span>
                <a href="mailto:reyyosua29@gmail.com" className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors">
                  reyyosua29@gmail.com
                </a>
              </div>
            </div>

            {/* WhatsApp/Phone Card */}
            <div className="flex items-center gap-4 p-4 bg-[#0d0f18]/45 border border-white/5 hover:border-indigo-500/35 rounded-2xl transition-all duration-300">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-0.5">WhatsApp / Phone</span>
                <a href="https://wa.me/6282251396690" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors">
                  +62 822 5139 6690
                </a>
              </div>
            </div>

            {/* Socials Card */}
            <div className="flex items-center gap-4 p-4 bg-[#0d0f18]/45 border border-white/5 rounded-2xl">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Social Channels</span>
                <div className="flex items-center gap-4">
                  <a href="https://github.com/Yosua13" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider">
                    GitHub
                  </a>
                  <span className="text-slate-700">|</span>
                  <a href="https://www.linkedin.com/in/yosua-reynaldi-manurun/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7 bg-[#0d0f18]/45 border border-white/5 rounded-3xl p-6 sm:p-8 relative">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name field */}
              <div className="space-y-2">
                <label htmlFor="form-name" className="text-xs font-bold text-slate-300 uppercase tracking-wider">Your Name</label>
                <input
                  id="form-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-[#050508] border border-white/5 focus:border-indigo-500/40 rounded-xl text-sm text-slate-200 outline-none transition-colors"
                />
              </div>
              
              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="form-email" className="text-xs font-bold text-slate-300 uppercase tracking-wider">Your Email</label>
                <input
                  id="form-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-[#050508] border border-white/5 focus:border-indigo-500/40 rounded-xl text-sm text-slate-200 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Message field */}
            <div className="space-y-2">
              <label htmlFor="form-message" className="text-xs font-bold text-slate-300 uppercase tracking-wider">Your Message</label>
              <textarea
                id="form-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Let's build something amazing together..."
                className="w-full px-4 py-3 bg-[#050508] border border-white/5 focus:border-indigo-500/40 rounded-xl text-sm text-slate-200 outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                isSubmitting 
                  ? "bg-slate-800 text-slate-400 cursor-not-allowed" 
                  : "bg-white text-[#0a0a0a] hover:bg-slate-200 shadow-lg shadow-white/5"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send className="w-3.5 h-3.5" />
            </button>

            {/* Submit Toast Status */}
            {submitStatus === "success" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-emerald-400 text-xs font-bold text-center uppercase tracking-wider mt-2"
              >
                Thank you! Your message has been sent successfully.
              </motion.div>
            )}
            {submitStatus === "error" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-red-400 text-xs font-bold text-center uppercase tracking-wider mt-2"
              >
                Failed to send message. Please try again.
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </motion.section>
  );
}
