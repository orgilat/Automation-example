import { test, expect } from '@playwright/test';
import { PetClient } from '../../petClient';
import { allure } from 'allure-playwright';
import logger from '../../logger'; // Logger instance for debugging

test.describe('PetStore API - Part 2', () => {
  let petClient: PetClient;

  test.beforeEach(({ request }) => {
    petClient = new PetClient(request);
  });

  // טסט 1 - יצירת חיה ועדכון סטטוס ל-sold
  test('Task 1 - Create pet and update status to "sold"', async () => {
    allure.label('feature', 'API tests - Create and Update');
    allure.description('Create a new pet with "available" status and update it to "sold".');

    const petId = Date.now();
    const newPet = {
      id: petId,
      category: { id: 0, name: 'string' },
      name: 'may',
      photoUrls: ['string'],
      tags: [{ id: 0, name: 'string' }],
      status: 'available'
    };

    await allure.step('Step 1: Create new pet with status "available"', async () => {
      const createdPet = await petClient.createPet(newPet);
      logger.info('New pet created:', createdPet);

      expect(createdPet).toBeDefined();
      expect(createdPet.id).toBe(petId);
      expect(createdPet.status).toBe('available');
      expect(createdPet.name).toBe('may');
    });

    await allure.step('Step 2: Update pet status to "sold"', async () => {
      const updatedPet = await petClient.updatePet({ ...newPet, status: 'sold' });
      logger.info(`Pet with ID ${updatedPet.id} updated to status 'sold':`, updatedPet);

      expect(updatedPet).toBeDefined();
      expect(updatedPet.status).toBe('sold');
      expect(updatedPet.id).toBe(petId);
      expect(updatedPet.name).toBe('may');
    });
  });

  // טסט 2 - חיפוש חיה לפי סטטוס ובדיקה שהרביעית היא doggie
  test('Task 2 - Find 4th pet by status "available" and verify name is "doggie"', async () => {
    allure.label('feature', 'API tests - Pet Query');
    allure.description('Find pets by status "available", check that the fourth is named "doggie", and log it.');

    let pets: any[] = [];
    let fourthPet: any;

    await allure.step('Step 1: Get pets by status "available"', async () => {
      pets = await petClient.findPetsByStatus('available');
      logger.info(`Fetched ${pets.length} pets with status 'available'.`);

      expect(pets.length).toBeGreaterThanOrEqual(4);
    });

    await allure.step('Step 2: Verify fourth pet name is "doggie"', async () => {
      fourthPet = pets[3];
      logger.info('Fourth pet object:', fourthPet);

      expect(fourthPet).toBeDefined();
      expect(fourthPet.name).toBe('doggie');
    });

    await allure.step('Step 3: Log fourth pet object', async () => {
      logger.info('Logging fourth pet (status "available") to console:', fourthPet);
      console.log('Fourth available pet:', fourthPet);
    });
  });

  // טסט 3 - בדיקה שכל החיות שנמצאו עם סטטוס sold אכן כאלה
  test('Task 3 - Find pets with status "sold" and validate', async () => {
    allure.label('feature', 'API tests - Pet Validation');
    allure.description('Fetch pets with status "sold" and verify all are marked "sold".');

    await allure.step('Step 1: Validate all pets have status "sold"', async () => {
      const soldPets = await petClient.findPetsByStatus('sold');
      logger.info(`Fetched ${soldPets.length} pets with status 'sold'.`);
      expect(soldPets.length).toBeGreaterThan(0);
      for (const pet of soldPets) {
        logger.info(`Validating pet ID ${pet.id} has status "sold"`);
        expect(pet.status).toBe('sold');
      }
      console.log(`Found ${soldPets.length} pets with status "sold".`);
    });
  });
});
