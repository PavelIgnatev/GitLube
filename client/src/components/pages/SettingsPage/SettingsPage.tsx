import BaseButtonOrange from '../../buttons/BaseButtonOrange';
import BaseButtonGray from '../../buttons/BaseButtonGray';
import BaseInput from '../../inputs/BaseInput';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { settings, builds } from '../../../store';
import { observer } from 'mobx-react-lite';

import './SettingsPage.sass';

const SettingsPage = () => {
  const history = useHistory();

  //Для определения ошибок
  const [errorForRepository, changeErrorForRepository] = useState(false);
  const [errorForBuildCommand, changeErrorForBuildCommand] = useState(false);
  const [errorForMainBranch, changeErrorForMainBranch] = useState(false);
  const [errorPeriod, changeErrorPeriod] = useState(false);

  //Для disabled кнопки
  const [buttonDisabled, setButtonDisabled] = useState(false);

  //Для input
  const [Repository, changeRepository] = useState(
    settings.getterSettings.repoName ?? ''
  );
  const [BuildCommand, changeBuildCommand] = useState(
    settings.getterSettings.buildCommand ?? ''
  );
  const [MainBranch, changeMainBranch] = useState(
    settings.getterSettings.mainBranch ?? ''
  );
  const [Period, changePeriod] = useState(settings.getterSettings.period ?? '');

  //Обновляем state настроек
  function updateSettings(): void {
    settings.updateSettings({
      repoName: Repository,
      buildCommand: BuildCommand,
      mainBranch: MainBranch,
      period: Number(Period),
    });
    history.push('/');
  }

  //Функция минимальной валидации
  function beforeRequestingTheServer(): boolean {
    let status = true;
    if (Repository.length < 3) {
      changeErrorForRepository(true);
      toast.error('The minimum length of the repository field is 3 character');
      status = false;
    }
    if (Repository.split('/').length === 1) {
      changeErrorForRepository(true);
      toast.error('Invalid input format, character / not found');
      status = false;
    }
    if (BuildCommand.length < 3) {
      changeErrorForBuildCommand(true);
      toast.error(
        'The minimum length of the Build command field is 3 character'
      );
      status = false;
    }
    if (Number(Period) < 1) {
      changeErrorPeriod(true);
      toast.error('The update period cannot be less than 1 minute');
      status = false;
    }
    return status;
  }
  //Функция окончательной валидации после отправки запроса на сервер
  function afterRequestingTheServer(errorMessage: string): void {
    //Валидация по дополнительным условиям
    if (errorMessage === 'This repository was not found, it may be private') {
      changeErrorForRepository(true);
      toast.error(errorMessage);
    } else if (
      errorMessage === 'Your master branch was not found, default branch: main'
    ) {
      changeErrorForMainBranch(true);
      toast.error(errorMessage);
    }
    //Если ошибки были - кидаем тост, иначе - сохраняем настройки
    else if (errorMessage) {
      changeErrorForRepository(true);
      console.log(errorMessage);
      toast.error('Sorry, but you entered incorrect data, please try again.');
    } else {
      //Если не было ошибок, то значит post запрос на обновление настроек был доставлен, тогда обновляем настройки
      updateSettings();
    }
  }

  //Отправляем запрос на api, который, если что, вернет нам текст ошибки
  async function postSettings(): Promise<void> {
    try {
      //Задизейблим кнопку
      setButtonDisabled(true);
      //Получаем результат post запроса на обновление настроек
      const result = await settings.postSettings(
        Repository,
        BuildCommand,
        MainBranch,
        Period
      );
      //Раздизейблим кнопку
      setButtonDisabled(false);
      afterRequestingTheServer(result.data.message);

      builds.buildList = [];
      builds.status = 'data';
    } catch (error) {
      //Раздизейблим кнопку
      setButtonDisabled(false);
      //Кидаем тект неизвестной ошибки
      toast.error('Sorry, but you entered incorrect data, please try again.');
    }
  }
  //Обработчик на клики по кнопкам
  function handleClickSave(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();

    //Если обработка до запроса на сервер проверка удалась
    if (beforeRequestingTheServer()) {
      postSettings();
    }
  }

  function handleClickCancel(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    history.push('/');
  }

  //При обновлении страницы получаем предыдущие настройки
  useEffect(() => {
    changeRepository(settings.getterSettings.repoName ?? '');
    changeBuildCommand(settings.getterSettings.buildCommand ?? '');
    //Branch стандартно всегда main, если что - пользователю вылетит ошибка
    changeMainBranch(settings.getterSettings.mainBranch ?? '');
    //Period стандартно 1, пользователю и не обязательно это знать
    changePeriod(settings.getterSettings.period ?? '');
    return () => undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.getterSettings]);

  return (
    <div className="page-settings">
      <form className="page-settings__form">
        <div className="page-settings__title">Settings</div>
        <div className="page-settings__subtitle">
          Configure repository connection and synchronization settings.
        </div>
        <BaseInput
          id="repository"
          required={true}
          label="Github repository"
          placeholder="user-name/repo-name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            changeRepository(e.currentTarget.value.trim());
            changeErrorForRepository(false);
          }}
          onClear={() => {
            changeRepository('');
            changeErrorForRepository(false);
          }}
          value={Repository}
          error={errorForRepository}
          autoFocus={false}
        />
        <BaseInput
          id="build"
          required={true}
          label="Build command"
          placeholder="npm ci && npm run build"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            changeBuildCommand(e.currentTarget.value);
            changeErrorForBuildCommand(false);
          }}
          onClear={() => {
            changeBuildCommand('');
            changeErrorForBuildCommand(false);
          }}
          value={BuildCommand}
          error={errorForBuildCommand}
          autoFocus={false}
        />
        <BaseInput
          id="branch"
          required={false}
          label="Main branch"
          placeholder="main"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            changeMainBranch(e.currentTarget.value.trim());
            changeErrorForMainBranch(false);
          }}
          onClear={() => {
            changeMainBranch('');
            changeErrorForMainBranch(false);
          }}
          value={MainBranch}
          error={errorForMainBranch}
          autoFocus={false}
        />
        <div className="page-settings__period">
          Synchronize every
          <input
            className="base-input__input pr0"
            value={Period}
            style={errorPeriod === true ? { border: '2px solid red' } : {}}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              changePeriod(parseInt(e.currentTarget.value));
              changeErrorPeriod(false);
            }}
            type="number"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => (e.target.value = e.target.value.slice(0, 3))}
          />
          minutes
        </div>
        <div className="page-settings__btns">
          <BaseButtonOrange
            buttonDisabled={buttonDisabled || settings.status === 'waiting'}
            text="Save"
            onClick={handleClickSave}
          />
          <BaseButtonGray
            buttonDisabled={buttonDisabled || settings.status === 'waiting'}
            text="Cancel"
            onClick={handleClickCancel}
          />
        </div>
      </form>
    </div>
  );
};

export default observer(SettingsPage);
