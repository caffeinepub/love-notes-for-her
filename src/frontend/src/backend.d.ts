import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Note {
    title: string;
    body: string;
    isUnlocked: boolean;
}
export interface backendInterface {
    getCurrentDay(): Promise<bigint>;
    getNotes(): Promise<Array<Note>>;
    initializeAndGetDay(): Promise<bigint>;
}
