import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Skill, type BreadcrumbItem } from '@/types';
import { Input } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Skill Form',
        href: '/admin-skill',
    },
];

type SkillForm = {
    name: string;
    category: string;
    type: string;
};

export default function SkillForm() {
    const { skill } = usePage<{ skill: Skill }>().props;
    const isEditMode = !!skill;

    const { data, setData, post, errors, processing, reset } = useForm<Required<SkillForm>>({
        name: skill?.name || '',
        category: skill?.category || '',
        type: skill?.type || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEditMode) {
            post(route('admin.skill.update', skill.id), {
                onFinish: () => reset('name', 'category', 'type'),
            });
        } else {
            post(route('admin.skill.store'), {
                onFinish: () => reset('name', 'category', 'type'),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Skill Form" />
            <div className="p-4">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 space-y-6 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                autoComplete="name"
                                placeholder="Name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>

                            <Input
                                id="category"
                                className="mt-1 block w-full"
                                autoComplete="category"
                                placeholder="Category"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                            />

                            <InputError className="mt-2" message={errors.category} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="type">Type</Label>

                            <div className="flex space-x-4">
                                <div className="flex items-center">
                                    <Input
                                        type="radio"
                                        id="hard-skill"
                                        name="type"
                                        value="Hard Skill"
                                        checked={data.type === 'Hard Skill'}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="mr-2"
                                    />
                                    <Label htmlFor="hard-skill">Hard Skill</Label>
                                </div>

                                <div className="flex items-center">
                                    <Input
                                        type="radio"
                                        id="soft-skill"
                                        name="type"
                                        value="Soft Skill"
                                        checked={data.type === 'Soft Skill'}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="mr-2"
                                    />
                                    <Label htmlFor="soft-skill">Soft Skill</Label>
                                </div>
                            </div>

                            <InputError className="mt-2" message={errors.type} />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Link disabled={processing} href={'/admin-skill'}>
                            <Button variant="secondary">Back</Button>
                        </Link>

                        <Button disabled={processing}>Save</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
