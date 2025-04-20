import SimpleTooltip from '@/components/simple-tooltip';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Pagination from '@/components/ui/pagination';
import Table from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Quote, type BreadcrumbItem } from '@/types';
import { PaginatedResponse } from '@/types/pagination';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PenLine, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quotes',
        href: '/admin-quote',
    },
];

const columns = [
    { header: 'Author', accessor: 'author' },
    {
        header: 'Quote',
        accessor: (item: Quote) => (
            <div className="line-clamp-2 max-w-xs overflow-hidden text-ellipsis" dangerouslySetInnerHTML={{ __html: item.quote ?? '' }} />
        ),
    },
    { header: 'Is Active', accessor: (item: Quote) => (item.is_active ? 'Yes' : 'No') },
];

export default function QuoteAdmin() {
    const { quotes } = usePage<{ quotes: PaginatedResponse<Quote> }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quote" />
            <div>
                <div className="flex w-full justify-end px-2 py-2">
                    <SimpleTooltip content="Create Quote">
                        <Link href={'/admin-quote/create'}>
                            <Button>
                                <Plus size={20} /> Create
                            </Button>
                        </Link>
                    </SimpleTooltip>
                </div>
                <Table
                    data={quotes.data}
                    columns={columns}
                    renderActions={(quote) => (
                        <div className="flex gap-2">
                            <SimpleTooltip content="Edit">
                                <Link href={`/admin-quote/edit/${quote.id}`}>
                                    <Button>
                                        <PenLine size={20} />
                                    </Button>
                                </Link>
                            </SimpleTooltip>
                            <Dialog>
                                <SimpleTooltip content="Delete ">
                                    <DialogTrigger asChild>
                                        <Button variant="destructive">
                                            <Trash2 size={20} />
                                        </Button>
                                    </DialogTrigger>
                                </SimpleTooltip>
                                <DialogContent>
                                    <DialogTitle>Are you sure you want to delete this quote?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete the quote and remove it from the list.
                                    </DialogDescription>

                                    <div className="flex justify-end gap-2">
                                        <DialogTrigger asChild>
                                            <Button
                                                onClick={() => {
                                                    router.delete(route('admin.quote.delete', quote.id));
                                                }}
                                                variant="destructive"
                                            >
                                                Delete
                                            </Button>
                                        </DialogTrigger>
                                        <DialogTrigger asChild>
                                            <Button variant="secondary">Cancel</Button>
                                        </DialogTrigger>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                />
                <Pagination
                    currentPage={quotes.current_page}
                    lastPage={quotes.last_page}
                    nextPageUrl={quotes.next_page_url}
                    prevPageUrl={quotes.prev_page_url}
                />
            </div>
        </AppLayout>
    );
}
