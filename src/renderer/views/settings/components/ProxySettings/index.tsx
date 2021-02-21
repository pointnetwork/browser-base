import * as React from 'react';
import { Header, Row, Title, Input } from '../App/style';
import { observer } from 'mobx-react-lite';
import store from '../../store';
import { isProxy } from '~/utils';

const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key !== 'Enter') return;
  const contents =
    e.currentTarget.value.indexOf('://') !== -1
      ? e.currentTarget.value
      : `http://${e.currentTarget.value}`;

  if (!isProxy(contents)) {
    // TODO : change this to an alert made of html
    alert(`${contents} is not a valid url`);
    return;
  }
  store.settings.proxyRules = contents;
  store.save(true);
};

export const ProxySettings = observer(() => {
  return (
    <>
      <Header>Proxy Settings</Header>
      <Row style={{ justifyContent: 'space-between' }}>
        <Title>Apply new proxy settings</Title>
        <div style={{ minWidth: '200px', width: '200px', height: '25px' }}>
          <Input onKeyDown={onKeyDown} />
        </div>
      </Row>
    </>
  );
});
