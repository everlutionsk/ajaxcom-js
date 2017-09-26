import {ChangeUrlOptions} from "../operation/options/changeUrlOptions";
import {getOptions} from "../options";
import {HistoryOptions} from "../options/historyOptions";

let pushHistory: Array<HistoryOptions> = [];
let lastId;
let popStateEvent = false;

export function popStateHandler(event: PopStateEvent): void {
    if (event.state !== null && typeof event.state !== "object") return;
    if (shouldReload(event)) return window.location.reload();

    setPopStateEvent();
}

export function pushToHistory(options: ChangeUrlOptions): void {
    lastId = getId(options.url);
    pushHistory[lastId] = {
        options: options,
        scrollTo: document.body.scrollTop,
        ajaxcomOptions: getOptions()
    };

    history.pushState({ajaxcomId: lastId}, null, options.url);
}

export function setPopStateEvent(): void {
    popStateEvent = true;
}

export function resetPopStateEvent(): void {
    popStateEvent = false;
}

export function isPopStateEvent(): boolean {
    return popStateEvent;
}

function getId(url: string): string {
    return new Date().getTime() + url;
}

function get(id: string): HistoryOptions {
    return pushHistory[id];
}

function shouldReload(event: PopStateEvent) {
    return event.state.ajaxcomId === null || typeof get(event.state.ajaxcomId) === 'undefined';
}
