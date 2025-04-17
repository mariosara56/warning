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
                <header className="mb-6 w-full px-6 text-sm not-has-[nav]:hidden lg:px-8">
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
                                className={`inline-block rounded-sm border px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] ${
                                    currentPath === path
                                        ? 'border-[#19140035] dark:border-[#3E3E3A] dark:hover:border-[#62605b]'
                                        : 'border-transparent dark:hover:border-[#3E3E3A]'
                                }`}
                            >
                                {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
                            </Link>
                        ))}
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Register
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
