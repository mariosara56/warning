import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import MainLayout from '@/layouts/main-layout';
import { type Writing } from '@/types';
import { usePage } from '@inertiajs/react';

export default function WritingShow() {
    const { writing } = usePage<{ writing: Writing }>().props;

    return (
        <MainLayout>
            <section className="container mx-auto max-w-7xl px-6 pb-16 dark:text-gray-300">
                <h2 className="mb-12 text-center text-3xl font-bold">My Writings</h2>
                <div className="space-y-6">
                    <Card className="p-6 transition hover:bg-neutral-200 dark:hover:bg-neutral-900">
                        <CardTitle>{writing.title}</CardTitle>
                        <CardContent>
                            <div className="mb-4 flex items-center justify-center">
                                <div className="h-64 w-64 overflow-hidden rounded-2xl border-4 border-[#19140035] md:h-80 md:w-80 dark:border-[#3E3E3A]">
                                    <div className="h-full w-full bg-gray-200 dark:bg-gray-700">
                                        <img src={`/storage/${writing.thumbnail}`} alt={writing.title} className="h-full w-full object-cover" />
                                    </div>
                                </div>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: writing.body }} />
                        </CardContent>
                        <CardFooter>{writing.author}</CardFooter>
                    </Card>
                </div>
            </section>
        </MainLayout>
    );
}
