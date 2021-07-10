function MetaData({ title, description, setTitle, setDescription }) {
    return <div>
        <h2>Meta dados</h2>
        <fieldset>
            <label>Título</label>
            <input type="text" required value={title} onChange={e => setTitle(e.target.value)} />
        </fieldset>
        <fieldset>
            <label>Descrição</label>
            <textarea required value={description} onChange={e => setDescription(e.target.value)} rows="4" cols="50" />
        </fieldset>
    </div>
}

export default MetaData