import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./assets/components/Main/Main.tsx";
import { PostPage } from "./assets/components/PostPage/Post.tsx";
import { FormPage } from "./assets/components/FormPage/FormPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route
          path="/user"
          element={
            <RequireAuth>
              <UserPage />
            </RequireAuth>x
          }
        /> */}
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/newpost/" element={<FormPage />} />
        <Route path="/edit-post/:id" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
