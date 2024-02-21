import { IAviasales, ITicket } from "./api.types";
import { v4 as createId } from "uuid";

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

  async get<T = IAviasales>(url: string, fetchOptions: RequestInit): Promise<T> {
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

  async fakeGetTickets(delay: number, state: ITicket[]): Promise<ITicket[]> {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        const data = state.map<ITicket>((item) => {
          return { ...item, id: createId() };
        });
        resolve(data);
        rejected(new Error("Rejected fakeEndpoint"));
      }, delay);
    });
  }

  async setSortedType<T>(payload: T): Promise<T> {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        resolve(payload);
        rejected(new Error("Rejected fakeEndpoint"));
      }, 0);
    });
  }
}

export { Api };
