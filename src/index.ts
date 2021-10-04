import app from './app/app';

const modules = [
    // this should be first
    'bootstrap/parse-env',
    'bootstrap/init-sentry',

    // this can be in any order
    'bootstrap/connect-orm',

    // this should be last
    'app/routes',
    'bootstrap/start-server',
];

async function ignite() {
    for (const filename of modules) {
        const module = await import('./' + filename + '.ts');
        await module.default(app);
    }
}

function handleCrash(err: Error) {
    console.log(err);
    process.exit(1);
}

process.on('unhandledRejection', handleCrash);

ignite().catch(handleCrash);

export default app
