import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RecipesPage from './pages/RecipesPage'
import RecipeDetail from './pages/RecipeDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipesPage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  )
}

export default App
