import React, {useCallback} from 'react';


export const useHttp = () => {
  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    try {
      if(body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      let response = await fetch(url, {method, body, headers})
      let data = await response.json()

      if(!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так')
      }

      return data
    } catch (e) {
      throw e
    }
  }, [])


  return {request}
};

