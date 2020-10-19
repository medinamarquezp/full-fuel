import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { AddSubscriptions } from "@/contexts/Subscriptions/UseCases/AddSubscriptions";
import { RemoveSubscriptions } from "@/contexts/Subscriptions/UseCases/RemoveSubscriptions";
import { InMemorySubscriptions } from "@/contexts/Subscriptions/Infrastructure/Persistence/InMemorySubscriptions";

describe('Remove subscriptions use case test', () => {
  let removeSubscriptions: RemoveSubscriptions, addSubscriptions: AddSubscriptions, repo: InMemorySubscriptions;
  beforeEach(async () => {
    repo = new InMemorySubscriptions();
    addSubscriptions = new AddSubscriptions(repo);
    removeSubscriptions = new RemoveSubscriptions(repo);
    await addSubscriptions.add(1234, FuelTypes.G95);
    await addSubscriptions.add(1234, FuelTypes.G95);
    await addSubscriptions.add(1234, FuelTypes.G95);
    await addSubscriptions.add(1234, FuelTypes.GASOIL);
  })
  test('it should decrement subscriptions number to an existing fuel station', async() => {
    await removeSubscriptions.remove(1234, FuelTypes.G95);
    const sut = await repo.getSubscriptions();
    expect(sut.length).toBe(2);
    expect(sut[0].numSubscriptions).toBe(2);
  })
  test('it should remove a subscription when subscriptors number is equals to zero', async() => {
    await removeSubscriptions.remove(1234, FuelTypes.GASOIL);
    const sut = await repo.getSubscriptions();
    expect(sut.length).toBe(1);
  })
  test('it should do nothing when removing a non existing item', async() => {
    await removeSubscriptions.remove(1234, FuelTypes.G98);
    const sut = await repo.getSubscriptions();
    expect(sut.length).toBe(2);
    expect(sut[0].numSubscriptions).toBe(3);
    expect(sut[1].numSubscriptions).toBe(1);
  })
})
