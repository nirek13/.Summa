import React, { useState, useEffect } from 'react';

const StartupMatchingPlatform = () => {
    const [email, setEmail] = useState('');
    const [activeTab, setActiveTab] = useState('match');
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
                {/* Enhanced Hero section with LED effects and additional graphic elements */}
                <section style={styles.heroSection}>
                    {/* Enhanced LED effects and background elements */}
                    <div style={heroLedStyle}></div>
                    <div style={styles.heroLedGlow2}></div>
                    <div style={styles.heroLedGlow3}></div>
                    <div style={styles.heroLedGlow4}></div>

                    {/* Animated background patterns */}
                    <div style={styles.patternDots}></div>
                    <div style={styles.patternGrid}></div>
                    <div style={styles.patternCircles}></div>

                    {/* Abstract graphics */}
                    <div style={styles.abstractShape1}></div>
                    <div style={styles.abstractShape2}></div>
                    <div style={styles.abstractShape3}></div>

                    {/* Connection lines animation */}
                    <div style={styles.connectionLines}>
                        {/* SVG lines will be rendered here */}
                        <svg style={styles.connectionSvg} viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100,200 C200,100 300,300 400,200" style={styles.connectionPath1} />
                            <path d="M200,300 C300,200 400,400 500,300" style={styles.connectionPath2} />
                            <path d="M300,400 C400,300 500,500 600,400" style={styles.connectionPath3} />
                        </svg>
                    </div>

                    {/* Floating elements */}
                    <div style={styles.floatingElement1}></div>
                    <div style={styles.floatingElement2}></div>
                    <div style={styles.floatingElement3}></div>

                    {/* Hero content */}
                    <div style={styles.heroContent}>
                        <h1 style={styles.heroTitle}>
                            Connect with the<br />
                            perfect investors for your startup
                        </h1>
                        <p style={styles.heroText}>
                            Our intelligent matching platform connects founders with investors, mentors, and business
                            expertise — so you can focus on building your vision.
                        </p>
                        <div style={styles.buttonGroup}>
                            <a href='/signup'>
                                <button style={styles.primaryButton}>
                                    Get Matched Today
                                </button>
                            </a>
                            <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran" target="_blank" rel="noopener noreferrer">
                                <button style={styles.secondaryButton}>How It Works</button>
                            </a>
                        </div>
                    </div>

                    {/* Metrics visualization */}
                    <div style={styles.metricsContainer}>
                        <div style={styles.metricItem}>
                            <div style={styles.metricValue}>93%</div>
                            <div style={styles.metricLabel}>Match Success</div>
                        </div>
                        <div style={styles.metricItem}>
                            <div style={styles.metricValue}>$42M+</div>
                            <div style={styles.metricLabel}>Funds Raised</div>
                        </div>
                        <div style={styles.metricItem}>
                            <div style={styles.metricValue}>3,200+</div>
                            <div style={styles.metricLabel}>Startups Connected</div>
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
                                    ...(activeTab === 'match' ? styles.activeTab : {})
                                }}
                                onClick={() => setActiveTab('match')}
                            >
                                Match
                            </div>
                            <div
                                style={{
                                    ...styles.tab,
                                    ...(activeTab === 'advise' ? styles.activeTab : {})
                                }}
                                onClick={() => setActiveTab('advise')}
                            >
                                Advise
                            </div>
                        </div>

                        <div style={styles.tabContent}>
                            <div style={styles.tabContentLed}></div>
                            {activeTab === 'match' && (
                                <>
                                    <h3 style={styles.tabTitle}>Find the perfect investors for your startup</h3>
                                    <p style={styles.tabDescription}>
                                        Our proprietary algorithm matches founders with investors based on industry,
                                        stage, funding requirements, and strategic alignment — dramatically increasing
                                        your chances of securing the right funding.
                                    </p>
                                    <button style={{ ...styles.secondaryButton }}>
                                        See matching success stories
                                    </button>
                                </>
                            )}

                            {activeTab === 'advise' && (
                                <>
                                    <h3 style={styles.tabTitle}>Your virtual CFO and business advisor</h3>
                                    <p style={styles.tabDescription}>
                                        Get personalized financial guidance, business strategy advice, and
                                        cash flow projections from our AI-powered virtual CFO — helping you
                                        make sound business decisions without the executive-level costs.
                                    </p>
                                    <button style={{ ...styles.secondaryButton }}>
                                        Learn about virtual CFO
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
                        <h2 style={styles.sectionTitle}>How we propel your startup forward</h2>
                        <p style={styles.sectionSubtitle}>
                            Our platform uses intelligent matching and expert resources to help founders succeed
                        </p>
                    </div>

                    <div style={styles.featuresGrid}>
                        {[
                            {
                                title: "Investor Matching",
                                description: "Our algorithm connects you with investors who are actively seeking opportunities in your space and stage, based on over 50 alignment factors.",
                                icon: (
                                    <svg style={{ width: '32px', height: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Virtual CFO",
                                description: "Access sophisticated financial modeling, runway analysis, and business advice tailored to your startup's unique position and challenges.",
                                icon: (
                                    <svg style={{ width: '32px', height: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                )
                            },
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

                {/* Footer with LED accents */}
                <footer style={styles.footer}>
                    <div style={styles.footerLedAccent}></div>
                    <div style={styles.footerContent}>
                        <div style={styles.logo}>
                            <span style={styles.logoColorDot}></span>
                            summa
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

// Complete styles with enhanced hero section elements
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

    // Enhanced Hero Section
    heroSection: {
        paddingTop: '120px',
        paddingBottom: '140px',
        background: 'linear-gradient(180deg, #FAFBFD 0%, #F5F7FA 100%)',
        position: 'relative',
        overflow: 'hidden',
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
    // New LED glows for enhanced effect
    heroLedGlow3: {
        position: 'absolute',
        top: '20%',
        right: '25%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(77, 118, 110, 0.1) 0%, rgba(77, 118, 110, 0) 70%)',
        filter: 'blur(35px)',
        opacity: 0.6,
        animation: 'pulse 9s infinite alternate',
        zIndex: 0,
    },
    heroLedGlow4: {
        position: 'absolute',
        bottom: '25%',
        left: '20%',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(104, 137, 144, 0.12) 0%, rgba(104, 137, 144, 0) 70%)',
        filter: 'blur(25px)',
        opacity: 0.5,
        animation: 'pulse 11s infinite alternate-reverse',
        zIndex: 0,
    },
    // Background patterns
    patternDots: {
        position: 'absolute',
        top: '5%',
        left: '5%',
        width: '90%',
        height: '90%',
        backgroundImage: 'radial-gradient(rgba(77, 118, 110, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        zIndex: 0,
        opacity: 0.3,
    },
    patternGrid: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(to right, rgba(104, 137, 144, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(104, 137, 144, 0.05) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        zIndex: 0,
        opacity: 0.2,
    },
    patternCircles: {
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '200px',
        height: '200px',
        backgroundImage: 'radial-gradient(circle, rgba(77, 118, 110, 0.05) 30%, transparent 30%), radial-gradient(circle, rgba(77, 118, 110, 0.02) 60%, transparent 60%)',
        backgroundSize: '40px 40px, 80px 80px',
        zIndex: 0,
        opacity: 0.7,
        animation: 'rotate 120s linear infinite',
    },
    // Abstract geometric shapes
    abstractShape1: {
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '150px',
        height: '150px',
        backgroundColor: 'rgba(77, 118, 110, 0.03)',
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        zIndex: 0,
        animation: 'morphing 15s ease-in-out infinite alternate',
    },
    abstractShape2: {
        position: 'absolute',
        bottom: '15%',
        left: '10%',
        width: '120px',
        height: '120px',
        backgroundColor: 'rgba(104, 137, 144, 0.03)',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        zIndex: 0,
        animation: 'morphing 12s ease-in-out infinite alternate-reverse',
    },
    abstractShape3: {
        position: 'absolute',
        top: '45%',
        left: '15%',
        width: '100px',
        height: '100px',
        backgroundColor: 'rgba(77, 118, 110, 0.02)',
        borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%',
        zIndex: 0,
        animation: 'morphing 18s ease-in-out infinite',
    },
    // Connection lines animation
    connectionLines: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.15,
    },
    connectionSvg: {
        width: '100%',
        height: '100%',
    },
    connectionPath1: {
        fill: 'none',
        stroke: '#4D766E',
        strokeWidth: '1',
        strokeDasharray: '5,5',
        animation: 'dash 15s linear infinite',
    },
    connectionPath2: {
        fill: 'none',
        stroke: '#688990',
        strokeWidth: '1',
        strokeDasharray: '5,5',
        animation: 'dash 20s linear infinite reverse',
    },
    connectionPath3: {
        fill: 'none',
        stroke: '#4D766E',
        strokeWidth: '0.5',
        strokeDasharray: '3,3',
        animation: 'dash 18s linear infinite',
    },
    // Floating elements
    floatingElement1: {
        position: 'absolute',
        top: '30%',
        right: '15%',
        width: '15px',
        height: '15px',
        backgroundColor: 'rgba(77, 118, 110, 0.2)',
        borderRadius: '50%',
        zIndex: 0,
        animation: 'float 8s ease-in-out infinite',
    },
    floatingElement2: {
        position: 'absolute',
        bottom: '40%',
        right: '30%',
        width: '10px',
        height: '10px',
        backgroundColor: 'rgba(104, 137, 144, 0.2)',
        borderRadius: '50%',
        zIndex: 0,
        animation: 'float 10s ease-in-out infinite 2s',
    },
    floatingElement3: {
        position: 'absolute',
        top: '60%',
        left: '20%',
        width: '12px',
        height: '12px',
        backgroundColor: 'rgba(77, 118, 110, 0.15)',
        borderRadius: '50%',
        zIndex: 0,
        animation: 'float 9s ease-in-out infinite 1s',
    },

    // Hero content - enhanced
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
        textShadow: '0 0 10px rgba(77, 118, 110, 0.1), 0 0 20px rgba(77, 118, 110, 0.05)',
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
        padding: '14px 28px',
        borderRadius: '980px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textDecoration: 'none',
        border: 'none',
        boxShadow: '0 0 15px rgba(77, 118, 110, 0.5), 0 8px 16px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        ':hover': {
            backgroundColor: '#688990', // Lighter teal on hover
            boxShadow: '0 0 20px rgba(77, 118, 110, 0.7), 0 10px 20px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
        },
        ':before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'rotate(45deg)',
            transition: 'all 0.3s ease',
        },
        ':hover:before': {
            left: '100%',
        }
    },
    secondaryButton: {
        display: 'inline-block',
        backgroundColor: 'transparent',
        color: '#4D766E', // Updated to dark teal
        border: 'none',
        fontWeight: 400,
        fontSize: '17px',
        padding: '14px 28px',
        borderRadius: '980px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textDecoration: 'none',
        position: 'relative',
        ':hover': {
            backgroundColor: 'rgba(77, 118, 110, 0.05)',
            textShadow: '0 0 8px rgba(77, 118, 110, 0.3)',
        },
        ':after': {
            content: '""',
            position: 'absolute',
            bottom: '10px',
            left: '28px',
            right: '28px',
            height: '1px',
            backgroundColor: '#4D766E',
            transform: 'scaleX(0)',
            transformOrigin: 'right',
            transition: 'transform 0.3s ease',
            opacity: 0.6,
        },
        ':hover:after': {
            transform: 'scaleX(1)',
            transformOrigin: 'left',
        }
    },

    // Metrics visualization
    metricsContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '60px',
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        '@media (max-width: 640px)': {
            flexDirection: 'column',
            gap: '30px',
            alignItems: 'center',
        }
    },
    metricItem: {
        textAlign: 'center',
        position: 'relative',
    },
    metricValue: {
        fontSize: '36px',
        fontWeight: '700',
        color: '#4D766E',
        marginBottom: '8px',
        position: 'relative',
        display: 'inline-block',
        textShadow: '0 0 10px rgba(77, 118, 110, 0.2)',
        ':before': {
            content: '""',
            position: 'absolute',
            bottom: '-5px',
            left: '25%',
            width: '50%',
            height: '3px',
            backgroundImage: 'linear-gradient(to right, rgba(77, 118, 110, 0), rgba(77, 118, 110, 0.5), rgba(77, 118, 110, 0))',
            borderRadius: '3px',
        }
    },
    metricLabel: {
        fontSize: '16px',
        color: '#688990',
        fontWeight: '400',
    },

    // Features Section with LED accents (keeping original)
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
        backgroundColor: '#F5F7FA',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden',
    },
    tabLedGlow: {
        position: 'absolute',
        top: '-50px',
        right: '20%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(77, 118, 110, 0.1) 0%, rgba(77, 118, 110, 0) 70%)',
        filter: 'blur(40px)',
        opacity: 0.7,
        animation: 'pulse 10s infinite alternate',
        zIndex: 0,
    },
    tabsContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '40px',
        position: 'relative',
        zIndex: 2,
    },
    tab: {
        padding: '14px 28px',
        margin: '0 8px',
        borderRadius: '980px',
        cursor: 'pointer',
        fontSize: '17px',
        fontWeight: 500,
        color: '#688990',
        transition: 'all 0.3s ease',
        position: 'relative',
        ':hover': {
            backgroundColor: 'rgba(77, 118, 110, 0.05)',
        }
    },
    activeTab: {
        backgroundColor: 'rgba(77, 118, 110, 0.1)',
        color: '#4D766E',
        boxShadow: '0 0 15px rgba(77, 118, 110, 0.2)',
        ':after': {
            content: '""',
            position: 'absolute',
            bottom: '10px',
            left: '28px',
            right: '28px',
            height: '2px',
            backgroundColor: '#4D766E',
            borderRadius: '1px',
            opacity: 0.6,
        }
    },
    tabContent: {
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        padding: '40px',
        borderRadius: '24px',
        backgroundColor: '#FAFBFD',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.04)',
        zIndex: 2,
    },
    tabContentLed: {
        position: 'absolute',
        top: '20%',
        left: '20%',
        width: '60%',
        height: '60%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(77, 118, 110, 0.05) 0%, rgba(77, 118, 110, 0) 70%)',
        filter: 'blur(30px)',
        opacity: 0.8,
        zIndex: 0,
    },
    tabTitle: {
        fontSize: '28px',
        fontWeight: 600,
        marginBottom: '16px',
        color: '#323232',
        position: 'relative',
        zIndex: 2,
    },
    tabDescription: {
        fontSize: '18px',
        lineHeight: 1.6,
        color: '#688990',
        marginBottom: '32px',
        position: 'relative',
        zIndex: 2,
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
    footerCopyright: {
        textAlign: 'center',
        color: '#000000', // Updated to light gray from palette
        fontSize: '12px',
        marginTop: '10px',
        position: 'relative',
        zIndex: 2,
    },
};

export default StartupMatchingPlatform;
