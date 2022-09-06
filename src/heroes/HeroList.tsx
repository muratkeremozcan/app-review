import CardContent from '../components/CardContent'
import ButtonFooter from '../components/ButtonFooter'
import {FaEdit, FaRegSave} from 'react-icons/fa'
import {Hero} from 'models/Hero'
type HeroListProps = {
  heroes: Hero[]
  handleDeleteHero: () => void // TODO: consider better type
}

export default function HeroList({heroes, handleDeleteHero}: HeroListProps) {
  const handleSelectHero = () => console.log('handleSelectHero')

  return (
    <ul data-cy="hero-list" className="list">
      {heroes.map((hero, index) => (
        <li data-cy={`hero-list-item-${index}`} key={hero.id}>
          <div className="card">
            <CardContent name={hero.name} description={hero.description} />
            <footer className="card-footer">
              <ButtonFooter
                label="Delete"
                IconClass={FaRegSave}
                onClick={handleDeleteHero}
              />
              <ButtonFooter
                label="Edit"
                IconClass={FaEdit}
                onClick={handleSelectHero}
              />
            </footer>
          </div>
        </li>
      ))}
    </ul>
  )
}
