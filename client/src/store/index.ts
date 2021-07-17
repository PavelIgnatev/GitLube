import { configure } from 'mobx';

import settings from './Settings';
import builds from './Builds';

configure({
  enforceActions: 'never',
});

export { settings, builds };
