import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Pagination from '@/components/ui/pagination';
import Table from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Writing } from '@/types';
import { PaginatedResponse } from '@/types/pagination';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PenLine, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Writing',
        href: '/admin-writing',
    },
];

const columns = [
    {
        header: 'Thumbnail',
        accessor: (item: Writing) => <img src={`/storage/${item.thumbnail}`} alt={item.title} className="h-12 w-12 rounded object-cover" />,
    },
    { header: 'Title', accessor: 'title' },
    { header: 'Teaser', accessor: 'teaser' },
    {
        header: 'Body',
        accessor: (item: Writing) => (
            <div className="line-clamp-2 max-w-xs overflow-hidden text-ellipsis" dangerouslySetInnerHTML={{ __html: item.body }} />
        ),
    },
    { header: 'Author', accessor: 'author' },
];

export default function WritingAdmin() {
    const { writings } = usePage<{ writings: PaginatedResponse<Writing> }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Writing" />
            <div>
                <div className="flex w-full justify-end px-2 py-2">
                    <Link href={'/admin-writing/create'} prefetch>
                        <Button>Add Writing</Button>
                    </Link>
                </div>
                <Table
                    data={writings.data}
                    columns={columns}
                    renderActions={(writing) => (
                        <div className="flex items-center justify-center gap-2">
                            <Link href={`/admin-writing/edit/${writing.id}`} prefetch>
                                <Button>
                                    <PenLine size={20} />
                                </Button>
                            </Link>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="destructive">
                                        <Trash2 size={20} />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogTitle>Are you sure you want to delete this writing?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete the writing and all of its resources.
                                    </DialogDescription>

                                    <div className="flex justify-end gap-2">
                                        <Button
                                            onClick={() => {
                                                router.delete(route('admin.writing.delete', writing.id));
                                            }}
                                            variant="destructive"
                                        >
                                            Delete
                                        </Button>
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
                    currentPage={writings.current_page}
                    lastPage={writings.last_page}
                    nextPageUrl={writings.next_page_url}
                    prevPageUrl={writings.prev_page_url}
                />
            </div>
        </AppLayout>
    );
}
