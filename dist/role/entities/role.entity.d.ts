import { User } from "src/user/entities/user.entity";
export declare class Role {
    id: number;
    name: string;
    isActive: boolean;
    users: User[];
    createdAt: Date;
    updatedAt: Date;
}
