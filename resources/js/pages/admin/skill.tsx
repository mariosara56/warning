import SimpleTooltip from '@/components/simple-tooltip';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Pagination from '@/components/ui/pagination';
import Table from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Skill, type BreadcrumbItem } from '@/types';
import { PaginatedResponse } from '@/types/pagination';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PenLine, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Skill',
        href: '/admin-skill',
    },
];

const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Type', accessor: 'type' },
];

export default function SkillAdmin() {
    const { skills } = usePage<{ skills: PaginatedResponse<Skill> }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Skill" />
            <div>
                <div className="flex w-full justify-end px-2 py-2">
                    <SimpleTooltip content="Create Skill">
                        <Link href={'/admin-skill/create'}>
                            <Button>
                                <Plus size={20} /> Create
                            </Button>
                        </Link>
                    </SimpleTooltip>
                </div>
                <Table
                    data={skills.data}
                    columns={columns}
                    renderActions={(skill) => (
                        <div className="flex gap-2">
                            <SimpleTooltip content="Edit">
                                <Link href={`/admin-skill/edit/${skill.id}`}>
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
                                    <DialogTitle>Are you sure you want to delete this skill?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete the skill and remove it from the list.
                                    </DialogDescription>

                                    <div className="flex justify-end gap-2">
                                        <DialogTrigger asChild>
                                            <Button
                                                onClick={() => {
                                                    router.delete(route('admin.skill.delete', skill.id));
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
                    currentPage={skills.current_page}
                    lastPage={skills.last_page}
                    nextPageUrl={skills.next_page_url}
                    prevPageUrl={skills.prev_page_url}
                />
            </div>
        </AppLayout>
    );
}
