import { IAviasales } from "./api.types";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

class Api {
  private api: string;

  constructor() {
    this.api = "https://aviasales-test-api.kata.academy";
    //"https://aviasales-test-api.kata.academy/tickets?searchId=f0feb0be8da14cba5ad29eaef2fb1be7";
  }

  private async fetchEndpointAviasales(url: string, fetchOptions: RequestInit) {
    try {
      const response = await fetch(`${this.api}${url}`, fetchOptions);
      if (!response.ok) {
        throw new Error(`Error status ${response.status}`);
      }
      return response.json();
    } catch (error) {
      throw new Error("Network error");
    }
  }

  async get(url: string, fetchOptions: RequestInit): Promise<IAviasales> {
    const optionsWithMethod = { ...fetchOptions, method: HttpMethod.GET };
    return this.fetchEndpointAviasales(url, optionsWithMethod);
  }

  async post(url: string, fetchOptions: RequestInit) {
    const optionsWithMethod = { ...fetchOptions, method: HttpMethod.POST };
    return this.fetchEndpointAviasales(url, optionsWithMethod);
  }

  async createSession(fetchOptions?: RequestInit): Promise<{ searchId: string }> {
    const optionsWithMethod = { ...fetchOptions, method: HttpMethod.GET };
    return this.fetchEndpointAviasales("/search", optionsWithMethod);
  }

  async fakeEndpoint<T>(delay: number, state: T): Promise<T> {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        resolve(state);
        rejected(new Error("Rejected fakeEndpoint"));
      }, delay);
    });
  }
}

export { Api };
