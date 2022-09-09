import Head from "next/head"
import Image from "next/image"
import styles from "../../../styles/home.module.scss"
import { FormEvent, useState, useContext } from "react";

import LogoImg from '../../../public/logo.svg';

import {Input} from '../../components/ui/Input';
import {Button} from '../../components/ui/Button';

import { AuthContext} from '../../contexts/AuthContext'
import {toast} from 'react-toastify'


import Link from "next/link";

export default function Home() {
  const {singUp} = useContext(AuthContext)


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if (name === '' || email === '' || password  === '') {
      toast.error('Preencha todos os campos')
    }else{
    setLoading(true)

    let data = {
      name, email, password
    }

    await singUp(data)

    setLoading(false)
  }
  }

  


  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={LogoImg} alt="Logo Sujeito Pizzaria"/>

      <div className={styles.login}>
        <h1>Criando sua conta</h1>
        <form onSubmit={handleSignUp}>
        <Input placeholder='Digite seu nome' value={name} onChange={(e)=> setName(e.target.value)} type='text'/>
          <Input placeholder='Digite seu email' value={email} onChange={(e)=> setEmail(e.target.value)}  type='text'/>
          <Input placeholder='Digite sua senha' value={password} onChange={(e)=> setPassword(e.target.value)}  type='password'/>
          <Button type="submit" loading={loading}>Cadastrar</Button>
          
        </form>
        <Link href="/">
          <a className={styles.text}>Já possui uma conta? Faça login!</a>
        </Link>
      </div>
      </div>
    </>
  )
}
