interface IEnvConfig {
    nodeEnv: string;
    isTest: boolean;
    isProduction: boolean;
    isDevelopment: boolean;
}

const allowEnv: string[] = ['development', 'test', 'production'];

process.env.NODE_ENV = process.env.NODE_ENV && allowEnv.includes((process.env.NODE_ENV).toLocaleLowerCase()) ?
    (process.env.NODE_ENV).toLocaleLowerCase() : 'development';

const envConfig: IEnvConfig = {
    nodeEnv: process.env.NODE_ENV,
    isTest: !!(process.env.NODE_ENV === 'test' && process.env.NODE_TEST),
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production'
};

export default envConfig;
