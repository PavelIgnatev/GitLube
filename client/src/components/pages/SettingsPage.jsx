import BaseButtonOrange from '../buttons/BaseButtonOrange';
import BaseButtonGray from '../buttons/BaseButtonGray';
import BaseInput from '../inputs/BaseInput';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { settings, builds } from '../../store';
import { observer } from 'mobx-react-lite';
import makeMobxLocation from 'mobx-location';
import { toJS } from 'mobx';
import './SettingsPage.sass';

const SettingsPage = () => {
  const history = useHistory();
  const mobxLocation = makeMobxLocation({ arrayFormat: 'bracket' });
  //Для определения ошибок
  const [errorForRepository, changeErrorForRepository] = useState('');
  const [errorForBuildCommand, changeErrorForBuildCommand] = useState('');
  const [errorForMainBranch, changeErrorForMainBranch] = useState('');

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
  function updateSettings() {
    settings.updateSettings({
      repoName: Repository,
      buildCommand: BuildCommand,
      mainBranch: MainBranch,
      period: Period,
    });
    history.push('/');
  }

  //Функция минимальной валидации
  function minimalValid() {
    let status = true;
    if (!Repository.length) {
      changeErrorForRepository('ERROR');
      toast.error('The minimum length of the repository field is 3 character');
      status = false;
    }
    if (Repository.split('/').length === 1) {
      changeErrorForRepository('ERROR');
      toast.error('Invalid input format, character / not found');
      status = false;
    }
    if (!BuildCommand.length) {
      changeErrorForBuildCommand('ERROR');
      status = false;
    }
    return status;
  }
  //Функция окончательной валидации
  function maximalValid(errorMessage) {
    //Валидация по дополнительным условиям
    if (errorMessage === 'This repository was not found, it may be private') {
      changeErrorForRepository('Error');
      toast.error(errorMessage);
    } else if (
      errorMessage === 'Your master branch was not found, default branch: main'
    ) {
      changeErrorForMainBranch('Error');
      toast.error(errorMessage);
    }
    //Если ошибки были - кидаем тост, иначе - сохраняем настройки
    else if (errorMessage) {
      changeErrorForRepository('Error');
      toast.error('Sorry, but you entered incorrect data, please try again.');
    } else {
      //Если не было ошибок, то значит post запрос на обновление настроек был доставлен, тогда обновляем настройки
      updateSettings();
    }
  }

  //Отправляем запрос на api, который, если что, вернет нам текст ошибки
  async function postSettings() {
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
      maximalValid(result.data.message);
      builds.buildList = []
      builds.status = "data"
    } catch (error) {
      //Раздизейблим кнопку
      setButtonDisabled(false);
      //Кидаем тект неизвестной ошибки
      toast.error('Sorry, but you entered incorrect data, please try again.');
    }
  }
  //Обработчик на клики по кнопкам
  function onClickSave(e) {
    e.preventDefault();

    //Если минимальная проверка удалась
    if (minimalValid()) {
      postSettings();
    }
  }

  function onClickCancel(e) {
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
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.getterSettings, toJS(mobxLocation).href]);

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
          onChange={(e) => {
            changeRepository(e.currentTarget.value.trim());
            changeErrorForRepository('');
          }}
          value={Repository}
          error={errorForRepository}
        />
        <BaseInput
          id="build"
          required="true"
          label="Build command"
          placeholder="npm ci && npm run build"
          onChange={(e) => {
            changeBuildCommand(e.currentTarget.value);
            changeErrorForBuildCommand('');
          }}
          value={BuildCommand}
          error={errorForBuildCommand}
        />
        <BaseInput
          id="branch"
          required="false"
          label="Main branch"
          placeholder="main"
          onChange={(e) => {
            changeMainBranch(e.currentTarget.value.trim());
            changeErrorForMainBranch('');
          }}
          value={MainBranch}
          error={errorForMainBranch}
        />
        <div className="page-settings__period">
          Synchronize every
          <input
            className="base-input__input pr0"
            value={Period}
            onChange={(e) => changePeriod(e.currentTarget.value.trim())}
            type="number"
            onInput={(e) => (e.target.value = e.target.value.slice(0, 3))}
          />
          minutes
        </div>
        <div className="page-settings__btns">
          <BaseButtonOrange
            buttonDisabled={buttonDisabled}
            text="Save"
            onClick={onClickSave}
          />
          <BaseButtonGray
            buttonDisabled={buttonDisabled}
            text="Cancel"
            onClick={onClickCancel}
          />
        </div>
      </form>
    </div>
  );
};

export default observer(SettingsPage);
