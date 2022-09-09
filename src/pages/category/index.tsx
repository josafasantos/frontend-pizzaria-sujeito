import Head from "next/head"
import Header from "../../components/Header"
import styles from './styles.module.scss'

import { FormEvent, useState } from "react";


import setupAPIClient from "../../service/api";
import { toast } from "react-toastify";

import { canSSRAtuh } from "../../utils/canSSRAuth";


export default function Category() {
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleRegister(event: FormEvent){
        event.preventDefault();

        if (category === '') {
            return
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category',{
            name: category
        })
        
        toast.success('Categoria Cadastrada com sucesso!')
        setCategory('')
    }

  return (
    <>
        <Head>
            <title>Nova Categoria - Sujeito Pizza</title>
        </Head>
        <div>
            <Header/>
            <main className={styles.container}>
                <h1>Cadastrar categorias</h1>
                <form onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="Digite o nome da categoria"
                        className={styles.input}
                        value={category}
                        onChange={ (e)=>setCategory(e.target.value)}
                    />
                    <button
                        type="submit"    
                    >Cadastrar</button>
                </form>
            </main>
        </div>
    </>
  )
}


export const getServerSideProps = canSSRAtuh(async (ctx)=>{
    return{
        props:{}
    }
})