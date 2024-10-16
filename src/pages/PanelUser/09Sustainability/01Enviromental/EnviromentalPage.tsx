// import { Link } from 'react-router-dom';
import NavBar from '../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../components/PanelUser/Footer/Footer';
import { FiPlus, FiMinus } from "react-icons/fi";
import styles from './styles.module.css';
import { useState } from 'react';

interface QuestionProps {
    title?: string;
    subTitle?: string;
    subtitleSmall?: string;
    content?: string;
    subQuestions?: QuestionProps[];
}

const questions: QuestionProps[] = [
    {
        title: 'Programa, uso y ahorro eficiente del agua',
        subQuestions: [
            {
                subTitle: 'Ley 373 de 1997',
                subQuestions: [
                    { 
                        subtitleSmall: '¿Pregunta uno de Ley 373 de 1997?',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta dos de Ley 373 de 1997?',
                        content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta tres de Ley 373 de 1997?',
                        content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta cuatro de Ley 373 de 1997?',
                        content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                    },
                    // Nuevas preguntas añadidas a 'Ley 373 de 1997'
                    { 
                        subtitleSmall: '¿Pregunta cinco de Ley 373 de 1997?',
                        content: 'Esta es una nueva pregunta añadida a la sección Ley 373 de 1997.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta seis de Ley 373 de 1997?',
                        content: 'Otra pregunta adicional en la misma sección.'
                    },
                ]
            },
            {
                subTitle: 'Decreto 1076 de 2015',
                subQuestions: [
                    { 
                        subtitleSmall: '¿Pregunta uno de Decreto 1076 de 2015?',
                        content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta dos de Decreto 1076 de 2015?',
                        content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta tres de Decreto 1076 de 2015?',
                        content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta cuatro de Decreto 1076 de 2015?',
                        content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                    },
                    // Nuevas preguntas añadidas a 'Decreto 1076 de 2015'
                    { 
                        subtitleSmall: '¿Pregunta cinco de Decreto 1076 de 2015?',
                        content: 'Añadiendo una nueva pregunta a la sección Decreto 1076 de 2015.'
                    },
                ]
            },
        ],
    },
    // Nueva sección añadida
    {
        title: 'Tema 2',
        subQuestions: [
            {
                subTitle: 'Ley 142 de 1994',
                subQuestions: [
                    { 
                        subtitleSmall: '¿Pregunta uno de Ley 142 de 1994?',
                        content: 'Esta pregunta trata sobre la gestión de residuos sólidos según la Ley 142 de 1994.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta dos de Ley 142 de 1994?',
                        content: 'Contenido adicional sobre la gestión de residuos sólidos.'
                    },
                ]
            },
            {
                subTitle: 'Decreto 596 de 2016',
                subQuestions: [
                    { 
                        subtitleSmall: '¿Pregunta uno de Decreto 596 de 2016?',
                        content: 'Preguntas sobre el Decreto 596 de 2016 relacionadas con la gestión de residuos.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta dos de Decreto 596 de 2016?',
                        content: 'Contenido adicional sobre el Decreto 596 de 2016.'
                    },
                ]
            },
        ]
    },
    {
        title: 'Tema 3',
        subQuestions: [
            {
                subTitle: 'Ley 142 de 1994',
                subQuestions: [
                    { 
                        subtitleSmall: '¿Pregunta uno de Ley 142 de 1994?',
                        content: 'Esta pregunta trata sobre la gestión de residuos sólidos según la Ley 142 de 1994.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta dos de Ley 142 de 1994?',
                        content: 'Contenido adicional sobre la gestión de residuos sólidos.'
                    },
                ]
            },
            {
                subTitle: 'Decreto 596 de 2016',
                subQuestions: [
                    { 
                        subtitleSmall: '¿Pregunta uno de Decreto 596 de 2016?',
                        content: 'Preguntas sobre el Decreto 596 de 2016 relacionadas con la gestión de residuos.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta dos de Decreto 596 de 2016?',
                        content: 'Contenido adicional sobre el Decreto 596 de 2016.'
                    },
                ]
            },
        ]
    },
    {
        title: 'Tema 4',
        subQuestions: [
            {
                subTitle: 'Ley 142 de 1994',
                subQuestions: [
                    { 
                        subtitleSmall: '¿Pregunta uno de Ley 142 de 1994?',
                        content: 'Esta pregunta trata sobre la gestión de residuos sólidos según la Ley 142 de 1994.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta dos de Ley 142 de 1994?',
                        content: 'Contenido adicional sobre la gestión de residuos sólidos.'
                    },
                ]
            },
            {
                subTitle: 'Decreto 596 de 2016',
                subQuestions: [
                    { 
                        subtitleSmall: '¿Pregunta uno de Decreto 596 de 2016?',
                        content: 'Preguntas sobre el Decreto 596 de 2016 relacionadas con la gestión de residuos.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta dos de Decreto 596 de 2016?',
                        content: 'Contenido adicional sobre el Decreto 596 de 2016.'
                    },
                ]
            },
        ]
    },
    {
        title: 'Tema 5',
        subQuestions: [
            {
                subTitle: 'Ley 142 de 1994',
                subQuestions: [
                    { 
                        subtitleSmall: '¿Pregunta uno de Ley 142 de 1994?',
                        content: 'Esta pregunta trata sobre la gestión de residuos sólidos según la Ley 142 de 1994.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta dos de Ley 142 de 1994?',
                        content: 'Contenido adicional sobre la gestión de residuos sólidos.'
                    },
                ]
            },
            {
                subTitle: 'Decreto 596 de 2016',
                subQuestions: [
                    { 
                        subtitleSmall: '¿Pregunta uno de Decreto 596 de 2016?',
                        content: 'Preguntas sobre el Decreto 596 de 2016 relacionadas con la gestión de residuos.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta dos de Decreto 596 de 2016?',
                        content: 'Contenido adicional sobre el Decreto 596 de 2016.'
                    },
                ]
            },
        ]
    },
    {
        title: 'Tema 6',
        subQuestions: [
            {
                subTitle: 'Ley 142 de 1994',
                subQuestions: [
                    { 
                        subtitleSmall: '¿Pregunta uno de Ley 142 de 1994?',
                        content: 'Esta pregunta trata sobre la gestión de residuos sólidos según la Ley 142 de 1994.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta dos de Ley 142 de 1994?',
                        content: 'Contenido adicional sobre la gestión de residuos sólidos.'
                    },
                ]
            },
            {
                subTitle: 'Decreto 596 de 2016',
                subQuestions: [
                    { 
                        subtitleSmall: '¿Pregunta uno de Decreto 596 de 2016?',
                        content: 'Preguntas sobre el Decreto 596 de 2016 relacionadas con la gestión de residuos.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta dos de Decreto 596 de 2016?',
                        content: 'Contenido adicional sobre el Decreto 596 de 2016.'
                    },
                ]
            },
        ]
    },
    {
        title: 'Tema 7',
        subQuestions: [
            {
                subTitle: 'Ley 142 de 1994',
                subQuestions: [
                    { 
                        subtitleSmall: '¿Pregunta uno de Ley 142 de 1994?',
                        content: 'Esta pregunta trata sobre la gestión de residuos sólidos según la Ley 142 de 1994.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta dos de Ley 142 de 1994?',
                        content: 'Contenido adicional sobre la gestión de residuos sólidos.'
                    },
                ]
            },
            {
                subTitle: 'Decreto 596 de 2016',
                subQuestions: [
                    { 
                        subtitleSmall: '¿Pregunta uno de Decreto 596 de 2016?',
                        content: 'Preguntas sobre el Decreto 596 de 2016 relacionadas con la gestión de residuos.'
                    },
                    { 
                        subtitleSmall: '¿Pregunta dos de Decreto 596 de 2016?',
                        content: 'Contenido adicional sobre el Decreto 596 de 2016.'
                    },
                ]
            },
        ]
    }
];

