// OpenTelemetry instrumentation disabled for build optimization
// To enable, set ENABLE_OTEL=1 environment variable in production
// and uncomment the code below

// if (process.env.NODE_ENV === 'production' && process.env.ENABLE_OTEL === '1') {
//   import('@lobechat/observability-otel/node').then(({ register }) => {
//     import('../package.json').then(({ version }) => {
//       register({ version });
//     });
//   });
// }

export {};
