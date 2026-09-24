import { lazy, Suspense, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import PageTitle from './components/PageTitle'

const Landing = lazy(() => import('./components/Landing'))
const Quiz = lazy(() => import('./components/Quiz'))
const Results = lazy(() => import('./components/Results'))
const Toolkit = lazy(() => import('./components/Toolkit'))
const PromptKit = lazy(() => import('./components/toolkit/PromptKit'))
const SafetyChecklist = lazy(() => import('./components/toolkit/SafetyChecklist'))
const AIGuide = lazy(() => import('./components/toolkit/AIGuide'))
const FirstSteps = lazy(() => import('./components/toolkit/FirstSteps'))
const EthicsChecklist = lazy(() => import('./components/toolkit/EthicsChecklist'))
const BoardBriefing = lazy(() => import('./components/toolkit/BoardBriefing'))
const Services = lazy(() => import('./components/Services'))

export default function App() {
  const [answers, setAnswers] = useState({})

  function handleQuizComplete(quizAnswers) {
    setAnswers(quizAnswers)
  }

  function handleReset() {
    setAnswers({})
  }

  return (
    <Layout>
      <PageTitle />
      <Suspense
        fallback={(
          <div className="max-w-3xl mx-auto px-4 py-16 text-center text-gray-500" role="status">
            Loading…
          </div>
        )}
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/quiz"
            element={<Quiz onComplete={handleQuizComplete} />}
          />
          <Route
            path="/results"
            element={<Results answers={answers} onReset={handleReset} />}
          />
          <Route path="/toolkit" element={<Toolkit />} />
          <Route path="/toolkit/prompt-kit" element={<PromptKit />} />
          <Route path="/toolkit/safety-checklist" element={<SafetyChecklist />} />
          <Route path="/toolkit/ai-guide" element={<AIGuide />} />
          <Route path="/toolkit/first-steps" element={<FirstSteps />} />
          <Route path="/toolkit/ethics-checklist" element={<EthicsChecklist />} />
          <Route path="/toolkit/board-briefing" element={<BoardBriefing />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
