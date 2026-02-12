import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { HomePage } from '@/features/room/pages/HomePage'
import ChatPage from '@/features/chat/pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat/:roomId" element={<ChatPage />} />
    </>
  )
)

export function App() {
  return <RouterProvider router={router} />
}
