import * as React from 'react';
import {
  WalletWrapper,
  FlexWrapper,
  TextWrapper,
} from '~/renderer/views/newtab/components/Wallet/style';
import { ICON_POINT } from '~/renderer/constants';
import styled from 'styled-components';

export const Wallet = () => {
  return (
    <WalletWrapper>
      <div>
        <FlexWrapper>
          <Img src={ICON_POINT} />
          <h4>Point Wallet</h4>
        </FlexWrapper>
        <TextWrapper>
          <h2 style={{ fontSize: '25px' }}>100.00</h2>
          <h6 style={{ fontSize: '15px' }}>PNT</h6>
        </TextWrapper>
      </div>
    </WalletWrapper>
  );
};

const Img = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
  margin-right: 10px;
  background: #222222;
  border-radius: 100%;
`;
