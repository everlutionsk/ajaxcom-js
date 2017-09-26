export interface AjaxOptions {
    beforeSend: () => Promise<any>;
    success: () => Promise<any>;
    complete: () => void;
}
