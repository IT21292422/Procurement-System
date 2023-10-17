import { addPolicy, getPolicies, getPolicyById, updatePolicy, deletePolicy } from './PolicyController'
import {describe, expect, jest, test} from '@jest/globals'

const policy = {
  policyName: 'Test Policy',
  policyAmount: 1000,
  description: 'Test policy description',
};

//expect(actual value).toBe(expected value)
describe('Test cases to test the functions in Policy Controller', () => {
  //Test case to test adding policy to database, updating it, retrieving it by ID and then deleting it
  test('addPolicy adds a new policy document', async () => {
    jest.setTimeout(25000);

    // Call the addPolicy function
    await addPolicy(policy);

    //Check if the policy was added to Firestore by checking the getPolicies function
    const policies = await getPolicies();
    const addedPolicy = policies.find((policy:any) => policy.policyName === 'Test Policy');
    const policyId = addedPolicy.id;

    // Assertion
    expect(addedPolicy).toBeDefined(); // Make sure addedPolicy is not undefined, to check if the policy exists
    expect(addedPolicy.policyName).toBe('Test Policy'); // Check the policy name

    //To check the update
    const updatedPolicyData = {
      policyName: 'Updated Test Policy',
      policyAmount: 1500,
      description: 'Updated policy description',
    };

    await updatePolicy({ id: policyId }, updatedPolicyData);

    //Then to retieve the updated data
    const updatedPolicy:any = await getPolicyById({ id: policyId });

    // Assertion to check whether we get the expected value
    expect(updatedPolicy.policyName).toBe('Updated Test Policy');
    expect(updatedPolicy.policyAmount).toBe(1500);
    expect(updatedPolicy.description).toBe('Updated policy description');

    //Testing the deletePolicy function to delete the test data
    await deletePolicy(policyId);

    const deletedPolicy = await getPolicyById({ id: policyId });

    // Assertion
    expect(deletedPolicy).toBeUndefined(); // Make sure deletedPolicy is undefined, to check if the policy no longer exists

  });

  //Test case to test retieving policy from database by comparing with the pre-existing documents
  test('getPolicies retrieves a list of policies', async () => {
    // Call the getPolicies function
    const policies = await getPolicies();

    // Mock or check if the policies array contains the expected data
    //Some data from the policies collection in the firestore database
    const mockPolicies = [
      {
        policyName: 'Sand',
        policyAmount: 100000,
        description: 'River sand, coarse sand can be approved with this policy',
      },
      {
        policyName: 'Bricks',
        policyAmount: 150000,
        description: 'Concrete Bricks and Clay Bricks, can be approved with this policy',
      },
    ];

    // Assertion
    expect(Array.isArray(policies)).toBeTruthy(); //To check whether policies is of array type, so it returns true 
    expect(policies.length).toBeGreaterThan(0); //To check whether array length is greater than 0

    // Checking specific policy data
    for (const mockPolicy of mockPolicies) {
      const retrievedPolicy = policies.find((policy:any) => policy.policyName === mockPolicy.policyName);
      expect(retrievedPolicy).toBeDefined();
      expect(retrievedPolicy.policyAmount).toBe(mockPolicy.policyAmount);
    }

  });

  //Test case to test getPolicyById function and then comparing them with the pre-defined values
  test('getPolicyById retrieves a specific policy document', async () => {
    // Define a test policy ID 
    const testPolicyId = 'czMXCLkqUDjXjYd3JkXL';

    // Call the getPolicyById function
    const policy:any = await getPolicyById({ id: testPolicyId });

    // Assertion
    expect(policy).toBeDefined();
    expect(policy.policyName).toBe('Sand');
    expect(policy.policyAmount).toBe(100000);
    expect(policy.description).toBe('River sand, coarse sand can be approved with this policy');

  });

  //Negative test case to test when an invalid id is passed to getPolicyById function
  test('getPolicyById handles errors when retrieving a policy document by ID', async () => {
    const invalidPolicyId = 'invalidid123';
  
    try {
      await getPolicyById({ id: invalidPolicyId });
    } catch (error:any) {
      // Assertion
      expect(error).toBeDefined(); //We expect an error here
      expect(error.message).toContain('No such policy document');
    }
  });
  

});
