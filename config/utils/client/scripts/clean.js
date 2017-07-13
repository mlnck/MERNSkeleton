require('shelljs/global');
const addCheckMark = require('./helpers/checkmark.js');

if (!which('git')) {
  echo('Sorry, this script requires git');
  exit(1);
}

if (!test('-e', 'config/utils/client/templates')) {
  echo('The example is deleted already.');
  exit(1);
}

process.stdout.write('Cleanup started...');

// Reuse existing LanguageProvider and i18n tests
mv('client/containers/LanguageProvider/tests', 'config/utils/client/templates/containers/LanguageProvider');
cp('client/tests/i18n.test.js', 'config/utils/client/templates/tests/i18n.test.js');

// Cleanup components/
rm('-rf', 'client/components/*');

// Handle containers/
rm('-rf', 'client/containers');
mv('config/utils/client/templates/containers', 'client');

// Handle tests/
mv('config/utils/client/templates/tests', 'client');

// Handle translations/
rm('-rf', 'config/intl/translations')
mv('config/utils/client/templates/translations', 'config/intl');

// Handle utils/
rm('-rf', 'client/utils');
mv('config/utils/client/templates/utils', 'app')

// Replace the files in the root client/ folder
cp('config/utils/client/templates/app.js', 'client/app.js');
cp('config/utils/client/templates/global-styles.js', 'client/global-styles.js');
cp('config/utils/client/templates/i18n.js', 'client/i18n.js');
cp('config/utils/client/templates/index.html', 'client/index.html');
cp('config/utils/client/templates/reducers.js', 'client/reducers.js');
cp('config/utils/client/templates/routes.js', 'client/routes.js');
cp('config/utils/client/templates/store.js', 'client/store.js');

// Remove the templates folder
rm('-rf', 'config/utils/client/templates');

addCheckMark();

// Commit the changes
if (exec('git add . --all && git commit -qm "Remove default example"').code !== 0) {
  echo('\nError: Git commit failed');
  exit(1);
}

echo('\nCleanup done. Happy Coding!!!');
