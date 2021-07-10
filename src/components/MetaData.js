function MetaData({ title, description, setTitle, setDescription }) {
    return <div className="section">
        <div className="section-title">Metadata</div>
        <fieldset>
            <div className="form-group">
                <label>Title</label>
                <input className="w-100" type="text" required value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea className="w-100" required value={description} onChange={e => setDescription(e.target.value)} />
            </div>
        </fieldset>
    </div>
}

export default MetaData