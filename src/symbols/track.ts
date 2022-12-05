import { InjectionKey } from "vue";
import { AddToUITrackListFunction, UpdateUITrackListFunction } from "../types";

export const addToUITrackListKey: InjectionKey<AddToUITrackListFunction> =
  Symbol("addToUITrackList");

export const updateUITrackListKey: InjectionKey<UpdateUITrackListFunction> =
  Symbol("addToUITrackList");
