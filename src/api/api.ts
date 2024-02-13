enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type ISegment = {
  // Код города (iata)
  origin: string;
  // Код города (iata)
  destination: string;
  // Дата и время вылета туда
  date: string;
  // Массив кодов (iata) городов с пересадками
  stops: string[];
  // Общее время перелёта в минутах
  duration: number;
};

export type ITicket = {
  // Цена в рублях
  price: number;
  // Код авиакомпании (iata)
  carrier: string;
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: ISegment[];
};

export type IAviasales = {
  tickets: ITicket[];
  stop: boolean;
};

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

  async get(url: string, fetchOptions: RequestInit): Promise<IAviasales> {
    const optionsWithMethod = { ...fetchOptions, method: HttpMethod.GET };
    return this.fetchEndpointAviasales(url, optionsWithMethod);
  }

  async post(url: string, fetchOptions: RequestInit) {
    const optionsWithMethod = { ...fetchOptions, method: HttpMethod.POST };
    return this.fetchEndpointAviasales(url, optionsWithMethod);
  }

  async createSession(
    fetchOptions?: RequestInit,
  ): Promise<{ searchId: string }> {
    const optionsWithMethod = { ...fetchOptions, method: HttpMethod.GET };
    return this.fetchEndpointAviasales("/search", optionsWithMethod);
  }
}

export { Api };
