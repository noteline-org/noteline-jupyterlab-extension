import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';

import { URLExt } from '@jupyterlab/coreutils';

import { ServerConnection } from '@jupyterlab/services';

import { IMainMenu } from '@jupyterlab/mainmenu';

import { Menu } from '@lumino/widgets';

/**
 * Initialization data.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'main-menu',
  autoStart: true,
  requires: [ICommandPalette, IMainMenu],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    mainMenu: IMainMenu
  ) => {

    const { commands } = app;

    // Add a command
    const command = 'noteline-jupyterlab-extension:main-menu';
    
    commands.addCommand(command, {
      label: 'Execute server request:main-menu Command',
      caption: 'Execute server request:main-menu Command',
      execute: async (args: any) => {
        // GET request
        try {
          const data = await requestAPI<any>('hello');
          console.log(data);
        } catch (reason) {
          console.error(`Error on GET /noteline-jupyterlab-extension/hello.\n${reason}`);
        }

        // POST request
        const dataToSend = { name: 'Client' };
        try {
          const reply = await requestAPI<any>('hello', {
            body: JSON.stringify(dataToSend),
            method: 'POST'
          });
          console.log(reply);
        } catch (reason) {
          console.error(
            `Error on POST /noteline-jupyterlab-extension/hello ${dataToSend}.\n${reason}`
          );
        }

        window.alert(
          `Server's data arrived! ${args['origin']}`
        );
      }
    });

    // Add the command to the command palette
    const category = 'Noteline extension';
    palette.addItem({
      command,
      category,
      args: { origin: 'Check the webConsole log' }
    });

    // Create a menu
    const menu: Menu = new Menu({ commands });
    menu.title.label = 'Noteline extension';
    mainMenu.addMenu(menu, { rank: 80 });

    // Add the command to the menu
    menu.addItem({ command, args: { origin: 'Check the webConsole log' } });
  }
};

/**
 * Call the API extension
 *
 * @param endPoint API REST end point for the extension
 * @param init Initial values for the request
 * @returns The response body interpreted as JSON
 */
async function requestAPI<T>(
  endPoint = '',
  init: RequestInit = {}
): Promise<T> {
  // Make request to Jupyter API
  const settings = ServerConnection.makeSettings();
  const requestUrl = URLExt.join(
    settings.baseUrl,
    'noteline-jupyterlab-extension',
    endPoint
  );

  let response: Response;
  try {
    response = await ServerConnection.makeRequest(requestUrl, init, settings);
  } catch (error) {
    throw new ServerConnection.NetworkError(error);
  }

  const data = await response.json();

  if (!response.ok) {
    throw new ServerConnection.ResponseError(response, data.message);
  }

  return data;
}

export default extension;
