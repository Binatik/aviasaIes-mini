import { ISortedType } from "../module/AviasaIes/store/redux/slices/ticketsSlice";
import { IAviasales, ITicket } from "./api.types";

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

  async fakeEndpoint<T>(delay: number, state: T): Promise<T> {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        resolve(state);
        rejected(new Error("Rejected fakeEndpoint"));
      }, delay);
    });
  }

  async fakeExecuteSort(payload: ISortedType | null, modifiedTickets: ITicket[]): Promise<ITicket[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (payload === "cheap") {
          const result = [...modifiedTickets].sort((a, b) => a.price - b.price);

          resolve(result);
        }

        if (payload === "fast") {
          const result = [...modifiedTickets].sort((current, next) => {
            //Получаем сумму duration в обоих направлениях для current и next билетов.
            const durationCurrent = current.segments[0].duration + current.segments[1].duration;
            const durationNext = next.segments[0].duration + next.segments[1].duration;

            return durationCurrent - durationNext;
          });

          resolve(result);
        }

        if (payload === "optimal") {
          const result = [...modifiedTickets].sort((current, next) => {
            const priceDiff = current.price - next.price;
            const durationAdurationCurrent = current.segments[0].duration + current.segments[1].duration;
            const durationBdurationNext = next.segments[0].duration + next.segments[1].duration;

            const durationDiff = durationAdurationCurrent - durationBdurationNext;

            // Смотрим разницу
            if (priceDiff >= 0) {
              return durationDiff;
            }
            return priceDiff;
          });

          resolve(result);
        }
      }, 0);
    });
  }
}

export { Api };
