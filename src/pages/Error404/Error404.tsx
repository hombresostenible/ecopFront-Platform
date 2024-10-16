import Error_404 from '../../assets/Error-404.svg';
import styles from './styles.module.css';



function Error404() {
    return (
        <div className='d-flex'>
            <div className={styles.container}>
                <div className='p-4'>
                    <img src={Error_404} alt="Error 404" />
                    <h1 className='display-1'>¡Ups!</h1>
                    <p className='lead'>No hemos podido encontrar la página que buscas</p>
                </div>
            </div>
        </div>
    );
}

export default Error404;
