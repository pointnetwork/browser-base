import * as React from 'react';
import { Header, Row, Title, Input, IconButton } from '../App/style';
import { observer } from 'mobx-react-lite';
import store from '../../store';
import { isProxy } from '~/utils';
import { BLUE_500 } from '~/renderer/constants';
import { Button } from '~/renderer/components/Button';
import { DEFAULT_SETTINGS } from '~/constants';
import { IPointSettings } from '~/main/fork/point/interfaces/settings';
import { POINT_SETTINGS } from '~/main/fork/point/constants/settings';

const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key !== 'Enter') return;
  const contents =
    e.currentTarget.value.indexOf('://') !== -1
      ? e.currentTarget.value
      : `http://${e.currentTarget.value}`;
  // TODO : some function or api call that checks whether the url is a valid point node
  if (!isProxy(contents)) {
    // TODO : change this to an alert made of html
    alert(`${contents} is not a valid url`);
    return;
  }
  const pointSettings = store.settings.extendedSettings as IPointSettings;

  pointSettings.proxyRules = contents;
  store.save(true);
};

const applyDefault = () => {
  const pointSettings = store.settings.extendedSettings as IPointSettings;
  pointSettings.proxyRules = POINT_SETTINGS.proxyRules;
  store.save(true);
};

export const ProxySettings = observer(() => {
  const pointSettings = store.settings.extendedSettings as IPointSettings;
  return (
    <>
      <Header>Proxy Settings</Header>
      <Row style={{ justifyContent: 'space-between' }}>
        <Title>Apply new proxy settings</Title>
        <div style={{ minWidth: '200px', width: '200px', height: '25px' }}>
          <Input placeholder={pointSettings.proxyRules} onKeyDown={onKeyDown} />
        </div>
      </Row>
      <Row style={{ justifyContent: 'flex-end' }}>
        <Button type="outlined" foreground={BLUE_500} onClick={applyDefault}>
          Apply Default Proxy
        </Button>
      </Row>
    </>
  );
});
