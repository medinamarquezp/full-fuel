import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { AddSubscriptions } from "@/contexts/Subscriptions/UseCases/AddSubscriptions";
import { GetSubscriptorsNumber } from "@/contexts/Subscriptions/UseCases/GetSubscriptorsNumber";
import { InMemorySubscriptions } from "@/contexts/Subscriptions/Infrastructure/Persistence/InMemorySubscriptions";

describe('Get subscriptors number use case test', () => {
  let getSubscription: GetSubscriptorsNumber, addSubscriptions: AddSubscriptions, repo: InMemorySubscriptions;
  beforeEach(async () => {
    repo = new InMemorySubscriptions();
    addSubscriptions = new AddSubscriptions(repo);
    getSubscription = new GetSubscriptorsNumber(repo);
    await addSubscriptions.add(1234, FuelTypes.G95);
    await addSubscriptions.add(1234, FuelTypes.G95);
    await addSubscriptions.add(1234, FuelTypes.G95);
  })
  test('it should return the number of subscriptors of a subscription', async() => {
    const sut = await getSubscription.remove(1234, FuelTypes.G95);
    expect(sut).toBe(3);
  })
  test('it should display zero when looking for a non existing subscription', async() => {
    const sut = await getSubscription.remove(4567, FuelTypes.G95);
    expect(sut).toBe(0);
  })
})
