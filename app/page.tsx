'use client'

import { useEffect, useState } from 'react'

interface TestItem {
  id: number
  name: string
  createdAt: string
}

export default function Home() {
  const [items, setItems] = useState<TestItem[]>([])
  const [name, setName] = useState('')

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const res = await fetch('/api/test-items')
    const data = await res.json()
    setItems(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/test-items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    if (res.ok) {
      setName('')
      fetchItems()
    }
  }

  return (
    <div>
      <h1>Test Website</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter item name"
          required
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name} - {new Date(item.createdAt).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  )
}