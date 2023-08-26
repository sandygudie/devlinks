import { USER_ID} from './constants'

export function getUserId() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem( USER_ID)
  }
}

export function setUserId(userId:string) {

  if (typeof window !== 'undefined') {
    localStorage.setItem( USER_ID, userId)
  }
}


