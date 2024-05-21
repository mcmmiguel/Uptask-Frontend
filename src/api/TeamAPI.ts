import { isAxiosError } from "axios";
import { Project, TeamMemberForm } from "../types";
import api from "@/lib/axios";


export async function findUserByEmail({ projectId, formData }: { projectId: Project['_id'], formData: TeamMemberForm }) {
    try {
        const url = `/projects/${projectId}/team/find`;
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.error);
        }
    }
}