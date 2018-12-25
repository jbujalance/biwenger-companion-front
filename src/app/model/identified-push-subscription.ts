/**
 * An interface wrapping a PushSubscriptionJSON interface enriched with the userId, so that the push subscription can be identified and personalized.
 */
export interface IIdentifiedPushSubscription {
    userId: string,
    subscription: PushSubscriptionJSON
}