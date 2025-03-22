import React, { useState, useEffect } from 'react';
// Sign In Component
const SignInForm = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        // Reset error
        setError('');

        // Show loading state
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            // In a real app, you would call your authentication API here
            console.log('Sign in attempt:', { email, password, remember });

            // For demo purposes, always "succeed" after 1 second
            setIsSubmitting(false);

            // You could redirect or update app state here
            alert('Successfully signed in!');

            if (onClose) onClose();
        }, 1000);
    };

    return (
        <div style={signInStyles.formContainer}>
            <div style={signInStyles.formHeader}>
                <h2 style={signInStyles.formTitle}>Sign in to your account</h2>
                <p style={signInStyles.formSubtitle}>
                    Enter your credentials to access your dashboard
                </p>
            </div>

            {error && (
                <div style={signInStyles.errorMessage}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={signInStyles.formGroup}>
                    <label htmlFor="email" style={signInStyles.label}>
                        Email address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        style={signInStyles.input}
                        disabled={isSubmitting}
                    />
                </div>

                <div style={signInStyles.formGroup}>
                    <div style={signInStyles.passwordHeader}>
                        <label htmlFor="password" style={signInStyles.label}>
                            Password
                        </label>
                        <a href="#forgot" style={signInStyles.forgotLink}>
                            Forgot password?
                        </a>
                    </div>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        style={signInStyles.input}
                        disabled={isSubmitting}
                    />
                </div>

                <div style={signInStyles.rememberContainer}>
                    <label style={signInStyles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                            style={signInStyles.checkbox}
                            disabled={isSubmitting}
                        />
                        <span style={signInStyles.checkboxText}>Remember me</span>
                    </label>
                </div>

                <button
                    type="submit"
                    style={isSubmitting ? {...signInStyles.submitButton, ...signInStyles.submitButtonDisabled} : signInStyles.submitButton}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
            </form>

            <div style={signInStyles.divider}>
                <span style={signInStyles.dividerText}>Or continue with</span>
            </div>

            <div style={signInStyles.socialButtons}>
                <button style={signInStyles.socialButton}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31024 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"/>
                        <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"/>
                        <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"/>
                        <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.25 12.0004 19.25C8.8704 19.25 6.21537 17.14 5.2654 14.295L1.27539 17.39C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"/>
                    </svg>
                    <span>Google</span>
                </button>
                <button style={signInStyles.socialButton}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325V22.676C0 23.407 0.593 24 1.325 24H12.82V14.706H9.692V11.084H12.82V8.413C12.82 5.313 14.713 3.625 17.479 3.625C18.804 3.625 19.942 3.724 20.274 3.768V7.008L18.356 7.009C16.852 7.009 16.561 7.724 16.561 8.772V11.085H20.148L19.681 14.707H16.561V24H22.677C23.407 24 24 23.407 24 22.675V1.325C24 0.593 23.407 0 22.675 0Z" fill="#1877F2"/>
                    </svg>
                    <span>Facebook</span>
                </button>
            </div>

            <p style={signInStyles.signupText}>
                Don't have an account? <a href="#signup" style={signInStyles.signupLink}>Sign up</a>
            </p>
        </div>
    );
};

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div style={modalStyles.overlay} onClick={onClose}>
            <div style={modalStyles.container} onClick={e => e.stopPropagation()}>
                <button style={modalStyles.closeButton} onClick={onClose}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {children}
            </div>
        </div>
    );
};

// Styles for SignIn Component
const signInStyles = {
    formContainer: {
        width: '100%',
        maxWidth: '400px',
        padding: '32px',
    },
    formHeader: {
        marginBottom: '24px',
        textAlign: 'center',
    },
    formTitle: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#333333',
        marginBottom: '8px',
    },
    formSubtitle: {
        fontSize: '16px',
        color: '#555555',
    },
    formGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#333333',
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        fontSize: '16px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        transition: 'all 0.2s ease',
        outline: 'none',
    },
    passwordHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
    },
    forgotLink: {
        fontSize: '14px',
        color: '#6366f1',
        textDecoration: 'none',
    },
    rememberContainer: {
        display: 'flex',
        marginBottom: '24px',
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    checkbox: {
        marginRight: '8px',
    },
    checkboxText: {
        fontSize: '14px',
        color: '#555555',
    },
    submitButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#333333',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
    submitButtonDisabled: {
        backgroundColor: '#999999',
        cursor: 'not-allowed',
    },
    divider: {
        position: 'relative',
        textAlign: 'center',
        margin: '24px 0',
    },
    dividerText: {
        display: 'inline-block',
        padding: '0 16px',
        backgroundColor: 'white',
        color: '#6b7280',
        fontSize: '14px',
        position: 'relative',
        zIndex: '1',
    },
    socialButtons: {
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
    },
    socialButton: {
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '10px',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
    signupText: {
        textAlign: 'center',
        fontSize: '14px',
        color: '#555555',
    },
    signupLink: {
        color: '#6366f1',
        textDecoration: 'none',
        fontWeight: '500',
    },
    errorMessage: {
        backgroundColor: '#FEE2E2',
        color: '#B91C1C',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '16px',
        fontSize: '14px',
    }
};

// Styles for Modal Component
const modalStyles = {
    overlay: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '100',
    },
    container: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '90%',
        maxHeight: '90%',
    },
    closeButton: {
        position: 'absolute',
        top: '12px',
        right: '12px',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: '#6b7280',
        padding: '4px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10',
    }
};

