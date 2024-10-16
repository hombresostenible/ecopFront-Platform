import NavBar from '../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../components/PanelUser/Footer/Footer';
import Panel from '../../../components/PanelUser/01Home/Panel';
import styles from './styles.module.css';

function HomePage() {

    return (
        <div className={`${styles.container__General} d-flex flex-column`}>
            <NavBar />
            <div className={`${styles.container} d-flex`}>
                <SideBar />
                <div className={`${styles.container__Component} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.component} overflow-hidden overflow-y-auto`}>
                        <Panel />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default HomePage;