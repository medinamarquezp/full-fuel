export interface SubscriptionsRepo {
  addSubscribers(): void,
  removeSubscribers(): void,
  getSubscribers(): number
}
