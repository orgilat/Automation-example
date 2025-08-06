import { APIRequestContext, expect } from '@playwright/test';

export class PetClient {
  private request: APIRequestContext;
  private baseURL = 'https://petstore.swagger.io/v2';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createPet(pet: any) {
    const res = await this.request.post(`${this.baseURL}/pet`, { data: pet });
    expect(res.ok()).toBeTruthy();
    return res.json();
  }

  async updatePet(pet: any) {
    const res = await this.request.put(`${this.baseURL}/pet`, { data: pet });
    expect(res.ok()).toBeTruthy();
    return res.json();
  }

async findPetsByStatus(status: string | string[]) {
  const statusParam = Array.isArray(status) ? status.join(',') : status;
  const res = await this.request.get(`${this.baseURL}/pet/findByStatus?status=${statusParam}`);
  expect(res.ok()).toBeTruthy();
  return res.json();
}



}
