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

export async function componentGenerator(
  tree: Tree,
  options: ComponentGeneratorSchema
) {
  const componentsLibraryName = 'components';

  const projects = getProjects(tree);
  if (!projects.has(componentsLibraryName)) {
    throw Error('components does not exists. Tip: nx g @kfern/codegen:init');
  }
  const componentNames = names(options.name);
  const targetDir = `${projects.get('components').sourceRoot}/components/${
    componentNames.fileName
  }`;

  const finalOptions: Options = {
    ...options,
    name: componentNames.name.toLowerCase(),
    className: `${componentNames.className}Component`,
    fileName: `${componentNames.fileName}.component`,
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files/src'),
    targetDir,
    finalOptions
  );

  await formatFiles(tree);
}

export default componentGenerator;
