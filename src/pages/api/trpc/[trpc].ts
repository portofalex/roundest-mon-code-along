import { inferProcedureOutput } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { AppRouter, appRouter } from '../../../backend/routers/_app';

// export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

export type inferQueryResponse<TRouteKey extends keyof AppRouter["_def"]["queries"]> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;
