import { Contract } from '@ethersproject/contracts';
import { formatUnits } from '@ethersproject/units';
import { format } from 'date-fns';
import { makeAutoObservable } from 'mobx';
import { OperationStatus } from '../../../shared/types';
import { RootStore } from '../../../app/root-store';
import { ETokenSymbols } from '../../../shared/constants/blockchain';
import { BLOCKCHAIN } from '../../../shared/constants/blockchain/blockchain';

export class UnstakeFormStore {
  private _inStake = '0';

  private _dividends = '0';

  private _unstakeDate: Date = new Date();

  private _isLoading = true;

  private _status: OperationStatus = OperationStatus.READY;

  constructor(
    private _rootStore: RootStore,
    private _stakeTokenSymbol: ETokenSymbols = ETokenSymbols.STOMD,
    private _unstakeTokenSymbol: ETokenSymbols = ETokenSymbols.OMD
  ) {
    makeAutoObservable(this);
    this.fetchUnStakeInfo();
  }

  private fetchUnStakeInfo = async (): Promise<void> => {
    try {
      await this.fetchBalance();
      await this.fetchUnStakeDate();

      if (this._inStake && +this._inStake !== 0) {
        await this.fetchDividends();
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  };

  private fetchBalance = async (): Promise<void> => {
    if (!this._rootStore.signerStore.hasSigner) {
      return;
    }

    try {
      const decimals = await this._stakeContract.decimals();
      const signerAddress =
        await this._rootStore.signerStore.signer.getAddress();
      const balance = await this._stakeContract.balanceOf(signerAddress);
      this._inStake = formatUnits(balance, decimals);
    } catch (e) {
      console.log(e);
    }
  };

  private fetchDividends = async (): Promise<void> => {
    try {
      const address = await this._rootStore.signerStore.signer.getAddress();
      const decimals = await this._unStakeContract.decimals();

      this.dividends = formatUnits(
        await this._stakeContract.myDivs(address),
        decimals
      );
    } catch (e) {
      console.log(e);
      this.dividends = '0';
    }
  };

  private fetchUnStakeDate = async (): Promise<void> => {
    try {
      const timestamp =
        Number(formatUnits(await this._stakeContract.divDate(), 0)) * 1000;
      this.unstakeDate = new Date(timestamp);
    } catch (e) {
      console.log(e);
    }
  };

  public onUnStake = async (): Promise<void> => {
    this.isLoading = true;

    try {
      const symbol = await this._stakeContract.symbol();

      this.status = OperationStatus.AWAITING_CONFIRM;
      const unStakeTransaction = await this._stakeContract.unstake();

      this.status = OperationStatus.AWAITING_BLOCK_MINING;
      await unStakeTransaction.wait();

      const event = new CustomEvent(`need-update-${symbol}`);
      document.dispatchEvent(event);

      await this.fetchUnStakeInfo();
      this.status = OperationStatus.SUCCESS;
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  };

  private get _stakeContract(): Contract {
    const token =
      BLOCKCHAIN[this._rootStore.chain.id].tokens[this._stakeTokenSymbol];

    return new Contract(
      token.address,
      token.abi,
      this._rootStore.signerOrProvider
    );
  }

  private get _unStakeContract(): Contract {
    const token =
      BLOCKCHAIN[this._rootStore.chain.id].tokens[this._unstakeTokenSymbol];

    return new Contract(
      token.address,
      token.abi,
      this._rootStore.signerOrProvider
    );
  }

  public get totalAmount(): string {
    return (+this._inStake + +this._dividends).toString();
  }

  public get dividends(): string {
    return this._dividends.toString();
  }

  public get inStake(): string {
    return this._inStake;
  }

  public get formattedUnstakeDate(): string {
    return format(this._unstakeDate, 'dd.MM.yyyy в  HH:mm');
  }

  public get isLoading(): boolean {
    return this._isLoading;
  }

  public get status(): OperationStatus {
    return this._status;
  }

  public get isUnStakeDisabled(): boolean {
    return this._unstakeDate && Date.now() < this._unstakeDate.getTime();
  }

  private set isLoading(value: boolean) {
    this._isLoading = value;
  }

  private set dividends(value: string) {
    this._dividends = value;
  }

  private set unstakeDate(value: Date) {
    this._unstakeDate = value;
  }

  private set status(value: OperationStatus) {
    this._status = value;
  }
}
