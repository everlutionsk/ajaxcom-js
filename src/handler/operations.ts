import { CallbackOptions, handleCallback } from '../operation/callback';
import { ChangeUrlOptions, handleChangeUrl } from '../operation/changeUrl';
import { ContainerOptions, handleContainer } from '../operation/container';

type OperationOptions =
  | {
      readonly operation: 'container';
      readonly options: ContainerOptions;
    }
  | {
      readonly operation: 'changeurl';
      readonly options: ChangeUrlOptions;
    }
  | {
      readonly operation: 'callback';
      readonly options: CallbackOptions;
    };

export function handleOperations(response: Response): Promise<void> {
  return response.json().then((data: OperationOptions[]) => {
    data.forEach(operation => handleOperation(operation));
  });
}

function handleOperation({ operation, options }: OperationOptions) {
  switch (operation) {
    case 'container':
      handleContainer(options);
      break;
    case 'changeurl':
      handleChangeUrl(options);
      break;
    case 'callback':
      handleCallback(options);
      break;
    default:
      throw new Error(`Operation '${operation}' is not supported`);
  }
}
