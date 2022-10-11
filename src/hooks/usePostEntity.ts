import {Boy} from 'models/Boy'
import {Hero} from 'models/Hero'
import {EntityType, entityRoute} from 'models/types'
import {Villain} from 'models/Villain'
import {useMutation, useQueryClient} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {createItem} from '../api/api'

/**
 * Helper for simple POST to `/heroes`, `/villains`, `/boys` routes
 * @returns {object} {mutate, status, error}
 */
export function usePostEntity(entityType: EntityType) {
  const route = entityRoute(entityType)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation((item: Hero | Villain | Boy) => createItem(route, item), {
    onSuccess: (newData: Hero | Villain | Boy) => {
      //  use queryClient's setQueryData to set the cache
      // takes a key as the first arg, the 2nd arg is a cb that takes the old query cache and returns the new one
      queryClient.setQueryData(
        [route],
        (oldData: Hero[] | Villain[] | Boy[] | undefined) => [
          ...(oldData || []),
          newData,
        ],
      )

      return navigate(`/${route}`)
    },
  })
}
