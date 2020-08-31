import { UuidV4 } from '@/sharedInfrastructure/UuidV4';

describe('UuidV4 implementation test', () =>
{
  test('it should generate a valid uuid v4', () =>
  {
    const stu = UuidV4.generate();
    expect(typeof stu).toBe("string");
    expect(stu).toMatch(/(?:^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$)|(?:^0{8}-0{4}-0{4}-0{4}-0{12}$)/u);
  })
  test('it should validate as truthy a correct uuid v4', () =>
  {
    const correctUuidV4 = "75442486-0878-440c-9db1-a7006c25a39f";
    const stu = UuidV4.isValid(correctUuidV4);
    expect(stu).toBeTruthy();
  })
  test('it should validate as falsy an incorrect uuid v4', () =>
  {
    const incorrectUuidV4 = "75442486-0878-440c-9db1";
    const stu = UuidV4.isValid(incorrectUuidV4);
    expect(stu).toBeFalsy();
  })
})
