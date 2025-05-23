import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface About {
    id: number;
    fullname?: string;
    email?: string;
    phone?: string;
    instagram?: string;
    linkedin?: string;
    description?: string;
    photo?: File | string;
    work?: string;
    is_active?: boolean;
    [key: string]: unknown;
}

export interface Gallery {
    id: number;
    thumbnail: File | string;
    title: string;
    description?: string;
    [key: string]: unknown;
}

export interface Writing {
    id: number;
    thumbnail?: File | string;
    title: string;
    slug: string;
    teaser: string;
    body: string;
    meta_title?: string;
    meta_description?: string;
    author?: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Quote {
    id: number;
    author: string;
    quote: string;
    is_active: boolean;
    [key: string]: unknown;
}

export interface Expertise {
    id: number;
    skill_id: number;
    user_id: number;
    level: string;
    years_of_experience?: number;
    certified: boolean;
    notes: string;
    skill?: Skill;
    [key: string]: unknown;
}

export interface ExperienceEducation {
    id: number;
    type: string;
    title: string;
    company_institution: string;
    location: string;
    start_date: string;
    end_date: string;
    description: string;
    achievements_or_grade: string;
    skill_id: number;
    skill?: Skill;
    [key: string]: unknown;
}

export interface Skill {
    id: number;
    name: string;
    category: string;
    type: string;
    [key: string]: unknown;
}
