import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import WysiwygEditor from '@/components/wysiwyg-editor';
import AppLayout from '@/layouts/app-layout';
import { Quote, type BreadcrumbItem } from '@/types';
import { Input } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quote Form',
        href: '/admin-quote',
    },
];

type QuoteForm = {
    author: string;
    quote: string;
    is_active: boolean;
};

export default function QuoteForm() {
    const { quote } = usePage<{ quote: Quote }>().props;
    const isEditMode = !!quote;

    const { data, setData, post, errors, processing, reset } = useForm<Required<QuoteForm>>({
        author: quote?.author || '',
        quote: quote?.quote || '',
        is_active: quote?.is_active || false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditMode) {
            post(route('admin.quote.update', quote.id), {
                onFinish: () => reset('author', 'quote', 'is_active'),
            });
        } else {
            post(route('admin.quote.store'), {
                onFinish: () => reset('author', 'quote', 'is_active'),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quote Form" />
            <div className="p-4">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 space-y-6 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="author">Author</Label>

                            <Input
                                id="author"
                                className="mt-1 block w-full"
                                value={data.author}
                                onChange={(e) => setData('author', e.target.value)}
                                required
                                autoComplete="author"
                                placeholder="Author"
                            />

                            <InputError className="mt-2" message={errors.author} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="quote">Quote</Label>

                            <WysiwygEditor value={data.quote} onChange={(e) => setData('quote', e.target.value)} />

                            <InputError className="mt-2" message={errors.quote} />
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
                        <Link disabled={processing} href={'/admin-quote'}>
                            <Button variant="secondary">Back</Button>
                        </Link>

                        <Button disabled={processing}>Save</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
