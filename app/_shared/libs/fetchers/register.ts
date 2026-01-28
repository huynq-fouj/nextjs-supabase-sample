import { ApiResponse } from "../../types"
import { RegisterRequest } from "../../types/register"

export async function registerFetcher(
  url: string,
  { arg }: { arg: RegisterRequest }
): Promise<ApiResponse<null>> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  })

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Register failed')
  }

  return data
}
