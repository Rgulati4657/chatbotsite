import React from 'react';
import styles from './Footer.module.css';
import footerimg from '../../assets/footer/footer-main.png';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <img src={footerimg} className={styles.footer_img} alt="Footer Background" />
      <div className={styles.footer_content}>
        <div className={styles.footer_column_left}>
          <p>Mediator - Artificial Intelligence Agency</p>
          <p>We provide cutting-edge AI solutions.</p>
        </div>
        <div className={styles.footer_column_list}>
          <h3>Quick Links</h3>
          <a href="#">Home</a><br />
          <a href="#">About</a><br />
          <a href="#">Services</a><br />
        </div>
        <div className={styles.footer_column_list2}>
          <h3>Contact Us</h3>
          <p>Email: mail.com</p>
          <p>Phone: 1 234 567 890</p>
        </div>
      </div>
      <div className={styles.copyright_div}>
        <div className={styles.copyright}>
          © 2025 Mediator. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;