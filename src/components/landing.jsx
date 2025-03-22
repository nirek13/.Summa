import React, { useState, useEffect } from 'react';

const SummaLandingPage = () => {
    const [email, setEmail] = useState('');
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll for navbar effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Gradient shape decorations */}
            <div className="fixed top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-blue-50 to-purple-50 rounded-full blur-3xl opacity-60 -z-10 transform translate-x-1/3 -translate-y-1/4"></div>
            <div className="fixed bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-50 to-green-50 rounded-full blur-3xl opacity-60 -z-10 transform -translate-x-1/4 translate-y-1/4"></div>

            <div className="max-w-6xl mx-auto px-6">
                {/* Navigation */}
                <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'py-6'}`}>
                    <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                        <div className="text-2xl font-medium tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">summa</span>
                        </div>
                        <div className="hidden md:flex gap-8">
                            <a href="#features" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">Features</a>
                            <a href="#about" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">About</a>
                            <a href="#contact" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">Contact</a>
                        </div>
                        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-lg transition duration-300">
                            Get Started
                        </button>
                    </div>
                </nav>

                {/* Hero section */}
                <div className="pt-32 pb-24">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                Distill knowledge into clarity
              </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Summa helps you extract essential insights from complex information,
                            presenting clarity where confusion once stood.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition duration-300">
                                Get Started
                            </button>
                            <button className="bg-white text-gray-800 border border-gray-200 px-8 py-3 rounded-full font-medium hover:shadow-md transition duration-300">
                                See Demo
                            </button>
                        </div>
                    </div>

                    {/* Hero visual */}
                    <div className="relative mx-auto w-full max-w-4xl h-96 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl overflow-hidden shadow-lg">
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-8 w-full max-w-2xl">
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                    <div
                                        key={item}
                                        className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300"
                                    >
                                        <div className="w-full h-4 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full mb-2"></div>
                                        <div className="w-2/3 h-3 bg-gray-100 rounded-full"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features section */}
                <section id="features" className="py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">How Summa transforms your workflow</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our platform uses cutting-edge technology to simplify complex information processing
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Analyze",
                                description: "Advanced algorithms parse complex texts to identify key concepts and relationships with unprecedented accuracy.",
                                icon: (
                                    <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Distill",
                                description: "Extract the essence of information, removing noise while preserving meaning through our proprietary methods.",
                                icon: (
                                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                )
                            },
                            {
                                title: "Present",
                                description: "Visualize insights in an intuitive interface designed for clarity and comprehension with customizable views.",
                                icon: (
                                    <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition duration-300">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonial section */}
                <section className="py-20">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-60 transform translate-x-1/3 -translate-y-1/3"></div>

                        <div className="relative z-10 max-w-3xl mx-auto text-center">
                            <svg className="w-12 h-12 text-indigo-400 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <blockquote className="text-2xl font-medium mb-6">
                                "Summa transformed how we process research data. What used to take days now happens in minutes, with better results and deeper insights we never thought possible."
                            </blockquote>
                            <div className="flex items-center justify-center">
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-indigo-500 font-bold">EM</span>
                                </div>
                                <div className="text-left">
                                    <p className="font-bold">Elena Markova</p>
                                    <p className="text-gray-600">Research Director, Quantum Analytics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA section */}
                <section id="contact" className="py-20">
                    <div className="bg-white border border-gray-100 rounded-3xl p-12 shadow-xl">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-6">Ready to experience the future of information processing?</h2>
                            <p className="text-xl text-gray-600 mb-8">
                                Join thousands of researchers, analysts, and knowledge workers who are already using Summa.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className="w-full sm:w-64 px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                                />
                                <button className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition duration-300">
                                    Get Early Access
                                </button>
                            </div>
                            <p className="text-gray-500 text-sm">
                                No credit card required. Free trial for 14 days.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-xl font-medium tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">summa</span>
                        </div>
                        <div className="flex gap-8">
                            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">Privacy</a>
                            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">Terms</a>
                            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">Support</a>
                            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">Blog</a>
                        </div>
                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-indigo-50 hover:text-indigo-500 transition">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-indigo-50 hover:text-indigo-500 transition">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-indigo-50 hover:text-indigo-500 transition">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <p className="text-center text-gray-500 text-sm mt-8">
                        © {new Date().getFullYear()} Summa. All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default SummaLandingPage;