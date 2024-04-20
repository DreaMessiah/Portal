import React from "react";

export default function isCorrectLogin(login,password){
    const containsRussianChars = (str) => /[а-яА-ЯЁё]/.test(str);
    if(containsRussianChars(login)) return {err:true,message:'Логин не должен содержать русских символов'}
    if(login.trim().length < 5 || login.trim().length > 12) return {err:true,message:'Логин должен быть не менее 5 и не более 12 символов'}
    if(login===password) return {err:true,message:'Логин и пароль не должны совпадать'}
    return {err:false,message:'Пароли корректны'}
}