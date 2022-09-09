import {useState, ChangeEvent} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {FaUndo, FaRegSave} from 'react-icons/fa'
import InputDetail from 'components/InputDetail'
import ButtonFooter from 'components/ButtonFooter'
import {useHeroParams} from 'hooks/useHeroParams'
import {usePostHero} from 'hooks/usePostHero'
import {Hero} from 'models/Hero'
import {usePutHero} from 'hooks/usePutHero'

export default function HeroDetail() {
  const {id} = useParams()
  const {name, description} = useHeroParams()
  const [hero, setHero] = useState({id, name, description})
  const {mutate: createHero, status, error: postError} = usePostHero()
  const {updateHero, isUpdating, isUpdateError} = usePutHero()

  const navigate = useNavigate()
  const handleCancel = () => navigate('/heroes')
  const handleSave = () =>
    name ? updateHero(hero as Hero) : createHero(hero as Hero)
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHero({...hero, name: e.target.value})
  }
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHero({...hero, description: e.target.value})
  }

  return (
    <div data-cy="hero-detail" className="card edit-detail">
      <header className="card-header">
        <p className="card-header-title">{name}</p>
        &nbsp;
      </header>
      <div className="card-content">
        <div className="content">
          {id && (
            <InputDetail name={'id'} value={id} readOnly={true}></InputDetail>
          )}
          <InputDetail
            name={'name'}
            value={name ? name : ''}
            placeholder="e.g. Colleen"
            onChange={handleNameChange}
          ></InputDetail>
          <InputDetail
            name={'description'}
            value={description ? description : ''}
            placeholder="e.g. dance fight!"
            onChange={handleDescriptionChange}
          ></InputDetail>
        </div>
      </div>
      <footer className="card-footer">
        <ButtonFooter
          label="Cancel"
          IconClass={FaUndo}
          onClick={handleCancel}
        />
        <ButtonFooter label="Save" IconClass={FaRegSave} onClick={handleSave} />
      </footer>
    </div>
  )
}
