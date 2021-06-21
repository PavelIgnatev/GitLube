import "./BaseFooter.sass";

const BaseFooter = () => {
  return (
    <footer className="app-footer">
      <div className="app-footer__wrapper">
        <div className="app-footer__item">Support</div>
        <div className="app-footer__item">Learning</div>
        <div className="app-footer__item">Русская версия</div>
      </div>
      <div className="app-footer__item">© 2021 Ignatev Pavel</div>
    </footer>
  );
};

export default BaseFooter;
