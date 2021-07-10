function MetaData({ title, description, setTitle, setDescription }) {
    return <div style={{marginBottom: '20px'}}>
        <h2>Metadata</h2>
        <fieldset style={{marginBottom: '10px'}}>
            <label>Title</label>
            <input type="text" required value={title} onChange={e => setTitle(e.target.value)} />
        </fieldset>
        <fieldset>
            <label>Description</label>
            <textarea required value={description} onChange={e => setDescription(e.target.value)} rows="4" cols="50" />
        </fieldset>
    </div>
}

export default MetaData