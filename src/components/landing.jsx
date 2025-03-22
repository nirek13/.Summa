import React, { useState, useEffect } from 'react';

// Updated styles with new color palette and LED lighting effects
const styles = {
    // Layout & Base Styles
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        position: 'relative',
        zIndex: 1,
    },
    pageWrapper: {
        minHeight: '100vh',
        backgroundColor: '#FAFBFD', // Updated to new light color
        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#323232', // Updated to dark color from palette
        position: 'relative',
        overflow: 'hidden',
    },

    // Hero Section - Updated with LED glow
    heroSection: {
        paddingTop: '120px',
        paddingBottom: '80px',
        background: 'linear-gradient(180deg, #FAFBFD 0%, #FAFBFD 100%)',
        position: 'relative',
    },
    heroLedGlow: {
        position: 'absolute',
        top: '50%',
        left: '10%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(77, 118, 110, 0.2) 0%, rgba(77, 118, 110, 0) 70%)',
        filter: 'blur(40px)',
        opacity: 0.8,
        animation: 'pulse 8s infinite alternate',
        zIndex: 0,
    },
    heroLedGlow2: {
        position: 'absolute',
        bottom: '10%',
        right: '15%',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(104, 137, 144, 0.15) 0%, rgba(104, 137, 144, 0) 70%)',
        filter: 'blur(30px)',
        opacity: 0.7,
        animation: 'pulse 10s infinite alternate-reverse',
        zIndex: 0,
    },
    heroContent: {
        maxWidth: '980px',
        margin: '0 auto',
        textAlign: 'center',
        marginBottom: '64px',
        position: 'relative',
        zIndex: 2,
    },
    heroTitle: {
        fontSize: '56px',
        fontWeight: 600,
        lineHeight: 1.1,
        marginBottom: '24px',
        color: '#323232', // Updated to dark color
        textShadow: '0 0 10px rgba(77, 118, 110, 0.1)', // Subtle LED glow
        '@media (min-width: 768px)': {
            fontSize: '64px',
        }
    },
    heroText: {
        fontSize: '21px',
        color: '#688990', // Updated to teal color
        lineHeight: 1.5,
        marginBottom: '32px',
        maxWidth: '800px',
        margin: '0 auto 32px',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        justifyContent: 'center',
        '@media (min-width: 640px)': {
            flexDirection: 'row',
        }
    },
    primaryButton: {
        display: 'inline-block',
        backgroundColor: '#4D766E', // Updated to dark teal
        color: 'white',
        fontWeight: 400,
        fontSize: '17px',
        padding: '12px 22px',
        borderRadius: '980px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textDecoration: 'none',
        border: 'none',
        boxShadow: '0 0 15px rgba(77, 118, 110, 0.5)', // LED glow effect
        ':hover': {
            backgroundColor: '#688990', // Lighter teal on hover
            boxShadow: '0 0 20px rgba(77, 118, 110, 0.7)', // Enhanced LED glow on hover
        }
    },
    secondaryButton: {
        display: 'inline-block',
        backgroundColor: 'transparent',
        color: '#4D766E', // Updated to dark teal
        border: 'none',
        fontWeight: 400,
        fontSize: '17px',
        padding: '12px 22px',
        borderRadius: '980px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textDecoration: 'none',
        ':hover': {
            textDecoration: 'underline',
            textShadow: '0 0 8px rgba(77, 118, 110, 0.3)', // Subtle LED glow on hover
        }
    },

    // Features Section with LED accents
    featuresSection: {
        padding: '100px 0',
        backgroundColor: '#FAFBFD', // Updated to light color
        position: 'relative',
        overflow: 'hidden',
    },
    featureLedGlow: {
        position: 'absolute',
        bottom: '-50px',
        left: '30%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(77, 118, 110, 0.1) 0%, rgba(77, 118, 110, 0) 70%)',
        filter: 'blur(50px)',
        opacity: 0.6,
        animation: 'pulse 12s infinite alternate',
        zIndex: 0,
    },
    sectionHeader: {
        textAlign: 'center',
        marginBottom: '80px',
        position: 'relative',
        zIndex: 2,
    },
    sectionTitle: {
        fontSize: '40px',
        fontWeight: 600,
        marginBottom: '16px',
        color: '#323232', // Updated to dark color
        textShadow: '0 0 8px rgba(77, 118, 110, 0.1)', // Subtle LED glow
    },
    sectionSubtitle: {
        fontSize: '21px',
        color: '#688990', // Updated to teal color
        maxWidth: '700px',
        margin: '0 auto',
        lineHeight: 1.5,
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '40px',
        position: 'relative',
        zIndex: 2,
        '@media (min-width: 768px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
        }
    },
    featureCard: {
        backgroundColor: '#FAFBFD', // Updated to light color
        borderRadius: '18px',
        padding: '40px 30px',
        transition: 'all 0.3s ease',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.04)',
        position: 'relative',
        overflow: 'hidden',
        ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.06), 0 0 20px rgba(77, 118, 110, 0.2)', // Added LED glow on hover
        }
    },
    featureCardLed: {
        position: 'absolute',
        bottom: '-30px',
        right: '-30px',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(77, 118, 110, 0.1) 0%, rgba(77, 118, 110, 0) 70%)',
        filter: 'blur(20px)',
        opacity: 0,
        transition: 'all 0.5s ease',
    },
    featureCardHoverLed: {
        opacity: 0.8,
        animation: 'pulse 3s infinite alternate',
    },
    featureIcon: {
        width: '56px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
        color: '#4D766E', // Updated to dark teal
        filter: 'drop-shadow(0 0 8px rgba(77, 118, 110, 0.3))', // LED glow for icon
    },
    featureTitle: {
        fontSize: '24px',
        fontWeight: 600,
        marginBottom: '12px',
        color: '#323232', // Updated to dark color
    },
    featureText: {
        color: '#688990', // Updated to teal color
        lineHeight: 1.5,
        fontSize: '17px',
    },

    // Tabs Section - Updated tabs with LED effect
    tabsSection: {
        padding: '100px 0',
        background: '#F8FAFC', // Light background
        position: 'relative',
    },
    tabLedGlow: {
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(104, 137, 144, 0.15) 0%, rgba(104, 137, 144, 0) 70%)',
        filter: 'blur(40px)',
        opacity: 0.7,
        animation: 'colorShift 15s infinite alternate',
        zIndex: 0,
    },
    tabsContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '40px',
        borderRadius: '980px',
        padding: '6px',
        backgroundColor: 'rgba(77, 118, 110, 0.1)', // Light teal background
        maxWidth: '600px',
        margin: '0 auto 60px',
        position: 'relative',
        zIndex: 2,
        boxShadow: '0 0 15px rgba(77, 118, 110, 0.15)', // Subtle LED glow
    },
    tab: {
        padding: '8px 24px',
        fontSize: '17px',
        fontWeight: '400',
        color: '#323232', // Updated to dark color
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        borderRadius: '980px',
    },
    activeTab: {
        backgroundColor: '#FAFBFD', // Updated to light color
        color: '#4D766E', // Updated to dark teal
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.04), 0 0 10px rgba(77, 118, 110, 0.2)', // Added LED glow
    },
    tabContent: {
        background: '#FAFBFD', // Updated to light color
        color: '#323232', // Updated to dark color
        padding: '60px',
        borderRadius: '20px',
        boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.04), 0 0 20px rgba(77, 118, 110, 0.1)', // Added LED glow
        maxWidth: '980px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
    },
    tabContentLed: {
        position: 'absolute',
        top: '30px',
        left: '30px',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(77, 118, 110, 0.1) 0%, rgba(77, 118, 110, 0) 70%)',
        filter: 'blur(30px)',
        opacity: 0.5,
        zIndex: 1,
    },
    tabTitle: {
        fontSize: '32px',
        fontWeight: '600',
        marginBottom: '20px',
        color: '#323232', // Updated to dark color
        position: 'relative',
        zIndex: 2,
    },
    tabDescription: {
        fontSize: '21px',
        lineHeight: '1.5',
        marginBottom: '32px',
        maxWidth: '700px',
        color: '#688990', // Updated to teal color
        position: 'relative',
        zIndex: 2,
    },

    // CTA Section with enhanced LED gradient
    ctaSection: {
        padding: '100px 0',
        backgroundColor: '#FAFBFD', // Updated to light color
        position: 'relative',
    },
    ctaLedGlow: {
        position: 'absolute',
        top: '20%',
        left: '15%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(77, 118, 110, 0.15) 0%, rgba(77, 118, 110, 0) 70%)',
        filter: 'blur(50px)',
        opacity: 0.6,
        animation: 'pulse 10s infinite alternate',
        zIndex: 1,
    },
    ctaCard: {
        background: 'linear-gradient(135deg, #4D766E 0%, #688990 100%)', // Updated gradient with teal colors
        borderRadius: '20px',
        padding: '60px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(77, 118, 110, 0.3), 0 0 50px rgba(77, 118, 110, 0.2)', // Enhanced LED glow
        zIndex: 2,
    },
    ctaGlowEffect: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, rgba(77, 118, 110, 0), rgba(104, 137, 144, 0.3), rgba(77, 118, 110, 0))',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 10s ease infinite',
        zIndex: 1,
    },
    ctaContent: {
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 3,
    },
    ctaTitle: {
        fontSize: '40px',
        fontWeight: 600,
        marginBottom: '20px',
        color: '#FAFBFD', // White text on teal background
        textShadow: '0 0 10px rgba(250, 251, 253, 0.3)', // LED glow on text
    },
    ctaText: {
        fontSize: '21px',
        color: 'rgba(250, 251, 253, 0.9)', // Slightly transparent white
        marginBottom: '40px',
        lineHeight: 1.5,
    },
    ctaForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '32px',
        '@media (min-width: 640px)': {
            flexDirection: 'row',
            justifyContent: 'center',
        }
    },
    ctaInput: {
        width: '100%',
        padding: '14px 20px',
        borderRadius: '10px',
        border: '1px solid rgba(250, 251, 253, 0.2)',
        backgroundColor: 'rgba(250, 251, 253, 0.1)',
        color: '#FAFBFD', // Updated to light color
        fontSize: '17px',
        transition: 'all 0.2s ease',
        outline: 'none',
        '@media (min-width: 640px)': {
            width: '320px',
        },
        ':focus': {
            borderColor: '#FAFBFD',
            boxShadow: '0 0 0 2px rgba(250, 251, 253, 0.15), 0 0 15px rgba(250, 251, 253, 0.2)', // Added LED glow on focus
        },
        '::placeholder': {
            color: 'rgba(250, 251, 253, 0.7)',
        }
    },
    ctaButton: {
        display: 'inline-block',
        backgroundColor: '#FAFBFD', // Updated to light color
        color: '#4D766E', // Updated to dark teal
        fontWeight: 500,
        fontSize: '17px',
        padding: '14px 22px',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textDecoration: 'none',
        border: 'none',
        boxShadow: '0 0 15px rgba(250, 251, 253, 0.3)', // LED glow
        ':hover': {
            backgroundColor: 'rgba(250, 251, 253, 0.9)',
            boxShadow: '0 0 20px rgba(250, 251, 253, 0.5)', // Enhanced LED glow on hover
        }
    },
    ctaNote: {
        color: 'rgba(250, 251, 253, 0.7)',
        fontSize: '14px',
    },

    // Footer with subtle LED accents
    footer: {
        padding: '40px 0',
        borderTop: '1px solid #B6C2CE', // Updated to light gray from palette
        backgroundColor: '#F8FAFC', // Light background
        position: 'relative',
    },
    footerLedAccent: {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '200px',
        height: '2px',
        background: 'linear-gradient(90deg, rgba(77, 118, 110, 0) 0%, rgba(77, 118, 110, 0.5) 50%, rgba(77, 118, 110, 0) 100%)',
        boxShadow: '0 0 10px rgba(77, 118, 110, 0.5)',
        animation: 'pulse 5s infinite alternate',
    },
    footerContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
        position: 'relative',
        zIndex: 2,
        '@media (min-width: 768px)': {
            flexDirection: 'row',
            justifyContent: 'space-between',
        }
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 600,
        fontSize: '22px',
        color: '#323232', // Updated to dark color
    },
    logoColorDot: {
        width: '12px',
        height: '12px',
        backgroundColor: '#4D766E', // Updated to dark teal
        borderRadius: '50%',
        marginRight: '8px',
        display: 'inline-block',
        boxShadow: '0 0 8px rgba(77, 118, 110, 0.7)', // LED glow effect
        animation: 'pulse 3s infinite alternate',
    },
    footerLinks: {
        display: 'flex',
        gap: '32px',
    },
    footerLink: {
        fontSize: '14px',
        color: '#688990', // Updated to teal color
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        ':hover': {
            color: '#4D766E', // Updated to dark teal
            textDecoration: 'underline',
            textShadow: '0 0 5px rgba(77, 118, 110, 0.3)', // Subtle LED glow on hover
        }
    },
    socialLinks: {
        display: 'flex',
        gap: '20px',
    },
    socialLink: {
        color: '#688990', // Updated to teal color
        transition: 'all 0.2s ease',
        ':hover': {
            color: '#4D766E', // Updated to dark teal
            filter: 'drop-shadow(0 0 5px rgba(77, 118, 110, 0.5))', // LED glow on hover
        }
    },
    footerCopyright: {
        textAlign: 'center',
        color: '#B6C2CE', // Updated to light gray from palette
        fontSize: '12px',
        marginTop: '40px',
        position: 'relative',
        zIndex: 2,
    },
    
    // Keyframe animations for LED effects
    '@keyframes pulse': {
        '0%': {
            opacity: 0.4,
            transform: 'scale(0.95)',
        },
        '100%': {
            opacity: 0.8,
            transform: 'scale(1.05)',
        }
    },
    '@keyframes gradientShift': {
        '0%': {
            backgroundPosition: '0% 50%',
        },
        '50%': {
            backgroundPosition: '100% 50%',
        },
        '100%': {
            backgroundPosition: '0% 50%',
        }
    },
    '@keyframes colorShift': {
        '0%': {
            background: 'radial-gradient(circle, rgba(77, 118, 110, 0.15) 0%, rgba(77, 118, 110, 0) 70%)',
        },
        '50%': {
            background: 'radial-gradient(circle, rgba(104, 137, 144, 0.15) 0%, rgba(104, 137, 144, 0) 70%)',
        },
        '100%': {
            background: 'radial-gradient(circle, rgba(77, 118, 110, 0.15) 0%, rgba(77, 118, 110, 0) 70%)',
        }
    }
};

