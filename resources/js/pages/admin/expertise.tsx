import SimpleTooltip from '@/components/simple-tooltip';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Pagination from '@/components/ui/pagination';
import Table from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { About, Expertise, type BreadcrumbItem } from '@/types';
import { PaginatedResponse } from '@/types/pagination';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PenLine, Plus, Trash2 } from 'lucide-react';

const columns = [
    {
        header: 'Skill',
        accessor: (item: Expertise) => <>{item.skill?.name ?? '-'}</>,
    },
    {
        header: 'Level',
        accessor: 'level',
    },
    {
        header: 'Notes',
        accessor: 'notes',
    },
    {
        header: 'Certified',
        accessor: (item: Expertise) => <>{item.certified ? 'Yes' : 'No'}</>,
    },
    {
        header: 'Years of experience',
        accessor: 'years_of_experience',
    },
];

export default function ExpertiseAdmin() {
    const { expertises } = usePage<{ expertises: PaginatedResponse<Expertise> }>().props;
    const { about } = usePage<{ about: About }>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Expertise - ${about?.fullname ?? 'Admin'}`,
            href: `/admin-about/${about?.id}/expertise`,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Expertise" />
            <div>
                <div className="flex w-full justify-between px-2 py-2">
                    <SimpleTooltip content="Back">
                        <Link href={'/admin-about'}>
                            <Button variant="secondary">Back</Button>
                        </Link>
                    </SimpleTooltip>
                    <SimpleTooltip content="Create Expertise">
                        <Link href={`/admin-about/${about?.id}/expertise/create`}>
                            <Button>
                                <Plus size={20} /> Create
                            </Button>
                        </Link>
                    </SimpleTooltip>
                </div>
                <Table
                    data={expertises.data}
                    columns={columns}
                    renderActions={(expertise) => (
                        <div className="flex gap-2">
                            <SimpleTooltip content="Edit">
                                <Link href={`/admin-about/${about?.id}/expertise/edit/${expertise.id}`}>
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
                                    <DialogTitle>Are you sure you want to delete this expertise?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete the expertise and all of its associated data.
                                    </DialogDescription>

                                    <div className="flex justify-end gap-2">
                                        <DialogTrigger asChild>
                                            <Button
                                                onClick={() => {
                                                    router.delete(route('admin.expertise.delete', expertise.id));
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
                    currentPage={expertises.current_page}
                    lastPage={expertises.last_page}
                    nextPageUrl={expertises.next_page_url}
                    prevPageUrl={expertises.prev_page_url}
                />
            </div>
        </AppLayout>
    );
}
