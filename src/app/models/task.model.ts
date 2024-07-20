export interface Task {
    id?: number;
    title: string;
    description: string;
    inProgress?: boolean;
    done?: boolean;
    data?: string;
}