/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export type VotingStruct = {
  chairperson: string;
  title: string;
  expiryBlockNumber: BigNumberish;
  optionsAmount: BigNumberish;
  options: string[];
  optionVotes: BigNumberish[];
  totalVotes: BigNumberish;
};

export type VotingStructOutput = [
  string,
  string,
  BigNumber,
  BigNumber,
  string[],
  BigNumber[],
  BigNumber
] & {
  chairperson: string;
  title: string;
  expiryBlockNumber: BigNumber;
  optionsAmount: BigNumber;
  options: string[];
  optionVotes: BigNumber[];
  totalVotes: BigNumber;
};

export interface PollInterface extends utils.Interface {
  functions: {
    "_createPoll(string,string[],uint256,uint256)": FunctionFragment;
    "chairpersonPollCount(address)": FunctionFragment;
    "getPoll(uint256)": FunctionFragment;
    "pollToChairperson(uint256)": FunctionFragment;
    "polls(uint256)": FunctionFragment;
    "totalPolls()": FunctionFragment;
    "vote(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "_createPoll",
    values: [string, string[], BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "chairpersonPollCount",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getPoll",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "pollToChairperson",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "polls", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "totalPolls",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "vote",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "_createPoll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "chairpersonPollCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPoll", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pollToChairperson",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "polls", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "totalPolls", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;

  events: {};
}

export interface Poll extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PollInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    _createPoll(
      _title: string,
      _optionTitles: string[],
      _expiryBlockNumber: BigNumberish,
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    chairpersonPollCount(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getPoll(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[VotingStructOutput]>;

    pollToChairperson(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    polls(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber, BigNumber, BigNumber] & {
        chairperson: string;
        title: string;
        expiryBlockNumber: BigNumber;
        optionsAmount: BigNumber;
        totalVotes: BigNumber;
      }
    >;

    totalPolls(overrides?: CallOverrides): Promise<[BigNumber]>;

    vote(
      _option: BigNumberish,
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[void]>;
  };

  _createPoll(
    _title: string,
    _optionTitles: string[],
    _expiryBlockNumber: BigNumberish,
    _id: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  chairpersonPollCount(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getPoll(
    _id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<VotingStructOutput>;

  pollToChairperson(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  polls(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, string, BigNumber, BigNumber, BigNumber] & {
      chairperson: string;
      title: string;
      expiryBlockNumber: BigNumber;
      optionsAmount: BigNumber;
      totalVotes: BigNumber;
    }
  >;

  totalPolls(overrides?: CallOverrides): Promise<BigNumber>;

  vote(
    _option: BigNumberish,
    _id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<void>;

  callStatic: {
    _createPoll(
      _title: string,
      _optionTitles: string[],
      _expiryBlockNumber: BigNumberish,
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    chairpersonPollCount(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoll(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<VotingStructOutput>;

    pollToChairperson(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    polls(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber, BigNumber, BigNumber] & {
        chairperson: string;
        title: string;
        expiryBlockNumber: BigNumber;
        optionsAmount: BigNumber;
        totalVotes: BigNumber;
      }
    >;

    totalPolls(overrides?: CallOverrides): Promise<BigNumber>;

    vote(
      _option: BigNumberish,
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    _createPoll(
      _title: string,
      _optionTitles: string[],
      _expiryBlockNumber: BigNumberish,
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    chairpersonPollCount(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoll(_id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    pollToChairperson(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    polls(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    totalPolls(overrides?: CallOverrides): Promise<BigNumber>;

    vote(
      _option: BigNumberish,
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _createPoll(
      _title: string,
      _optionTitles: string[],
      _expiryBlockNumber: BigNumberish,
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    chairpersonPollCount(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPoll(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pollToChairperson(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    polls(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalPolls(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    vote(
      _option: BigNumberish,
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}