// Styles as a separate object
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
        backgroundColor: '#ffffff',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#1a202c',
        position: 'relative',
        overflow: 'hidden',
    },

    // Navigation - Updated to match Cohere style
    navbar: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        padding: '20px 0',
        backgroundColor: '#ffffff',
    },
    navbarScrolled: {
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    },
    navContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 600,
        letterSpacing: '-0.5px',
        color: '#333333',
    },
    logoColorDot: {
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#6366f1',
        marginRight: '4px',
        marginLeft: '2px',
    },
    navLinks: {
        display: 'none',
        gap: '32px',
        '@media (min-width: 768px)': {
            display: 'flex',
        }
    },
    navLink: {
        fontSize: '16px',
        fontWeight: 500,
        color: '#333333',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
    },
    primaryButton: {
        display: 'inline-block',
        backgroundColor: '#333333',
        color: 'white',
        fontWeight: 500,
        fontSize: '16px',
        padding: '12px 24px',
        borderRadius: '9999px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
    },

    // Hero Section - Updated to match Cohere style
    heroSection: {
        paddingTop: '160px',
        paddingBottom: '96px',
        backgroundColor: '#f7f7f7',
    },
    heroContent: {
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center',
        marginBottom: '64px',
    },
    heroTitle: {
        fontSize: '56px',
        fontWeight: 700,
        lineHeight: 1.2,
        marginBottom: '24px',
        color: '#333333',
    },
    heroText: {
        fontSize: '22px',
        color: '#555555',
        lineHeight: 1.6,
        marginBottom: '32px',
        maxWidth: '800px',
        margin: '0 auto 32px',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        justifyContent: 'center',
    },
    secondaryButton: {
        display: 'inline-block',
        backgroundColor: 'white',
        color: '#333333',
        border: '1px solid #e5e7eb',
        fontWeight: 500,
        fontSize: '16px',
        padding: '12px 24px',
        borderRadius: '9999px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
    },

    // Features Section
    featuresSection: {
        padding: '80px 0',
        backgroundColor: '#ffffff',
    },
    sectionHeader: {
        textAlign: 'center',
        marginBottom: '64px',
    },
    sectionTitle: {
        fontSize: '36px',
        fontWeight: 700,
        marginBottom: '16px',
        color: '#333333',
    },
    sectionSubtitle: {
        fontSize: '20px',
        color: '#555555',
        maxWidth: '700px',
        margin: '0 auto',
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '32px',
    },
    featureCard: {
        backgroundColor: 'white',
        border: '1px solid #f3f4f6',
        borderRadius: '12px',
        padding: '32px',
        transition: 'all 0.3s ease',
    },
    featureIcon: {
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: '12px',
        marginBottom: '24px',
    },
    featureTitle: {
        fontSize: '20px',
        fontWeight: 700,
        marginBottom: '12px',
        color: '#333333',
    },
    featureText: {
        color: '#555555',
        lineHeight: 1.6,
    },

    // Tabs Section - New section inspired by Cohere
    tabsSection: {
        padding: '80px 0',
        backgroundColor: '#f7f7f7',
    },
    tabsContainer: {
        display: 'flex',
        borderBottom: '2px solid #e5e7eb',
        marginBottom: '40px',
    },
    tab: {
        padding: '16px 32px',
        fontSize: '18px',
        fontWeight: '600',
        color: '#555555',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    activeTab: {
        color: '#333333',
        borderBottom: '2px solid #333333',
        marginBottom: '-2px',
    },
    tabContent: {
        backgroundColor: '#333333',
        color: 'white',
        padding: '48px',
        borderRadius: '12px',
        minHeight: '300px',
    },
    tabTitle: {
        fontSize: '32px',
        fontWeight: '700',
        marginBottom: '24px',
    },
    tabDescription: {
        fontSize: '18px',
        lineHeight: '1.6',
        marginBottom: '32px',
        maxWidth: '700px',
    },

    // Testimonial Section
    testimonialSection: {
        padding: '80px 0',
        backgroundColor: '#ffffff',
    },
    testimonialCard: {
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '48px',
        backgroundColor: 'white',
    },
    testimonialContent: {
        position: 'relative',
        zIndex: 1,
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
    },
    quoteIcon: {
        width: '48px',
        height: '48px',
        color: '#333333',
        margin: '0 auto 24px',
    },
    quoteText: {
        fontSize: '24px',
        fontWeight: 500,
        marginBottom: '24px',
        lineHeight: 1.5,
        color: '#333333',
    },
    testimonialPerson: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    personAvatar: {
        width: '48px',
        height: '48px',
        backgroundColor: '#f3f4f6',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '16px',
        color: '#333333',
        fontWeight: 700,
    },
    personInfo: {
        textAlign: 'left',
    },
    personName: {
        fontWeight: 700,
        color: '#333333',
    },
    personTitle: {
        color: '#555555',
    },

    // CTA Section
    ctaSection: {
        padding: '80px 0',
        backgroundColor: '#f7f7f7',
    },
    ctaCard: {
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '48px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    },
    ctaContent: {
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
    },
    ctaTitle: {
        fontSize: '36px',
        fontWeight: 700,
        marginBottom: '24px',
        color: '#333333',
    },
    ctaText: {
        fontSize: '20px',
        color: '#555555',
        marginBottom: '32px',
    },
    ctaForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '32px',
    },
    ctaInput: {
        width: '100%',
        padding: '12px 24px',
        borderRadius: '9999px',
        border: '1px solid #e5e7eb',
        fontSize: '16px',
        transition: 'all 0.2s ease',
        outline: 'none',
    },
    ctaNote: {
        color: '#6b7280',
        fontSize: '14px',
    },

    // Footer
    footer: {
        padding: '48px 0',
        borderTop: '1px solid #e5e7eb',
        backgroundColor: '#ffffff',
    },
    footerContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
    },
    footerLinks: {
        display: 'flex',
        gap: '32px',
    },
    footerLink: {
        fontSize: '14px',
        color: '#555555',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
    },
    socialLinks: {
        display: 'flex',
        gap: '16px',
    },
    socialLink: {
        width: '32px',
        height: '32px',
        backgroundColor: '#f3f4f6',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#555555',
        transition: 'all 0.2s ease',
    },
    footerCopyright: {
        textAlign: 'center',
        color: '#6b7280',
        fontSize: '14px',
        marginTop: '32px',
    }
};

