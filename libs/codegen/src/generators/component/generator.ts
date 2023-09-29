import {
  formatFiles,
  generateFiles,
  getProjects,
  names,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { ComponentGeneratorSchema } from './schema';
import { Options } from 'nx/src/utils/params';
import {
  getEventsByState,
  getHTMLViewByState,
} from '../../utils/machines/machines';
import { machineDefinition as simpleMachineDefinition } from './files/machines/simple/simple.machine';
export async function componentGenerator(
  tree: Tree,
  options: ComponentGeneratorSchema
) {
  const projects = getProjects(tree);
  const componentNames = names(options.name);

  const htmlView = {
    simple: getHTMLViewByState(getEventsByState(simpleMachineDefinition)),
  };
  const finalOptions: Options = {
    ...options,
    name: componentNames.name.toLowerCase(),
    className: `${componentNames.className}Component`,
    fileName: `${componentNames.fileName}.component`,
    machineFileName: `../../machines/${options.type.toLowerCase()}.machine`,
    htmlView: htmlView[options.type.toLowerCase()],
  };

  // Component files
  const targetComponentsDir = `${
    projects.get(options.project).sourceRoot
  }/components/${componentNames.fileName}`;

  generateFiles(
    tree,
    path.join(__dirname, 'files/src'),
    targetComponentsDir,
    finalOptions
  );

  // Related state machine
  const targetMachinesDir = `${
    projects.get(options.project).sourceRoot
  }/machines`;

  generateFiles(
    tree,
    path.join(__dirname, `files/machines/${options.type.toLowerCase()}`),
    targetMachinesDir,
    finalOptions
  );

  await formatFiles(tree);
}

export default componentGenerator;
