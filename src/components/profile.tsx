import styles from '../styles/components/profile.module.css';

export const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/emersonpgomes.png" alt="" />
      <div>
        <strong>Emerson P. Gomes</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level 1</p>
      </div>
    </div>
  );
};
