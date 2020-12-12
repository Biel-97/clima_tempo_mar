import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import '../src/components/footer.css'
import reportWebVitals from './reportWebVitals';
import Main from './components/main'

ReactDOM.render(
  <React.StrictMode>
    <Main></Main>




    <footer> <span className="nome">Desenvolvido por Gabriel P. Oliveira</span>
    
      <div className="d-flex align-self-center">
        <span><a href="https://github.com/Biel-97" target="_blank" className="fa fa-github aspangn-content-start" aria-hidden="true" rel="noreferrer"></a></span>
        <span><a href="https://codepen.io/Biel_" target="_blank" className="fa fa-codepen aspangn-content-center" aria-hidden="true" rel="noreferrer"></a></span>
        <span><a href="https://www.linkedin.com/in/gabriel-97-oliveira" target="_blank" className="fa fa-linkedin-square aspangn-content-end" aria-hidden="true" rel="noreferrer"></a></span>
      </div>
    </footer>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
