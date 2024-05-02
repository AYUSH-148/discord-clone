import { Profile } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// General
export function isNullish<T>(
  value: T | null | undefined,
): value is null | undefined {
  return value == null;
}

export function isNonNullish<T>(
  value: T | null | undefined,
): value is NonNullable<T> {
  return value != null;
}

export function hasLength(value: string | unknown[]) {
  return value.length > 0;
}

// Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// API
export function isRequestRouteParamDefined(param: string) {
  return hasLength(param);
}

export function isRequestSearchParamDefined(
  searchParam: string | null,
): searchParam is string {
  return isNonNullish(searchParam) && hasLength(searchParam);
}

export function isProfileDefined(profile: Profile | null): profile is Profile {
  return isNonNullish(profile);
}
