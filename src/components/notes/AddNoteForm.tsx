import { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";

export const AddNoteForm = () => {

    const initialValues: NoteFormData = {
        content: '',
    };

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const handleAddNote = (formData: NoteFormData) => {
        console.log(formData);
    }

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