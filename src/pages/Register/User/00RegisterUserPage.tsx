/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';
import { postRegisterClient } from '../../../redux/User/userSlice/actions';
import { clearUserErrors } from '../../../redux/User/userSlice/userSlice';
//ELEMENTOS DEL COMPONENTE
import { IUser } from "../../../types/User/user.types";
import Loading from '../../../components/GeneralComponents/Loading/Loading';
import UserInformationPage from './01UserInformationPage';
import EconomicActivityPage from './02EconomicActivityPage';
import LocalizarionPage from './03LocalizarionPage';
import UserCredentialsPage from './04UserCredentialsPage';
import Logo from '../../../assets/LogoEcopcion.svg';
import { PiWarningCircle } from 'react-icons/pi';
import styles from './styles.module.css';

enum RegistrationStep {
    UserInformationPage,
    EconomicActivityPage,
    LocalizarionPage,
    UserCredentialsPage,
}

function RegisterUserPagePage() {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const errorUser = useSelector((state: RootState) => state.user.errorUser);
    const loading = useSelector((state: RootState) => state.user.loading);

    const [currentStep, setCurrentStep] = useState(RegistrationStep.UserInformationPage);
    const {register, formState: { errors }, handleSubmit} = useForm<IUser>();
    
    useEffect(() => {
        dispatch(clearUserErrors());
        if (isAuthenticated) navigate("/home");
    }, [ isAuthenticated ]);

    const [ selectedDepartment, setSelectedDepartment ] = useState('');
    const [ selectedCity, setSelectedCity ] = useState('');
    const [ selectedCodeDane, setSelectedCodeDane ] = useState('');
    const [ selectedSubregionCodeDane, setSelectedSubregionCodeDane ] = useState('');
    const [ resetDepartmenAndCity, setResetDepartmenAndCity ] = useState(false);
    const handleSelectDepartmentCity = (department: string, city: string, codeDane: string, subregionCodeDane: string) => {
        setSelectedDepartment(department);
        setSelectedCity(city);
        setSelectedCodeDane(codeDane);
        setSelectedSubregionCodeDane(subregionCodeDane);
    };

    const [ codeCiiu, setCodeCiiu ] = useState('');
    const handleSelectCodeCiiu = (codeCiiu: string) => {
        setCodeCiiu(codeCiiu);
    };  

    const onSubmit: SubmitHandler<IUser> = async (values) => {
        const registerData = {
            ...values,
            userType: "User",
            typeRole: "Superadmin",
            department: selectedDepartment,
            city: selectedCity,
            codeDane: selectedCodeDane,
            subregionCodeDane: selectedSubregionCodeDane,
            codeCiiu: codeCiiu,
            // corporateName: null,
        } as IUser;
        switch (currentStep) {
            case RegistrationStep.UserInformationPage:
                break;
            case RegistrationStep.EconomicActivityPage:
                break;
            case RegistrationStep.LocalizarionPage:
                break;
            case RegistrationStep.UserCredentialsPage:
                dispatch(postRegisterClient(registerData));
                break;
            default:
                break;
        }
        if (currentStep !== RegistrationStep.UserCredentialsPage) setCurrentStep(currentStep + 1);
        setTimeout(() => {
            setResetDepartmenAndCity(true);
            setTimeout(() => {
                setResetDepartmenAndCity(false);
            }, 10);
        }, 1500);
    };

    const handleBack = () => {
        if (currentStep !== RegistrationStep.UserInformationPage) setCurrentStep(currentStep - 1);
    };

    return (
        <div className={`${styles.container} d-flex align-items-center justify-content-center vh-100`}>
            <div className={`${styles.container__Register_User} d-flex flex-column align-items-center justify-content-center vh-100`}>
                <div className={`${styles.register__User} `}>
                    <div className='d-flex align-items-center justify-content-center'>
                        <Link to="https://ecopcion.com/" >
                            <img src={Logo} alt="Ecopcion" className={`${styles.logo} mb-3`} />
                        </Link>
                    </div>

                    <div className={`${styles.container__Form} position-relative`}>
                        {errorUser && (
                            <div className={`${styles.errors__Register} p-2 text-center position-absolute w-100`}>
                                <p className='m-0'><PiWarningCircle /> {errorUser}</p>
                            </div>
                        )}
                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} `}>
                            {currentStep === RegistrationStep.UserInformationPage && (
                                <UserInformationPage
                                    register={register} errors={errors}
                                />
                            )}
                            {currentStep === RegistrationStep.EconomicActivityPage && (
                                <EconomicActivityPage
                                    register={register} errors={errors}
                                    onSelect={handleSelectCodeCiiu}
                                />
                            )}
                            {currentStep === RegistrationStep.LocalizarionPage && (
                                <LocalizarionPage
                                    register={register}
                                    errors={errors}
                                    onSelect={handleSelectDepartmentCity}
                                    reset={resetDepartmenAndCity}
                                />
                            )}
                            {currentStep === RegistrationStep.UserCredentialsPage && (
                                <UserCredentialsPage
                                    register={register} errors={errors}
                                />
                            )}

                            <div className={`${styles.container__Buttons} m-auto d-flex align-items-center justify-content-center`}>
                                {currentStep !== RegistrationStep.UserInformationPage && (
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className={`${styles.button__Back} border-0 rounded text-decoration-none`}
                                    >
                                        Atrás
                                    </button>
                                )}
                                <button
                                    type='submit'
                                    className={`${styles.button__Submit} border-0 rounded text-decoration-none`}
                                >
                                    {currentStep === RegistrationStep.UserCredentialsPage ? 'Enviar' : 'Siguiente'}
                                </button>
                            </div>
                        </form>

                        <p className='mt-3 mb-3 text-center'>
                            ¿Ya tienes una cuenta? <Link to="/login" className={`${styles.link} text-decoration-none text-sky-500`}>Sign In</Link>
                        </p>

                        <div className={`${styles.container__Loading} d-flex align-items-center justify-content-center position-absolute`}>
                            {loading && (
                                <Loading />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterUserPagePage;