import { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "@/api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

export const AddNoteForm = () => {

    const initialValues: NoteFormData = {
        content: '',
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const params = useParams();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const projectId = params.projectId!;
    const taskId = queryParams.get('viewTask')!;

    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
        }
    })

    const handleAddNote = (formData: NoteFormData) => mutate({ formData, projectId, taskId });

    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            className="space-y-3"
            noValidate
        >
            <div className="felx flex-col">
                <label className="font-bold" htmlFor="content">Crear nota</label>
                <input
                    id="content"
                    type="text"
                    placeholder="Contenido de la nota"
                    className="w-full p-3 border border-gray-300"
                    {...register('content', {
                        required: 'El contenido de la nota es obligatorio'
                    })}
                />
                {errors.content && (
                    <ErrorMessage children={errors.content.message} />
                )}
            </div>

            <input
                type="submit"
                value={'Crear nota'}
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
            />
        </form>
    )
}