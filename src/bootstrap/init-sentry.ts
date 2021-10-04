import Koa from 'koa';
import * as Sentry from "@sentry/node";
import sentryConfig from '../config/sentry';

export default async (app: Koa) => {
  Sentry.init({ dsn: sentryConfig.dns });

  app.on("error", (err: Error, ctx: Koa.DefaultContext) => {
    Sentry.withScope(function (scope) {
      scope.addEventProcessor(function (event) {
        return Sentry.Handlers.parseRequest(event, ctx.request);
      });
      Sentry.captureException(err);
    });
  });
}
