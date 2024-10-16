function Loading() {

    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className="text-center">
                <div className="spinner-border spinner-border-lg text-primary" role="status">
                    <span className="sr-only" ></span>
                </div>
                <p className="text-primary">Cargando...</p>
            </div>
        </div>
    );
}

export default Loading;