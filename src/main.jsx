import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CommentProvider } from "./context/comments.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CommentProvider>
    <App />
  </CommentProvider>
);
