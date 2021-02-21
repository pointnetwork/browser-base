import * as React from 'react';
import { Header, Row, Title, Input, IconButton } from '../App/style';
import { observer } from 'mobx-react-lite';
import store from '../../store';
import { isProxy } from '~/utils';
import { BLUE_500 } from '~/renderer/constants';
import { Button } from '~/renderer/components/Button';
import { DEFAULT_SETTINGS } from '~/constants';

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
  store.settings.proxyRules = contents;
  store.save(true);
};

const applyDefault = () => {
  store.settings.proxyRules = DEFAULT_SETTINGS.proxyRules;
  store.save(true);
};

export const ProxySettings = observer(() => {
  return (
    <>
      <Header>Proxy Settings</Header>
      <Row style={{ justifyContent: 'space-between' }}>
        <Title>Apply new proxy settings</Title>
        <div style={{ minWidth: '200px', width: '200px', height: '25px' }}>
          <Input
            placeholder={store.settings.proxyRules}
            onKeyDown={onKeyDown}
          />
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
