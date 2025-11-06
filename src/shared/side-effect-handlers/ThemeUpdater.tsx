import { useEffect } from 'react';
import { useAppSelector } from '../../store';

function ThemeUpdater() {
    const currentTheme = useAppSelector((state) => state.persistedAppContext.theme);

    useEffect(() => {
        const root = document.documentElement; // Use html element instead of body
        const body = document.body;

        if (currentTheme === 'light') {
            // Light mode
            root.classList.remove('dark');
            root.classList.add('light');
            body.classList.add('light-theme'); // Keep old system compatibility
            body.classList.remove('dark-theme');
        } else {
            // Dark mode
            root.classList.remove('light');
            root.classList.add('dark');
            body.classList.remove('light-theme'); // Keep old system compatibility
            body.classList.add('dark-theme');
        }

        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            const colors = {
                light: '#ffffff',
                dark: '#0d0d0d',
            };
            metaThemeColor.setAttribute('content', colors[currentTheme]);
        }

        // Log for debugging
        console.log('Theme updated:', currentTheme);
        console.log('HTML classes:', root.classList.toString());

    }, [currentTheme]);

    return null;
}

export default ThemeUpdater;