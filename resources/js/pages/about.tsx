import MainLayout from '@/layouts/main-layout';
import { About } from '@/types';
import { PaginatedResponse } from '@/types/pagination';
import { usePage } from '@inertiajs/react';
import { Linkedin, Mail, MessageSquareDashed } from 'lucide-react';

export default function Writings() {
    const { abouts } = usePage<{ abouts: PaginatedResponse<About> }>().props;
    return (
        <MainLayout>
            <section className="container mx-auto min-h-screen max-w-7xl px-6 py-16">
                <div className="grid gap-12 md:grid-cols-2 md:items-center">
                    <div data-aos="fade-in" data-aos-delay="200" data-aos-duration="1500">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl dark:text-[#EDEDEC]">{abouts.data?.[0]?.fullname}</h1>
                        <h2 className="mb-6 text-xl text-gray-700 dark:text-gray-300">{abouts.data?.[0]?.work}</h2>
                        <p className="mb-8 text-lg leading-relaxed dark:text-[#EDEDEC]">{abouts.data?.[0]?.description}</p>
                        <div className="flex items-center gap-4">
                            <a
                                href={`https://wa.me/${abouts.data?.[0]?.phone}?text=${encodeURIComponent('Halo, saya ingin bertanya...')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border border-[#19140035] p-3 transition hover:bg-gray-100 dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:bg-[#1a1a1a]"
                                data-aos="fade-in"
                                data-aos-delay="400"
                                data-aos-duration="1500"
                            >
                                <MessageSquareDashed size={20} />
                            </a>
                            <a
                                href={abouts.data?.[0]?.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border border-[#19140035] p-3 transition hover:bg-gray-100 dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:bg-[#1a1a1a]"
                                data-aos="fade-in"
                                data-aos-delay="600"
                                data-aos-duration="1500"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href={`mailto:${abouts.data?.[0]?.email}?subject=Halo&body=Halo,%20saya%20ingin%20menghubungi%20Anda.`}
                                className="rounded-full border border-[#19140035] p-3 transition hover:bg-gray-100 dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:bg-[#1a1a1a]"
                                data-aos="fade-in"
                                data-aos-delay="800"
                                data-aos-duration="1500"
                            >
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-end" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
                        <div className="h-64 w-64 overflow-hidden rounded-full border-4 border-[#19140035] md:h-80 md:w-80 dark:border-[#3E3E3A]">
                            {/* Replace with your image */}
                            <div className="h-full w-full bg-gray-200 dark:bg-gray-700">
                                {/* Placeholder for your photo */}
                                <img
                                    src={`/storage/${abouts.data?.[0]?.photo}`}
                                    alt={abouts.data?.[0]?.fullname}
                                    className="h-full w-full object-cover"
                                    data-aos="zoom-in"
                                    data-aos-delay="1200"
                                    data-aos-duration="1500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
