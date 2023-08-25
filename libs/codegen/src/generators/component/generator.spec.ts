import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, names } from '@nx/devkit';
import { initGenerator } from '../init/generator';
import { componentGenerator } from './generator';
import { ComponentGeneratorSchema } from './schema';

describe('component generator', () => {
  let tree: Tree;
  const options: ComponentGeneratorSchema = { name: `test` };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await initGenerator(tree, {});

    await componentGenerator(tree, options);

    const basePath = 'components/src/components';
    const files = tree
      .listChanges()
      .filter((f) =>
        f.path.includes(`${basePath}/${names(options.name).fileName}`)
      )
      .map((f) => f.path)
      .sort((a, b) => (a > b ? -1 : 1));

    const expectedFiles = [
      'ts',
      'html',
      'stories.ts',
      'spec.ts',
      'xstate.ts',
      'xstate.typegen.ts',
    ]
      .map((f) => `${basePath}/${options.name}/${options.name}.component.${f}`)
      .sort((a, b) => (a > b ? -1 : 1));

    expect(files).toStrictEqual(expectedFiles);
  });
});
