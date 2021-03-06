export interface ITxReceive {
  amount: string;
  memo: string;
  sender: string;
  txType: string; // TODO : define all txTypes if COSMOS(send / multi-send)
}

export interface ITxSend {
  amount: string;
  memo: string;
  receiver: string;
  txType: string; // TODO : define all txTypes if COSMOS(send / multi-send)
}
