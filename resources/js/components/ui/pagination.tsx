import { Button } from '@headlessui/react';
import { router } from '@inertiajs/react';

type PaginationProps = {
    currentPage: number;
    lastPage: number;
    nextPageUrl: string | null;
    prevPageUrl: string | null;
};

export default function Pagination({ currentPage, lastPage, nextPageUrl, prevPageUrl }: PaginationProps) {
    return (
        <div className="my-2 flex items-center justify-center">
            <div className="flex items-center space-x-2 rounded-lg bg-white p-2 shadow-sm dark:bg-zinc-900">
                <Button
                    onClick={() => prevPageUrl && router.visit(prevPageUrl)}
                    disabled={!prevPageUrl}
                    className={`rounded px-4 py-2 text-sm font-medium transition ${
                        prevPageUrl ? 'hover:bg-gray-100 dark:hover:bg-zinc-800' : 'cursor-not-allowed opacity-50'
                    }`}
                >
                    <span>Previous</span>
                </Button>

                <div className="flex items-center px-2">
                    {Array.from({ length: lastPage }, (_, i) => i + 1).map((pageNumber) => {
                        const showPageNumber =
                            pageNumber === 1 ||
                            pageNumber === lastPage ||
                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

                        const showLeftEllipsis = pageNumber === 2 && currentPage > 3;
                        const showRightEllipsis = pageNumber === lastPage - 1 && currentPage < lastPage - 2;

                        if (showLeftEllipsis || showRightEllipsis) {
                            return (
                                <span key={`ellipsis-${pageNumber}`} className="text-sm font-medium dark:text-gray-300">
                                    ...
                                </span>
                            );
                        }

                        if (showPageNumber) {
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => router.visit(`?page=${pageNumber}`)}
                                    className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition ${
                                        pageNumber === currentPage
                                            ? 'bg-primary text-white dark:text-gray-800'
                                            : 'hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        }

                        return null;
                    })}
                </div>

                <Button
                    onClick={() => nextPageUrl && router.visit(nextPageUrl)}
                    disabled={!nextPageUrl}
                    className={`rounded px-4 py-2 text-sm font-medium transition ${
                        nextPageUrl ? 'hover:bg-gray-100 dark:hover:bg-zinc-800' : 'cursor-not-allowed opacity-50'
                    }`}
                >
                    <span>Next</span>
                </Button>
            </div>
        </div>
    );
}
