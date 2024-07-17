export interface Toast {
    message: string;
    type: 'error' | 'success' | 'info';
    erro?: string;
    status?: number;
}