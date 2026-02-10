import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { About, ExperienceEducation, Skill, type BreadcrumbItem } from '@/types';
import { Input } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type ExperienceEducationForm = {
    skill_id: number;
    type: string;
    title: string;
    company_institution: string;
    location: string;
    start_date: string;
    end_date: string;
    description: string;
    achievements_or_grade: string;
};

export default function ExperienceEducationForm() {
    const { experienceEducation } = usePage<{ experienceEducation: ExperienceEducation }>().props;
    const { skills } = usePage<{ skills: Skill[] }>().props;
    const { about } = usePage<{ about: About }>().props;
    const isEditMode = !!experienceEducation;

    const { data, setData, post, errors, processing, reset } = useForm<Required<ExperienceEducationForm>>({
        skill_id: experienceEducation?.skill_id ?? 0,
        type: experienceEducation?.type ?? '',
        title: experienceEducation?.title ?? '',
        company_institution: experienceEducation?.company_institution ?? '',
        location: experienceEducation?.location ?? '',
        start_date: experienceEducation?.start_date ?? '',
        end_date: experienceEducation?.end_date ?? '',
        description: experienceEducation?.description ?? '',
        achievements_or_grade: experienceEducation?.achievements_or_grade ?? '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Experience Education - ${about?.fullname ?? 'Admin'}`,
            href: `/admin-about/${about?.id}/experience-education`,
        },
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEditMode) {
            console.log(' experienceEducation.id', experienceEducation.id);
            post(
                route('admin.experience-education.update', {
                    aboutId: about.id,
                    id: experienceEducation.id,
                }),
                {
                    onSuccess: () =>
                        reset(
                            'skill_id',
                            'type',
                            'title',
                            'company_institution',
                            'location',
                            'start_date',
                            'end_date',
                            'description',
                            'achievements_or_grade',
                        ),
                },
            );
        } else {
            post(route('admin.experience-education.store', about.id), {
                onFinish: () =>
                    reset(
                        'skill_id',
                        'type',
                        'title',
                        'company_institution',
                        'location',
                        'start_date',
                        'end_date',
                        'description',
                        'achievements_or_grade',
                    ),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Experience Education Form" />
            <div className="p-4">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 space-y-6 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="type">Type</Label>

                            <div className="flex flex-wrap gap-4">
                                {['Experience', 'Education'].map((typeOption) => (
                                    <div className="flex items-center" key={typeOption}>
                                        <Input
                                            type="radio"
                                            id={`level-${typeOption.toLowerCase()}`}
                                            name="level"
                                            value={typeOption}
                                            checked={data.type === typeOption}
                                            onChange={(e) => setData('type', e.target.value)}
                                            className="mr-2"
                                        />
                                        <Label htmlFor={`type-${typeOption.toLowerCase()}`}>{typeOption}</Label>
                                    </div>
                                ))}
                            </div>

                            <InputError className="mt-2" message={errors.type} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>

                            <Input
                                id="title"
                                className="mt-1 block w-full"
                                autoComplete="title"
                                placeholder="Title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                            />

                            <InputError className="mt-2" message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="company_institution">Company Institution</Label>

                            <Input
                                id="company_institution"
                                className="mt-1 block w-full"
                                autoComplete="company_institution"
                                placeholder="Company Institution"
                                value={data.company_institution}
                                onChange={(e) => setData('company_institution', e.target.value)}
                            />

                            <InputError className="mt-2" message={errors.company_institution} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>

                            <Input
                                id="location"
                                className="mt-1 block w-full"
                                autoComplete="location"
                                placeholder="Location"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                            />

                            <InputError className="mt-2" message={errors.location} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="start_date">Start Date</Label>

                            <Input
                                id="start_date"
                                type="date"
                                className="mt-1 block w-full"
                                autoComplete="start_date"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                            />

                            <InputError className="mt-2" message={errors.start_date} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="end_date">End Date</Label>

                            <Input
                                id="end_date"
                                type="date"
                                className="mt-1 block w-full"
                                autoComplete="end_date"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                            />

                            <InputError className="mt-2" message={errors.end_date} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>

                            <Input
                                id="description"
                                className="mt-1 block w-full"
                                autoComplete="description"
                                placeholder="Description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />

                            <InputError className="mt-2" message={errors.description} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="achievements_or_grade">Achievements or Grade</Label>

                            <Input
                                id="achievements_or_grade"
                                className="mt-1 block w-full"
                                autoComplete="achievements_or_grade"
                                placeholder="Achievements or Grade"
                                value={data.achievements_or_grade}
                                onChange={(e) => setData('achievements_or_grade', e.target.value)}
                            />

                            <InputError className="mt-2" message={errors.achievements_or_grade} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="skill_id">Skill</Label>

                            <Select onValueChange={(value) => setData('skill_id', Number(value))} value={data.skill_id ? String(data.skill_id) : ''}>
                                <SelectTrigger id="skill_id" className="mt-1 w-full">
                                    <SelectValue placeholder="Select a skill" />
                                </SelectTrigger>
                                <SelectContent>
                                    {skills.map((skill) => (
                                        <SelectItem key={skill.id} value={String(skill.id)}>
                                            {skill.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <InputError className="mt-2" message={errors.skill_id} />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Link disabled={processing} href={`/admin-about/${about?.id}/experience-education`}>
                            <Button variant="secondary">Back</Button>
                        </Link>

                        <Button disabled={processing}>Save</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