// Updated responsive styles for specific media queries
const mediaStyles = {
    heroTitleLarge: {
        '@media (min-width: 768px)': {
            fontSize: '72px',
        }
    },
    buttonGroupRow: {
        '@media (min-width: 640px)': {
            flexDirection: 'row',
        }
    },
    featuresGridThreeColumns: {
        '@media (min-width: 768px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
        }
    },
    ctaFormRow: {
        '@media (min-width: 640px)': {
            flexDirection: 'row',
            justifyContent: 'center',
        }
    },
    ctaInputNarrow: {
        '@media (min-width: 640px)': {
            width: '256px',
        }
    },
    footerContentRow: {
        '@media (min-width: 768px)': {
            flexDirection: 'row',
            justifyContent: 'space-between',
        }
    },
    navLinksShow: {
        '@media (min-width: 768px)': {
            display: 'flex',
        }
    }
};

const SummaLandingPage = () => {
    const [email, setEmail] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState('analyze');
    // Add missing state for sign-in modal
    const [isSignInOpen, setIsSignInOpen] = useState(false);

    // Add missing functions for sign-in modal
    const openSignIn = (e) => {
        e.preventDefault();
        setIsSignInOpen(true);
    };

    const closeSignIn = () => {
        setIsSignInOpen(false);
    };

    // Apply media query styles manually
    const getResponsiveStyle = (baseStyle, mediaStyle) => {
        if (typeof window !== 'undefined') {
            // Check if we're in browser environment (for SSR compatibility)
            if (window.innerWidth >= 768 && mediaStyle['@media (min-width: 768px)']) {
                return { ...baseStyle, ...mediaStyle['@media (min-width: 768px)'] };
            }
            if (window.innerWidth >= 640 && mediaStyle['@media (min-width: 640px)']) {
                return { ...baseStyle, ...mediaStyle['@media (min-width: 640px)'] };
            }
        }
        return baseStyle;
    };

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

    // Handle window resize for responsive styles
    useEffect(() => {
        const handleResize = () => {
            // Force a re-render to apply responsive styles
            setScrolled(scrolled);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [scrolled]);

    return (
        <div style={styles.pageWrapper}>
            {/* Navigation */}
            <nav style={scrolled ? {...styles.navbar, ...styles.navbarScrolled} : styles.navbar}>
                <div style={styles.container}>
                    <div style={styles.navContent}>
                        <div style={styles.logo}>
                            <span style={styles.logoColorDot}></span>
                            summa
                        </div>
                        <div style={getResponsiveStyle(styles.navLinks, mediaStyles.navLinksShow)}>
                            <a href="#platform" style={styles.navLink}>Platform</a>
                            <a href="#solutions" style={styles.navLink}>Solutions</a>
                            <a href="#research" style={styles.navLink}>Research</a>
                            <a href="#resources" style={styles.navLink}>Resources</a>
                            <a href="#company" style={styles.navLink}>Company</a>
                        </div>
                        <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                            <a href="#signin" onClick={openSignIn} style={{...styles.navLink, fontWeight: '600'}}>Sign in</a>
                            <button style={styles.primaryButton}>Request a demo</button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sign In Modal */}
            <Modal isOpen={isSignInOpen} onClose={closeSignIn}>
                <SignInForm onClose={closeSignIn} />
            </Modal>

            <div style={styles.container}>
                {/* Hero section */}
                <section style={styles.heroSection}>
                    <div style={styles.heroContent}>
                        <h1 style={getResponsiveStyle(styles.heroTitle, mediaStyles.heroTitleLarge)}>
                            State-of-the-art<br/>
                            generative and retrieval models
                        </h1>
                        <p style={styles.heroText}>
                            Unlock the unlimited potential of AI with our three model families — designed
                            to meet the diverse needs of enterprises.
                        </p>
                    </div>
                </section>

                {/* Tabs Section */}
                <section style={styles.tabsSection}>
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
                            {activeTab === 'analyze' && (
                                <>
                                    <h3 style={styles.tabTitle}>Streamline your workflows with advanced language models</h3>
                                    <p style={styles.tabDescription}>
                                        Advanced algorithms parse complex texts to identify key concepts and relationships
                                        with unprecedented accuracy, enabling faster and more efficient information processing.
                                    </p>
                                    <button style={{...styles.primaryButton, backgroundColor: 'white', color: '#333'}}>
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
                                    <button style={{...styles.primaryButton, backgroundColor: 'white', color: '#333'}}>
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
                                    <button style={{...styles.primaryButton, backgroundColor: 'white', color: '#333'}}>
                                        Learn more
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Features section */}
                <section id="features" style={styles.featuresSection}>
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
                                    <svg style={{ width: '24px', height: '24px', color: '#333333' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Distill",
                                description: "Extract the essence of information, removing noise while preserving meaning through our proprietary methods.",
                                icon: (
                                    <svg style={{ width: '24px', height: '24px', color: '#333333' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                )
                            },
                            {
                                title: "Present",
                                description: "Visualize insights in an intuitive interface designed for clarity and comprehension with customizable views.",
                                icon: (
                                    <svg style={{ width: '24px', height: '24px', color: '#333333' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )
                            }
                        ].map((feature, index) => (
                            <div key={index} style={styles.featureCard}>
                                <div style={styles.featureIcon}>
                                    {feature.icon}
                                </div>
                                <h3 style={styles.featureTitle}>{feature.title}</h3>
                                <p style={styles.featureText}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonial section */}
                <section style={styles.testimonialSection}>
                    <div style={styles.testimonialCard}>
                        <div style={styles.testimonialContent}>
                            <svg style={styles.quoteIcon} fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <blockquote style={styles.quoteText}>
                                "Summa transformed how we process research data. What used to take days now happens in minutes, with better results and deeper insights we never thought possible."
                            </blockquote>
                            <div style={styles.testimonialPerson}>
                                <div style={styles.personAvatar}>EM</div>
                                <div style={styles.personInfo}>
                                    <p style={styles.personName}>Elena Markova</p>
                                    <p style={styles.personTitle}>Research Director, Quantum Analytics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA section */}
                <section id="contact" style={styles.ctaSection}>
                    <div style={styles.ctaCard}>
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
                                <button style={styles.primaryButton}>Get Early Access</button>
                            </div>
                            <p style={styles.ctaNote}>
                                No credit card required. Free trial for 14 days.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer style={styles.footer}>
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
                                <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                            <a href="#" style={styles.socialLink}>
                                <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a href="#" style={styles.socialLink}>
                                <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 24 24">
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