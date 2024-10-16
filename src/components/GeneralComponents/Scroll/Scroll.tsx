import { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import styles from './styles.module.css';

export default function Scroll () {
    const [ backToTopButton, setBackToTopButton ] = useState(false);
    useEffect (() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 100) {
                setBackToTopButton(true)
            } else {
                setBackToTopButton(false)
            }
        })
    }, []);

    const scrollUp = () => {
        window.scroll({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            {backToTopButton && (
                <button className={`${styles.boton__Scroll} d-flex align-items-center justify-content-center position-fixed border-0`} onClick={scrollUp}><IoIosArrowUp /></button>
            )}
        </div>
    );
}