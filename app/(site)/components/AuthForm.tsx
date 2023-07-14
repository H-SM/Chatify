'use client';

import Button from "@/app/components/Button";
import  Input  from "@/app/components/inputs/input";
import AuthSocialButton from './AuthSocialButton';
import { BsGithub , BsGoogle } from 'react-icons/bs';
import { useCallback, useState } from "react";
import { FieldValues , useForm , SubmitHandler} from "react-hook-form";
import axios from "axios";
type Varient = 'LOGIN' | 'REGISTER';
//client based structure compo rather than a server based, has buttons, fields, more like a react compo, rather then a static html maker for a bot
// npm install react-icons react-hook-form clsx
const AuthForm = () =>{
    const [variant, setVariant]=useState<Varient>('LOGIN');
    const [isLoading, setIsLoading]=useState(false);
    
    const toggleVarient = useCallback(() =>{
        if(variant === 'LOGIN'){
            setVariant("REGISTER");
        }else{
            setVariant("LOGIN");
        }
    },[variant]);

    //REACT HOOK FORM FUNCTION 
    const {
        register, 
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name :"",
            email:"",
            password:"",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> =(data) =>{
        setIsLoading(true);

        //here will come the prisma connection with the mongo db 
        if(variant === 'REGISTER'){
            axios.post('/api/register',data);
        }
        if(variant === 'LOGIN'){
            //nextAuth signIN
        }
    };

    const socialAction = (action : string)=>{
        setIsLoading(true);

        //nextAuth Social sign-in
    }
    return (
        <div className="
            mt-8
            sm:mx-auto
            sm:w-full
            sm:max-w-md
        ">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className="
                    space-y-6    
                " onSubmit={handleSubmit(onSubmit)}>
                    { variant === "REGISTER" && (
                    <Input 
                        id="name" 
                        label="Name" 
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    )}
                    <Input 
                            id="email" 
                            label="Email Address" 
                            type="email"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                    />
                    <Input 
                            id="password" 
                            label="Password" 
                            type="password"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >{variant === "LOGIN" ? "Log-in" : "Register"}</Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative"> 
                    {/* 50 */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"/>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton 
                        icon={BsGithub}
                        onClick={() => socialAction('github')}
                        />
                        
                        <AuthSocialButton 
                        icon={BsGoogle}
                        onClick={() => socialAction('google')}
                        />
                    </div>
                </div>

                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === 'LOGIN' ? "New to Messenger?" : "Already have an account?"}
                    </div>
                    <div onClick={toggleVarient} className="underline cursor-pointer">
                        {variant === 'LOGIN' ? "Create an account" : "Log-in"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthForm