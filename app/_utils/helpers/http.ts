export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface HttpOptions<TBody = unknown, TParams = Record<string, any>> {
  headers?: HeadersInit;
  body?: TBody;
  signal?: AbortSignal;
  baseUrl?: string;
  params?: TParams;
}

function buildQuery(params?: Record<string, any>): string {
  if (!params) return '';

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach(v => searchParams.append(key, String(v)));
    } else {
      searchParams.append(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

async function request<TResponse, TBody = unknown>(
  method: HttpMethod,
  url: string,
  options: HttpOptions<TBody> = {}
): Promise<TResponse> {
  const { body, headers, signal, baseUrl, params } = options;

  const query = buildQuery(params);

  const res = await fetch(`${baseUrl ?? ''}${url}${query}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  const contentType = res.headers.get('content-type');
  const data =
    contentType?.includes('application/json')
      ? await res.json()
      : await res.text();

  if (!res.ok) {
    throw {
      status: res.status,
      message: data?.message ?? res.statusText,
      data,
    };
  }

  return data as TResponse;
}

export const http = {
  get<T>(url: string, options?: Omit<HttpOptions, 'body'>) {
    return request<T>('GET', url, options);
  },

  post<T, B = unknown>(url: string, body: B, options?: HttpOptions<B>) {
    return request<T, B>('POST', url, { ...options, body });
  },

  put<T, B = unknown>(url: string, body: B, options?: HttpOptions<B>) {
    return request<T, B>('PUT', url, { ...options, body });
  },

  delete<T>(url: string, options?: HttpOptions) {
    return request<T>('DELETE', url, options);
  },
};
