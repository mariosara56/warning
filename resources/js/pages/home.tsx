import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import MainLayout from '@/layouts/main-layout';
import { About, ExperienceEducation, Expertise, Gallery, Quote, Writing } from '@/types';
import { PaginatedResponse } from '@/types/pagination';
import { Link, usePage } from '@inertiajs/react';
import { Instagram, Linkedin, Mail, MessageSquareDashed } from 'lucide-react';

export default function Home() {
    const { abouts } = usePage<{ abouts: PaginatedResponse<About> }>().props;
    const { expertises } = usePage<{ expertises: Expertise[] }>().props;
    const { experienceEducations } = usePage<{ experienceEducations: ExperienceEducation[] }>().props;
    const { galleries } = usePage<{ galleries: PaginatedResponse<Gallery> }>().props;
    const { writings } = usePage<{ writings: PaginatedResponse<Writing> }>().props;
    const { quotes } = usePage<{ quotes: Quote[] }>().props;

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="container mx-auto min-h-screen max-w-7xl px-6 py-16">
                <div className="grid gap-12 md:grid-cols-2 md:items-center">
                    <div data-aos="fade-in" data-aos-delay="200" data-aos-duration="1500">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl dark:text-[#EDEDEC]">{abouts.data?.[0]?.fullname}</h1>
                        <h2 className="mb-6 text-xl text-gray-700 dark:text-gray-300">{abouts.data?.[0]?.work}</h2>
                        <p className="mb-8 text-lg leading-relaxed dark:text-[#EDEDEC]">{abouts.data?.[0]?.description}</p>
                        <div className="flex items-center gap-4">
                            {abouts.data?.[0]?.phone && (
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
                            )}
                            {abouts.data?.[0]?.email && (
                                <a
                                    href={`mailto:${abouts.data?.[0]?.email}?subject=Halo&body=Halo,%20saya%20ingin%20menghubungi%20Anda.`}
                                    className="rounded-full border border-[#19140035] p-3 transition hover:bg-gray-100 dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:bg-[#1a1a1a]"
                                    data-aos="fade-in"
                                    data-aos-delay="800"
                                    data-aos-duration="1500"
                                >
                                    <Mail size={20} />
                                </a>
                            )}
                            {abouts.data?.[0]?.linkedin && (
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
                            )}
                            {abouts.data?.[0]?.instagram && (
                                <a
                                    href={abouts.data?.[0]?.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full border border-[#19140035] p-3 transition hover:bg-gray-100 dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:bg-[#1a1a1a]"
                                    data-aos="fade-in"
                                    data-aos-delay="600"
                                    data-aos-duration="1500"
                                >
                                    <Instagram size={20} />
                                </a>
                            )}
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
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = '/photo-ekklesia.png';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="bg-gray-50 py-16 dark:bg-[#121212] dark:text-gray-300">
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="mb-12 text-center text-3xl font-bold" data-aos="fade-down">
                        Skills & Expertise
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {expertises.map((item, index) => (
                            <Card
                                key={index}
                                className="flex flex-col gap-3 p-6 shadow-md transition hover:bg-neutral-200 hover:shadow-lg dark:hover:bg-neutral-900"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <CardTitle className="text-xl font-semibold">{item.skill?.name || 'Unnamed Skill'}</CardTitle>

                                <CardDescription className="text-muted-foreground text-sm">{item.notes || 'No notes provided.'}</CardDescription>

                                <div className="mt-2 flex flex-col gap-1 text-sm">
                                    <div>
                                        <span className="font-medium">Level:</span> {item.level}
                                    </div>

                                    {item.years_of_experience !== undefined && (
                                        <div>
                                            <span className="font-medium">Experience:</span> {item.years_of_experience} year
                                            {item.years_of_experience > 1 ? 's' : ''}
                                        </div>
                                    )}

                                    <div>
                                        <span className="font-medium">Certified:</span>{' '}
                                        <span className={item.certified ? 'text-green-600' : 'text-red-500'}>{item.certified ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="bg-gray-50 py-16 dark:bg-[#121212] dark:text-gray-300">
                <div className="container mx-auto max-w-7xl px-6 py-16">
                    <h2 className="mb-12 text-center text-3xl font-bold" data-aos="fade-down">
                        Experience & Education
                    </h2>
                    <div className="space-y-8">
                        {experienceEducations.map((item, index) => (
                            <Card
                                key={item.id}
                                className="p-6 transition hover:bg-neutral-200 dark:hover:bg-neutral-900"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <CardTitle>{item.title}</CardTitle>
                                <CardContent>
                                    <p>
                                        {item.company_institution} • {new Date(item.start_date).getFullYear()} -{' '}
                                        {item.end_date ? new Date(item.end_date).getFullYear() : 'Present'}
                                    </p>
                                    <CardDescription className="mt-2">
                                        {item.description}
                                        {item.achievements_or_grade && <div className="mt-2">📌 {item.achievements_or_grade}</div>}
                                        {item.skill_id && (
                                            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                <strong>Skills:</strong> {item.skill?.name || 'Unnamed Skill'}
                                            </div>
                                        )}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Teaching Gallery Section */}
            <section className="py-16 dark:text-gray-300">
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="mb-12 text-center text-3xl font-bold" data-aos="fade-down">
                        Teaching Gallery
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {galleries?.data?.map((item, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden pt-0 transition hover:bg-neutral-200 dark:hover:bg-neutral-900"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <CardTitle className="h-64">
                                    <img
                                        src={`/storage/${item?.thumbnail}`}
                                        alt={item?.title}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.src = '/photo-ekklesia.png';
                                        }}
                                    />
                                </CardTitle>
                                <CardContent>
                                    <CardDescription dangerouslySetInnerHTML={{ __html: item.description ?? '' }} />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Writings Section */}
            <section className="container mx-auto max-w-7xl px-6 py-16 dark:text-gray-300">
                <h2 className="mb-12 text-center text-3xl font-bold" data-aos="fade-down">
                    My Writings
                </h2>
                <div className="space-y-6">
                    {writings?.data?.map((item, index) => (
                        <Card
                            className="p-6 transition hover:bg-neutral-200 dark:hover:bg-neutral-900"
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <CardTitle>{item.title}</CardTitle>
                            <CardContent>
                                <p>{item.teaser}</p>
                                <Link href={`/writings/${item.slug}`}>
                                    <Button className="mt-2">Read more</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Quotes Section */}
            <section className="bg-gray-50 py-16 dark:bg-[#121212] dark:text-gray-300">
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="mb-12 text-center text-3xl font-bold" data-aos="fade-down">
                        Inspiring Quotes
                    </h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {quotes?.map((item, index) => (
                            <Card
                                className="flex flex-col justify-between p-6 transition hover:bg-neutral-200 dark:hover:bg-neutral-900"
                                key={index}
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                            >
                                <CardContent dangerouslySetInnerHTML={{ __html: item.quote }}></CardContent>
                                <CardDescription className="text-right">— {item.author}</CardDescription>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
