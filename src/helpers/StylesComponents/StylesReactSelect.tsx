/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */

export const StylesReactSelect = {
    control: (provided: any, state: any) => ({
      ...provided,
      width: '100%',
      backgroundColor: 'white',
      borderColor: state.isFocused ? '#718bd8' : 'rgba(0, 0, 0, 0.2)',
      boxShadow: state.isFocused ? '0 0 0 1px #718bd8' : null,
      '&:hover': {
        borderColor: state.isFocused ? '#718bd8' : 'rgba(0, 0, 0, 0.2)',
      },
      padding: '3px',
      borderRadius: '5px',
    }),
    menu: (provided: any) => ({
      ...provided,
      width: '100%', // Asegura que el menú de opciones también ocupe el ancho completo
    }),
  };

export const StylesReactSelectItems = {
    control: (provided: any, state: any) => ({
        ...provided,
        height: 50,
        width: '100%',
        // width: 250,
        backgroundColor: 'white',
        borderColor: state.isFocused ? '#718bd8' : 'rgba(0, 0, 0, 0.2)',
        boxShadow: state.isFocused ? '0 0 0 1px #718bd8' : null,
        '&:hover': {
            borderColor: state.isFocused ? '#718bd8' : 'rgba(0, 0, 0, 0.2)'
        },
        padding: '5px',
    }),
};