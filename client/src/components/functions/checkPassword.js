import React from "react";

export default function checkPassword(first,second){
    const containsRussianChars = (str) => /[а-яА-ЯЁё]/.test(str);
    if(first !== second) return {err:true,message:'Пароли не совпадают'}
    if(first.length < 5) return {err:true,message:'Пароль должен быть не меньше 8 символов'}
    if(containsRussianChars(first)) return {err:true,message:'Пароль не должен содержать русских символов'}
    return {err:false,message:'Пароли корректны'}
}