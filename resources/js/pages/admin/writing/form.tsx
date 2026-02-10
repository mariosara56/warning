import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import WysiwygEditor from '@/components/wysiwyg-editor';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Writing } from '@/types';
import { Input } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Writing Form',
        href: '/admin-writing',
    },
];

type WritingForm = {
    thumbnail: File | string;
    title: string;
    teaser: string;
    body: string;
    author: string;
};

export default function WritingForm() {
    const { writing } = usePage<{ writing: Writing }>().props;
    const isEditMode = !!writing;

    const { data, setData, post, errors, processing, reset } = useForm<Required<WritingForm>>({
        thumbnail: writing?.thumbnail || '',
        title: writing?.title || '',
        teaser: writing?.teaser || '',
        body: writing?.body || '',
        author: writing?.author || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEditMode) {
            post(route('admin.writing.update', writing.id), {
                onSuccess: () => reset('thumbnail', 'title', 'body', 'author'),
            });
        } else {
            post(route('admin.writing.store'), {
                onSuccess: () => reset('thumbnail', 'title', 'body', 'author'),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Writing Form" />
            <div className="p-4">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 space-y-6 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="thumbnail">Thumbnail</Label>

                            <Input
                                id="thumbnail"
                                className="mt-1 block w-full"
                                autoComplete="thumbnail"
                                placeholder="Thumbnail"
                                onChange={(e) => setData('thumbnail', e?.target?.files?.[0] || '')}
                                type="file"
                            />

                            <InputError className="mt-2" message={errors.thumbnail} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="author">Author</Label>

                            <Input
                                id="author"
                                className="mt-1 block w-full"
                                autoComplete="author"
                                placeholder="Author"
                                value={data.author}
                                onChange={(e) => setData('author', e.target.value)}
                            />

                            <InputError className="mt-2" message={errors.author} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>

                            <Input
                                id="title"
                                className="mt-1 block w-full"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                autoComplete="title"
                                placeholder="Title"
                            />

                            <InputError className="mt-2" message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="teaser">Teaser</Label>

                            <Input
                                id="teaser"
                                className="mt-1 block w-full"
                                autoComplete="teaser"
                                placeholder="Teaser"
                                value={data.teaser}
                                onChange={(e) => setData('teaser', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.teaser} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="body">Body</Label>

                            <WysiwygEditor value={data.body} onChange={(e) => setData('body', e.target.value)} />

                            <InputError className="mt-2" message={errors.body} />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Link disabled={processing} href={'/admin-writing'}>
                            <Button variant="secondary">Back</Button>
                        </Link>

                        <Button disabled={processing}>Save</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
