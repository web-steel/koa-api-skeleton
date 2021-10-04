interface ISentryConfig {
    dns: string
}

const sentryConfig: ISentryConfig = {
    dns: process.env.SENTRY_DNS
};

export default sentryConfig;
