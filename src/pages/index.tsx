import { useContext, FormEvent } from "react";
import Head from "../../node_modules/next/head"
import Image from "../../node_modules/next/image"
import styles from "../../styles/home.module.scss"

import LogoImg from '../../public/logo.svg';

import {Input} from '../components/ui/Input';
import {Button} from '../components/ui/Button';

import { AuthContext } from "../contexts/AuthContext";
import {toast} from 'react-toastify'

import Link from "next/link";
import { useState } from "react";


import { canSSRGuest } from "../utils/canSSRGuest";

export default function Home() {

  const {signIn} = useContext(AuthContext)


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)


  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if (email === '' || password === '') {
      toast.error("Preencha os dados")
      return;
    }

    setLoading(true)

    let data = {
      email:email,
      password: password
    }

    await signIn(data)

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={LogoImg} alt="Logo Sujeito Pizzaria"/>

      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input placeholder='Digite seu email' value={email} onChange={(e)=>setEmail(e.target.value)}type='email'/>
          <Input placeholder='Digite sua senha' value={password} onChange={(e)=>setPassword(e.target.value)} type='password'/>
          <Button type="submit" loading={loading}>Acessar</Button>
          
        </form>
        <Link href="/signup">
          <a className={styles.text}>Não possui uma conta? Cadastra-se</a>
        </Link>
      </div>
      </div>
    </>
  )
}


export const getServerSideProps  = canSSRGuest(async ()=>{
  return{
    props:{}
  }
})