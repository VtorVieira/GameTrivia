import React, { Component } from 'react';
import './css-components/Footer.css';

export default class Footer extends Component {
  render() {
    const Larissa = 'Larissa Sant`Anna -';
    return (
      <footer className="rankingFooter">
        <div className="FooterTeam">
          <p className="footerTitle">Developed by</p>
          <section className="footerComponents">
            <p>
              Caio de Sousa -
              <a
                href="https://github.com/sshcaio"
                className="footerLinks"
              >
                GitHub
              </a>
              /
              <a
                href="https://www.linkedin.com/in/sshcaio/"
                className="footerLinks"
              >
                LinkedIn
              </a>
            </p>
            <p>
              { Larissa }
              <a
                href="https://github.com/LariRdS"
                className="footerLinks"
              >
                GitHub
              </a>
              /
              <a
                href="https://www.linkedin.com/in/larirsanna/"
                className="footerLinks"
              >
                LinkedIn
              </a>
            </p>
            <p>
              Mateus Fukuya -
              <a
                href="https://github.com/Mateus-Fukuya"
                className="footerLinks"
              >
                GitHub
              </a>
              /
              <a
                href="ttps://www.linkedin.com/in/mateus-fukuya-28b368241/"
                className="footerLinks"
              >
                LinkedIn
              </a>
            </p>
            <p>
              Vitor Vieira -
              <a
                href="https://github.com/VtorVieira"
                className="footerLinks"
              >
                GitHub
              </a>
              /
              <a
                href="https://www.linkedin.com/in/vtorvieira/"
                className="footerLinks"
              >
                LinkedIn
              </a>
            </p>
          </section>
        </div>
        <div className="footerEnd">© 2022 Copyright: TriviaPlay Team</div>
      </footer>
    );
  }
}
