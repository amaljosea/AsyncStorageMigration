import {migration0} from './migrations/migration0';
import {migration1} from './migrations/migration1';
import {migration2} from './migrations/migration2';

const migrations = [migration0, migration1, migration2];

export const migrate = ({savedLocalState}) => {
  let data = savedLocalState || {};
  const nextMigrationToDo = data?.latestMigration
    ? data?.latestMigration + 1
    : 0;

  for (let index = nextMigrationToDo; index < migrations.length; index++) {
    const dataMigratedTemporary = migrations[index]({
      data,
    });
    data = {
      ...dataMigratedTemporary,
      latestMigration: index,
    };
  }

  return data;
};
