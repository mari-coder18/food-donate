import { useState } from "react";
import { toast } from "react-toastify";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const FORMSPREE_URL =
  import.meta.env.VITE_FORMSPREE_URL || "https://formspree.io/f/mdavdrqy";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.warning("Please fill all fields");
      return;
    }

    setSending(true);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("Message sent successfully! We'll reply to your email soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Contact Information */}
        <div className="md:w-5/12 bg-indigo-600 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-indigo-500 rounded-full opacity-50 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Get in Touch</h2>
            <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
              We'd love to hear from you. Our friendly team is always here to chat about food donations and partnerships.
            </p>

            <div className="space-y-6">
              <div className="flex items-center group">
                <div className="bg-indigo-500/30 p-3 rounded-full mr-4 group-hover:bg-white group-hover:text-indigo-600 transition-colors duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-indigo-200">Call us</p>
                  <p className="font-semibold text-lg">+91 9369038543</p>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="bg-indigo-500/30 p-3 rounded-full mr-4 group-hover:bg-white group-hover:text-indigo-600 transition-colors duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-indigo-200">Email us</p>
                  <p className="font-semibold text-lg">fooddonate@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="bg-indigo-500/30 p-3 rounded-full mr-4 group-hover:bg-white group-hover:text-indigo-600 transition-colors duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-indigo-200">Visit us</p>
                  <p className="font-semibold text-lg">Tamil Nadu, India</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mt-12 text-indigo-200 text-sm">
            <p>&copy; {new Date().getFullYear()} Food Donate. All rights reserved.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-7/12 p-8 md:p-12">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Send us a message</h3>
            <p className="text-gray-500">Fill out the form below and we'll get back to you shortly.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  disabled={sending}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 disabled:opacity-60"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  disabled={sending}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows="5"
                disabled={sending}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 resize-none disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              <span>{sending ? "Sending Message..." : "Send Message"}</span>
              {!sending && <Send size={18} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
