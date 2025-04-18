import { ImgHTMLAttributes } from 'react';

// Define the asset helper function
const asset = (path: string): string => {
    // Adjust this path according to your project structure
    return `/${path}`;
};

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return <img {...props} src={asset('logo-ekklesia.png')} alt="App Logo" />;
}
