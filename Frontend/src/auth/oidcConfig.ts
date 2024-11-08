import { WebStorageStateStore, type UserManagerSettings } from 'oidc-client-ts';

export const oidcConfig: UserManagerSettings = {
    client_id: 'frontend',
    authority: 'https://am-identity.rccloud.dev',
    redirect_uri: `${window.location.origin}/auth/callback`,
    redirectMethod: 'replace',
    response_type: 'code',
    response_mode: 'query',
    scope: 'openid',
    client_secret: '901564A5-E7FE-42CB-B10D-61EF6A8F3654',
    loadUserInfo: false,
    monitorSession: true,
    automaticSilentRenew: true,
    post_logout_redirect_uri: `${window.location.origin}/auth/logout`,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    stateStore: new WebStorageStateStore({ store: window.localStorage }),
};
