import { TRPCError } from '@trpc/server';

import { enableAuth, enableClerk } from '@/const/auth';
import { DESKTOP_USER_ID } from '@/const/desktop';
import { isDesktop } from '@/const/version';

import { trpc } from '../lambda/init';

// Anonymous user ID for when authentication is disabled
const ANONYMOUS_USER_ID = 'anonymous-user';

export const userAuth = trpc.middleware(async (opts) => {
  const { ctx } = opts;

  // 桌面端模式下，跳过默认鉴权逻辑
  if (isDesktop) {
    console.log('[userAuth] Desktop mode - using DESKTOP_USER_ID');
    return opts.next({
      ctx: { userId: DESKTOP_USER_ID },
    });
  }

  // If authentication is completely disabled, use anonymous user
  if (!enableAuth) {
    const anonymousId = process.env.MOCK_DEV_USER_ID || ANONYMOUS_USER_ID;
    console.log('[userAuth] Auth disabled - using anonymous user:', anonymousId);
    return opts.next({
      ctx: { userId: anonymousId },
    });
  }

  // `ctx.user` is nullable
  if (!ctx.userId) {
    console.log('[userAuth] No userId found in context');
    if (enableClerk) {
      console.log('clerk auth:', ctx.clerkAuth);
    } else {
      console.log('next auth:', ctx.nextAuth);
    }
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  console.log('[userAuth] Using userId from context:', ctx.userId);
  return opts.next({
    // ✅ user value is known to be non-null now
    ctx: { userId: ctx.userId },
  });
});
