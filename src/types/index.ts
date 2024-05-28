import { z } from 'zod';

// Auth & Users
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string(),
});

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>;
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>;
export type ForgotPasswordForm = Pick<Auth, 'email'>;
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>;
export type UpdateCurrentUserPasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>;

// Users
export const userSchema = authSchema.pick({
    name: true,
    email: true,
}).extend({
    _id: z.string(),
});
export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, 'name' | 'email'>;

// Notes
const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string(),
    createdAt: z.string(),
});

export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'content'>;

export type ConfirmToken = Pick<Auth, 'token'>;

// Tasks
export const TaskStatusSchema = z.enum(["pending", "hold", "inProgress", "underReview", "completed"]);

export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    project: z.string(),
    description: z.string(),
    status: TaskStatusSchema,
    notes: z.array(noteSchema.extend({
        createdBy: userSchema,
    })),
    completedBy: z.array(z.object({
        _id: z.string(),
        user: userSchema,
        status: TaskStatusSchema,
    })),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;

export type TaskFormData = Pick<Task, 'name' | 'description'>;

// Projects
export const ProjectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(userSchema.pick({ _id: true })),
});

export const DashboardProjectSchema = z.array(
    ProjectSchema.pick({
        _id: true,
        clientName: true,
        projectName: true,
        description: true,
        manager: true,
    })
);

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>;

// Team
export const teamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true,
});
export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;