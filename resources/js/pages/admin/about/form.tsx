import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { About, type BreadcrumbItem } from '@/types';
import { Input, Textarea } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'About Form',
        href: '/admin-gallery',
    },
];

type AboutForm = {
    fullname: string;
    email: string;
    phone: string;
    instagram: string;
    linkedin: string;
    description: string;
    photo: File | string;
    work: string;
    is_active: boolean;
};

export default function AboutForm() {
    const { about } = usePage<{ about: About }>().props;
    const isEditMode = !!about;

    const { data, setData, post, errors, processing, reset } = useForm<Required<AboutForm>>({
        fullname: about?.fullname || '',
        email: about?.email || '',
        phone: about?.phone || '',
        instagram: about?.instagram || '',
        linkedin: about?.linkedin || '',
        description: about?.description || '',
        photo: about?.photo || '',
        work: about?.work || '',
        is_active: about?.is_active || false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditMode) {
            post(route('admin.about.update', about.id), {
                onSuccess: () => reset('fullname', 'email', 'phone', 'instagram', 'linkedin', 'description', 'photo', 'work', 'is_active'),
            });
        } else {
            post(route('admin.about.store'), {
                onSuccess: () => reset('fullname', 'email', 'phone', 'instagram', 'linkedin', 'description', 'photo', 'work', 'is_active'),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About Form" />
            <div className="p-4">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 space-y-6 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="fullname">Full Name</Label>

                            <Input
                                id="fullname"
                                className="mt-1 block w-full"
                                value={data.fullname}
                                onChange={(e) => setData('fullname', e.target.value)}
                                autoComplete="fullname"
                                placeholder="Full Name"
                            />

                            <InputError className="mt-2" message={errors.fullname} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email (Ex: username@example.com)</Label>

                            <Input
                                id="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                autoComplete="email"
                                placeholder="Email"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone (Ex: 6283456789011)</Label>

                            <Input
                                id="phone"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                autoComplete="phone"
                                placeholder="Phone"
                            />

                            <InputError className="mt-2" message={errors.phone} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="instagram">Instagram (Ex: https://www.instagram.com/username)</Label>

                            <Input
                                id="instagram"
                                className="mt-1 block w-full"
                                value={data.instagram}
                                onChange={(e) => setData('instagram', e.target.value)}
                                autoComplete="instagram"
                                placeholder="Instagram"
                            />

                            <InputError className="mt-2" message={errors.instagram} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="linkedin">LinkedIn (Ex: https://www.linkedin.com/in/username)</Label>

                            <Input
                                id="linkedin"
                                className="mt-1 block w-full"
                                value={data.linkedin}
                                onChange={(e) => setData('linkedin', e.target.value)}
                                autoComplete="linkedin"
                                placeholder="LinkedIn"
                            />

                            <InputError className="mt-2" message={errors.linkedin} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>

                            <Textarea
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
                            <Label htmlFor="photo">Photo</Label>

                            <Input
                                id="photo"
                                className="mt-1 block w-full"
                                autoComplete="photo"
                                placeholder="Photo"
                                // value={data?.thumbnail}
                                onChange={(e) => setData('photo', e?.target?.files?.[0] || '')}
                                type="file"
                            />

                            <InputError className="mt-2" message={errors.photo} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="work">Work</Label>

                            <Input
                                id="work"
                                className="mt-1 block w-full"
                                value={data.work}
                                onChange={(e) => setData('work', e.target.value)}
                                autoComplete="work"
                                placeholder="Work"
                            />

                            <InputError className="mt-2" message={errors.work} />
                        </div>

                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="is_active"
                                name="is_active"
                                checked={data.is_active}
                                onClick={() => setData('is_active', !data.is_active)}
                            />
                            <Label htmlFor="is_active">Is Active</Label>

                            <InputError className="mt-2" message={errors.is_active} />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Link disabled={processing} href={'/admin-about'}>
                            <Button variant="secondary">Back</Button>
                        </Link>

                        <Button disabled={processing}>Save</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
