import { makeAutoObservable } from "mobx";
import { GetProviderResult, watchProvider } from "@wagmi/core";
import { AVAILABLE_NETWORK } from "../../../shared/config";
import {BaseProvider, Provider} from "@ethersproject/providers";

export class ProviderStore {
  private _provider: null | GetProviderResult = null;

  private _isInitialized = false;
  constructor(defaultProvider: BaseProvider) {
    makeAutoObservable(this);
    this._provider = defaultProvider;
    this.init();
  }

  protected init = () => {
    try {
      watchProvider({ chainId: AVAILABLE_NETWORK }, this.onChangeProvider);
    } catch (e) {
      console.log(e);
    } finally {
      this._isInitialized = true;
    }
  };

  private onChangeProvider = (data: GetProviderResult) => {
    this._provider = data;
  };

  get provider(): Provider {
    if (!this._provider) {
      throw Error("Provider не существует");
    }

    return this._provider;
  }

  get hasProvider(): boolean {
    return !!this._provider;
  }
}
