import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import Pagination from '@/components/ui/pagination';
import MainLayout from '@/layouts/main-layout';
import { Quote, type Writing } from '@/types';
import { PaginatedResponse } from '@/types/pagination';
import { Link, usePage } from '@inertiajs/react';

export default function Writing() {
    const { writings } = usePage<{ writings: PaginatedResponse<Writing> }>().props;
    const { quotes } = usePage<{ quotes: Quote[] }>().props;

    return (
        <MainLayout>
            <section className="container mx-auto max-w-7xl px-6 pb-16 dark:text-gray-300">
                <h2 className="mb-12 text-center text-3xl font-bold" data-aos="fade-down">
                    My Writings
                </h2>

                <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {writings?.data?.map((item, index) => (
                        <Link href={`/writings/${item.slug}`} key={item.slug} data-aos="fade-up" data-aos-delay={index * 100}>
                            <Card className="flex h-full flex-col p-6 transition hover:bg-neutral-200 dark:hover:bg-neutral-900">
                                <CardTitle className="line-clamp-2 min-h-8 overflow-hidden text-ellipsis">{item.title}</CardTitle>
                                <CardContent className="flex flex-col gap-4">
                                    <div className="flex items-center justify-center">
                                        <div className="h-64 w-64 overflow-hidden rounded-2xl border-4 border-[#19140035] md:h-80 md:w-80 dark:border-[#3E3E3A]">
                                            <div className="h-full w-full bg-gray-200 dark:bg-gray-700">
                                                <img src={`/storage/${item.thumbnail}`} alt={item.title} className="h-full w-full object-cover" />
                                            </div>
                                        </div>
                                    </div>
                                    <p>{item.teaser}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Pagination (sekali animasi saja) */}
                <div data-aos="fade-up" data-aos-duration="800">
                    <Pagination
                        currentPage={writings.current_page}
                        lastPage={writings.last_page}
                        nextPageUrl={writings.next_page_url}
                        prevPageUrl={writings.prev_page_url}
                    />
                </div>
            </section>

            {/* Quotes Section */}
            <section className="bg-gray-50 py-16 dark:bg-[#121212] dark:text-gray-300">
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="mb-12 text-center text-3xl font-bold" data-aos="fade-down">
                        Inspiring Quotes
                    </h2>

                    <div className="grid gap-6 md:grid-cols-3">
                        {quotes.map((item, index) => (
                            <Card
                                className="flex flex-col justify-between p-6 transition hover:bg-neutral-200 dark:hover:bg-neutral-900"
                                key={index}
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                            >
                                <CardContent dangerouslySetInnerHTML={{ __html: item.quote }} />
                                <CardDescription className="text-right">— {item.author}</CardDescription>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
