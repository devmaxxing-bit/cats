import { useEffect, useState } from 'react'

function App() {
  const [catImage, setCatImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function loadCat() {
    setError(null)

    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search')
      if (!response.ok) {
        throw new Error('Не удалось загрузить кота')
      }

      const cats: { url: string }[] = await response.json()
      setCatImage(cats[0]?.url ?? null)
    } catch {
      setError('Не удалось загрузить кота. Попробуйте еще раз.')
    }
  }

  useEffect(() => {
    void loadCat()
  }, [])

  return (
    <>
      <h1>Random Cat</h1>
      {catImage && <img src={catImage} alt="Случайный кот" />}
      {error && <p role="alert">{error}</p>}
      <button type="button" onClick={loadCat}>
        Новый кот
      </button>
    </>
  )
}

export default App
