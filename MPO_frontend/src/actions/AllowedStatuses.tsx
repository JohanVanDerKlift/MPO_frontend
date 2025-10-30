export default function getAllowedStatuses(roles: string[]): number[] {
    if (!roles) return [];

    if (roles.includes('Admin')) return [0, 1, 2, 3, 4, 5]; // all statuses

    const allowed: number[] = [];
    if (roles.includes('Production')) allowed.push(0, 1); // Planning, Production
    if (roles.includes('Testing')) allowed.push(2);
    if (roles.includes('Controller')) allowed.push(2);
    if (roles.includes('Packing')) allowed.push(3);
    if (roles.includes('Manager')) allowed.push(0, 1, 2, 3, 4);
    return allowed;
}
