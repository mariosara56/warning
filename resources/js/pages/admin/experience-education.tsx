import SimpleTooltip from '@/components/simple-tooltip';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Pagination from '@/components/ui/pagination';
import Table from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { About, ExperienceEducation, type BreadcrumbItem } from '@/types';
import { PaginatedResponse } from '@/types/pagination';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PenLine, Plus, Trash2 } from 'lucide-react';

const columns = [
    {
        header: 'Type',
        accessor: 'type',
    },
    {
        header: 'Title',
        accessor: 'title',
    },
    {
        header: 'Company Institution',
        accessor: 'company_institution',
    },
    {
        header: 'Location',
        accessor: 'location',
    },
    {
        header: 'Start Date',
        accessor: 'start_date',
    },
    {
        header: 'End Date',
        accessor: 'end_date',
    },
    {
        header: 'Description',
        accessor: 'description',
    },
    {
        header: 'Achievements or Grade',
        accessor: 'achievements_or_grade',
    },
    {
        header: 'Skill',
        accessor: (item: ExperienceEducation) => <>{item.skill?.name ?? '-'}</>,
    },
];

export default function ExperienceEducationAdmin() {
    const { experienceEducations } = usePage<{ experienceEducations: PaginatedResponse<ExperienceEducation> }>().props;
    const { about } = usePage<{ about: About }>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Experience Education - ${about?.fullname ?? 'Admin'}`,
            href: `/admin-about/${about?.id}/experience-education`,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Experience Education" />
            <div>
                <div className="flex w-full justify-between px-2 py-2">
                    <SimpleTooltip content="Back">
                        <Link href={'/admin-about'}>
                            <Button variant="secondary">Back</Button>
                        </Link>
                    </SimpleTooltip>
                    <SimpleTooltip content="Create Experience Education">
                        <Link href={`/admin-about/${about?.id}/experience-education/create`}>
                            <Button>
                                <Plus size={20} /> Create
                            </Button>
                        </Link>
                    </SimpleTooltip>
                </div>
                <Table
                    data={experienceEducations.data}
                    columns={columns}
                    renderActions={(experienceEducation) => (
                        <div className="flex gap-2">
                            <SimpleTooltip content="Edit">
                                <Link href={`/admin-about/${about?.id}/experience-education/edit/${experienceEducation.id}`}>
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
                                    <DialogTitle>Are you sure you want to delete this experience education?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete the experience education and all of its associated
                                        data.
                                    </DialogDescription>

                                    <div className="flex justify-end gap-2">
                                        <DialogTrigger asChild>
                                            <Button
                                                onClick={() => {
                                                    router.delete(route('admin.experience-education.delete', experienceEducation.id));
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
                    currentPage={experienceEducations.current_page}
                    lastPage={experienceEducations.last_page}
                    nextPageUrl={experienceEducations.next_page_url}
                    prevPageUrl={experienceEducations.prev_page_url}
                />
            </div>
        </AppLayout>
    );
}
