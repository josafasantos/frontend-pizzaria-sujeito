import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import {FiLogOut} from 'react-icons/fi'

import LogoImg from '../../../public/logo.svg'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'


export default function Header() {

    const { signOut } = useContext(AuthContext)

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
        <Image src={LogoImg} alt="Logo Sujeito Pizzaria" width={190} height={60}/>
        </Link>
      
      <nav className={styles.menuNav}>
        <Link href='/category'>
            <a>Categoria</a>
        </Link>
      
      <Link href='/product'>
            <a>Cardapio</a>
        </Link>

        <button onClick={signOut}>
            <FiLogOut color='#fff' size={24}/>
        </button>
        </nav>
        </div>
    </header>
  )
}
