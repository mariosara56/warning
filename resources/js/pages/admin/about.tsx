import SimpleTooltip from '@/components/simple-tooltip';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Pagination from '@/components/ui/pagination';
import Table from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { About, type BreadcrumbItem } from '@/types';
import { PaginatedResponse } from '@/types/pagination';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PenLine, Plus, Trash2, UserPen } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'About',
        href: '/admin-about',
    },
];

const columns = [
    { header: 'Full Name', accessor: 'fullname' },
    {
        header: 'Description',
        accessor: (item: About) => <div className="line-clamp-2 max-w-xs overflow-hidden text-ellipsis">{item.description}</div>,
    },
    {
        header: 'Photo',
        accessor: (item: About) => <img src={`/storage/${item.photo}`} alt={item.fullname} className="h-12 w-12 rounded object-cover" />,
    },
    { header: 'Work', accessor: 'work' },
    { header: 'Is Active', accessor: (item: About) => (item.is_active ? 'Yes' : 'No') },
];

export default function AboutAdmin() {
    const { abouts } = usePage<{ abouts: PaginatedResponse<About> }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About" />
            <div>
                <div className="flex w-full justify-end px-2 py-2">
                    <SimpleTooltip content="Creat About">
                        <Link href={'/admin-about/create'}>
                            <Button>
                                <Plus size={20} /> Create
                            </Button>
                        </Link>
                    </SimpleTooltip>
                </div>
                <Table
                    data={abouts.data}
                    columns={columns}
                    renderActions={(about) => (
                        <div className="flex gap-2">
                            <SimpleTooltip content="Edit">
                                <Link href={`/admin-about/edit/${about.id}`}>
                                    <Button>
                                        <PenLine size={20} />
                                    </Button>
                                </Link>
                            </SimpleTooltip>

                            <SimpleTooltip content="Expertise">
                                <Link href={`/admin-about/${about.id}/expertise`}>
                                    <Button className="bg-green-500 text-white hover:bg-green-600">
                                        <UserPen size={20} />
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
                                    <DialogTitle>Are you sure you want to delete this about?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete the about and remove it from the list.
                                    </DialogDescription>

                                    <div className="flex justify-end gap-2">
                                        <DialogTrigger asChild>
                                            <Button
                                                onClick={() => {
                                                    router.delete(route('admin.about.delete', about.id));
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
                    currentPage={abouts.current_page}
                    lastPage={abouts.last_page}
                    nextPageUrl={abouts.next_page_url}
                    prevPageUrl={abouts.prev_page_url}
                />
            </div>
        </AppLayout>
    );
}
