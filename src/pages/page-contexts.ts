import {getContext} from "svelte";
import {PAGE_CONTEXT, REQUEST_CONTEXT, type HomePageContext, type RequestContext} from "./types";

export function getRequestContext(): RequestContext {
	return getContext(REQUEST_CONTEXT);
}

export function getHomeContext(): HomePageContext {
	return getContext(PAGE_CONTEXT);
}