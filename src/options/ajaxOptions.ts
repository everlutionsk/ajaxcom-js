export interface IAjaxOptions {
    beforeSend: () => Promise<any>;
    error: any;
    success: () => Promise<any>;
    complete: () => void;
}
