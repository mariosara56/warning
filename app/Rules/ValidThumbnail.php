<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Http\UploadedFile;

class ValidThumbnail implements Rule
{
    public function passes($attribute, $value): bool
    {
        return is_null($value) || is_string($value) || $value instanceof UploadedFile;
    }

    public function message(): string
    {
        return 'The :attribute must be a file or a valid string path.';
    }
}

