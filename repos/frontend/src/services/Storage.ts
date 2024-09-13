import { EThemeTypes } from '@MG/types'
import { ThemeStorageKey } from '@MG/constants/storage'

export class Storage {

  /**
   * Saves data to local storage by key using using window.localStorage
   * @function
   */
  set = <T=any>(key:string, value:T, stringify?:boolean) => {
    try {
      const val = stringify ? JSON.stringify(value) : value as string
      window.localStorage.setItem(key, val)
    }
    catch (err) {}
  }

  /**
   * Gets data from local storage by key using window.localStorage
   * @function
   *
   */
  get = <T=any>(key:string, parse?:boolean) => {
    try {
      const value = window.localStorage.getItem(key)
      if(!value) return undefined

      return parse ? JSON.parse(value) as T : value as T
    }
    catch(err){
      return undefined
    }
  }

  /**
   * Deletes data from local storage by key using window.localStorage
   * @function
   * @param {string} key - Name of the stored value
   */
  remove = (key:string) => {
    if(!key) return console.error(`A key is required to remove from local storage; got "${key}"`)
    
    try {
      window.localStorage.removeItem(key)
      return true
    }
    catch (err:any) {
      console.error(`Error removing ${key} from local-storage.\n${err?.message}`)
    }
  }


  getTheme = () => this.get(ThemeStorageKey)
  rmTheme = () => this.remove(ThemeStorageKey)
  setTheme = (name:EThemeTypes) => this.set(ThemeStorageKey, name)


}


export const storage = new Storage()