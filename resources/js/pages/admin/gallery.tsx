import SimpleTooltip from '@/components/simple-tooltip';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Pagination from '@/components/ui/pagination';
import Table from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Gallery, type BreadcrumbItem } from '@/types';
import { PaginatedResponse } from '@/types/pagination';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PenLine, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gallery',
        href: '/admin-gallery',
    },
];

const columns = [
    {
        header: 'Thumbnail',
        accessor: (item: Gallery) => <img src={`/storage/${item.thumbnail}`} alt={item.title} className="h-12 w-12 rounded object-cover" />,
    },
    { header: 'Title', accessor: 'title' },
    {
        header: 'Description',
        accessor: (item: Gallery) => (
            <div className="line-clamp-2 max-w-xs overflow-hidden text-ellipsis" dangerouslySetInnerHTML={{ __html: item.description ?? '' }} />
        ),
    },
];

export default function GalleryAdmin() {
    const { galleries } = usePage<{ galleries: PaginatedResponse<Gallery> }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gallery" />
            <div>
                <div className="flex w-full justify-end px-2 py-2">
                    <SimpleTooltip content="Create Gallery">
                        <Link href={'/admin-gallery/create'}>
                            <Button>
                                <Plus size={20} /> Create
                            </Button>
                        </Link>
                    </SimpleTooltip>
                </div>
                <Table
                    data={galleries.data}
                    columns={columns}
                    renderActions={(gallery) => (
                        <div className="flex gap-2">
                            <SimpleTooltip content="Edit">
                                <Link href={`/admin-gallery/edit/${gallery.id}`}>
                                    <Button>
                                        <PenLine size={20} />
                                    </Button>
                                </Link>
                            </SimpleTooltip>
                            <Dialog>
                                <SimpleTooltip content="Delete">
                                    <DialogTrigger asChild>
                                        <Button variant="destructive">
                                            <Trash2 size={20} />
                                        </Button>
                                    </DialogTrigger>
                                </SimpleTooltip>
                                <DialogContent>
                                    <DialogTitle>Are you sure you want to delete this gallery?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete the gallery and remove it from the list.
                                    </DialogDescription>

                                    <div className="flex justify-end gap-2">
                                        <DialogTrigger asChild>
                                            <Button
                                                onClick={() => {
                                                    router.delete(route('admin.gallery.delete', gallery.id));
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
                    currentPage={galleries.current_page}
                    lastPage={galleries.last_page}
                    nextPageUrl={galleries.next_page_url}
                    prevPageUrl={galleries.prev_page_url}
                />
            </div>
        </AppLayout>
    );
}
