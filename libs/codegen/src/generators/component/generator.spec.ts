import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, names } from '@nx/devkit';
import { initGenerator } from '../init/generator';
import { componentGenerator } from './generator';
import { ComponentGeneratorSchema } from './schema';

describe('component generator', () => {
  let tree: Tree;
  const options: ComponentGeneratorSchema = {
    name: 'test',
    type: 'simple',
    project: 'components',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    // Arrange
    await initGenerator(tree, {});

    // Act
    await componentGenerator(tree, options);

    // Assert
    const basePath = {
      component: `components/src/components/${names(options.name).fileName}/${
        options.name
      }.component`,
      machine: 'components/src/machines',
    };
    const files = tree
      .listChanges()
      .filter(
        (f) =>
          f.path.includes(basePath.component) ||
          f.path.includes(basePath.machine)
      )
      .map((f) => f.path)
      .sort((a, b) => (a > b ? -1 : 1));

    const expectedFiles = [
      `${basePath.component}.ts`,
      `${basePath.component}.html`,
      `${basePath.component}.stories.ts`,
      `${basePath.component}.spec.ts`,
      `${basePath.machine}/${options.type}.machine.ts`,
    ].sort((a, b) => (a > b ? -1 : 1));

    expect(files).toStrictEqual(expectedFiles);
  });
});
