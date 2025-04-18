import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import WysiwygEditor from '@/components/wysiwyg-editor';
import AppLayout from '@/layouts/app-layout';
import { Gallery, type BreadcrumbItem } from '@/types';
import { Input } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gallery Form',
        href: '/admin-gallery',
    },
];

type GalleryForm = {
    thumbnail: File | string;
    title: string;
    description: string;
};

export default function GalleryForm() {
    const { gallery } = usePage<{ gallery: Gallery }>().props;
    const isEditMode = !!gallery;

    const { data, setData, post, errors, processing, reset } = useForm<Required<GalleryForm>>({
        thumbnail: gallery?.thumbnail || '',
        title: gallery?.title || '',
        description: gallery?.description || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditMode) {
            post(route('admin.gallery.update', gallery.id), {
                onFinish: () => reset('thumbnail', 'title', 'description'),
            });
        } else {
            post(route('admin.gallery.store'), {
                onFinish: () => reset('thumbnail', 'title', 'description'),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gallery Form" />
            <div className="p-4">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 space-y-6 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="thumbnail">Thumbnail</Label>

                            <Input
                                id="thumbnail"
                                className="mt-1 block w-full"
                                required
                                autoComplete="thumbnail"
                                placeholder="Thumbnail"
                                // value={data?.thumbnail}
                                onChange={(e) => setData('thumbnail', e?.target?.files?.[0] || '')}
                                type="file"
                            />

                            <InputError className="mt-2" message={errors.thumbnail} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>

                            <Input
                                id="title"
                                className="mt-1 block w-full"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                                autoComplete="title"
                                placeholder="Title"
                            />

                            <InputError className="mt-2" message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>

                            <WysiwygEditor value={data.description} onChange={(e) => setData('description', e.target.value)} />

                            <InputError className="mt-2" message={errors.description} />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Link disabled={processing} href={'/admin-gallery'} prefetch>
                            <Button variant="secondary">Back</Button>
                        </Link>

                        <Button disabled={processing}>Save</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
