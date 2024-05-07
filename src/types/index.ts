import { z } from 'zod';

// Projects
export const ProjectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
});

export const DashboardProjectSchema = z.array(
    ProjectSchema.pick({
        _id: true,
        clientName: true,
        projectName: true,
        description: true,
    })
);

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>;
