import { cn } from '@/lib/utils';
import React from 'react';
import Editor, { ContentEditableEvent } from 'react-simple-wysiwyg';

interface WysiwygEditorProps {
    value: string;
    onChange: (event: ContentEditableEvent) => void;
    className?: string;
}

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({ value, onChange, className }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            // Sisipkan indentasi HTML (misalnya 4 spasi)
            document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
        }
    };

    return <Editor onKeyDown={handleKeyDown} value={value} onChange={onChange} className={cn('mx-6 my-2', className)} />;
};

export default WysiwygEditor;
