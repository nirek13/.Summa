import React, { useState, useEffect } from 'react';

// Styles as a separate object
const styles = {
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
        teamCredits: {
            textAlign: 'center',
            color: '#688990',
            fontSize: '12px',
            marginTop: '10px',
            position: 'relative',
            zIndex: 2,
        },
};

const FooterPage = () => {
    return (
        <div style={styles.pageWrapper}>
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
                    <p style={styles.teamCredits}>
                        Crafted with ❤️ by Nirek Shetty, Christian Fisla, Eddie Bian, Mashrufa Mushtari, and our amazing mentor Jason Cameron
                    </p>
                </footer>
        </div>
    );
};

export default FooterPage;
