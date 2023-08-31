import {TOKEN_KEY,USERID} from './constants'

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem( TOKEN_KEY)
  }
}
export function getUserId() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(USERID)
  }
}

export function setUserID(userId:string) {
 if (typeof window !== 'undefined') {
    localStorage.setItem( USERID, userId)
  }
}
export function setToken(token:string) {
if (typeof window !== 'undefined') {
    localStorage.setItem( TOKEN_KEY, token)
  }
}


export function removeDuplicates(arr:number[]) {
  return arr.filter((item,
      index) => arr.indexOf(item) === index);
}
