import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Logo } from "../icons/Logo";
import { useAuth } from "../store/useAuth";
import type { AuthState } from "../store/useAuth";
import heroImage from "../assets/craiyon_220824_image.png";

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const token = useAuth((s: AuthState) => s.token);
  const isSignedIn = !!token;
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {}, [token]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen cozy-dark-bg">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0f1724]/80 backdrop-blur-lg shadow-lg py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 animate-fade-in">
            <button
              onClick={() => navigate('/')}
              aria-label="Go to Home"
              className="flex items-center gap-2 focus:outline-none"
            >
              <Logo />
              <span className="text-2xl font-bold text-indigo-500">DigiBrain</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-300 hover:text-indigo-300 transition-colors font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-300 hover:text-indigo-300 transition-colors font-medium"
            >
              How It Works
            </button>
           
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-gray-300 hover:text-indigo-300 transition-colors font-medium"
            >
              Testimonials
            </button>
          </div>

          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-500 transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    useAuth.getState().clear();
                    try { localStorage.removeItem('auth-storage'); } catch (e) { console.warn('failed to remove auth-storage', e); }
                    navigate('/');
                  }}
                  className="px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-900/20 transition-all"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/signin")}
                  className="text-gray-300 hover:text-indigo-300 transition-colors font-medium"
                >
                  Sign In
                </button>
                <Button
                  onClick={() => navigate("/signup")}
                  variant="primary"
                  text="Get Started"
                />
              </>
            )}
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <h1 className="text-6xl font-bold leading-tight">
                Your{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Second Brain
                </span>
                <br />
                Powered by AI
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                Store, organize, and search your content with the power of semantic AI. 
                Never lose track of important tweets, videos, or articles again.
              </p>
              <div className="flex gap-4">
                {!isSignedIn && (
                  <Button
                    onClick={() => navigate("/signup")}
                    variant="primary"
                    text="Get Started"
                  />
                )}
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-all"
                >
                  Watch Demo
                </button>
              </div>
            </div>

            <div className="relative animate-float">
             <img src={heroImage} alt="Hero" className="mx-auto max-w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6 bg-[#071029] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-400">Everything you need to manage your digital knowledge</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#0f1724] border border-gray-800 hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Semantic Search</h3>
              <p className="text-gray-400">
                Find content by meaning, not just keywords. Search "internship opportunities" and find relevant tweets, even if they don't use those exact words.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0f1724] border border-gray-800 hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Multi-Format Support</h3>
              <p className="text-gray-400">
                Save tweets, YouTube videos, documents, and web links all in one place. Rich previews make everything easy to browse.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0f1724] border border-gray-800 hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure & Private</h3>
              <p className="text-gray-400">
                Your data is encrypted and secure. Share your brain with others via secure links, or keep everything private.
              </p>
            </div>
          </div>
        </div>
      </section>

  <section id="how-it-works" className="py-20 px-6 bg-[#071029] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Get started in minutes</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Sign Up", desc: "Create your free account in seconds", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" },
              { step: "02", title: "Add Content", desc: "Save tweets, videos, and links with one click", icon: "M12 4v16m8-8H4" },
              { step: "03", title: "AI Processes", desc: "Our AI understands your content semantically", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
              { step: "04", title: "Search & Find", desc: "Find anything with natural language search", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="bg-[#0f1724] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-800">
                  <div className="text-indigo-600 text-5xl font-bold mb-4 opacity-20 group-hover:opacity-100 transition-opacity">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <svg className="w-8 h-8 text-indigo-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      

  <section id="testimonials" className="py-20 px-6 bg-[#071029] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Knowledge Workers</h2>
            <p className="text-xl text-gray-400">See what our users have to say</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Chen", role: "Product Designer", text: "DigiBrain has completely changed how I organize my research. The AI search is incredible!", avatar: "S" },
              { name: "Michael Rodriguez", role: "Content Creator", text: "I save every interesting tweet and video here. Finding things later is so easy with semantic search.", avatar: "M" },
              { name: "Emily Watson", role: "Software Engineer", text: "Best second brain app I've used. The share feature is perfect for team collaboration.", avatar: "E" }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-[#0f1724] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 border border-gray-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  <section className="py-20 px-6 bg-gradient-to-r from-indigo-800 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Build Your Second Brain?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of knowledge workers who never lose important content again.
          </p>
          <div className="flex gap-4 justify-center">
            {!isSignedIn && (
              <button
                onClick={() => navigate("/signup")}
                className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-bold text-lg hover:bg-indigo-500 transition-all transform hover:scale-105"
              >
                Get Started
              </button>
            )}
            <button
              onClick={() => scrollToSection("features")}
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

  <footer className="bg-[#06111b] text-white py-12 px-6 justify-center">
    
          
            <div className="text-center">
            <div className="flex justify-center mb-6">
              <button onClick={() => navigate('/')} className="flex items-center gap-2 focus:outline-none">
                <Logo/>
                <span className="text-2xl font-bold text-indigo-500">DigiBrain</span>
              </button>
            </div>
            <p className="text-gray-400">Your second brain, powered by AI.</p>
          </div>
          
          <div className="max-w-7xl mx-auto mt-6 text-center text-gray-400 items-center">
          <p>&copy; 2025 DigiBrain. All rights reserved.</p>
        </div>

        

         
        

        
      </footer>
    </div>
  );
}
