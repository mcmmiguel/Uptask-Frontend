import { deleteNote } from "@/api/NoteAPI";
import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type NoteDetailProps = {
    note: Note;
}

export const NoteDetail = ({ note }: NoteDetailProps) => {

    const { data, isLoading } = useAuth();

    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('viewTask')!;

    const params = useParams();
    const projectId = params.projectId!;

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({
                queryKey: ['task', taskId],
            })
        }
    });

    if (isLoading) return 'Cargando...';

    if (data) return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>{note.content} por:
                    <span className="font-bold"> {note.createdBy.name}</span>
                </p>
                <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
            </div>

            {canDelete && (
                <button
                    onClick={() => mutate({ projectId, taskId, noteId: note._id })}
                    type="button"
                    className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors">
                    Eliminar
                </button>
            )}
        </div>

    )
}