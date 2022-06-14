
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    createdAt: number;
    status: string;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Esta es mi pendiente',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'Esta es mi pendiente',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'Esta es mi pendiente',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'Esta esta en proceso',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Esta esta en proceso',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Esta tarea esta finalizada',
            status: 'completed',
            createdAt: Date.now() -100000,
        },
    ],
}