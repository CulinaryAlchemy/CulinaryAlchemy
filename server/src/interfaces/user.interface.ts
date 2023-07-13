export interface UserInterface{
    username: string;
    name?: string;
    password: string;
    email: string;
    avatar: string;
    location?: string;
    dietaryPreferences?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    isDeleted: boolean;
}