import { handleOperations } from './operations';

export interface FetchOptions {
  readonly url: string;
  readonly method: string;
  readonly body: string | FormData | undefined;
  readonly headers: Headers;
}

interface RequestProps {
  readonly request: FetchOptions;
  readonly beforeSend: () => Promise<void>;
  readonly error: (reason: string) => void;
  readonly success: () => Promise<void>;
  readonly complete: () => void;
}

export async function request(props: RequestProps): Promise<void> {
  try {
    await props.beforeSend();
    const response = await fetchOperations(props.request);

    if (!response.ok) {
      props.error(await response.text());
      return;
    }

    await props.success();
    await handleOperations(response);
    props.complete();
  } catch (e) {
    props.error(e);
  }
}

function fetchOperations(options: FetchOptions): Promise<Response> {
  return fetch(options.url, {
    body: options.body,
    cache: 'no-store',
    credentials: 'include',
    headers: new Headers({ ...options.headers, 'X-AjaxCom': 'true', Accept: 'application/json' }),
    method: options.method
  });
}