const SummaLandingPage = () => {
    const [email, setEmail] = useState('');
    const [activeTab, setActiveTab] = useState('analyze');
    const [hoveredFeature, setHoveredFeature] = useState(null);

    // LED color cycling effect for hero section
    const [heroLedColor, setHeroLedColor] = useState({ r: 77, g: 118, b: 110 });
    
    useEffect(() => {
        const interval = setInterval(() => {
            // Slightly shift the LED colors for a subtle effect
            setHeroLedColor(prev => ({
                r: Math.max(70, Math.min(85, prev.r + (Math.random() > 0.5 ? 1 : -1))),
                g: Math.max(110, Math.min(125, prev.g + (Math.random() > 0.5 ? 1 : -1))),
                b: Math.max(100, Math.min(115, prev.b + (Math.random() > 0.5 ? 1 : -1))),
            }));
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    const heroLedStyle = {
        ...styles.heroLedGlow,
        background: `radial-gradient(circle, rgba(${heroLedColor.r}, ${heroLedColor.g}, ${heroLedColor.b}, 0.2) 0%, rgba(${heroLedColor.r}, ${heroLedColor.g}, ${heroLedColor.b}, 0) 70%)`,
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                {/* Hero section with LED effects */}
                <section style={styles.heroSection}>
                    <div style={heroLedStyle}></div>
                    <div style={styles.heroLedGlow2}></div>
                    <div style={styles.heroContent}>
                        <h1 style={styles.heroTitle}>
                            State-of-the-art<br />
                            generative and retrieval models
                        </h1>
                        <p style={styles.heroText}>
                            Unlock the unlimited potential of AI with our three model families — designed
                            to meet the diverse needs of enterprises.
                        </p>
                        <div style={styles.buttonGroup}>
                            <button style={styles.primaryButton}>Get Started</button>
                            <button style={styles.secondaryButton}>Learn More</button>
                        </div>
                    </div>
                </section>

                {/* Tabs Section with LED effects */}
                <section style={styles.tabsSection}>
                    <div style={styles.tabLedGlow}></div>
                    <div style={styles.container}>
                        <div style={styles.tabsContainer}>
                            <div
                                style={{
                                    ...styles.tab,
                                    ...(activeTab === 'analyze' ? styles.activeTab : {})
                                }}
                                onClick={() => setActiveTab('analyze')}
                            >
                                Analyze
                            </div>
                            <div
                                style={{
                                    ...styles.tab,
                                    ...(activeTab === 'distill' ? styles.activeTab : {})
                                }}
                                onClick={() => setActiveTab('distill')}
                            >
                                Distill
                            </div>
                            <div
                                style={{
                                    ...styles.tab,
                                    ...(activeTab === 'present' ? styles.activeTab : {})
                                }}
                                onClick={() => setActiveTab('present')}
                            >
                                Present
                            </div>
                        </div>

                        <div style={styles.tabContent}>
                            <div style={styles.tabContentLed}></div>
                            {activeTab === 'analyze' && (
                                <>
                                    <h3 style={styles.tabTitle}>Streamline your workflows with advanced language models</h3>
                                    <p style={styles.tabDescription}>
                                        Advanced algorithms parse complex texts to identify key concepts and relationships
                                        with unprecedented accuracy, enabling faster and more efficient information processing.
                                    </p>
                                    <button style={{...styles.secondaryButton}}>
                                        Learn more
                                    </button>
                                </>
                            )}

                            {activeTab === 'distill' && (
                                <>
                                    <h3 style={styles.tabTitle}>Extract essential insights from complex information</h3>
                                    <p style={styles.tabDescription}>
                                        Extract the essence of information, removing noise while preserving meaning
                                        through our proprietary methods, turning complex data into actionable knowledge.
                                    </p>
                                    <button style={{...styles.secondaryButton}}>
                                        Learn more
                                    </button>
                                </>
                            )}

                            {activeTab === 'present' && (
                                <>
                                    <h3 style={styles.tabTitle}>Visualize insights with intuitive interfaces</h3>
                                    <p style={styles.tabDescription}>
                                        Present clarity where confusion once stood through advanced visualization tools
                                        and intuitive interfaces designed for maximum comprehension and impact.
                                    </p>
                                    <button style={{...styles.secondaryButton}}>
                                        Learn more
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Features section with LED effects */}
                <section id="features" style={styles.featuresSection}>
                    <div style={styles.featureLedGlow}></div>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>How Summa transforms your workflow</h2>
                        <p style={styles.sectionSubtitle}>
                            Our platform uses cutting-edge technology to simplify complex information processing
                        </p>
                    </div>

                    <div style={styles.featuresGrid}>
                        {[
                            {
                                title: "Analyze",
                                description: "Advanced algorithms parse complex texts to identify key concepts and relationships with unprecedented accuracy.",
                                icon: (
                                    <svg style={{ width: '32px', height: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Distill",
                                description: "Extract the essence of information, removing noise while preserving meaning through our proprietary methods.",
                                icon: (
                                    <svg style={{ width: '32px', height: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                )
                            },
                            {
                                title: "Present",
                                description: "Visualize insights in an intuitive interface designed for clarity and comprehension with customizable views.",
                                icon: (
                                    <svg style={{ width: '32px', height: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )
                            }
                        ].map((feature, index) => (
                            <div 
                                key={index} 
                                style={styles.featureCard}
                                onMouseEnter={() => setHoveredFeature(index)}
                                onMouseLeave={() => setHoveredFeature(null)}
                            >
                                <div 
                                    style={{
                                        ...styles.featureCardLed, 
                                        ...(hoveredFeature === index ? styles.featureCardHoverLed : {})
                                    }}
                                    ></div>
                                <div style={styles.featureIcon}>
                                    {feature.icon}
                                </div>
                                <h3 style={styles.featureTitle}>{feature.title}</h3>
                                <p style={styles.featureText}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA section with enhanced LED effects */}
                <section id="contact" style={styles.ctaSection}>
                    <div style={styles.ctaLedGlow}></div>
                    <div style={styles.ctaCard}>
                        <div style={styles.ctaGlowEffect}></div>
                        <div style={styles.ctaContent}>
                            <h2 style={styles.ctaTitle}>Ready to experience the future of information processing?</h2>
                            <p style={styles.ctaText}>
                                Join thousands of researchers, analysts, and knowledge workers who are already using Summa.
                            </p>
                            <div style={styles.ctaForm}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    style={styles.ctaInput}
                                />
                                <button style={styles.ctaButton}>Get Early Access</button>
                            </div>
                            <p style={styles.ctaNote}>
                                No credit card required. Free trial for 14 days.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer with LED accents */}
                <footer style={styles.footer}>
                    <div style={styles.footerLedAccent}></div>
                    <div style={styles.footerContent}>
                        <div style={styles.logo}>
                            <span style={styles.logoColorDot}></span>
                            summa
                        </div>
                        <div style={styles.footerLinks}>
                            <a href="#" style={styles.footerLink}>Platform</a>
                            <a href="#" style={styles.footerLink}>Solutions</a>
                            <a href="#" style={styles.footerLink}>Research</a>
                            <a href="#" style={styles.footerLink}>Resources</a>
                            <a href="#" style={styles.footerLink}>Company</a>
                        </div>
                        <div style={styles.socialLinks}>
                            <a href="#" style={styles.socialLink}>
                                <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                            <a href="#" style={styles.socialLink}>
                                <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a href="#" style={styles.socialLink}>
                                <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <p style={styles.footerCopyright}>
                        © {new Date().getFullYear()} Summa. All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default SummaLandingPage;