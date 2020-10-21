import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { AddSubscriptions } from "@/contexts/Subscriptions/UseCases/AddSubscriptions";
import { InMemorySubscriptionsRepo } from "@/contexts/Subscriptions/Infrastructure/Persistence/InMemorySubscriptionsRepo";

describe('Add subscriptions use case test', () => {
  let addSubscriptions: AddSubscriptions, repo: InMemorySubscriptionsRepo;
  beforeAll(() => {
    repo = new InMemorySubscriptionsRepo();
    addSubscriptions = new AddSubscriptions(repo);
  })
  test('it should add a new subscription to repository', async() => {
    addSubscriptions.add(1234, FuelTypes.G95);
    const sut = await repo.getSubscriptions();
    expect(sut.length).toBe(1);
    expect(sut[0].numSubscriptions).toBe(1);
  })
  test('it should increment subscriptions number to an existing fuel station', async() => {
    addSubscriptions.add(4567, FuelTypes.G95);
    addSubscriptions.add(4567, FuelTypes.G95);
    addSubscriptions.add(4567, FuelTypes.G95);
    const sut = await repo.getSubscriptions();
    expect(sut.length).toBe(2);
    expect(sut[1].numSubscriptions).toBe(3);
  })
})
