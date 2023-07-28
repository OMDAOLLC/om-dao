import { Contract } from '@ethersproject/contracts';
import { BaseTokensFormSubmitData } from '../../base-tokens-form';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { makeAutoObservable } from 'mobx';
import { OperationStatus } from '../../../shared/types';
import { RootStore } from '../../../app/root-store';
import { ETokenSymbols } from '../../../shared/constants/blockchain';
import { BLOCKCHAIN } from '../../../shared/constants/blockchain/blockchain';

export class StakeFormStore {
  private _unStakeDate: Date | undefined;

  private _status: OperationStatus = OperationStatus.READY;

  constructor(private _rootStore: RootStore) {
    makeAutoObservable(this);

    this.fetchUnStakeDate();
  }

  public onStake = async ({
    sourceAmount,
  }: BaseTokensFormSubmitData): Promise<void> => {
    if (this.isStakeDisabled) {
      return;
    }

    this.status = OperationStatus.STARTING;
    await this.stakeToken(sourceAmount);
  };

  private fetchUnStakeDate = async (): Promise<void> => {
    try {
      const divDate = await this.destinationContract.divDate();
      const timestamp = Number(formatUnits(divDate, 0)) * 1000;
      this.unStakeDate = new Date(timestamp);
    } catch (e) {
      console.log(e);
    }
  };

  private stakeToken = async (amount: string): Promise<void> => {
    try {
      const symbol = await this.destinationContract.symbol();
      const decimals = await this.destinationContract.decimals();
      const unit256Amount = parseUnits(amount, decimals);

      this.status = OperationStatus.AWAITING_CONFIRM;
      const approveTransaction = await this.sourceContract.approve(
        this.destinationContract.address,
        unit256Amount
      );

      this.status = OperationStatus.AWAITING_BLOCK_MINING;
      await approveTransaction.wait();

      this.status = OperationStatus.AWAITING_CONFIRM;
      const stakeTransaction = await this.destinationContract.stake(
        unit256Amount
      );

      this.status = OperationStatus.AWAITING_BLOCK_MINING;
      await stakeTransaction.wait();

      const event = new CustomEvent(`need-update-${symbol}`);
      document.dispatchEvent(event);

      this.status = OperationStatus.SUCCESS;
    } catch (e) {
      this.status = OperationStatus.ERROR;
      console.log(e);
    }
  };

  public get sourceContract(): Contract {
    const token =
      BLOCKCHAIN[this._rootStore.chain.id].tokens[ETokenSymbols.OMD];

    return new Contract(
      token.address,
      token.abi,
      this._rootStore.signerOrProvider
    );
  }

  public get destinationContract(): Contract {
    const token =
      BLOCKCHAIN[this._rootStore.chain.id].tokens[ETokenSymbols.STOMD];

    return new Contract(
      token.address,
      token.abi,
      this._rootStore.signerOrProvider
    );
  }

  public get status(): OperationStatus {
    return this._status;
  }

  public get unStakeDate(): Date | undefined {
    return this._unStakeDate;
  }

  private set status(value: OperationStatus) {
    this._status = value;
  }

  private set unStakeDate(value: Date | undefined) {
    this._unStakeDate = value;
  }

  public get isStakeDisabled(): boolean {
    return this.unStakeDate ? Date.now() > this.unStakeDate.getTime() : true;
  }

  public get isStaking(): boolean {
    return [
      OperationStatus.STARTING,
      OperationStatus.AWAITING_CONFIRM,
      OperationStatus.AWAITING_BLOCK_MINING,
    ].includes(this._status);
  }
}
