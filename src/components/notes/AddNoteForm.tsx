export const AddNoteForm = () => {
    return (
        <form
            onSubmit={() => { }}
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
                />
            </div>

            <input
                type="submit"
                value={'Crear nota'}
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
            />
        </form>
    )
}