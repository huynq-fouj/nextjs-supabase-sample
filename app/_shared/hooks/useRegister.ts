import useSWRMutation from 'swr/mutation'
import { registerFetcher } from '../libs/fetchers/register'

export function useRegister() {
  return useSWRMutation('/api/register', registerFetcher)
}