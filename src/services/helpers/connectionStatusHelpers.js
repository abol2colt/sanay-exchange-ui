export const DEFAULT_CONNECTION_STATUS = {
  phase: "idle",
  provider: "None",
  message: "در حال پیدا کردن منبع مناسب",
  reason: null,
  isLive: false,
};

export const createConnectionStatus = (overrides = {}) => {
  return {
    ...DEFAULT_CONNECTION_STATUS,
    ...overrides,
  };
};

export const getConnectingStatus = (
  provider,
  message,
  reason = null,
) => {
  return createConnectionStatus({
    phase: "connecting",
    provider,
    message,
    reason,
    isLive: false,
  });
};

export const getLiveStatus = (provider, message) => {
  return createConnectionStatus({
    phase: "live",
    provider,
    message,
    reason: null,
    isLive: true,
  });
};

export const getDegradedStatus = (
  provider,
  message,
  reason = null,
) => {
  return createConnectionStatus({
    phase: "degraded",
    provider,
    message,
    reason,
    isLive: false,
  });
};