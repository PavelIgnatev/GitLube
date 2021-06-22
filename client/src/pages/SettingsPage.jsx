import BaseButtonOrange from '../components/buttons/BaseButtonOrange';
import BaseButtonGray from '../components/buttons/BaseButtonGray';
import BaseInput from '../components/inputs/BaseInput';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './SettingsPage.sass';

const SettingsPage = () => {
  const history = useHistory();

  let [errorForRepository, changeErrorForRepository] = useState('');
  let [errorForBuildCommand, changeErrorForBuildCommand] = useState('');
  let [errorForMainBranch, changeErrorForMainBranch] = useState('');

  let [buttonDisabled, setButtonDisabled] = useState(false)

  let [Repository, changeRepository] = useState(
    localStorage.getItem('Repository') ?? ''
  );

  let [BuildCommand, changeBuildCommand] = useState(
    localStorage.getItem('BuildCommand') ?? ''
  );

  let [MainBranch, changeMainBranch] = useState(
    localStorage.getItem('MainBranch') ?? ''
  );

  let [Period, changePeriod] = useState(localStorage.getItem('Period') ?? '');

  //Обработчики для изменения значений
  function chRepository(e) {
    //Очищаем ошибки при изменении input
    changeErrorForRepository('');
    //Делаем свое дело дальше
    changeRepository(e.currentTarget ? e.currentTarget.value : e);
    return e.currentTarget ? e.currentTarget.value : e;
  }

  function chBuildCommand(e) {
    //Очищаем ошибки при изменении input
    changeErrorForBuildCommand('');
    //Делаем свое дело дальше
    changeBuildCommand(e.currentTarget ? e.currentTarget.value : e);
    return e.currentTarget ? e.currentTarget.value : e;
  }

  function chMainBranch(e) {
    //Очищаем ошибки при изменении input
    changeErrorForMainBranch('');
    //Делаем свое дело дальше
    changeMainBranch(e.currentTarget ? e.currentTarget.value : e);
    return e.currentTarget ? e.currentTarget.value : e;
  }

  function chPeriod(e) {
    changePeriod(e.currentTarget ? e.currentTarget.value : e);
    return e.currentTarget ? e.currentTarget.value : e;
  }

  // Функция минимальной валидации
  function isInputValid() {
    let status = true;

    if (!Repository.length || Repository.split('/').length === 1) {
      changeErrorForRepository('ERROR');
      status = false;
    }
    if (!BuildCommand.length) {
      changeErrorForBuildCommand('ERROR');
      status = false;
    }

    return status;
  }

  function saveSettingsToLocalStorage() {
    localStorage.setItem('Repository', Repository);
    localStorage.setItem('BuildCommand', BuildCommand);
    localStorage.setItem('MainBranch', MainBranch);
    localStorage.setItem('Period', Period);
    history.push('/');
  }
  
  //Отправляем запрос на api, который, если что, вернет нам текст ошибки
  function postSettings() {
    (async () => {
      try {
        setButtonDisabled(true)
        const result = await axios.post('/api/settings', {
          id: '8c3c6fa1-47de-4b48-808c-562eb458665sd',
          repoName: Repository,
          buildCommand: BuildCommand,
          mainBranch: MainBranch.length > 0 ? MainBranch : 'main',
          period: Period.length > 0 ? Period :  '5',
        });
        setButtonDisabled(false)

        const errorMessage = result.data.message;

        //Валидация по дополнительным условиям
        if (
          errorMessage === 'This repository was not found, it may be private'
        ) {
          changeErrorForRepository('Error');
        }
        if (errorMessage === 'Your master branch was not found, default branch: main') {
          changeErrorForMainBranch('Error');
        }
        //Если ошибки были - кидаем тост, иначе - сохраняем настройки
        if (errorMessage) {
          toast.error(errorMessage);
        } else {
          saveSettingsToLocalStorage();
        }
      } catch (error) {
        setButtonDisabled(false)
        toast.error(error.message);
      }
    })();
  }
  //Обработчик на клики по кнопкам
  function onClick(e) {
    e.preventDefault();
    //Если клик произошел по кнопке Save
    if (e.target.className === 'base-button base-button__orange') {
      //Валидация, если какое-то условие неверно, то возбуждаем ошибку
      //Если валидации выполнены успешно, то сохраняем новые данные
      if (isInputValid()) {
        postSettings();
      }
      return;
    }
    //Если нажата кнопка Cancel, то меняем на последнее сохраненное значение или на ничего
    localStorage.setItem(
      'Repository',
      chRepository(localStorage.getItem('Repository') ?? '')
    );
    localStorage.setItem(
      'BuildCommand',
      chBuildCommand(localStorage.getItem('BuildCommand') ?? '')
    );
    localStorage.setItem(
      'MainBranch',
      chMainBranch(localStorage.getItem('MainBranch') ?? '')
    );
    localStorage.setItem(
      'Period',
      chPeriod(localStorage.getItem('Period') ?? '')
    );
  }

  return (
    <div className="page-settings">
      <form className="page-settings__form">
        <div className="page-settings__title">Settings</div>
        <div className="page-settings__subtitle">
          Configure repository connection and synchronization settings.
        </div>
        <BaseInput
          id="repository"
          required="true"
          label="Github repository"
          placeholder="user-name/repo-name"
          onChange={chRepository}
          value={Repository}
          error={errorForRepository}
        />
        <BaseInput
          id="build"
          required="true"
          label="Build command"
          placeholder="npm ci && npm run build"
          onChange={chBuildCommand}
          value={BuildCommand}
          error={errorForBuildCommand}
        />
        <BaseInput
          id="branch"
          required="false"
          label="Main branch"
          placeholder="main"
          onChange={chMainBranch}
          value={MainBranch}
          error={errorForMainBranch}
        />
        <div className="page-settings__period">
          Synchronize every
          <input
            className="base-input__input"
            value={Period}
            onChange={chPeriod}
            type="number"
            onInput={(e) => (e.target.value = e.target.value.slice(0, 3))}
          />
          minutes
        </div>
        <div className="page-settings__btns">
          <BaseButtonOrange buttonDisabled={buttonDisabled} text="Save" onClick={onClick} />
          <BaseButtonGray buttonDisabled={buttonDisabled} text="Cancel" onClick={onClick} />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
export default SettingsPage;
