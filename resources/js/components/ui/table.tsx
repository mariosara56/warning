type Column<T> = {
    header: string;
    accessor: keyof T | ((item: T, index: number) => React.ReactNode);
    className?: string;
};

type TableProps<T> = {
    data: T[];
    columns: Column<T>[];
    renderActions?: (item: T, index: number) => React.ReactNode;
};

export default function Table<T>({ data, columns, renderActions }: TableProps<T>) {
    return (
        <div className="relative shadow-md sm:rounded-lg">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i} className={`px-6 py-3 ${col.className ?? ''}`}>
                                    {col.header}
                                </th>
                            ))}
                            {renderActions && <th className="text-center px-6 py-3">Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-700"
                            >
                                {columns.map((col, i) => {
                                    const value =
                                        typeof col.accessor === 'function'
                                            ? col.accessor(item, index)
                                            : (item as any)[col.accessor];

                                    return (
                                        <td key={i} className={`px-6 py-4 ${col.className ?? ''}`}>
                                            {value ?? '-'}
                                        </td>
                                    );
                                })}
                                {renderActions && (
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                        {renderActions(item, index)}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
