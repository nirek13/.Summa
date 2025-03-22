import React, { useState, useEffect } from 'react';

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
        position: 'fixed',
        overflow: 'hidden',
        zIndex:100,
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
        textDecoration: 'none',
        cursor: 'pointer',
    },
    logoColorDot: {
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#4D766E',
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
        ':hover': {
            color: '#111827',
        }
    },
    // New styles for the specific links
    specialNavLink: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333333',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
    },
    // Hover state styles
    specialNavLinkHover: {
        color: '#4D766E', // Using the same color as the dot in the logo
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
        ':hover': {
            backgroundColor: '#111827',
        }
    },
};

const NavbarPage = () => {
    const [scrolled, setScrolled] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);

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
        <div style={styles.pageWrapper}>
            {/* Navigation */}
            <nav style={scrolled ? {...styles.navbar, ...styles.navbarScrolled} : styles.navbar}>
                <div style={styles.container}>
                    <div style={styles.navContent}>
                        <a href="/" style={styles.logo}>
                            <span style={styles.logoColorDot}></span>
                            summa
                        </a>
                        <div style={styles.navLinks}>
                            <a href="#platform" style={styles.navLink}>Platform</a>
                            <a href="#solutions" style={styles.navLink}>Solutions</a>
                            <a href="#research" style={styles.navLink}>Research</a>
                            <a href="#resources" style={styles.navLink}>Resources</a>
                            <a href="#company" style={styles.navLink}>Company</a>
                        </div>
                        <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                            <a 
                                href="/chat" 
                                style={{
                                    ...styles.specialNavLink,
                                    ...(hoveredLink === 'chat' ? styles.specialNavLinkHover : {})
                                }}
                                onMouseEnter={() => setHoveredLink('chat')}
                                onMouseLeave={() => setHoveredLink(null)}
                            >
                                Chat
                            </a>
                            <a 
                                href="/investors" 
                                style={{
                                    ...styles.specialNavLink,
                                    ...(hoveredLink === 'database' ? styles.specialNavLinkHover : {})
                                }}
                                onMouseEnter={() => setHoveredLink('database')}
                                onMouseLeave={() => setHoveredLink(null)}
                            >
                                Database
                            </a>
                            <a 
                                href="/signup" 
                                style={{
                                    ...styles.specialNavLink,
                                    ...(hoveredLink === 'signup' ? styles.specialNavLinkHover : {})
                                }}
                                onMouseEnter={() => setHoveredLink('signup')}
                                onMouseLeave={() => setHoveredLink(null)}
                            >
                                Sign up
                            </a>
                            <button style={styles.primaryButton}>Request a demo</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavbarPage;