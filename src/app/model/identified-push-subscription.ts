import { DeviceInfo } from 'ngx-device-detector';

/**
 * An interface wrapping a PushSubscriptionJSON interface enriched with the userId and the device info,
 * so that the push subscription can be identified and personalized.
 */
export interface IIdentifiedPushSubscription {
    userId: string,
    subscription: PushSubscriptionJSON,
    device: DeviceInfo
}