import api from '../../../services/api';
import { objectToFormData } from '../../../utils/formData';
import type { User } from '../types';

export async function createUser(user: User): Promise<User> {
    const formData = objectToFormData(user);

    try {
        const response = await api.post<User>('/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error: any) {
        const message =
            error.response?.data?.message ||
            error.message ||
            'Error creating user';
        throw new Error(message);
    }
}
