import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { PropsWithChildren, useState } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const currentPath = window.location.pathname;

    return (
        <div className="flex min-h-screen flex-col">
            <Head title={currentPath === '/' ? 'Home' : currentPath.replace('/', '').charAt(0).toUpperCase() + currentPath.slice(2)}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="w-full px-6 text-sm not-has-[nav]:hidden lg:px-8">
                    {/* Mobile menu button */}
                    <div className="flex justify-end md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="inline-flex items-center rounded-sm border border-[#19140035] p-2 text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav
                        className={`${mobileMenuOpen ? 'flex' : 'hidden'} mt-4 flex-col gap-4 md:mt-0 md:flex md:flex-row md:items-center md:justify-end`}
                    >
                        {['/', '/gallery', '/about', '/writings'].map((path) => (
                            <Link
                                key={path}
                                href={path}
                                className="group relative inline-block px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:text-[#191400] dark:text-[#EDEDEC] dark:hover:text-white"
                            >
                                {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}

                                {/* Aktif indicator */}
                                {currentPath === path && <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#19140035] dark:bg-white" />}

                                {/* Hover indicator */}
                                <div className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-[#19140035] transition-transform duration-500 group-hover:scale-x-100 dark:bg-white" />
                            </Link>
                        ))}
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="group relative inline-block px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:text-[#191400] dark:text-[#EDEDEC] dark:hover:text-white"
                            >
                                Dashboard
                                {/* Aktif indicator */}
                                {currentPath === route('dashboard') && (
                                    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#19140035] dark:bg-white" />
                                )}
                                {/* Hover indicator */}
                                <div className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-[#19140035] transition-transform duration-500 group-hover:scale-x-100 dark:bg-white" />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="group relative inline-block px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:text-[#191400] dark:text-[#EDEDEC] dark:hover:text-white"
                                >
                                    Log in
                                    {currentPath === route('login') && (
                                        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#19140035] dark:bg-white" />
                                    )}
                                    <div className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-[#19140035] transition-transform duration-500 group-hover:scale-x-100 dark:bg-white" />
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="group relative inline-block px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:text-[#191400] dark:text-[#EDEDEC] dark:hover:text-white"
                                >
                                    Register
                                    {currentPath === route('register') && (
                                        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#19140035] dark:bg-white" />
                                    )}
                                    <div className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-[#19140035] transition-transform duration-500 group-hover:scale-x-100 dark:bg-white" />
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
            </div>

            <main className="flex-1">{children}</main>

            <footer className="bg-[#121212] py-8 text-center dark:bg-gray-50">
                <div className="container mx-auto max-w-7xl px-6">
                    <p className="text-sm text-gray-400 dark:text-gray-600">© {new Date().getFullYear()} Ekklesia. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