const Question: React.FC<{ question: QuestionProps }> = ({ question }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className={styles.container__Question}>
            <div className={`${styles.question__And_Icon} d-flex align-items-center justify-content-between`}>
                {question.title && <h4>{question.title}</h4>}
                {question.subTitle && <h5 className='pt-0 pb-0 px-2'>{question.subTitle}</h5>}
                {question.subtitleSmall && <h6 className='pt-0 pb-0 px-4'>{question.subtitleSmall}</h6>}
                {showAnswer ? (
                    <FiMinus className={styles.icon__Answer} onClick={() => setShowAnswer(false)} />
                ) : (
                    <FiPlus className={styles.icon__Answer} onClick={() => setShowAnswer(true)} />
                )}
            </div>
            {showAnswer && (
                <div className={styles.subQuestions}>
                    {question.content && <p className='pt-0 pb-0 px-5'>{question.content}</p>}
                    {question.subQuestions && question.subQuestions.map((subQuestion, index) => (
                        <Question key={index} question={subQuestion} />
                    ))}
                </div>
            )}
        </div>
    );
};


function EnviromentalPage() {
    return (
        <div className="d-flex flex-column">
            <NavBar />
            <div className="d-flex">
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <h1>Normas ambientales</h1>
                        {questions.map((question, index) => (
                            <Question key={index} question={question} />
                        ))}
                    </div>
                    
                    <Footer />
                </div>
            </div>
        </div>
    );
}


export default EnviromentalPage;