/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			emerald: {
  				50: '#EAFDE7',
  				100: '#DCF9D3',
  				200: '#C3F2B5',
  				300: '#A5E88E',
  				400: '#86DB67',
  				500: '#72BF00',
  				600: '#5D9E00',
  				700: '#4A7D00',
  				800: '#3A7717',
  				900: '#2C5E14',
  				950: '#01312D'
  			},
  			green: {
  				50: '#EAFDE7',
  				100: '#DCF9D3',
  				200: '#C3F2B5',
  				300: '#A5E88E',
  				400: '#86DB67',
  				500: '#72BF00',
  				600: '#5D9E00',
  				700: '#4A7D00',
  				800: '#3A7717',
  				900: '#2C5E14',
  				950: '#01312D'
  			},
  			teal: {
  				50: '#EAFDE7',
  				100: '#D4F1EA',
  				200: '#B1E3D8',
  				300: '#88D1C2',
  				400: '#5DBEAB',
  				500: '#2D7E73',
  				600: '#24665D',
  				700: '#1B4E48',
  				800: '#123B37',
  				900: '#0B332F',
  				950: '#01312D'
  			},
  			lime: {
  				50: '#F4FCDC',
  				100: '#EBF9BE',
  				200: '#DDF57F',
  				300: '#CFF23F',
  				400: '#BFF202',
  				500: '#AAD800',
  				600: '#72BF00',
  				700: '#668D00',
  				800: '#4A6800',
  				900: '#314600',
  				950: '#1E2C00'
  			}
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
