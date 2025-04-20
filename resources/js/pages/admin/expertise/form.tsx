import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { About, Expertise, Skill, type BreadcrumbItem } from '@/types';
import { Input } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type ExpertiseForm = {
    skill_id: number;
    level: string;
    years_of_experience: number;
    certified: boolean;
    notes: string;
};

export default function ExpertiseForm() {
    const { expertise } = usePage<{ expertise: Expertise }>().props;
    const { skills } = usePage<{ skills: Skill[] }>().props;
    const { about } = usePage<{ about: About }>().props;
    const isEditMode = !!expertise;

    const { data, setData, post, errors, processing, reset } = useForm<Required<ExpertiseForm>>({
        skill_id: expertise?.skill_id ?? 0,
        level: expertise?.level ?? '',
        years_of_experience: expertise?.years_of_experience ?? 0,
        certified: expertise?.certified ?? false,
        notes: expertise?.notes ?? '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Expertise - ${about?.fullname ?? 'Admin'}`,
            href: `/admin-about/${about?.id}/expertise`,
        },
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEditMode) {
            post(route('admin.expertise.update', { aboutId: about.id, id: expertise.id }), {
                onFinish: () => reset('skill_id', 'level', 'years_of_experience', 'certified', 'notes'),
            });
        } else {
            post(route('admin.expertise.store', about.id), {
                onFinish: () => reset('skill_id', 'level', 'years_of_experience', 'certified', 'notes'),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Expertise Form" />
            <div className="p-4">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 space-y-6 md:grid-cols-2">
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

                        <div className="grid gap-2">
                            <Label htmlFor="level">Level</Label>

                            <div className="flex flex-wrap gap-4">
                                {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((levelOption) => (
                                    <div className="flex items-center" key={levelOption}>
                                        <Input
                                            type="radio"
                                            id={`level-${levelOption.toLowerCase()}`}
                                            name="level"
                                            value={levelOption}
                                            checked={data.level === levelOption}
                                            onChange={(e) => setData('level', e.target.value)}
                                            className="mr-2"
                                        />
                                        <Label htmlFor={`level-${levelOption.toLowerCase()}`}>{levelOption}</Label>
                                    </div>
                                ))}
                            </div>

                            <InputError className="mt-2" message={errors.level} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="notes">Notes</Label>

                            <Input
                                id="notes"
                                className="mt-1 block w-full"
                                autoComplete="notes"
                                placeholder="Notes"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                            />

                            <InputError className="mt-2" message={errors.notes} />
                        </div>

                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="certified"
                                name="certified"
                                checked={data.certified}
                                onClick={() => setData('certified', !data.certified)}
                            />
                            <Label htmlFor="certified">Certified</Label>

                            <InputError className="mt-2" message={errors.certified} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="years_of_experience">Years of Experience</Label>

                            <Select
                                value={
                                    data.years_of_experience !== null && data.years_of_experience !== undefined
                                        ? String(data.years_of_experience)
                                        : undefined
                                }
                                onValueChange={(value) => setData('years_of_experience', Number(value))}
                            >
                                <SelectTrigger id="years_of_experience">
                                    <SelectValue placeholder="Pilih tahun pengalaman..." />
                                </SelectTrigger>

                                <SelectContent>
                                    {[...Array(31)].map((_, i) => (
                                        <SelectItem key={i} value={String(i)}>
                                            {i} {`year${i > 1 ? 's' : ''}`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <InputError className="mt-2" message={errors.years_of_experience} />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Link disabled={processing} href={`/admin-about/${about?.id}/expertise`}>
                            <Button variant="secondary">Back</Button>
                        </Link>

                        <Button disabled={processing}>Save</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
