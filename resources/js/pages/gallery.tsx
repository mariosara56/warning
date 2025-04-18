import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import Pagination from '@/components/ui/pagination';
import MainLayout from '@/layouts/main-layout';
import { type Gallery } from '@/types';
import { PaginatedResponse } from '@/types/pagination';
import { usePage } from '@inertiajs/react';

export default function Gallery() {
    const { galleries } = usePage<{ galleries: PaginatedResponse<Gallery> }>().props;

    return (
        <MainLayout>
            {/* Teaching Gallery Section */}
            <section className="pb-16 dark:text-gray-300">
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="mb-12 text-center text-3xl font-bold">Teaching Gallery</h2>
                    <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {galleries?.data?.map((item, index) => (
                            <Card key={index} className="overflow-hidden pt-0 transition hover:bg-neutral-200 dark:hover:bg-neutral-900">
                                <CardTitle className="h-64">
                                    <img src={`/storage/${item?.thumbnail}`} alt={item?.title} className="h-full w-full object-cover" />
                                </CardTitle>
                                <CardContent>
                                    <CardDescription dangerouslySetInnerHTML={{ __html: item.description ?? '' }} />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <Pagination
                        currentPage={galleries.current_page}
                        lastPage={galleries.last_page}
                        nextPageUrl={galleries.next_page_url}
                        prevPageUrl={galleries.prev_page_url}
                    />
                </div>
            </section>
        </MainLayout>
    );
}
