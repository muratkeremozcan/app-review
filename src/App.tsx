import {lazy, Suspense} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ErrorBoundary} from 'react-error-boundary'
import HeaderBar from 'components/HeaderBar'
import NavBar from 'components/NavBar'
import PageSpinner from 'components/PageSpinner'
import ErrorComp from 'components/ErrorComp'
import Villains from 'villains/Villains'
import Boys from 'boys/Boys'
import './styles.scss'
const Heroes = lazy(() => import('heroes/Heroes'))
const NotFound = lazy(() => import('components/NotFound'))
const About = lazy(() => import('About'))

const queryClient = new QueryClient()

export default function App() {
  return (
    <BrowserRouter>
      <HeaderBar />
      <div className="section columns">
        <NavBar />
        <main className="column">
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary fallback={<ErrorComp />}>
              <Suspense fallback={<PageSpinner />}>
                <Routes>
                  <Route path="/" element={<Navigate replace to="/heroes" />} />
                  <Route path="/heroes/*" element={<Heroes />} />
                  <Route path="/villains/*" element={<Villains />} />
                  <Route path="/boys/*" element={<Boys />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </QueryClientProvider>
        </main>
      </div>
    </BrowserRouter>
  )
}
