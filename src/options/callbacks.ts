export interface IAjaxcomCallbacks {
    beforeSend: () => Promise<any>;
    error: any;
    success: () => Promise<any>;
    complete: () => void;
}
