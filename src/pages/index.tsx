import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <div className="wrapper">
        <div className={`${styles.main}`}>
          <section className={`${styles.profile}`}>
            <img className={`${styles.profileImg}`} src="img/icon.jpeg"></img>
            <div>
              <h1 className={`${styles.profileTitle}`}>
                Hi, I&apos;m{" "}
                <span className={`${styles.profileName}`}>Yuunull</span>
              </h1>
              <h2 className={`${styles.profileSubTitle}`}>
                Software Engineer.
              </h2>
            </div>
            <ul className={`${styles.social}`}>
              <li>
                <a href="https://github.com/yuunull" target="_blank">
                  <img src="img/github-mark.png" width={40} alt="github" />
                </a>
              </li>
              <li>
                <a href="https://x.com/yuunull" target="_blank">
                  <img src="img/x.svg" width={40} alt="X" />
                </a>
              </li>
            </ul>
          </section>
          <section className={`${styles.skills}`}>
            <h2 className={`${styles.skillsTitle}`}>My skills</h2>
            <div className={`${styles.skillsIcon}`}>
              <ul>
                <li>
                  <img src="icon/HTML5.png" alt="HTML5_logo" width={50} />
                </li>
                <li>
                  <img src="icon/CSS3.png" alt="CSS3_logo" width={50} />
                </li>
                <li>
                  <img src="icon/js.png" alt="js_logo" width={50} />
                </li>
                <li>
                  <img src="icon/ts.png" alt="ts_logo" width={50} />
                </li>
              </ul>
              <ul>
                <li>
                  <img src="icon/jQuery.png" alt="jQuery_logo" width={70} />
                </li>
                <li>
                  <img src="icon/react.svg" alt="react_logo" width={50} />
                </li>
                <li>
                  <img src="icon/node.png" alt="node_logo" width={50} />
                </li>
                <li>
                  <img src="icon/csharpe.png" alt="csharpe_logo" width={50} />
                </li>
              </ul>
              <ul>
                <li>
                  <img src="icon/oracle.png" alt="oracle_logo" width={50} />
                </li>
                <li>
                  <img src="icon/git.png" alt="git_logo" width={50} />
                </li>
                <li>
                  <img src="icon/actions.png" alt="actions_logo" width={50} />
                </li>
                <li>
                  <img src="icon/slack.png" alt="slack_logo" width={50} />
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
