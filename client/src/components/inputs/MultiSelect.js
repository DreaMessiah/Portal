import React from 'react';

import Select from 'react-select';

export default function MultiSelect({values=[],options,setOptions,disable = false,empty=false,heigth='auto',radius='10px',placeholder='Выберете людей...'}){
 return (
     <>
         <Select
             isMulti
             onChange={(e) => setOptions(e)}
             value={values}
             options={options}
             placeholder={placeholder}
             className={`basic-multi-select ${empty && 'red-solid-select-border'} ${disable && 'disable-select'}`}
             classNamePrefix="select"
             isDisabled={disable}
             styles={{
                 option: (baseStyles, state) => ({
                     ...baseStyles,
                     color: 'rgba(33, 33, 33, 1)',
                     backgroundColor: 'rgba(255, 255, 255, 1)',
                     fontFamily:'Montserrat, sans-serif',
                     textTransform:'uppercase',
                     fontSize:'0.7rem',
                     fontWeight:'600',
                 }),
                 indicatorsContainer:(baseStyles, state) => ({
                     display:'none',
                 }),
                 control: (baseStyles, state) => ({
                     ...baseStyles,
                     height:heigth,
                     backgroundColor: 'rgba(255, 255, 255, 1)',
                     borderWidth:'3px',
                     borderStyle:'dotted',
                     borderRadius:radius,
                     borderColor:'rgba(180, 180, 180, 1)',
                     width:'100%',
                     marginBottom:'10px',
                     outline: 'none',
                     appearance:'none',
                     div: {
                         fontFamily:'Montserrat, sans-serif',
                         textTransform:'uppercase',
                         fontSize:'0.7rem',
                         fontWeight:'600',
                         color: 'rgba(180, 180, 180, 1) !important', // Устанавливаем цвет текста внутри input
                     },
                     ':hover': {
                         borderColor:'rgba(180, 180, 180, 1)',  // Замените цветом, который вы хотите видеть при наведении
                     },
                     ':focus-within': {
                         color:'rgba(180, 180, 180, 1)',
                         outline: 'none',
                         boxShadow: 'none',
                     }
                 }),
             }}
         />

     </>

 )
}