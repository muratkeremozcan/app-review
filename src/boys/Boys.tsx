import {useState} from 'react'
import {useNavigate, Routes, Route} from 'react-router-dom'
import ListHeader from 'components/ListHeader'
import ModalYesNo from 'components/ModalYesNo'
import ErrorComp from 'components/ErrorComp'
import BoyList from './BoyList'
import BoyDetail from './BoyDetail'
import {useGetEntities} from 'hooks/useGetEntities'
import {useDeleteEntity} from 'hooks/useDeleteEntity'
import {Boy} from 'models/Boy'

export default function Boys() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const {entities: boys, getError} = useGetEntities('boys')
  const [boyToDelete, setBoyToDelete] = useState<Boy | null>(null)
  const {deleteEntity: deleteBoy, isDeleteError} = useDeleteEntity('boy')

  const navigate = useNavigate()
  const addNewBoy = () => navigate('/boys/add-boy')
  const handleRefresh = () => navigate('/boys')

  const handleCloseModal = () => {
    setBoyToDelete(null)
    setShowModal(false)
  }
  // currying: the outer fn takes our custom arg and returns a fn that takes the event
  const handleDeleteBoy = (boy: Boy) => () => {
    setBoyToDelete(boy)
    setShowModal(true)
  }
  const handleDeleteFromModal = () => {
    boyToDelete ? deleteBoy(boyToDelete) : null
    setShowModal(false)
  }

  if (getError || isDeleteError) {
    return <ErrorComp />
  }

  return (
    <div data-cy="boys">
      <ListHeader
        title="Boys"
        handleAdd={addNewBoy}
        handleRefresh={handleRefresh}
      />
      <div>
        <div>
          <Routes>
            <Route
              path=""
              element={
                <BoyList boys={boys} handleDeleteBoy={handleDeleteBoy} />
              }
            />
            <Route path="/add-boy" element={<BoyDetail />} />
            <Route path="/edit-boy/:id" element={<BoyDetail />} />
            <Route
              path="*"
              element={
                <BoyList boys={boys} handleDeleteBoy={handleDeleteBoy} />
              }
            />
          </Routes>
        </div>
      </div>

      {showModal && (
        <ModalYesNo
          message="Would you like to delete the boy?"
          onNo={handleCloseModal}
          onYes={handleDeleteFromModal}
        />
      )}
    </div>
  )
}
