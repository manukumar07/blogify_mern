

export default {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
                'sans': ['Inter', 'sans-serif'],
            },
            colors: {
                border: '#E2E8F0',
                input: '#E2E8F0',
                ring: '#3B82F6',
                background: '#FFFFFF',
                foreground: '#0B0F19',

                primary: {
                    DEFAULT: '#3366FF',
                    foreground: '#FFFFFF',
                    light: '#99BBFF',
                    dark: '#0033CC',
                },

                secondary: {
                    DEFAULT: '#6633CC',
                    foreground: '#FFFFFF',
                },

                destructive: {
                    DEFAULT: '#EF4444',
                    foreground: '#FFFFFF',
                },

                muted: {
                    DEFAULT: '#F8FAFC',
                    foreground: '#64748B',
                },

                accent: {
                    DEFAULT: '#00CCCC',
                    foreground: '#FFFFFF',
                    light: '#CCF9F9',
                },

                popover: {
                    DEFAULT: '#FFFFFF',
                    foreground: '#0B0F19',
                },

                card: {
                    DEFAULT: '#FFFFFF',
                    foreground: '#0B0F19',
                },

                success: '#1FAA55',
                warning: '#FFCC00',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(90deg, #3366FF 0%, #00CCCC 100%)',
                'gradient-hero': 'linear-gradient(180deg, #6633CC 0%, #3366FF 100%)',
                'gradient-card': 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
            },
            boxShadow: {
                'sm': 'var(--shadow-sm)',
                'md': 'var(--shadow-md)',
                'lg': 'var(--shadow-lg)',
                'xl': 'var(--shadow-xl)',
                'glow': 'var(--shadow-glow)',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                },
                'fadeIn': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(20px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                'slideUp': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(30px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                'scaleIn': {
                    '0%': {
                        opacity: '0',
                        transform: 'scale(0.9)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'scale(1)'
                    }
                },
                'glow': {
                    '0%': {
                        boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
                    },
                    '100%': {
                        boxShadow: '0 0 40px hsl(var(--primary) / 0.6)'
                    }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'slide-up': 'slideUp 0.6s ease-out forwards',
                'scale-in': 'scaleIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
                'glow': 'glow 2s ease-in-out infinite alternate'
            }
        }
    },
    plugins: [("tailwindcss-animate")],
} 