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
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface VotingInterface extends utils.Interface {
  functions: {
    "candidateList(uint256)": FunctionFragment;
    "setCandidates(string[])": FunctionFragment;
    "totalVotes(string)": FunctionFragment;
    "totalVotesCasted()": FunctionFragment;
    "voteForCandidate(string)": FunctionFragment;
    "votesReceived(string)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "candidateList",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setCandidates",
    values: [string[]]
  ): string;
  encodeFunctionData(functionFragment: "totalVotes", values: [string]): string;
  encodeFunctionData(
    functionFragment: "totalVotesCasted",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "voteForCandidate",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "votesReceived",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "candidateList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setCandidates",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "totalVotes", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalVotesCasted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "voteForCandidate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "votesReceived",
    data: BytesLike
  ): Result;

  events: {
    "NewCandidates(string[])": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NewCandidates"): EventFragment;
}

export type NewCandidatesEvent = TypedEvent<
  [string[]],
  { candidateList: string[] }
>;

export type NewCandidatesEventFilter = TypedEventFilter<NewCandidatesEvent>;

export interface Voting extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VotingInterface;

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
    candidateList(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    setCandidates(
      _candidateNames: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalVotes(
      _candidate: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalVotesCasted(overrides?: CallOverrides): Promise<[BigNumber]>;

    voteForCandidate(
      _candidate: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    votesReceived(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  candidateList(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  setCandidates(
    _candidateNames: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalVotes(_candidate: string, overrides?: CallOverrides): Promise<BigNumber>;

  totalVotesCasted(overrides?: CallOverrides): Promise<BigNumber>;

  voteForCandidate(
    _candidate: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  votesReceived(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    candidateList(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    setCandidates(
      _candidateNames: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    totalVotes(
      _candidate: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalVotesCasted(overrides?: CallOverrides): Promise<BigNumber>;

    voteForCandidate(
      _candidate: string,
      overrides?: CallOverrides
    ): Promise<void>;

    votesReceived(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "NewCandidates(string[])"(candidateList?: null): NewCandidatesEventFilter;
    NewCandidates(candidateList?: null): NewCandidatesEventFilter;
  };

  estimateGas: {
    candidateList(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setCandidates(
      _candidateNames: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalVotes(
      _candidate: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalVotesCasted(overrides?: CallOverrides): Promise<BigNumber>;

    voteForCandidate(
      _candidate: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    votesReceived(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    candidateList(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setCandidates(
      _candidateNames: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalVotes(
      _candidate: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalVotesCasted(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    voteForCandidate(
      _candidate: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    votesReceived(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
