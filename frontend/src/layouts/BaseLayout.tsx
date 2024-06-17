import { ReactNode } from 'react';
import styles from './BaseLayout.module.css';

const BaseLayout = ({ children }: { children: ReactNode }) => (
  <div className={styles.baseLayout}>{children}</div>
);

export default BaseLayout;
