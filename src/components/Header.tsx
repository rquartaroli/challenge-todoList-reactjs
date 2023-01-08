import styles from './Header.module.css';

import Logo from '../assets/logo.png';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="logo da aplicação" />
    </header>
  )
}