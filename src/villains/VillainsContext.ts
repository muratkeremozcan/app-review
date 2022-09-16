import {Villain} from 'models/Villain'
import {createContext} from 'react'

const VillainsContext = createContext<Villain[]>([])

export default VillainsContext
