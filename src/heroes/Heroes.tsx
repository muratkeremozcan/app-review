import {useNavigate, Routes, Route} from 'react-router-dom'
import ListHeader from 'components/ListHeader'
import ModalYesNo from 'components/ModalYesNo'
import HeroList from './HeroList'
import {useCallback, useEffect, useState} from 'react'
import HeroDetail from './HeroDetail'
import axios, {AxiosResponse} from 'axios'

export default function Heroes() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [heroes, setHeroes] = useState([])

  // TODO: identify a better type later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseList = (response: AxiosResponse<any>) => {
    if (response.status !== 200) throw Error(response.statusText)
    let list = response.data
    if (typeof list !== 'object') {
      list = []
    }
    console.log(list)
    return list
  }

  const getData = useCallback(async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/heroes`)
    return parseList(response)
  }, [])

  useEffect(() => {
    console.log('mounting')
    getData().then(data => {
      setHeroes(data)
    })

    return () => console.log('unmounting')
  }, []) // empty array to have the effect occur only once

  const navigate = useNavigate()
  const addNewHero = () => navigate('/heroes/add-hero')
  const handleRefresh = () => navigate('/heroes')

  const handleCloseModal = () => {
    setShowModal(false)
  }
  const handleDeleteHero = () => {
    setShowModal(true)
  }
  const handleDeleteFromModal = () => {
    setShowModal(false)
    console.log('handleDeleteFromModal')
  }

  return (
    <div data-cy="heroes">
      <ListHeader
        title="Heroes"
        handleAdd={addNewHero}
        handleRefresh={handleRefresh}
      />
      <div>
        <div>
          <Routes>
            <Route
              path=""
              element={
                <HeroList heroes={heroes} handleDeleteHero={handleDeleteHero} />
              }
            />
            <Route path="/add-hero" element={<HeroDetail />} />
            <Route path="/edit-hero/:id" element={<HeroDetail />} />
            <Route
              path="*"
              element={
                <HeroList heroes={heroes} handleDeleteHero={handleDeleteHero} />
              }
            />
          </Routes>
        </div>
      </div>

      {showModal && (
        <ModalYesNo
          message="Would you like to delete the hero?"
          onNo={handleCloseModal}
          onYes={handleDeleteFromModal}
        />
      )}
    </div>
  )
}
