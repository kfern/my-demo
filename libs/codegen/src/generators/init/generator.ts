import {
  formatFiles,
  getProjects,
  ProjectConfiguration,
  Tree,
} from '@nx/devkit';
import { InitGeneratorSchema } from './schema';

import {
  libraryGenerator as ngLibraryGenerator,
  storybookConfigurationGenerator,
} from '@nx/angular/generators';
import { Linter } from '@nx/linter';

type NxProjects = Map<string, ProjectConfiguration>;

const addcomponentsLibrary = async (tree: Tree, projects: NxProjects) => {
  const name = 'components';
  if (!projects.has(name)) {
    await ngLibraryGenerator(tree, { name });
    await storybookConfigurationGenerator(tree, {
      name,
      generateStories: false,
      linter: Linter.EsLint,
    });
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function initGenerator(tree: Tree, _options: InitGeneratorSchema) {
  const projects = getProjects(tree);

  await addcomponentsLibrary(tree, projects);

  await formatFiles(tree);
}

export default initGenerator;
