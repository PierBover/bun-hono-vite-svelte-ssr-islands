export const REQUEST_CONTEXT = 'REQUEST_CONTEXT';
export const PAGE_CONTEXT = 'PAGE_CONTEXT';

export type RequestContext = {
	path:string;
};

export type HomePageContext = {
	welcomeMessage:string;
};