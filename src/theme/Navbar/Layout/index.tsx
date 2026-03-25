import React from 'react';
import NavbarLayout from '@theme-original/Navbar/Layout';
import type NavbarLayoutType from '@theme/Navbar/Layout';
import type {WrapperProps} from '@docusaurus/types';
import styles from './styles.module.css';

type Props = WrapperProps<typeof NavbarLayoutType>;

export default function NavbarLayoutWrapper(props: Props): React.JSX.Element {
  return (
    <div className={styles.navbarWrapper}>
      <NavbarLayout {...props} />
    </div>
  );
}
