function Form({ value, staticAttributs, onBlur, onChange, onClick, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <textarea id={staticAttributs.id} name={staticAttributs.name} className={staticAttributs.className} style={{ height: staticAttributs.styles.height }} placeholder={staticAttributs.placeholder} value={value} onChange={onChange} onBlur={onBlur} autoFocus />
            <div style={{ marginLeft: '34px', marginBottom: staticAttributs.styles.marginBottom }}>
                <button type="submit" style={{ marginRight: '10px' }} className="enable">Save</button>
                <button type="reset" onClick={onClick} className="disable">Cancel</button>
            </div>
        </form>
    );
}

export default Form;
