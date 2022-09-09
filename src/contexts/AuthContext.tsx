import { useState } from "react";
import { createContext, ReactNode, useEffect } from "react";
import {destroyCookie, setCookie, parseCookies} from 'nookies'
import Router from 'next/router'
import { api } from '../service/apiClient'
import {toast} from 'react-toastify'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps)=>Promise<void>;
    signOut: () => void;
    singUp: (credentials: SingUpProps) => Promise<void>
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SingUpProps = {
    name: string;
    email: string;
    password: string;
}
type AuthProviderProps = {
    children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextData)


export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    }catch{
        console.log('erro ao deslogar')
    }
}


export function AuthProvider({children}: AuthProviderProps){

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;


    useEffect(()=>{
        
        //tentar pegar algo no cookie

        const { '@nextauth.token': token } = parseCookies();

        if (token) {
            api.get('/me').then(response =>{
                const {id,name, email, } = response.data;

                setUser({
                    id,
                    name,
                    email
                })
            })
            .catch(()=>{
                //se deu erro deslogamos o user
                signOut();
            })
            
        }

    },[])


    async function signIn({email, password}: SignInProps){
        try{
            const response = await api.post('/session', {
                email, password
            })

            // console.log(response.data)
            const {id, name, token } = response.data

            setCookie(undefined, '@nextauth.token', token,{
                maxAge: 60 * 60 * 24 * 30, // expirar em um mês
                path: '/' // Quais caminhos terao acesso ao cookie
            })

            setUser({
                id,
                name,
                email
            })

            //passar para proximas requisiçoes nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Logado com sucesso!')

            // Redirecionar  o user para /dashboard
            Router.push('/dashboard')

        }catch(err){
            toast.error("Erro ao acessar, verifique o Email/Senha")
            console.log("Erro ao Acessar ", err)
        }
    }

    async function singUp({name, email, password}:SingUpProps) {
        try{
            const response = await api.post('/users',{
                name,
                email, 
                password
            }
            
            )

            toast.success("Cadastro com sucesso!")

            Router.push('/')
        }catch(err){
            toast.error("Erro ao cadastrar!")
            console.log("Erro ao cadastrar: ", err)
        }
    }


    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, singUp}}>
            {children}
        </AuthContext.Provider>
    )
}